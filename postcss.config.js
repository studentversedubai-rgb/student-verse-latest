import purgecss from '@fullhuman/postcss-purgecss';

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? {
      '@fullhuman/postcss-purgecss': {
        content: [
          './client/index.html',
          './client/src/**/*.{js,jsx,ts,tsx}',
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: {
          standard: [
            /^motion-/,
            /^animate-/,
            /^data-/,
            /^aria-/,
            /^radix-/,
            /^lucide-/,
            /^embla/,
            /^vaul/,
            /^sonner/,
            /^cmdk/,
          ],
          deep: [
            /motion/,
            /animate/,
            /radix/,
            /lucide/,
            /embla/,
            /vaul/,
            /sonner/,
            /cmdk/,
          ],
          greedy: [
            /^motion-/,
            /^animate-/,
          ]
        },
        // Don't remove CSS variables
        variables: true,
      }
    } : {})
  },
}
