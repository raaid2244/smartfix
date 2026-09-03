const fs = require('fs');

const svgStr = fs.readFileSync('public/world-map-outline.svg', 'utf8');

const pathsMatch = svgStr.match(/<path[^>]*d="[^"]+"[^>]*>/gi);
let paths = '';
if (pathsMatch) {
  paths = pathsMatch.map(p => {
    let cleaned = p.replace(/fill="[^"]*"/g, '').replace(/stroke="[^"]*"/g, '').replace(/style="[^"]*"/g, '');
    if (!cleaned.endsWith('/>')) {
      cleaned = cleaned.replace(/>$/, ' />');
    }
    return cleaned;
  }).join('\n');
}

const newSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg viewBox="660 210 150 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <g fill="#1e293b" stroke="#334155" stroke-width="0.3" stroke-linejoin="round">
    ${paths}
  </g>
</svg>`;

fs.writeFileSync('src/assets/regional-map.svg', newSvg);
console.log('Regenerated SVG');
