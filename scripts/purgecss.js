import { PurgeCSS } from 'purgecss';
import { writeFileSync, mkdirSync, readFileSync } from 'fs';
import { join, basename } from 'path';

const cssFiles = [
  'client/src/styles/about.css',
  'client/src/styles/contact.css',
  'client/src/styles/design-tokens.css',
  'client/src/styles/home.css',
  'client/src/styles/navbar.css',
  'client/src/styles/overrides.css',
  'client/src/styles/page.css',
  'client/src/styles/react-fixes.css',
];

const purgeCSSResults = await new PurgeCSS().purge({
  content: [
    'client/index.html',
    'client/src/**/*.{js,jsx,ts,tsx}',
  ],
  css: cssFiles,
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
      /^recharts/,
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
  defaultExtractor: content => {
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
    const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
    return [...new Set([...broadMatches, ...innerMatches])];
  },
  variables: true,
  keyframes: true,
  fontFace: true,
});

// Create output directory
mkdirSync('client/src/styles/purged', { recursive: true });

// Write purged CSS files
let totalOriginalSize = 0;
let totalPurgedSize = 0;

console.log('\n🧹 Purging unused CSS...\n');

for (const result of purgeCSSResults) {
  const filename = basename(result.file);
  const outputPath = join('client/src/styles/purged', filename);
  
  // Read original file to get accurate size
  const originalContent = readFileSync(result.file, 'utf-8');
  const originalSize = originalContent.length;
  const purgedSize = result.css.length;
  
  totalOriginalSize += originalSize;
  totalPurgedSize += purgedSize;
  
  writeFileSync(outputPath, result.css);
  
  const reduction = ((1 - purgedSize / originalSize) * 100).toFixed(1);
  console.log(`✓ ${filename.padEnd(25)} ${(originalSize / 1024).toFixed(2)}KB → ${(purgedSize / 1024).toFixed(2)}KB (${reduction}% reduction)`);
}

console.log(`\n${'='.repeat(70)}`);
console.log(`✓ Total: ${(totalOriginalSize / 1024).toFixed(2)}KB → ${(totalPurgedSize / 1024).toFixed(2)}KB`);
console.log(`✓ Overall reduction: ${((1 - totalPurgedSize / totalOriginalSize) * 100).toFixed(2)}%`);
console.log(`✓ Saved ${((totalOriginalSize - totalPurgedSize) / 1024).toFixed(2)}KB`);
console.log(`${'='.repeat(70)}`);
console.log('\n✓ Purged CSS files saved to client/src/styles/purged/\n');

