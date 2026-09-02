
## 🎓 PratyushLMS. 
A modern, full-stack Learning Management System (LMS) for creating, managing, and learning from online courses. Built with Next.js, TypeScript, PostgreSQL, Better Auth, Stripe, AWS S3, and Arcjet.

<p align="center">
  <img src="docs/homepage.png" alt="PratyushLMS Homepage" width="100%" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-PostgreSQL-2D3748?logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe&logoColor=white" alt="Stripe" />
  <img src="https://img.shields.io/badge/AWS-S3-FF9900?logo=amazonaws&logoColor=white" alt="AWS S3" />
</p>

<p align="center">
  <strong>A modern, full-stack Learning Management System built for online education.</strong>
</p>

<p align="center">
  Create courses • Publish lessons • Manage students • Process payments • Track learning progress
</p>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-features">Features</a> •
  <a href="#-demo">Demo</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-deployment">Deployment</a>
</p>

---

## 🚀 Overview

**PratyushLMS** is a full-stack Learning Management System designed to provide a modern platform for creating, publishing, purchasing, and consuming online courses.

The platform provides separate experiences for **students and administrators**, with secure authentication, course management, lesson organization, payment processing, progress tracking, media storage, and administrative analytics.

It combines a modern Next.js application with a PostgreSQL database, Prisma ORM, Better Auth, Stripe, AWS S3, Resend, and Arcjet.

### 🎯 What PratyushLMS provides

- 📚 Course discovery and browsing
- 🔐 Secure authentication
- 👤 Student and administrator roles
- 🛠️ Complete course management
- 📖 Chapter and lesson organization
- 💳 Course purchasing with Stripe
- 📊 Student progress tracking
- ☁️ S3-based media storage
- 📧 Email OTP verification
- 🛡️ Bot and abuse protection
- 📈 Admin dashboard and analytics
- 🌙 Modern responsive UI with dark/light mode

---

## 🎬 Life

<p align="center">
  <img src="docs/life.png" alt="PratyushLMS. Life" width="100%" />
</p>

> Replace `docs/life.png` with your actual screen-recording GIF.

---

## ✨ Features

### 🔐 Authentication

- GitHub OAuth authentication
- Email OTP verification
- Secure session management using Better Auth
- Protected admin routes
- Role-based access control

### 📚 Course Management

Administrators can:

- Create new courses
- Edit existing courses
- Publish and unpublish courses
- Organize content into chapters
- Add and manage lessons
- Upload course thumbnails
- Upload lesson media
- Configure course pricing
- Set course difficulty levels
- Manage course categories

### 🎓 Student Experience

Students can:

- Browse available courses
- View course details
- Purchase courses
- Access enrolled courses
- Navigate through chapters and lessons
- Track completed lessons
- Monitor their learning progress
- Continue learning from their dashboard

### 💳 Payments

- Stripe-powered checkout
- Course purchase flow
- Payment success and cancellation pages
- Stripe webhook handling
- Enrollment creation after successful payment

### ☁️ File Storage

AWS S3-compatible storage is used for:

- Course thumbnails
- Lesson media
- Uploaded educational content

The application includes dedicated upload and delete API routes for managing stored files.

### 📊 Admin Dashboard

Administrators can:

- View course statistics
- Monitor enrollment activity
- Manage course content
- View recent activity
- Control course publishing status

### 🛡️ Security

The application uses **Arcjet** for:

- Bot detection
- Request protection
- Abuse prevention
- Allowlisting trusted bot categories such as search engines, monitoring services, previews, and Stripe webhooks

---

# 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | Full-stack React framework |
| **React 19** | User interface |
| **TypeScript** | Type-safe development |
| **Prisma** | Database ORM |
| **PostgreSQL** | Relational database |
| **Better Auth** | Authentication and sessions |
| **Stripe** | Payments and checkout |
| **AWS S3** | File and media storage |
| **Resend** | Email delivery |
| **Arcjet** | Bot detection and request protection |
| **Tailwind CSS** | Styling |
| **shadcn/ui** | UI components |
| **Zod** | Schema validation |
| **pnpm** | Package management |

---

# 🏗️ Architecture

