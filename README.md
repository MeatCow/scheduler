# Interview Scheduler

## Description

Small project created in React, that allows you to maintain a list of scheduled appointments.  
Data is persisted in a PostgreSQL database, displayed using React with Components developed using Storybook.  
Various types of tests are maintained with a mix of Jest and Cypress.

## Scheduler Server Setup

As you need the server running in the background, you can clone the following project create by LHL to run a local server for testing purposes.

```sh
git clone git@github.com:MeatCow/scheduler-server.git scheduler-server
cd scheduler-server/
npm i
```
At this point, navigate to the README and follow the database setup steps.  
Once completed, go ahead and run
```sh
npm start
```
which will start the server in the background.

## Client Setup

Navigate to project root and install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress E2E Tests

```sh
npm run cypress
```

