# 🚀 Peerly

> **Fast. Reliable. Verified.**

A peer-to-peer learning platform that enables students to teach and learn through short, real-time sessions using a time-based credit system.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)]()

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Development](#-development)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Core Functionality
- **Real-time Learning Sessions**: Connect with mentors for 15-30 minute micro-sessions
- **AI Skill Verification**: Become a verified mentor through adaptive quizzes
- **Time Banking System**: Earn and spend LearnCoins instead of traditional payments
- **Mobile-First Design**: Optimized for mobile learning experiences
- **Gamified Experience**: Badges, ratings, and leaderboards to encourage participation

### Key Components
- **Dashboard**: Central hub for learning and teaching activities
- **Mentor Matching**: Find available mentors based on topics and availability
- **Session Management**: Real-time video/audio sessions with timers
- **Wallet System**: Track LearnCoin balance and transaction history
- **Skill Verification**: AI-powered quiz system for mentor certification

## 🛠️ Tech Stack

### Frontend (React + Vite)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Real-time**: Socket.io Client
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form + Zod

### Backend (Java + Spring Boot)
- **Runtime**: Java 17
- **Framework**: Spring Boot 3.2
- **Database**: PostgreSQL
- **Caching**: Redis
- **Authentication**: JWT
- **API Documentation**: OpenAPI/Swagger
- **Real-time**: WebSocket

### Infrastructure
- **Monorepo**: Turbo
- **Package Manager**: npm workspaces
- **Containerization**: Docker & Docker Compose
- **Database**: PostgreSQL, Redis, MongoDB (optional)

## 🏗️ Project Structure

```
peerly/
├── apps/
│   ├── web/                 # React frontend
│   │   ├── src/
│   │   │   ├── components/  # Reusable components
│   │   │   ├── pages/       # Page components
│   │   │   ├── hooks/       # Custom hooks
│   │   │   ├── services/    # API services
│   │   │   └── utils/       # Utility functions
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   └── tsconfig.json
│   └── api/                 # Java Spring Boot backend
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/com/peerly/
│       │   │   │   ├── controller/    # REST controllers
│       │   │   │   ├── service/       # Business logic
│       │   │   │   ├── repository/    # Data access
│       │   │   │   ├── model/         # Entity models
│       │   │   │   ├── config/        # Configuration
│       │   │   │   └── security/      # Security config
│       │   │   └── resources/
│       │   └── test/
│       └── pom.xml
├── packages/
│   ├── shared/              # Shared types and utilities
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── ui/                  # UI component library
│       ├── src/
│       ├── package.json
│       └── tsconfig.json
├── package.json             # Root package.json
├── turbo.json              # Turbo configuration
├── docker-compose.yml      # Docker services
└── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- Java 17 or higher
- Maven 3.6 or higher
- Docker and Docker Compose
- PostgreSQL (or use Docker)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/peerly.git
   cd peerly
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install workspace dependencies
   npm run install:all
   ```

3. **Start infrastructure services**
   ```bash
   # Start PostgreSQL, Redis, and MongoDB
   npm run docker:up
   ```

4. **Set up environment variables**
   ```bash
   # Copy environment files
   cp apps/web/.env.example apps/web/.env.local
   cp apps/api/.env.example apps/api/.env.local
   ```

5. **Start development servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   ```

6. **Open your browser**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8080/api](http://localhost:8080/api)
   - API Docs: [http://localhost:8080/api/swagger-ui.html](http://localhost:8080/api/swagger-ui.html)

## 💻 Development

### Available Scripts

```bash
# Development
npm run dev              # Start all services in development mode
npm run dev:web          # Start only frontend
npm run dev:api          # Start only backend

# Building
npm run build            # Build all packages
npm run build:web        # Build frontend only
npm run build:api        # Build backend only

# Testing
npm run test             # Run all tests
npm run test:web         # Run frontend tests
npm run test:api         # Run backend tests

# Linting
npm run lint             # Lint all packages
npm run lint:web         # Lint frontend only
npm run lint:api         # Lint backend only

# Type checking
npm run type-check       # Type check all TypeScript packages

# Docker
npm run docker:up        # Start Docker services
npm run docker:down      # Stop Docker services
npm run docker:build     # Build Docker images
```

### Frontend Development

The frontend is built with React, Vite, and TypeScript. Key features:

- **Hot Module Replacement**: Instant updates during development
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **Component Library**: Reusable UI components in `packages/ui`

### Backend Development

The backend is built with Spring Boot and Java 17. Key features:

- **RESTful APIs**: Clean, RESTful endpoints
- **JPA/Hibernate**: Database ORM
- **JWT Authentication**: Secure token-based auth
- **WebSocket Support**: Real-time communication
- **OpenAPI**: Auto-generated API documentation

## 📚 API Documentation

### Authentication
All API endpoints require authentication via JWT tokens.

### Endpoints

#### Users
- `GET /api/users/profile` - Get user profile
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login

#### Sessions
- `GET /api/sessions` - Get user's sessions
- `POST /api/sessions` - Create new session
- `GET /api/sessions/{id}` - Get specific session
- `PUT /api/sessions/{id}` - Update session

#### Mentors
- `GET /api/mentors` - Get available mentors
- `GET /api/mentors/{id}` - Get mentor profile
- `POST /api/mentors/verify` - Verify mentor skills
- `PUT /api/mentors/{id}/availability` - Update availability

### API Documentation
Visit [http://localhost:8080/api/swagger-ui.html](http://localhost:8080/api/swagger-ui.html) for interactive API documentation.

## 🧪 Testing

```bash
# Frontend tests
npm run test:web

# Backend tests
npm run test:api

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e
```

## 🚀 Deployment

### Production Build
```bash
# Build all packages
npm run build

# Start production servers
npm run start
```

### Docker Deployment
```bash
# Build and run with Docker
npm run docker:build
npm run docker:up
```

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📞 Support

- **Documentation**: [docs.peerly.com](https://docs.peerly.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/peerly/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/peerly/discussions)
- **Email**: support@peerly.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all contributors and mentors
- Built with ❤️ for the learning community
- Inspired by peer learning principles

---

**Note**: This is an MVP version. We're actively working on new features and improvements. Stay tuned for updates!