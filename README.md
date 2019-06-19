# pwastudio-ssr
Goal of this project is to build a express middleware to do SSR for a PWAStudio application.
This middleware would be run after the UPWARD middleware. Like this, UPWARD can stay as it is and we still get the benefits of SSR.

## Setup
Just use `npm install` to install this project.  
To build the server use `npm run build`.  
To start the server use `npm run start`.

## Dependencies
- React: React is only a dev dependency, because we do not want this middleware be dependent on React. 
    Just for the ease of development, the React-app itself is tightly coupled.