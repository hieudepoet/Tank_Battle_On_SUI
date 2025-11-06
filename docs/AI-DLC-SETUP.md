# AI-Driven Lifecycle (AI-DLC) Setup Guide

## 🚀 Quick Start

1. **Initialize Repository**
   ```bash
   git init
   git remote add origin <your-repo-url>
   npm run install:all
   ```

2. **Create Development Branches**
   ```bash
   git checkout -b dev/frontend
   git checkout -b dev/backend
   git checkout main
   ```

3. **Enable Branch Protection**
   - Go to GitHub Settings > Branches
   - Add protection rules for `main` branch
   - Require PR reviews and status checks

## 🤖 AI Agent Configuration

Each AI agent automatically triggers on specific file patterns:

- **MoveArchitect**: `move_contracts/**/*.move`, `Move.toml`
- **UIBuilder**: `frontend/src/**/*.tsx`, `frontend/src/**/*.jsx`
- **WalletConnectBot**: `**/wallet/**`, `**/auth/**`
- **QA-Tester**: `**/*.test.*`, `**/tests/**`
- **SDKIntegrator**: `scripts/**/*.js`, `backend/**/*.ts`
- **CI/CD-Manager**: `.github/workflows/**`, `deploy/**`

## 📋 Development Workflow

### Frontend Developer (dev/frontend branch)
1. Work on React components and Phaser game
2. AI agents (UIBuilder, WalletConnectBot) provide real-time assistance
3. Push changes trigger automated review and testing
4. Merge to main after AI approval

### Backend Developer (dev/backend branch)
1. Develop Move contracts and SDK scripts
2. AI agents (MoveArchitect, SDKIntegrator) ensure security and performance
3. Automated testing and deployment to Sui Testnet
4. Merge to main after security audit

## 🔄 CI/CD Pipeline

- **Frontend**: Build → Test → Deploy to AWS Amplify
- **Backend**: Security Audit → Move Tests → Deploy to Sui Testnet
- **Monitoring**: Real-time deployment status and rollback capability

## 📊 Task Management

Access AI-coordinated task board: `.amazonq/task-board.json`
- Separate queues for frontend and backend developers
- AI agents automatically assign and prioritize tasks
- Real-time progress tracking and bottleneck detection