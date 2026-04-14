// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Machnet',
  tagline: 'Sub-100\u00B5s kernel-bypass messaging for cloud applications',
  favicon: 'img/favicon.ico',

  url: 'https://machnett.github.io',
  baseUrl: '/machnet-docs/',

  deploymentBranch: 'gh-pages',
  organizationName: 'machnett',
  projectName: 'machnet-docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/machnett/machnet-docs/tree/main',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      metadata: [
        {name: 'keywords', content: 'machnet, dpdk, kernel-bypass, low-latency, networking, cloud, rdma'},
        {name: 'description', content: 'Machnet: open-source DPDK-based messaging stack for sub-100\u00B5s latency on cloud VMs'},
      ],
      navbar: {
        title: 'Machnet',
        logo: {
          alt: 'Machnet Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          {to: '/team', label: 'Team', position: 'left'},
          {
            href: 'https://arxiv.org/abs/2502.09281',
            label: 'White Paper',
            position: 'left',
          },
          {
            href: 'https://github.com/microsoft/machnet',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {label: 'Overview', to: '/docs/intro'},
              {label: 'Quick Start', to: '/docs/tutorial-basics/machnet-intro'},
              {label: 'API Reference', to: '/docs/api-reference'},
              {label: 'Performance', to: '/docs/performance-report'},
            ],
          },
          {
            title: 'Community',
            items: [
              {label: 'GitHub', href: 'https://github.com/microsoft/machnet'},
              {label: 'Discord', href: 'https://discord.gg/zCqe83UJ'},
              {label: 'X / Twitter', href: 'https://x.com/machnet'},
            ],
          },
          {
            title: 'Resources',
            items: [
              {label: 'White Paper', href: 'https://arxiv.org/abs/2502.09281'},
              {label: 'Team', to: '/team'},
              {label: 'Contributing', to: '/docs/contributing'},
            ],
          },
        ],
        copyright: `Copyright \u00A9 ${new Date().getFullYear()} Machnet, Inc.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'c'],
      },
    }),
};

export default config;
