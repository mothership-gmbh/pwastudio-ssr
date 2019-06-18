import {ApolloClient} from "apollo-client";
import {createHttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import App from "../app/app";
import {renderToStringWithData} from "react-apollo";
import Html from "../helper/Html";
import ReactDOM from 'react-dom/server';
import fetch from 'node-fetch';
import React from 'react';

var ssr = function (req, res, next) {
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
};

export default ssr;