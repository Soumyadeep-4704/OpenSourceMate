# OpenSourceMate 

### 🤖 Your Intelligent Companion for the Open Source Ecosystem.

[OpenSourceMate](https://open-source-mate.vercel.app) is a modern, full-stack web application designed to bridge the gap between developers and open-source opportunities. It solves the problem of "analysis paralysis" by intelligently curating GitHub issues, analyzing trends, and leveraging your social graph to recommend projects that actually matter to you.

Whether you are a first-time contributor looking for "good first issues" or a seasoned developer tracking the pulse of the community, OpenSourceMate provides a streamlined, data-driven dashboard to manage your open-source journey.

## 🚀 Why OpenSourceMate?
Navigating GitHub can be overwhelming. With millions of repositories, finding the right place to contribute often feels like finding a needle in a haystack. OpenSourceMate acts as an abstraction layer over the GitHub API, utilizing a FastAPI backend to filter signal from noise.

It doesn't just list issues; it contextualizes them by:

Analyzing Momentum: identifying issues in repositories that have high recent engagement.

Leveraging Network Effects: showing you what the developers you follow are working on.

Visualizing Impact: tracking your personal contribution history with interactive charts.


## 🎥 Demo

Check out the project in action!


▶️ [Click here below to watch the Demo Video](https://drive.google.com/file/d/1mm9S3e-1mr4l-WRBGTbLUCUcn3oShFlR/view?usp=drive_link)

<b> Note: </b> The demo video above was recorded using mock data to showcase the UI flow. The actual application code now pulls real-time data directly from the GitHub API based on the logged-in user's assignments. Additionally, Google authentication has been removed, and we have switched to GitHub authentication only.



## ✨ Key Features & Technical Highlights

### 🧠 Intelligent Recommendation Engine
Powered by a Python backend (ai_modules), the application uses smart heuristics to curate content:

<b> Trending Issues: </b> dynamic algorithms fetch issues from the last 90 days that are generating high interaction (comments and reactions), ensuring you only see active projects.

<b> Social Graph Matching: </b> connects to your GitHub network to analyze the activity of users you follow, surfacing issues they have opened or interacted with.

<b> Skill-Based Discovery: </b> parses your user profile to match specific programming languages (e.g., Python, JavaScript) with relevant "good first issues".

### 📊 Real-Time Analytics Dashboard
Built with Next.js 14 and Recharts, the frontend provides an immersive experience:

<b> Activity Visualization: </b> interactive charts display your contribution frequency over the last 7 days.

<b> Live Assignments: </b> view your currently assigned tasks and recent issue history directly from the dashboard.

<b> Smart Search: </b> an AI-assisted search interface allows for rapid querying of issues by title or ID.

### 🛡️ Modern Architecture & Security
<b> Secure Authentication: </b> seamless integration with NextAuth.js using GitHub OAuth to ensure secure and persistent user sessions.

<b> Responsive UI: </b> a fully responsive design crafted with Tailwind CSS, featuring automatic light/dark mode adaptation based on system preferences.

<b> High Performance: </b> utilizes Next.js App Router for server-side rendering and httpx for asynchronous non-blocking API calls in the backend.

## 🛠️ Tech Stack

### Frontend (`frontend_modules`)

<b> Framework: </b> Next.js 14+ (App Router)

<b> Styling: </b> Tailwind CSS

<b> Authentication: </b> NextAuth.js

<b> Charts: </b> Recharts

<b> Icons: </b> Custom SVGs & Heroicons

### Backend (`ai_modules`)

<b> Framework </b>: FastAPI (Python)

<b> Data Processing </b>: Pandas / NumPy (planned for advanced analytics)

<b> API Client </b>: HTTPX (Async GitHub API requests)

### Deployment

<b> Frontend: </b> Vercel

<b> Backend: </b> Render


## 🚀 Getting Started

<b> Follow these steps to run the project locally. </b>

### Prerequisites

Node.js 18+ installed

Python (v3.10+)

A GitHub Account (to generate tokens)

## Installation

### Clone the repository:

```
git clone
cd opensourcemate
```
## 1. Frontend Setup (Next.js)

### Navigate to the Frontend directory:

```
cd frontend_modules
```

### Install dependencies:

```
npm install
```

### Set up Environment Variables:
Create a .env.local file inside the frontend_modules/ and add the following keys:

```
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_super_secret_random_string

# GitHub Provider
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
```

### Run the development server:

```
npm run dev
```

The frontend is now running at http://localhost:3000

# 2. Backend Setup (Python)

### Navigate to the AI directory and set up the environment:

```
cd ai_modules

### Create a virtual environment
python -m venv venv

### Activate it
### Windows:
venv\Scripts\activate
### Mac/Linux:
source venv/bin/activate
```

### Install dependencies

```
pip install -r requirements.txt
```

### Configuration:
Create a .env file inside ai_modules/ and add the following:

```
# GitHub Personal Access Token (Classic) with 'public_repo' scope
GITHUB_TOKEN=your_github_pat_here
```

### Run the Server:

```
uvicorn app.main:app --reload --port 8000
```

The backend is now running at http://localhost:8000

## 📂 File Structure
```
OpenSourceMate/
├── .gitignore
├── CONTRIBUTION.md
├── LICENSE
├── README.md
├── ai_modules/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   └── routers.py
│   └── requirements.txt
└── frontend_modules/
    ├── app/
    │   ├── account-settings/
    │   │   └── page.js
    │   ├── api/
    │   │   └── auth/
    │   │       └── [...nextauth]/
    │   │           └── route.js
    │   ├── components/
    │   │   ├── AuthProvider.js
    │   │   ├── DashChart.js
    │   │   ├── Footer.js
    │   │   ├── Hero.js
    │   │   ├── IssueCard.js
    │   │   ├── IssueDashboard.js
    │   │   ├── Navbar.js
    │   │   └── Navbar.module.css
    │   ├── issue/
    │   │   └── [id]/
    │   │       └── page.js
    │   ├── profile/
    │   │   └── page.js
    │   ├── search/
    │   │   └── page.js
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.js
    │   └── page.js
    ├── public/
    │   ├── api.svg
    │   ├── darkSearch.svg
    │   └── search.svg
    ├── eslint.config.mjs
    ├── jsconfig.json
    ├── next.config.mjs
    ├── package-lock.json
    ├── package.json
    └── postcss.config.mjs              
```

## 🤝 Contributing

Contributions are welcome! Please [click here](CONTRIBUTION.md) for more details.


## 📄 License

This project is open source and available under the MIT License.