```text
                         ┌─────────────────────┐
                         │      Browser        │
                         │   Student / Admin   │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      Next.js 16     │
                         │   App Router        │
                         └──────────┬──────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
       ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
       │ Better Auth │      │   Prisma    │      │   Arcjet    │
       │    Auth     │      │     ORM     │      │   Security  │
       └─────────────┘      └──────┬──────┘      └─────────────┘
                                   │
                                   ▼
                           ┌───────────────┐
                           │  PostgreSQL   │
                           │    Database   │
                           └───────────────┘

              ┌─────────────────────┬─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
       ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
       │   Stripe    │      │   AWS S3    │      │   Resend    │
       │  Payments   │      │   Storage   │      │    Email    │
       └─────────────┘      └─────────────┘      └─────────────┘
```

---

# 📁 Project Structure

```text
lms-platform-project/
│
├── app/
│   ├── admin/
│   │   └── courses/
│   │       ├── [courseId]/
│   │       └── create/
│   │
│   ├── api/
│   │   ├── auth/
│   │   ├── payments/
│   │   ├── s3/
│   │   └── webhooks/
│   │
│   ├── courses/
│   │   └── [slug]/
│   │
│   ├── dashboard/
│   │   ├── [slug]/
│   │   └── [slug]/[lessonId]/
│   │
│   ├── login/
│   │
│   ├── payment/
│   │   ├── cancel/
│   │   └── success/
│   │
│   ├── not-admin/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── file-uploader/
│   ├── general/
│   ├── rich-text-editor/
│   ├── sidebar/
│   └── ui/
│
├── hooks/
│
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
│
├── prisma/
│   └── schema.prisma
│
├── public/
│
├── docs/
│   ├── homepage.png
│   └── life.png
│
├── proxy.ts
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── prisma.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

# 🔄 Key Product Flows

## 👨‍🎓 Student Flow

```text
Sign In
   │
   ▼
Browse Courses
   │
   ▼
View Course
   │
   ▼
Stripe Checkout
   │
   ▼
Successful Payment
   │
   ▼
Course Enrollment
   │
   ▼
Student Dashboard
   │
   ▼
Learn Lessons
   │
   ▼
Track Progress
```

### Student journey

1. Sign in using GitHub or email OTP
2. Browse available courses
3. Open a course details page
4. Purchase the course using Stripe
5. Get enrolled after successful payment
6. Access the course dashboard
7. Navigate through chapters and lessons
8. Track learning progress

---

## 👨‍💼 Admin Flow

```text
Admin Login
     │
     ▼
Admin Dashboard
     │
     ├───────────────┐
     ▼               ▼
Create Course    Manage Courses
     │               │
     ▼               ▼
Add Chapters    Edit / Publish
     │               │
     ▼               ▼
Add Lessons     Monitor Activity
     │
     ▼
Upload Media
```

### Admin capabilities

1. Authenticate as an administrator
2. Access the admin dashboard
3. Create courses
4. Configure course information
5. Add chapters
6. Add lessons
7. Upload course and lesson media
8. Publish or archive courses
9. Monitor course and enrollment activity

---

## 🗄️ Database

PratyushLMS uses **PostgreSQL** with **Prisma ORM**.

The database manages application data such as:

- Users
- Authentication accounts
- Sessions
- Courses
- Chapters
- Lessons
- Enrollments
- Course progress
- Payments
- Related application entities

The Prisma schema is located at:

```text
prisma/schema.prisma
```

---

## 🔐 Environment Variables

Create a `.env` or `.env.local` file in the project root.

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

> ⚠️ Never commit `.env` or `.env.local` files containing real credentials to GitHub.

The application validates environment variables using **Zod** to catch missing or invalid configuration early.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/nayan777pratyush/PratyushLMS.git
```

```bash
cd PratyushLMS
```

---

### 2. Install dependencies

```bash
pnpm install
```

---

### 3. Configure environment variables

Create:

```text
.env
```

and add the required environment variables.

---

### 4. Generate Prisma Client

```bash
pnpm prisma generate
```

---

### 5. Sync the database

```bash
pnpm prisma db push
```

For production environments, use Prisma migrations as appropriate.

---

### 6. Start the development server

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

---

## 📜 Available Scripts

```bash
pnpm dev
```

Start the development server.

```bash
pnpm build
```

Create an optimized production build.

```bash
pnpm start
```

Start the production server.

```bash
pnpm lint
```

Run ESLint checks.

```bash
pnpm prepare
```

