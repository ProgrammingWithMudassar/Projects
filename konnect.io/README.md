This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Konnect.io Client (User Interface)

## Version Control
The following listed version has been used.
- Node Js - v20.5.1.
- Npm - 9.8.0
- TypeScript - 5.2.2
- Eslint - 8.48.0
- React Js - 18.2.0
- Next Js - 13.4.19

## Development
```bash
1.	Unzip or clone from GitHub.
2.	Open in any code editor and open editor terminal or open command line in project directory.
3.	Run "npm install" Note: Don’t write "npm install --force".
4.	Once it will download all dependencies, run "npm run dev".
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Code Overview
As we used Next Js 13 so, “/app” is the entry point. Other major directories are.
- assets (To store all static assets like SVG icons which could be import as EC7 module/component).
- components
  - Admin (Holding all re-useable components for Super Admin panel).
  - Konnectors (Holding all re-useable components for Konnector panel).
  - Vendor (Holding all re-useable components for Vendor panel).
  - Landing Page (Holding all re-useable components for home/entry level of system).
  - shared (All components which are used in different areas in system like navigations, snippets, or cards, etc).
- json (Storing all demo and auditable data, like navigation items names, routes and cards data that could be replace with API’s integration).
- types (All TypeScript types of declaration happened here).
- views
  - Admin (All screens related to Super admin)
  - Auth (User login and recover password screens)
  - Konnector (All screens related to Konnector panel)
  - Register (Konnector and vendor registration screens)
  - Vendor (All screens of vendor admin panel)






[work]

*Route should be change*
internal --> users/konnects/[userID]


1- after login store data in cookie
2- convert time into seconds
