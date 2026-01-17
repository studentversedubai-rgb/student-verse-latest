import { PurgeCSS } from 'purgecss';
import { writeFileSync, mkdirSync, readFileSync, copyFileSync } from 'fs';
import { join, basename, dirname } from 'path';
import { execSync } from 'child_process';

console.log('\n🚀 Building with PurgeCSS optimization...\n');

// Step 1: Run PurgeCSS
console.log('📦 Step 1: Purging unused CSS...\n');

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

// Backup original files
const backupDir = 'client/src/styles/.backup';
mkdirSync(backupDir, { recursive: true });

let totalOriginalSize = 0;
let totalPurgedSize = 0;

for (const result of purgeCSSResults) {
  const filename = basename(result.file);
  
  // Backup original
  const backupPath = join(backupDir, filename);
  copyFileSync(result.file, backupPath);
  
  // Read original file to get accurate size
  const originalContent = readFileSync(result.file, 'utf-8');
  const originalSize = originalContent.length;
  const purgedSize = result.css.length;
  
  totalOriginalSize += originalSize;
  totalPurgedSize += purgedSize;
  
  // Overwrite with purged version
  writeFileSync(result.file, result.css);
  
  const reduction = ((1 - purgedSize / originalSize) * 100).toFixed(1);
  console.log(`   ✓ ${filename.padEnd(25)} ${(originalSize / 1024).toFixed(2)}KB → ${(purgedSize / 1024).toFixed(2)}KB (${reduction}% reduction)`);
}

console.log(`\n   ${'─'.repeat(70)}`);
console.log(`   Total reduction: ${((1 - totalPurgedSize / totalOriginalSize) * 100).toFixed(2)}% (saved ${((totalOriginalSize - totalPurgedSize) / 1024).toFixed(2)}KB)`);
console.log(`   ${'─'.repeat(70)}\n`);

// Step 2: Run the actual build
console.log('📦 Step 2: Running production build...\n');
try {
  execSync('tsx script/build.ts', { stdio: 'inherit' });
  console.log('\n✅ Build completed successfully!\n');
} catch (error) {
  console.error('\n❌ Build failed!\n');
  process.exit(1);
} finally {
  // Step 3: Restore original files
  console.log('🔄 Step 3: Restoring original CSS files...\n');
  for (const cssFile of cssFiles) {
    const filename = basename(cssFile);
    const backupPath = join(backupDir, filename);
    copyFileSync(backupPath, cssFile);
    console.log(`   ✓ Restored ${filename}`);
  }
  console.log('\n✅ All done!\n');
}
