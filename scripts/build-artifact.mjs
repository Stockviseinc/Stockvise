// Bundles dist/ into one self-contained HTML page for publishing as an Artifact.
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';

const assets = readdirSync('dist/assets');
const css = readFileSync(`dist/assets/${assets.find((f) => f.endsWith('.css'))}`, 'utf8');
const js = readFileSync(`dist/assets/${assets.find((f) => f.endsWith('.js'))}`, 'utf8').replace(/<\/script/gi, '<\/script');

const html = `<title>Stockvise</title>
<meta name="description" content="Stockvise, the inventory intelligence agent for Shopify and Amazon sellers. One thoughtful email, clear recommendations, and a memory that grows with your business.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>${css}</style>
<div id="root"></div>
<script type="module">${js}</script>
`;
mkdirSync('publish', { recursive: true });
writeFileSync('publish/stockvise.html', html);
console.log(`publish/stockvise.html · ${(html.length / 1024).toFixed(0)} KB`);
