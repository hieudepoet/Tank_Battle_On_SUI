# AI-DLC Workflow Rules

## Code Review Standards
- All code must pass AI agent review before merge
- Minimum 2 AI agent approvals required
- Security-critical code requires MoveArchitect approval
- Frontend changes require UIBuilder + QA-Tester approval

## Branch Protection
- `main`: Protected, requires PR + AI review
- `dev/frontend`: Frontend developer branch
- `dev/backend`: Backend developer branch

## AI Agent Responsibilities
- **MoveArchitect**: Security audits, gas optimization, Move best practices
- **SDKIntegrator**: API design, error handling, performance
- **UIBuilder**: Component architecture, accessibility, performance
- **WalletConnectBot**: Security, UX flow, transaction safety
- **QA-Tester**: Test coverage, edge cases, automation
- **CI/CD-Manager**: Pipeline efficiency, deployment safety

## Deployment Rules
- Testnet deployment: Automatic on main branch merge
- Production deployment: Manual approval required
- Rollback capability: Always enabled
- Health checks: Required for all deployments

## Real-time AI Assistance
- Inline code suggestions enabled
- Auto-documentation generation
- Performance optimization hints
- Security vulnerability detection