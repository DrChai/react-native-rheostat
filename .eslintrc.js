module.exports = {
    extends: ['airbnb-typescript'],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        'react/jsx-uses-react': "off",
        'react/react-in-jsx-scope': "off",
        "react/prop-types": "off",
        "react/require-default-props": "off",
        "react/jsx-props-no-spreading": "off",
        "no-underscore-dangle": "off",
        "react/no-array-index-key": "off",
        "@typescript-eslint/no-use-before-define": "off"
    }
};
