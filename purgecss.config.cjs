module.exports = {
  content: [
    './client/index.html',
    './client/src/**/*.{js,jsx,ts,tsx}',
  ],
  css: [
    './client/src/styles/**/*.css',
  ],
  output: './client/src/styles/purged',
  
  // Safelist patterns to prevent removing necessary classes
  safelist: {
    standard: [
      // Animation classes
      /^motion-/,
      /^animate-/,
      
      // Data attributes and ARIA
      /^data-/,
      /^aria-/,
      
      // Third-party library classes
      /^radix-/,
      /^lucide-/,
      /^embla/,
      /^vaul/,
      /^sonner/,
      /^cmdk/,
      /^recharts/,
      
      // Dynamic classes that might be generated
      /^hover:/,
      /^focus:/,
      /^active:/,
      /^group-/,
      /^peer-/,
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
      /recharts/,
    ],
    greedy: [
      /^motion-/,
      /^animate-/,
      /^tw-/,
    ]
  },
  
  // Custom extractor for better class detection
  defaultExtractor: content => {
    // Match Tailwind classes, including those with special characters
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
    const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
    return broadMatches.concat(innerMatches);
  },
  
  // Keep CSS variables
  variables: true,
  
  // Keep keyframes
  keyframes: true,
  
  // Keep font-face rules
  fontFace: true,
};
