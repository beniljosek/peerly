#!/bin/bash

# Peerly Monorepo Setup Script
echo "🚀 Setting up Peerly Monorepo..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install Java 17 or higher."
    exit 1
fi

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven is not installed. Please install Maven 3.6 or higher."
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker and Docker Compose."
    exit 1
fi

echo "✅ Prerequisites check passed!"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install workspace dependencies
echo "📦 Installing workspace dependencies..."
npm run install:all

# Start Docker services
echo "🐳 Starting Docker services..."
npm run docker:up

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Create environment files if they don't exist
if [ ! -f "apps/web/.env.local" ]; then
    echo "📝 Creating frontend environment file..."
    cp apps/web/.env.example apps/web/.env.local 2>/dev/null || echo "# Frontend environment variables" > apps/web/.env.local
fi

if [ ! -f "apps/api/.env.local" ]; then
    echo "📝 Creating backend environment file..."
    cp apps/api/.env.example apps/api/.env.local 2>/dev/null || echo "# Backend environment variables" > apps/api/.env.local
fi

echo "✅ Setup complete!"
echo ""
echo "🎉 You can now start development:"
echo "   npm run dev"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8080/api"
echo "📚 API Docs: http://localhost:8080/api/swagger-ui.html"
echo ""
echo "🛠️  Available commands:"
echo "   npm run dev          # Start all services"
echo "   npm run dev:web      # Start frontend only"
echo "   npm run dev:api      # Start backend only"
echo "   npm run build        # Build all packages"
echo "   npm run test         # Run all tests"
echo "   npm run docker:down  # Stop Docker services" 