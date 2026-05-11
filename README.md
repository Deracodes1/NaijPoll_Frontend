# NaijPoll — Frontend

Angular frontend for the NaijPoll Nigerian voting platform.

**Live Demo:** [https://your-netlify-url.netlify.app](https://your-netlify-url.netlify.app)

---

## Tech Stack

- **Framework:** Angular 19+ (Standalone Components)
- **Language:** TypeScript 5.x
- **Styling:** CSS3 with custom responsive design
- **State:** Angular Signals
- **Forms:** Reactive Forms
- **Routing:** Angular Router with lazy loading

---

## Prerequisites

- Node.js v20+
- npm v10+
- Backend API running (see [NaijPoll API](https://github.com/your-username/naijpoll-api))

---

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
ng serve

# Build for production
ng build --configuration production
```

## Project Structure

src/
├── components/ # Reusable UI (button, input, alert, pollcard)
├── pages/ # Route-level pages
│ ├── home/ # Public poll listing
│ ├── login/ # Authentication
│ ├── register/ # Account creation
│ ├── profile/ # User profile
│ ├── poll-detail/ # Voting page
│ ├── results/ # Results with state filter
│ └── admin/ # Admin dashboard
│ ├── admin-layout/ # Sidebar shell
│ ├── create-poll/ # Create poll form
│ ├── poll-list/ # Admin poll listing
│ └── poll-detail/ # Poll management
├── services/ # API & business logic
├── guards/ # Route protection
├── types/ # TypeScript interfaces
└── data/ # Static data (Nigerian states)

## Features

Public
Browse polls with status filtering
Cast votes (authenticated users)
View results with state-based breakdown
Admin Dashboard
Create polls with 2–4 options
Manage poll status (draft → active → closed)
Delete polls
Responsive sidebar navigation

## Environment Setup

FOR LOCAL ENVIRONMENT

Create src/environments/environment.ts
export const environment = {
production: false,
apiUrl: 'http://localhost:3000/api/v1',
};

FOR LIVE
Create src/environments/environment.prod.ts
export const environment = {
production: true,
apiUrl: 'http://localhost:3000/api/v1',
};