Generate the Prisma client.

---

## 🌐 Deployment

PratyushLMS is configured for deployment on **Vercel**.

### Production architecture

```text
                    ┌───────────────┐
                    │    Vercel     │
                    │   Next.js     │
                    └───────┬───────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
            ▼               ▼               ▼
       PostgreSQL        AWS S3          Stripe
       Database          Storage         Payments
            │                               │
            │                               │
            └───────────────┬───────────────┘
                            │
                            ▼
                          Resend
                           Email
```

### Production checklist

- Configure production PostgreSQL
- Add all environment variables to Vercel
- Configure AWS S3 storage
- Configure Stripe production keys
- Configure Stripe webhooks
- Configure GitHub OAuth callback URLs
- Configure Resend
- Configure Arcjet
- Run Prisma database setup/migrations
- Enable HTTPS

---

## 🧪 Build & Quality Checks

The project is checked using:

```bash
pnpm lint
```

and:

```bash
pnpm build
```

The production build successfully completes TypeScript checking, page generation, and route optimization.

---

## 🖥️ Application Pages

### Public

- `/`
- `/courses`
- `/courses/[slug]`
- `/login`
- `/payment/success`
- `/payment/cancel`

### Student

- `/dashboard`
- `/dashboard/[slug]`
- `/dashboard/[slug]/[lessonId]`

### Admin

- `/admin`
- `/admin/courses`
- `/admin/courses/create`
- `/admin/courses/[courseId]/edit`
- `/admin/courses/[courseId]/[chapterId]/[lessonId]`

### API

- `/api/auth/[...all]`
- `/api/payments/complete`
- `/api/s3/upload`
- `/api/s3/delete`
- `/api/webhooks/stripe`

---

## 🎨 UI & Design

PratyushLMS uses a modern dark-themed interface focused on:

- Clean navigation
- Responsive layouts
- Accessible UI components
- Consistent spacing
- Interactive course cards
- Modern dashboard layouts
- Dark/light theme support
- Clear student and admin workflows

The landing page introduces the platform with:

> **"Elevate your Learning Experience"**

and highlights:

- 📚 Comprehensive Course Management
- 🛠️ Interactive Learning Tools
- 📈 Progress Tracking
- 🤝 Community Engagement

---

## 🔒 Security Considerations

The application includes multiple security layers:

### Authentication

Better Auth provides authentication and session management.

### Authorization

Protected routes prevent unauthorized access to administrative functionality.

### Request Protection

Arcjet provides bot detection and request protection.

### Payment Security

Stripe handles sensitive payment information rather than storing card information directly in the application.

### Environment Security

Secrets and credentials are stored using environment variables.

---

## 📈 Future Improvements

Potential improvements for future versions include:

- 📝 Course reviews and ratings
- 💬 Student discussion forums
- 🏆 Course completion certificates
- 🔔 Notification system
- 📧 Automated course emails
- 📊 More advanced analytics
- 🔎 Advanced course search and filtering
- 🎯 Personalized course recommendations
- 📱 Improved mobile experience
- 🧑‍🏫 Instructor-specific dashboards
- 🧠 AI-powered learning assistance

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

## 1. Fork the repository

### 2. Create a feature branch

```bash
git checkout -b feature/your-feature
```

### 3. Make your changes

### 4. Run checks

```bash
pnpm lint
pnpm build
```

### 5. Commit your changes

```bash
git commit -m "Add your feature"
```

### 6. Push the branch

```bash
git push origin feature/your-feature
```

### 7. Open a Pull Request

---

## License

PratyushLMS is licensed under the [MIT License](LICENSE).

You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, subject to the terms of the license.

---

## 🙏 Acknowledgements

Built using and inspired by the following technologies and ecosystems:

- Next.js
- React
- TypeScript
- Prisma
- PostgreSQL
- Better Auth
- Stripe
- AWS
- Resend
- Arcjet
- Tailwind CSS
- shadcn/ui

---

## 👨‍💻 Author

**Pratyush**

Built with ❤️ and modern web technologies to create a complete online learning experience.

---

<p align="center">
  <strong>🎓 PratyushLMS</strong>
</p>

<p align="center">
  A modern learning platform for the next generation of online education.
</p>

<p align="center">
  ⭐ If you find this project interesting, consider giving it a star!
</p>
```

