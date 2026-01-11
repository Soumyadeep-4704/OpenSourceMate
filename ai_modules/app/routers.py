import os
import httpx
import random
from datetime import datetime, timedelta
from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel
from typing import List, Optional

# Create a router instance
router = APIRouter()

# --- Data Models (Pydantic) ---
class UserProfile(BaseModel):
    skills: List[str]
    interests: Optional[List[str]] = []

class SocialGraph(BaseModel):
    username: str
    following: List[str] # List of usernames the user follows

# --- Configuration ---
# ideally, load this from .env
GITHUB_API_URL = "https://api.github.com"
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN") # Uncomment if added a token to .env

# --- Helper: GitHub API Client ---
async def fetch_github(url: str, params: dict = None):
    headers = {"Accept": "application/vnd.github.v3+json"}
    if GITHUB_TOKEN: headers["Authorization"] = f"token {GITHUB_TOKEN}"
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, headers=headers, params=params)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            print(f"GitHub API Error: {e}")
            return None

# --- Trending Issues Endpoint ---
@router.get("/recommendations/trending")
async def get_trending_issues(language: str = "javascript"):
    """
    Returns trending issues based on comment count and recency.
    """
    # Dynamic Date: Get issues created in the last 90 days to ensure content is fresh
    three_months_ago = (datetime.now() - timedelta(days=90)).strftime('%Y-%m-%d')

    # Search for issues: open, not PRs, sorted by interactions, created recently
    query = f"is:issue is:open language:{language} sort:interactions-desc created:>{three_months_ago}"
    
    # RANDOMIZATION STRATEGY:
    # Instead of always fetching page 1, we randomly fetch page 1, 2, or 3.
    # We fetch 20 items per page. This gives us a rotating pool of the top trending issues.
    random_page = random.randint(1, 3)

    data = await fetch_github(f"{GITHUB_API_URL}/search/issues", {"q": query, "per_page": 20, "page": random_page})
    
    if not data:
        raise HTTPException(status_code=502, detail="Failed to fetch trending issues from GitHub")
    
    raw_items = data.get("items", [])

    # Double Randomization: Shuffle the items from the fetched page
    if raw_items:
        random.shuffle(raw_items)
        selected_items = raw_items[:8] # Return top 8 from the shuffled batch
    else:
        selected_items = []

    # Process and return simplified data
    issues = []
    for item in selected_items:
        issues.append({
            "id": item["id"],
            "title": item["title"],
            "url": item["html_url"],
            "repo": item["repository_url"].split("repos/")[-1],
            "comments": item["comments"],
            "reactions": item.get("reactions", {}).get("total_count", 0)
        })
    
    return {"source": "trending", "issues": issues}

# --- Social Recommendations Endpoint ---
@router.post("/recommendations/social")
async def get_social_recommendations(graph: SocialGraph):
    """
    Finds issues that the user's network (following) is interacting with.
    """
    recommended_issues = []
    
    # Limit to first 5 friends to avoid rate limits in this demo
    friends_to_check = graph.following[:5] 
    
    async with httpx.AsyncClient() as client:
        for friend in friends_to_check:
            # Fetch public events for this friend
            url = f"{GITHUB_API_URL}/users/{friend}/events/public"
            events = await fetch_github(url)
            
            if not events: continue

            for event in events:
                # Look for Issue interactions (opened, commented) or Pull Requests
                if event["type"] in ["IssuesEvent", "PullRequestEvent"]:
                    payload = event["payload"]
                    action = payload.get("action")
                    
                    if action in ["opened", "started"] and "issue" in payload:
                        issue = payload["issue"]
                        recommended_issues.append({
                            "friend": friend,
                            "interaction": event["type"],
                            "title": issue["title"],
                            "url": issue["html_url"],
                            "repo": event["repo"]["name"]
                        })

    return {
        "source": "social_graph", 
        "network_size": len(graph.following),
        "recommendations": recommended_issues
    }

# ---  Personal (Skill-based) Recommendations Endpoint ---
@router.post("/recommendations/personal")
async def get_personal_recommendations(profile: UserProfile):
    """
    Returns issues matching the user's specific skills.
    """
    # Construct a search query from skills
    # e.g., "language:python language:javascript label:good-first-issue"
    skill_query = " ".join([f"language:{skill}" for skill in profile.skills])
    query = f"is:issue is:open label:\"good first issue\" {skill_query} sort:updated-desc"
    
    data = await fetch_github(f"{GITHUB_API_URL}/search/issues", {"q": query, "per_page": 10})
    
    if not data:
        return {"issues": []}

    issues = [
        {
            "title": item["title"],
            "url": item["html_url"],
            "repo": item["repository_url"].split("repos/")[-1],
            "labels": [l["name"] for l in item["labels"]]
        }
        for item in data.get("items", [])
    ]
    
    return {"source": "personal_skills", "issues": issues}