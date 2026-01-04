from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import router as api_router

# Initialize the FastAPI app
app = FastAPI(
    title="OpenSourceMate AI Backend",
    description="AI-powered backend for trending issues, social matching, and personalized recommendations.",
    version="1.0.0"
)

# Configure CORS (Cross-Origin Resource Sharing)
# This allows the Next.js app (running on localhost:3000) to talk to this Python backend.
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://open-source-mate.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Include the routers (endpoints) from routers.py
app.include_router(api_router, prefix="/api")

@app.get("/")
async def root():
    """Health check endpoint."""
    return {"status": "ok", "message": "OpenSourceMate AI Service is running"}