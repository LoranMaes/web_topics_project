# Guardian Care

## Table of Contents
- [Description](#description)
- [Installed](#installed)
- [Where to find](#where-to-find)
- [Contributing](#contributing)

## Description

Guardian Care is a PWA developed for people with a mental disorder. It is designed to help improve hygiene for those who have had difficulties in this area.
Caregivers have the ability to create an account with an email and password. Their data and authentication is done and stored securely with Firebase.
There's an ability to track how many activities a user has done.

## Installed

Make sure Node.Js is installed on your machine in order to download the required dependencies!

First, clone the project on your machine:
```bash
# Navigate to your designated folder
git clone https://github.com/LoranMaes/web_topics_project.git
# After cloning the project, install the dependencies with this command in the root
npm install
```

Create a Firebase project with and setup Authentication and Firestore.

Enter your Firebase credentials in .env.local, but first copy it in the root folder using this command:
```bash
# Windows
copy .env.example .env.local
# Mac and Linux
cp .env.example .env.local
```


To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Where To Find

You can find GuardianCare at this URL:
[GuardianCare](https://guardiancare.loranmaes.ikdoeict.be/)

## Contributing

- Rune Leemans: VR/AR
- Loran Maes: Frontend
