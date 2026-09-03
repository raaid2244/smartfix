const fs = require('fs');
let svg = fs.readFileSync('public/world-map.svg', 'utf8');

// Strip existing fills and strokes that might be on paths
svg = svg.replace(/fill="[^"]*"/g, '');
svg = svg.replace(/stroke="[^"]*"/g, '');
svg = svg.replace(/style="[^"]*"/g, '');

// The paths often have a newline after <path, like <path\n  id="..."
// So we match <path and any trailing whitespace/newlines
svg = svg.replace(/<path\s+/g, '<path fill="#000000" stroke="#94a3b8" stroke-width="1.5" stroke-linejoin="round" ');

fs.writeFileSync('public/world-map-outline.svg', svg);
