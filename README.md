# PratyushLMS

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/Prisma-PostgreSQL-2D3748?logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe&logoColor=white" alt="Stripe" />
  <img src="https://img.shields.io/badge/AWS-S3-FF9900?logo=amazonaws&logoColor=white" alt="AWS S3" />
</p>

<p align="center">
  <strong>A modern learning management system built with Next.js, Prisma, Better Auth, Stripe, and AWS S3.</strong>
</p>

<p align="center">
  <a href="#features">Features</a> ·
  <a href="#tech-stack">Tech Stack</a> ·
  <a href="#project-structure">Project Structure</a> ·
  <a href="#getting-started">Getting Started</a> ·
  <a href="#environment-variables">Environment Variables</a>
</p>

---

## Overview

PratyushLMS is a full-stack LMS platform for creating, publishing, and selling online courses. It includes student enrollment flows, course progress tracking, admin publishing tools, secure authentication, payments, email verification, and media uploads for course assets.

This project is designed for educators, creators, and organizations that want a polished course experience with a modern dashboard and scalable architecture.

## Features

- User authentication with GitHub OAuth and email OTP verification
- Role-based access for students and administrators
- Course catalog with public course browsing
- Course creation and publishing workflow for admins
- Lesson and chapter management
- Enrollment and payment flow using Stripe
- Course progress tracking per lesson
- S3-compatible media uploads for thumbnails and lessons
- Dashboard views for enrolled and available courses
- Admin analytics and recent course summaries
- Dark/light UI styling with Tailwind and shadcn-style components
- Arcjet-based request protection and abuse prevention
- Prisma-powered database models for users, courses, lessons, and enrollments

## Tech Stack

- Next.js 16 + React 19
- TypeScript
- Prisma ORM + PostgreSQL
- Better Auth
- Stripe for payments
- AWS S3 for file storage
- Resend for email delivery
- Tailwind CSS
- shadcn/ui-inspired component system
- Arcjet for bot and abuse protection

## Project Structure

```bash
lms-platform-project/
├── app/
│   ├── admin/
│   ├── api/
│   ├── auth/
│   ├── dashboard/
│   ├── payment/
│   ├── public/
│   ├── data/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── file-uploader/
│   ├── general/
│   ├── rich-text-editor/
│   ├── sidebar/
│   └── ui/
├── hooks/
├── lib/
│   ├── auth.ts
│   ├── auth-client.ts
│   ├── db.ts
│   ├── env.ts
│   ├── resend.ts
│   ├── S3Client.ts
│   ├── stripe.ts
│   ├── types.ts
│   ├── utils.ts
│   └── zodSchemas.ts
├── prisma/
│   └── schema.prisma
├── public/
├── .env
├── components.json
├── eslint.config.mjs
├── middleware.ts
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── prisma.config.ts
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

Before running the project locally, make sure you have:

- Node.js 20+
- pnpm
- PostgreSQL database
- AWS S3-compatible storage
- Stripe account
- Resend account
- GitHub OAuth app credentials

### Install dependencies

```bash
pnpm install
```

### Database setup

Generate the Prisma client and sync the schema with your database:

```bash
pnpm prisma generate
pnpm prisma db push
```

If you want a fresh local database reset during development, you can also use Prisma migration workflows as needed.

### Run the app

```bash
pnpm dev
```

Then open:

```bash
http://localhost:3000
```

## Environment Variables

Create a local environment file such as `.env` or `.env.local` and add the following variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/lms"
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

AUTH_GITHUB_CLIENT_ID="your-github-client-id"
AUTH_GITHUB_CLIENT_SECRET="your-github-client-secret"

RESEND_API_KEY="your-resend-api-key"
ARCJET_KEY="your-arcjet-key"

AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_ENDPOINT_URL_S3="https://your-s3-endpoint"
AWS_ENDPOINT_URL_IAM="https://your-iam-endpoint"
AWS_REGION="your-aws-region"

STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"

NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES="your-bucket-name"
```

> The app validates these values at runtime using `zod`, so missing or invalid configuration will fail fast during startup.

## Available Scripts

```bash
pnpm dev       # start next dev server
pnpm build     # production build
pnpm start     # run production server
pnpm lint      # run eslint checks
pnpm prepare   # generate Prisma client
```

## Key Product Flows

### Student Flow

1. Sign in with GitHub or email OTP
2. Browse available courses
3. Purchase a course via Stripe checkout
4. Access the course dashboard
5. Track lesson progress

### Admin Flow

1. Sign in as an admin user
2. Create or publish courses
3. Add chapters and lessons
4. Upload lesson media or thumbnails
5. Monitor enrollment and course activity

## Admin and Content Features

The platform includes an admin area for:

- managing course listings
- viewing recent activity
- tracking enrollment statistics
- creating course content
- controlling published/unpublished states

## Deployment Notes

This project is structured for deployment on a modern Next.js hosting platform. For production, you should:

- configure a managed PostgreSQL database
- set up secure environment variables
- use a production-grade S3-compatible object storage bucket
- configure Stripe webhooks
- run Prisma migrations in production
- enable secure HTTPS for auth callbacks and webhook endpoints

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## License

This project is currently unlicensed unless a license file is added by the repository owner.

## Acknowledgements

- Next.js
- Prisma
- Better Auth
- Stripe
- Tailwind CSS
- AWS SDK
- shadcn/ui ecosystem

---

Built with care for modern online learning experiences.
