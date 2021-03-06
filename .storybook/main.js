module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-actions",
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    },
    "@storybook/addon-controls",
    "@storybook/addon-storysource",
    "@storybook/preset-create-react-app"
  ]
}
