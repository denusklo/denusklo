#!/usr/bin/env node
/**
 * Generate favicon package from SVG source
 * Run: node scripts/generate-favicons.mjs
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const svgContent = fs.readFileSync(join(rootDir, 'public/favicon.svg'), 'utf-8');
const publicDir = join(rootDir, 'public');

// Favicon sizes needed
const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
];

// Web manifest
const manifest = {
  name: 'Den Kong - Portfolio',
  short_name: 'denusklo.com',
  description: 'Den Kong\'s portfolio website - Laravel fullstack developer from Malaysia',
  start_url: '/',
  display: 'standalone',
  background_color: '#ffffff',
  theme_color: '#000000',
  icons: [
    {
      src: '/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png'
    },
    {
      src: '/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png'
    }
  ]
};

// Check for available conversion tools
function checkTool() {
  const tools = ['convert', 'magick', 'rsvg-convert', 'inkscape'];
  for (const tool of tools) {
    try {
      execSync(`which ${tool}`, { stdio: 'ignore' });
      return tool;
    } catch {
      continue;
    }
  }
  return null;
}

// Convert SVG to PNG using available tool
function convertSVG(tool, size, outputPath) {
  const svgPath = join(publicDir, 'favicon.svg');

  switch (tool) {
    case 'rsvg-convert':
      execSync(`rsvg-convert -w ${size} -h ${size} "${svgPath}" -o "${outputPath}"`, { stdio: 'inherit' });
      break;
    case 'convert':
    case 'magick':
      execSync(`${tool} -background none -density 300 -resize ${size}x${size} "${svgPath}" "${outputPath}"`, { stdio: 'inherit' });
      break;
    case 'inkscape':
      execSync(`inkscape "${svgPath}" --export-filename="${outputPath}" -w ${size} -h ${size}`, { stdio: 'inherit' });
      break;
    default:
      throw new Error('No conversion tool available');
  }
}

// Main execution
async function main() {
  console.log('🎨 Generating favicon package...\n');

  const tool = checkTool();

  if (!tool) {
    console.error('❌ No image conversion tool found!');
    console.log('\nPlease install one of the following:');
    console.log('  • ImageMagick: sudo apt install imagemagick');
    console.log('  • librsvg2-bin: sudo apt install librsvg2-bin');
    console.log('  • Inkscape: sudo apt install inkscape');
    console.log('\nOr use an online tool: https://favicon.io/\n');
    process.exit(1);
  }

  console.log(`✓ Using ${tool} for conversion\n`);

  for (const { name, size } of sizes) {
    const outputPath = join(publicDir, name);
    console.log(`Generating ${name} (${size}x${size})...`);
    convertSVG(tool, size, outputPath);
  }

  // Generate web manifest
  console.log('\nGenerating site.webmanifest...');
  fs.writeFileSync(
    join(publicDir, 'site.webmanifest'),
    JSON.stringify(manifest, null, 2)
  );

  console.log('\n✅ Favicon package generated successfully!');
  console.log('\nGenerated files:');
  sizes.forEach(({ name }) => console.log(`  • public/${name}`));
  console.log('  • public/site.webmanifest');
  console.log('\nNow update BaseLayout.astro to include the new favicons.\n');
}

main().catch(err => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
