# infrastack.ai Next.js Example App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and integrated with [InfraStack](https://infrastack.ai) for observability.

Follow along [our documentation](https://docs.infrastack.ai/quickstarts/expressjs) for more information.

## Getting Started

First, set up your environment:

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
3. Create a `.env.local` file in the root directory and add your InfraStack API key:
   ```
   INFRASTACK_API_KEY=your_api_key_here
   ```

Then, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser, then follow the instructions on the page to add users and see the traces in the infrastack.ai dashboard.