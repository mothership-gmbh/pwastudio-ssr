// This example uses React Router v4, although it should work
// equally well with other routers that support SSR

import Express from 'express';
import React from 'react';

const {middleware} = require('@magento/upward-js');
import replaceWithSsr from './middleware/middleware';
import reactSsr from './middleware/reactSsr';
import {resolve} from 'path';
import App from "./app/app";

const basePort = 3000;

/**
 * Render function which is doing the SSR itself. Following this approach, the client aoo could also be Vue etc.
 * @returns {Promise<*>}
 */
const renderFunction = async () => {
    const app = <App/>;
    return reactSsr(app);
}


async function serve() {
    const upward = await middleware(resolve('src/upward/upward.yml'));

    // Note you don't have to use any particular http server, but
    // we're using Express in this example
    const app = new Express();

    app.use(upward);

    /* To make the middleware as generalistic as possible, it should not have any references to React.
     * So we pass a renderFunction, which handles the whole rendering part.
     */
    app.use(replaceWithSsr(renderFunction, '###marker###'));

    /* Think it's a good approach to NOT send the response in the middleware above.
     * Don't wanna do the same mistake and build a terminating middleware
     */
    app.use((req, res) => res.send(res.body));

    app.listen(basePort, () => console.log( // eslint-disable-line no-console
        `app Server is now running on http://localhost:${basePort}`
    ));
}

serve();