
export default {
  toc: {
    backToTop: true
  },
  logo: <span>InfraStack AI Documentation</span>,
  docsRepositoryBase: 'https://github.com/infrastackai/site/tree/main/docs',
  project: {
    link: 'https://github.com/infrastackai/site'
  },
  footer: {
      text: (
        <span>
          {new Date().getFullYear()} {' '}
          <a href="https://infrastack.ai" target="_blank">
            InfraStack AI
          </a>
          .
        </span>
      )
    },
    logo: () => {
      return (
        <>
          {/* <Logo height={24} /> */}
          <span
            className="mx-2 font-extrabold hidden md:inline select-none"
            title={`InfraStack AI`}
          >
            InfraStack AI Docs
          </span>
        </>
      );
    }
}