# pwastudio-ssr
Goal of this project is to build a express middleware to do SSR for a PWAStudio application.
This middleware would be run after the UPWARD middleware. Like this, UPWARD can stay as it is and we still get the benefits of SSR.  

## Setup
Just use `npm install` to install this project.  

To build the server use `npm run build`. For now this builds the whole project, including server and client app.  
Moving forward this should build only the middleware, so it can be published as a single package and used in every UPWARD setup.

To start the server use `npm run start`.

## Done
1) Client demo: App should work on the client
    - Webpack setup for client
    - Include client app in UPWARD
    - see if it works as intended :)
## Todo
1) build a little demo app with tec-stack like PWAStudio
    - React Router (server side: I think only wrapping the app in StaticRouter should do it: https://www.apollographql.com/docs/react/features/server-side-rendering/#server-side-rendering)
    - Redux (some work on server side too: https://github.com/zeit/next.js/issues/2347#issuecomment-310724179)
    - maybe some GraphQl queries


## Dependencies
- React: React is only a dev dependency, because we do not want this middleware be dependent on React. 
    Just for the ease of development, the React-app itself is tightly coupled.