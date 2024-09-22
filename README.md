# MpesaFlow Platform

MpesaFlow Platform is a comprehensive solution for managing M-Pesa transactions, providing real-time insights, and streamlining payment processes for businesses in Kenya. This monorepo contains all the necessary applications and packages to run the entire MpesaFlow ecosystem.

## Project Structure

This monorepo contains the following packages and applications:

- `apps/web`: Main customer-facing website
- `apps/dashboard`: Admin dashboard for managing transactions and analytics
- `apps/api`: Backend API service
- `packages/ui`: Shared UI components
- `packages/database`: Database schemas and utilities
- `packages/auth`: Authentication and authorization utilities
- `packages/analytics`: Analytics and tracking utilities

## Tech Stack

### Frontend
- Next.js 13 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui (UI component library)
- Lucide React (Icons)
- Recharts (Data visualization)
- PostHog (Analytics)

### Backend
- TypeScript
- Drizzle ORM (Database ORM)
- NeonDB (PostgreSQL database)
- Upstash Redis (Caching and rate limiting)
- Clerk (Authentication)
- Resend (Email service)

### DevOps & Tooling
- Turborepo (Monorepo management)
- Bun (JavaScript runtime and package manager)
- Biome (Linting and formatting)
- Jest (Testing)
- GitHub Actions (CI/CD)
- Vercel (Deployment)

### Other Services
- Trigger.dev (Background jobs and workflows)
- Stripe (Payment processing)

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- Bun package manager

### Installation

1. Clone the repository:
git clone [https://github.com/your-username/mpesaflow-platform.git](https://github.com/your-username/mpesaflow-platform.git)
cd mpesaflow-platform

2. Install dependencies:
    bun install


3. Set up environment variables:
Create a `.env` file in the root directory and add the necessary variables. Refer to `.env.example` for required variables.

4. Run the development servers:
   bun run dev

This will start all applications and watch for changes in packages.


## Package Details

- `@mpesaflow/ui`: Shared UI components using shadcn/ui and Tailwind CSS
- `@mpesaflow/database`: Database utilities integrated with Drizzle ORM
- `@mpesaflow/auth`: Authentication utilities integrated with Clerk
- `@mpesaflow/analytics`: Analytics integration with PostHog
- `@mpesaflow/kv`: Key-value store integration with Upstash Redis
- `@mpesaflow/email`: Email utilities integrated with Resend

## API Documentation

API documentation is available at `/api/docs` when running the API service locally.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.