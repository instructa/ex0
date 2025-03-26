export default defineAppConfig({
  ui: {
    primary: 'cyan',
    gray: 'zinc',
    footer: {
      bottom: {
        left: 'text-sm text-gray-500 dark:text-gray-400',
        wrapper: 'border-t border-gray-200 dark:border-gray-800'
      }
    }
  },
  seo: {
    // Changed from 'Nuxt UI Pro - Docs template' to 'ex0 - Docs'
    siteName: 'ex0 - Docs'
  },
  header: {
    logo: {
      alt: '',
      light: '',
      dark: ''
    },
    search: true,
    colorMode: true,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/instructa/ex0',
      'target': '_blank',
      'aria-label': 'ex0 on GitHub'
    }]
  },
  footer: {
    credits: 'Copyright © 2023',
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/instructa/ex0',
      'target': '_blank',
      'aria-label': 'ex0 on GitHub'
    }]
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Community',
      // Changed the edit link to ex0
      edit: 'https://github.com/instructa/ex0/edit/main/content',
      links: [{
        icon: 'i-heroicons-star',
        label: 'Star on GitHub',
        to: 'https://github.com/instructa/ex0',
        target: '_blank'
      }, {
        icon: 'i-heroicons-book-open',
        label: 'ex0 docs',
        to: 'https://github.com/instructa/ex0',
        target: '_blank'
      }, {
        icon: 'i-simple-icons-nuxtdotjs',
        label: 'Contribute or fork',
        to: 'https://github.com/instructa/ex0',
        target: '_blank'
      }]
    }
  }
})
