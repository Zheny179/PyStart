/** @type {import("prettier").Config} */
export default {
  semi: false,
  singleQuote: true,
  jsxSingleQuote: false,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'es5',
  printWidth: 80,
  arrowParens: 'always',
  bracketSpacing: true,
  bracketSameLine: false,
  quoteProps: 'as-needed',
  htmlWhitespaceSensitivity: 'ignore',
  singleAttributePerLine: true,
  endOfLine: 'lf',
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
