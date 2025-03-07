# AdCampaign Management Web Application

This project is a full-stack web application for managing advertising campaigns. It includes a React-based frontend and an Express-based backend, with CI/CD pipelines set up for automated deployment to Railway (backend) and Vercel (frontend).

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Linting and Formatting](#linting-and-formatting)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)

## Getting Started

Follow these instructions to set up and run the application locally.

## Prerequisites

- Node.js (v18 or later)
- npm or yarn

## Installation

1. Clone the repository:

```bash
   git clone https://github.com/MelnykPavel/adCampaign.git
   cd adCampaign
```

2. Install dependencies for both the backend and frontend:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../client
npm install
```

## Running the Application

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd ../client
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:5000`.

## Linting and Formatting

### Lint

```bash
# Backend
npm run lint

# Frontend
npm run lint
```

### Format Code

```bash
# Backend
npm run format

# Frontend
npm run format
```

## Environment Variables

Create a `.env` file in the root of the backend directory and configure the following variables:

```env
# Backend Environment Variables
PORT=5000
DATABASE_URL=var/database.db
ALLOWED_ORIGINS="http://localhost:5173,"
```

For the frontend, create a `.env.development` and `.env.production` file in the root of the `client` directory:

```env
VITE_APP_BACKEND_SERVER=http://localhost:5000
```

## Deployment

The CI/CD pipeline is configured via GitHub Actions for automated deployment.

- Backend: Deployed to Railway
- Frontend: Deployed to Vercel

### Manual Deployment

#### Backend

```bash
cd backend
curl -fsSL https://railway.app/install.sh | sh
railway up --service backend
```

#### Frontend

```bash
cd ../client
npm install -g vercel
vercel --prod
```

## Technologies Used

### Frontend

- React 19
- MUI (Material-UI)
- React Router
- React Toastify
- ESLint
- Vite

### Backend

- Node.js
- Express.js
- SQLite3
- CORS
- Helmet
- Express Rate Limit
- TypeScript

### CI/CD

- GitHub Actions
- Railway
- Vercel

---

### Author

[Melnyk Pavel](https://github.com/MelnykPavel)

### License

This project is licensed under the MIT License.
