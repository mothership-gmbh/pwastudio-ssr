import React, {Fragment} from 'react';

const Html = ({content, state}) => {
    return (
        <Fragment>
            <div id="wrapper" dangerouslySetInnerHTML={{ __html: content }} />
            <script dangerouslySetInnerHTML={{
                __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`,
            }} />
        </Fragment>
    );
};

export default Html;