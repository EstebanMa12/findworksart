This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, you need to copy the github repository:
```bash
git clone https://github.com/EstebanMa12/findworksart.git

# Then you can access to the folder that contains the repository

cd findworksart

```

Second you need to add a file with the environment variables, the next code is and example of the important variables
```bash
POSTGRES_PRISMA_URL="postgres://<Username>:<Password>@ep...&connect_timeout=15"
POSTGRES_URL_NON_POOLING="postgres://<Username>:<Password>@e=...require"
NEXTAUTH_URL="http://localhost:3000"
API_KEY = "<Your api key>"
NEXTAUTH_SECRET = "<Secret>"

```


Third, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the page.

This project is deployed with vercel in the next link [Deployment](https://findworksart-j8rqrloyq-esteban-mayas-projects.vercel.app/)

