import ApolloClient from "apollo-client/ApolloClient";
import {createHttpLink} from "apollo-link-http";
import fetch from "node-fetch";
import {InMemoryCache} from "apollo-cache-inmemory";
import {renderToStringWithData} from "react-apollo";
import Html from "../helper/Html";
import ReactDOM from "react-dom/server";
import React from "react";

/**
 * Renders a React app passed via parameter
 * @param reactApp
 * @returns {Promise<string>}
 */
const reactSsr = async (reactApp) => {
    const client = new ApolloClient({
        ssrMode: true,
        // Remember that this is the interface the SSR server will use to connect to the
        // API server, so we need to ensure it isn't firewalled, etc
        link: createHttpLink({
            uri: 'http://localhost:3010',
            credentials: 'same-origin',
            fetch: fetch
        }),
        cache: new InMemoryCache(),
    });

    const context = {};

    return await renderToStringWithData(reactApp).then((content) => {
        const initialState = client.extract();
        const html = <Html content={content} state={initialState} />;

        return ReactDOM.renderToString(html);
    });
};

export default reactSsr;