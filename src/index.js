// This example uses React Router v4, although it should work
// equally well with other routers that support SSR

import Express from 'express';
import React from 'react';

const { middleware } = require('@magento/upward-js');
import ssr from './middleware/middleware';
import {resolve} from 'path';

const basePort = 3000;

async function serve() {
    const upward = await middleware(resolve('src/upward/upward.yml'));

    // Note you don't have to use any particular http server, but
    // we're using Express in this example
    const app = new Express();

    // UPWARD middleware is working, but response gets send in it -.-
    // So we have to fork upward-js and fix this. Maybe this also can be pulled into the official repo.
    // To pull it into the official repo, createUpwardServer has to be slightly altered to send response after use of
    // upward middleware

    app.use(upward);
    app.use(ssr);
    app.listen(basePort, () => console.log( // eslint-disable-line no-console
        `app Server is now running on http://localhost:${basePort}`
    ));
}

serve();