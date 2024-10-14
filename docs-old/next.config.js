const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  latex: true,
  flexsearch: {
    codeblocks: false
  },
  defaultShowCopyCode: true
})
 
module.exports = withNextra(
  {
    reactStrictMode: true,
    eslint: {
      // ESLint behaves weirdly in this monorepo.
      ignoreDuringBuilds: true
    },
  }
)
