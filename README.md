# 🚀 Peerly

> **Fast. Reliable. Verified.**

A peer-to-peer learning platform that enables students to teach and learn through short, real-time sessions using a time-based credit system.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)]()

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
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

### Frontend
- **Framework**: [React/Next.js/Vue.js - specify]
- **Styling**: [Tailwind CSS/Styled Components - specify]
- **State Management**: [Redux/Zustand/Context - specify]
- **Real-time**: [Socket.io/WebRTC - specify]

### Backend
- **Runtime**: [Node.js/Python/Go - specify]
- **Framework**: [Express/FastAPI/Gin - specify]
- **Database**: [PostgreSQL/MongoDB - specify]
- **Authentication**: [JWT/OAuth - specify]

### Infrastructure
- **Hosting**: [Vercel/AWS/Heroku - specify]
- **Database**: [Supabase/MongoDB Atlas - specify]
- **Real-time**: [Socket.io/Pusher - specify]

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- [Any other requirements]

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/peerly.git
   cd peerly
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL=your_database_url

# Authentication
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

# Real-time
SOCKET_URL=your_socket_url

# AI Services
OPENAI_API_KEY=your_openai_key
```

## 📖 Usage

### For Students

1. **Start Learning**
   - Click "Learn Now" on the dashboard
   - Select your topic of interest
   - Browse available mentors
   - Book a 15-30 minute session

2. **Earn LearnCoins**
   - Complete learning sessions
   - Refer friends to the platform
   - Participate in community activities

### For Mentors

1. **Become a Mentor**
   - Navigate to "Become a Mentor"
   - Select your expertise area
   - Complete the AI skill verification quiz
   - Record a 30-second introduction video

2. **Start Teaching**
   - Toggle your availability status
   - Accept session requests
   - Conduct real-time learning sessions
   - Earn LearnCoins for your time

### API Examples

```javascript
// Start a learning session
const session = await fetch('/api/sessions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    topic: 'JavaScript',
    duration: 30,
    mentorId: 'mentor_123'
  })
});

// Get available mentors
const mentors = await fetch('/api/mentors?topic=JavaScript&available=true');
```

## 📚 API Documentation

### Authentication
All API endpoints require authentication via JWT tokens.

### Endpoints

#### Sessions
- `POST /api/sessions` - Create a new learning session
- `GET /api/sessions` - Get user's session history
- `PUT /api/sessions/:id` - Update session status

#### Mentors
- `GET /api/mentors` - Get available mentors
- `POST /api/mentors/verify` - Submit skill verification
- `GET /api/mentors/:id` - Get mentor profile

#### Wallet
- `GET /api/wallet` - Get LearnCoin balance
- `GET /api/wallet/transactions` - Get transaction history

[Full API documentation available here](docs/api.md)

## 🏗️ Project Structure

```
peerly/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Next.js pages
│   ├── api/           # API routes
│   ├── lib/           # Utility functions
│   ├── styles/        # CSS/styling files
│   └── types/         # TypeScript definitions
├── public/            # Static assets
├── docs/              # Documentation
├── tests/             # Test files
└── package.json
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e
```

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Setup
1. Set up your production database
2. Configure environment variables
3. Set up SSL certificates
4. Configure your domain

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