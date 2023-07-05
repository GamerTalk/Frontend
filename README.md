This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## File Structure

```
Frontend
├─ LICENSE
├─ next.config.js
├─ README.md
├─ src
│  └─ app
│     ├─ auth
│     │  ├─ signin
│     │  │  └─ page.tsx
│     │  └─ signup
│     │     └─ page.tsx
│     ├─ components
│     │  ├─ elements
│     │  │  ├─ Checkbox.tsx
│     │  │  ├─ Learning-Checkbox.tsx
│     │  │  ├─ SubmitBtn.module.css
│     │  │  └─ SubmitBtn.tsx
│     │  └─ layouts
│     │     ├─ Auth.module.css
│     │     ├─ Auth.tsx
│     │     ├─ Filter.module.css
│     │     ├─ FilterArea.tsx
│     │     ├─ Header.module.css
│     │     ├─ Header.tsx
│     │     ├─ UserCard.module.css
│     │     └─ UserCard.tsx
│     ├─ context
│     │  └─ AuthContext.tsx
│     ├─ edit-profile
│     │  └─ page.tsx
│     ├─ entry-form
│     │  ├─ page.tsx
│     │  └─ UserInfo.module.css
│     ├─ favicon.ico
│     ├─ firebase
│     │  └─ firebase.ts
│     ├─ global.t.tsx
│     ├─ globals.css
│     ├─ landing
│     │  └─ page.tsx
│     ├─ landingLayout.tsx
│     ├─ layout.tsx
│     ├─ page.module.css
│     ├─ page.tsx
│     └─ utils
│        └─ langCheckFunc.tsx
└─ tsconfig.json

```