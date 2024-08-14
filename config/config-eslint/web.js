
const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

module.exports = {
    extends: [
        require.resolve('@vercel/style-guide/eslint/node'),
        require.resolve('@vercel/style-guide/eslint/typescript'),
        require.resolve('@vercel/style-guide/eslint/browser'),
        require.resolve('@vercel/style-guide/eslint/react'),
        require.resolve('@vercel/style-guide/eslint/next'),
        'eslint-config-turbo',
    ].map(require.resolve),
    parserOptions: {
        project,
    },
    globals: {
        React: true,
        JSX: true,
    },
    settings: {
        'import/resolver': {
            typescript: {
                project,
            },
        },
    },
    ignorePatterns: ['node_modules/', 'dist/'],
    rules: {
        'import/no-default-export': 'off',
    },
};