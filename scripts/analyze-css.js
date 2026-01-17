import { PurgeCSS } from 'purgecss';
import { readFileSync } from 'fs';

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

console.log('Analyzing CSS files for unused selectors...\n');

const purgeCSSResults = await new PurgeCSS().purge({
  content: [
    'client/index.html',
    'client/src/**/*.{js,jsx,ts,tsx}',
  ],
  css: cssFiles,
  safelist: [],
  defaultExtractor: content => {
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
    const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
    return [...new Set([...broadMatches, ...innerMatches])];
  },
  variables: true,
  keyframes: true,
  fontFace: true,
  rejected: true,
});

let totalRemoved = 0;
let totalOriginal = 0;

for (const result of purgeCSSResults) {
  const originalContent = readFileSync(result.file, 'utf-8');
  const originalSize = originalContent.length;
  const purgedSize = result.css.length;
  const removed = originalSize - purgedSize;
  
  totalOriginal += originalSize;
  totalRemoved += removed;
  
  if (removed > 100) {
    console.log(`\n📄 ${result.file}`);
    console.log(`   Original: ${(originalSize / 1024).toFixed(2)}KB`);
    console.log(`   Purged: ${(purgedSize / 1024).toFixed(2)}KB`);
    console.log(`   Removed: ${(removed / 1024).toFixed(2)}KB (${((removed / originalSize) * 100).toFixed(1)}%)`);
    
    if (result.rejected && result.rejected.length > 0) {
      console.log(`   Unused selectors found: ${result.rejected.length}`);
      console.log(`   Examples: ${result.rejected.slice(0, 5).join(', ')}`);
    }
  }
}

console.log(`\n${'='.repeat(60)}`);
console.log(`Total original size: ${(totalOriginal / 1024).toFixed(2)}KB`);
console.log(`Total removed: ${(totalRemoved / 1024).toFixed(2)}KB`);
console.log(`Overall reduction: ${((totalRemoved / totalOriginal) * 100).toFixed(2)}%`);
console.log(`${'='.repeat(60)}\n`);
