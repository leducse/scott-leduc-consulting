# Scott LeDuc Consulting Website

A modern, professional consulting website built with Next.js, showcasing expertise in statistical analysis, machine learning, AWS architecture, and data engineering.

## 🚀 Features

- **Modern Tech Stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4
- **Responsive Design**: Mobile-first design with smooth animations using Framer Motion
- **SEO Optimized**: Metadata and structured content for all pages
- **Performance**: Optimized images, fast page loads, and excellent Lighthouse scores
- **Contact Form**: API-integrated contact form with rate limiting and validation
- **Case Studies**: Detailed case studies showcasing real-world impact
- **Service Pages**: Comprehensive service offerings with methodology and deliverables

## 📋 Pages

- **Home**: Hero section, key metrics, services overview, featured case studies, engagement approach
- **About**: Professional background, education, certifications, expertise areas
- **Services**: 5 service offerings:
  - Statistical Analysis & Causal Inference
  - Machine Learning & AI Consulting
  - AWS Cloud Architecture
  - Business Intelligence & Analytics
  - Data Engineering
- **Case Studies**: 4 detailed case studies:
  - G3 Pipeline Impact Analysis ($706K revenue impact)
  - ML Engagement Recommender (53% conversion improvement)
  - AWS Serverless Dashboard (1,313 active users)
  - Activity Scenario Analysis (23% win rate improvement)
- **Process**: 5-phase engagement methodology
- **Contact**: Contact form with validation and error handling

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Deployment**: AWS Amplify (configured)
- **Fonts**: Inter (sans-serif), JetBrains Mono (monospace)

## 📦 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd consulting-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
consulting-website/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   └── contact/       # Contact form API endpoint
│   ├── about/             # About page
│   ├── case-studies/      # Case study pages
│   ├── contact/           # Contact page
│   ├── process/           # Process page
│   ├── services/          # Service pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── case-studies/     # Case study components
│   ├── layout/           # Layout components (Navbar, Footer, Hero)
│   ├── services/         # Service components
│   ├── shared/           # Shared components
│   └── ui/               # UI primitives
├── lib/                   # Utilities and content
│   ├── constants.ts      # Site configuration and constants
│   └── content.ts        # Page content and data
├── public/               # Static assets
└── amplify.yml          # AWS Amplify deployment config
```

## 🔧 Configuration

### Site Configuration

Edit `lib/constants.ts` to update:
- Site name, tagline, contact information
- Key metrics displayed on homepage
- Services and case studies

### Content Management

Edit `lib/content.ts` to update:
- About page content
- Service descriptions and methodologies
- Case study details
- Process phases

## 📧 Contact Form Setup

The contact form is integrated with a Next.js API route (`/app/api/contact/route.ts`). Currently, it logs submissions to the console. To enable email notifications:

### Option 1: AWS SES (Recommended for AWS deployments)

1. Set up AWS SES in your AWS account
2. Verify your email address or domain
3. Update `app/api/contact/route.ts` to use AWS SDK:

```typescript
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({ region: "us-east-1" });

// In the POST handler:
await sesClient.send(new SendEmailCommand({
  Source: SITE_CONFIG.email,
  Destination: { ToAddresses: [SITE_CONFIG.email] },
  Message: {
    Subject: { Data: emailSubject },
    Body: { Text: { Data: emailBody } },
  },
}));
```

### Option 2: Third-party Services

- **SendGrid**: Use `@sendgrid/mail`
- **Resend**: Use `resend` package
- **Nodemailer**: For SMTP-based sending

### Option 3: Database Storage

Store submissions in:
- **DynamoDB**: For serverless AWS deployments
- **PostgreSQL/RDS**: For traditional database
- **MongoDB**: For document storage

## 🚀 Deployment

### AWS Amplify

The project is configured for AWS Amplify deployment with `amplify.yml`:

1. Connect your repository to AWS Amplify
2. Amplify will automatically detect the Next.js app
3. Build settings are pre-configured
4. Deploy!

### Environment Variables

If you add email services or other integrations, set these in Amplify:

- `AWS_REGION`: AWS region for services
- `SES_FROM_EMAIL`: Email address for sending
- `CONTACT_EMAIL`: Email address to receive submissions

### Other Platforms

The site can also be deployed to:
- **Vercel**: Native Next.js support
- **Netlify**: Next.js support via build plugins
- **Docker**: Use the standalone output mode

## 🧪 Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

### Code Style

- TypeScript strict mode enabled
- ESLint configured with Next.js rules
- Components use functional components with hooks
- Tailwind CSS for styling

## 📝 Content Updates

### Adding a New Service

1. Add service to `SERVICES` array in `lib/constants.ts`
2. Add service content to `SERVICE_CONTENT` in `lib/content.ts`
3. Create page at `app/services/[slug]/page.tsx`
4. Link from services listing page

### Adding a New Case Study

1. Add case study to `CASE_STUDIES` array in `lib/constants.ts`
2. Add case study content to `CASE_STUDY_CONTENT` in `lib/content.ts`
3. Create page at `app/case-studies/[slug]/page.tsx`
4. Link from case studies listing page

## 🔒 Security Features

- Rate limiting on contact form (5 submissions per hour per IP)
- Input validation and sanitization
- Email format validation
- CORS protection (handled by Next.js)
- XSS protection (React's built-in escaping)

## 📊 Performance

- Optimized images with Next.js Image component
- Code splitting and lazy loading
- Static generation where possible
- Minimal JavaScript bundle size
- Fast page transitions

## 🤝 Contributing

This is a personal consulting website. For suggestions or improvements, please open an issue or submit a pull request.

## 📄 License

Private project - All rights reserved.

## 📞 Contact

- **Email**: leducse@gmail.com
- **Phone**: 703-984-9803
- **Location**: Fairfax, VA

---

Built with ❤️ using Next.js and TypeScript
