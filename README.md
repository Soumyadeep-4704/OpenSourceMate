# OpenSourceMate 

### 🤖 Your AI-powered companion for navigating the open-source world.

[OpenSourceMate](https://open-source-mate.vercel.app) is a modern web application designed to help developers discover relevant open-source issues, track trending repositories, and find projects that match their skills and network. It combines a sleek Next.js frontend with a powerful Python (FastAPI) backend to deliver intelligent recommendations.


## 🎥 Demo

Check out the project in action!


▶️ [Click here below to watch the Demo Video](https://drive.google.com/file/d/1mm9S3e-1mr4l-WRBGTbLUCUcn3oShFlR/view?usp=drive_link)

<b> Note: </b> The demo video above was recorded using mock data to showcase the UI flow. The actual application code now pulls real-time data directly from the GitHub API based on the logged-in user's assignments. Additionally, Google authentication has been removed, and we have switched to GitHub authentication only.



## ✨ Features

<b>🚀 AI-Powered Recommendations: </b>  Identifies and highlights trending issues by analyzing user engagement and overall momentum.

<b> 🔐 Secure Authentication: </b> Log in seamlessly using your GitHub or Google account via NextAuth.js.

<b> 📊 Real-Time Dashboard: </b> View your latest assigned task and a snapshot of your recent issues directly from GitHub.

<b> 📈 Activity Charts: </b> Visual representation of your contribution activity over the last 7 days using Recharts.

<b> 🌓 Dark Mode: </b> Fully responsive light and dark themes that adapt to your system preferences or manual toggle.

<b> 🔍 Smart Search: </b> Quickly find issues by title or ID with an AI-powered suggestion interface.

<b> 📱 Responsive Design: </b> Built with Tailwind CSS to look great on desktop, tablet, and mobile.

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
