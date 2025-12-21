# OpenSourceMate

[OpenSourceMate](https://open-source-mate.vercel.app/) is a modern, developer-friendly dashboard designed to streamline your open-source workflow. It connects directly to your GitHub account to visualize your assigned issues, track your contribution activity, and manage your tasks efficiently.

## 🎥 Demo

Check out the project in action!


▶️ [Click here below to watch the Demo Video](https://drive.google.com/drive/folders/1jDOZ0_3HMjWvFJC8YHdW4qlv5Yi_OMx4?usp=sharing)

<b> Note: </b> The demo video above was recorded using mock data to showcase the UI flow. The actual application code now pulls real-time data directly from the GitHub API based on the logged-in user's assignments. Additionally, Google authentication has been removed, and we have switched to GitHub authentication only.

## 📚 Documentation

We have detailed documentation available on Notion covering the architecture, component breakdown, and setup guide.

📘 [Read the full Notion Documentation](https://mint-sunset-29e.notion.site/OpenSourceMate-2a539a01c1478089a599c1f8ec3bc1e5?source=copy_link)


## ✨ Features

<b> 🔐 Secure Authentication: </b> Log in seamlessly using your GitHub or Google account via NextAuth.js.

<b> 📊 Real-Time Dashboard: </b> View your latest assigned task and a snapshot of your recent issues directly from GitHub.

<b> 📈 Activity Charts: </b> Visual representation of your contribution activity over the last 7 days using Recharts.

<b> 🌓 Dark Mode: </b> Fully responsive light and dark themes that adapt to your system preferences or manual toggle.

<b> 🔍 Smart Search: </b> Quickly find issues by title or ID with an AI-powered suggestion interface.

<b> 📱 Responsive Design: </b> Built with Tailwind CSS to look great on desktop, tablet, and mobile.

## 🛠️ Tech Stack

<b> Framework: </b> Next.js 14+ (App Router)

<b> Styling: </b> Tailwind CSS

<b> Authentication: </b> NextAuth.js

<b> Charts: </b> Recharts

<b> Icons: </b> Custom SVGs & Heroicons

## 🚀 Getting Started

<b> Follow these steps to run the project locally. </b>

### Prerequisites

Node.js 18+ installed

A GitHub OAuth App (for GitHub Auth)

## Installation

### Clone the repository:

```
git clone
cd opensourcemate
```

### Install dependencies:

```
npm install
```


### Set up Environment Variables:
Create a .env.local file in the root directory and add the following keys:

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

Open http://localhost:3000 with your browser to see the result.

## 📂 File Structure
```
opensourcemate/
├── app/
│   ├── account-settings/
│   │   └── page.js            # Settings page
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.js   # NextAuth handler
│   ├── components/
│   │   ├── AuthProvider.js    # Auth & Theme context
│   │   ├── DashChart.js       # Activity chart
│   │   ├── Hero.js            # Login/Welcome screen
│   │   ├── IssueCard.js       # Issue display component
│   │   ├── IssueDashboard.js  # Main dashboard logic
│   │   └── Navbar.js          # Top navigation bar
│   ├── issue/
│   │   └── [id]/
│   │       └── page.js        # Issue details page
│   ├── profile/
│   │   └── page.js            # User profile page
│   ├── search/
│   │   └── page.js            # Search results page
│   ├── favicon.ico
│   ├── globals.css            # Global styles
│   ├── layout.js              # Root layout
│   └── page.js                # Home page
├── public/
│   ├── api.svg                # Logo
│   └── search.svg             # Search icon
├── .env.local                 # Env variables (GitIgnored)
├── .gitignore
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.mjs
└── README.md
└── CONTRIBUTION.md
└── LICENSE                
```

## 🤝 Contributing

Contributions are welcome! Please [click here](CONTRIBUTION.md) for more details.


## 📄 License

This project is open source and available under the MIT License.
