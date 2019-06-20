const targets = {
    dev: 'last 2 Chrome versions',
    prod: 'last 2 Chrome versions',
    test: 'node 10'
};

const config = api => {
    const envConfigs = {
        client: {
            presets: [
                "@babel/preset-env",
                "@babel/preset-react"
            ]
        },
        server: {
            plugins: [
                ["@babel/plugin-transform-runtime"],
                ["module-resolver", {
                    "root": ["./"]
                }],
                ["dynamic-import-node"]
            ],
            presets: [
                "@babel/preset-env",
                "@babel/preset-react"
            ]
        }
    };
    return envConfigs[api.env() || 'server'];
};

module.exports = config;
