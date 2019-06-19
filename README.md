# pwastudio-ssr
Goal of this project is to build a express middleware to do SSR for a PWAStudio application.
This middleware would be run after the UPWARD middleware. Like this, UPWARD can stay as it is and we still get the benefits of SSR.

## Setup
Do NOT use `npm install` as it doesn't install subdependencies in the root `node_modules` folder. This is causing webpack to not bundle it correctly.
Use `yarn install` instead and you're good to go.

Currently setup won't work as I have to publish the altered @magento/upward-js package to use it here.

## Dependencies
- React: React is only a dev dependency, because we do not want this middleware be dependent on React. 
    Just for the ease of development, the React-app itself is tightly coupled.