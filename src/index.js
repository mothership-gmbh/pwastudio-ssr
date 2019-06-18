// This example uses React Router v4, although it should work
// equally well with other routers that support SSR

import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import Express from 'express';
import { StaticRouter } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from 'node-fetch';

import App from './app/app';
import Html from "./helper/Html";

const basePort = 3000;

// Note you don't have to use any particular http server, but
// we're using Express in this example
const app = new Express();
app.use((req, res) => {

    const client = new ApolloClient({
        ssrMode: true,
        // Remember that this is the interface the SSR server will use to connect to the
        // API server, so we need to ensure it isn't firewalled, etc
        link: createHttpLink({
            uri: 'http://localhost:3010',
            credentials: 'same-origin',
            headers: {
                cookie: req.header('Cookie'),
            },
            fetch: fetch
        }),
        cache: new InMemoryCache(),
    });

    const context = {};

    const app = <App/>;

    renderToStringWithData(app).then((content) => {
        const initialState = client.extract();
        const html = <Html content={content} state={initialState} />;

        res.status(200);
        res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`);
        res.end();
    });
});

app.listen(basePort, () => console.log( // eslint-disable-line no-console
    `app Server is now running on http://localhost:${basePort}`
));