module.exports = {
  title: 'Mother Tongues',
  tagline: 'Tools for language revitalization',
  url: 'https://docs.mothertongues.org',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'MotherTongues', // Usually your GitHub org/user name.
  projectName: 'mothertongues-docs', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Mother Tongues',
      logo: {
        alt: 'Mother Tongues Logo',
        src: 'img/logo_no_text.png',
      },
      links: [
        {
          to: 'docs/mtd-start',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        // {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/MotherTongues/mothertongues-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/mtd-start',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            // {
            //   label: 'Stack Overflow',
            //   href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            // },
            // {
            //   label: 'Discord',
            //   href: 'https://discordapp.com/invite/docusaurus',
            // },
            // {
            //   label: 'Twitter',
            //   href: 'https://twitter.com/docusaurus',
            // },
          ],
        },
        {
          title: 'More',
          items: [
            // {
            //   label: 'Blog',
            //   to: 'blog',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/MotherTongues/mothertongues-docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Mother Tongues. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          showReadingTime: true,
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'doc1',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/MotherTongues/mothertongues-docs/edit/master/website/',
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
