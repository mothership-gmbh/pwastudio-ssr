/**
 * Middleware to render the application and inject the result in the response.
 *
 * @param renderFunction : function used to render the application
 * @param marker : string to replace
 * @returns {Function}
 */
const replaceWithSsr = (renderFunction, marker) => {

    return async function (req, res, next) {

        const html = await renderFunction();

        let replacedHtml = res.body.replace(marker, html);

        res.status(200);
        res.body = replacedHtml;
        next();
    }
};

export default replaceWithSsr;