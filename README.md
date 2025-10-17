# Sitecore Next.js CWS Sample

This is a simple CWS project repo created by 7kc team

A modern Sitecore Next.js implementation using Content Web Services (CWS) and the Sitecore Content SDK.

## Overview

This project is a sample implementation of a Sitecore website using Next.js with the following features:

- 🚀 Built with Next.js 13+ (App Router)
- 🎨 Tailwind CSS with Shadcn UI components
- 🔄 Server-side rendering (SSR) and static site generation (SSG) support
- 🌐 Multi-site and multi-language support
- 🔍 SEO optimized
- 🛠️ Developer-friendly tooling and configuration

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.0.0 or later
- npm 9.0.0 or later
- Sitecore XM Cloud account
- Git

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-org/sitecore-nextjs-cws-sample.git
cd sitecore-nextjs-cws-sample
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

1. Copy the example environment file:

   ```bash
   cp .env.remote.example .env.local
   ```

2. Update the `.env.local` file with your Sitecore XM Cloud environment details:
   ```env
   # Sitecore XM Cloud configuration
   SITECORE_EDGE_CONTEXT_ID=your-edge-context-id
   NEXT_PUBLIC_DEFAULT_SITE_NAME=your-site-name
   NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID=your-edge-context-id
   SITECORE_EDITING_SECRET=your-editing-secret
   ```

### 4. Run the development server

```bash
npm run dev
```

## Disconnected Mode

```bash
npm run dev:disconnected
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

