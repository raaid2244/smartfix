import https from 'https';

https.get('https://unsplash.com/s/photos/cctv', (res) => {
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    const regex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9\-]+\?crop=entropy[^\"]+/g;
    const matches = data.match(regex);
    if(matches) {
        console.log([...new Set(matches)].slice(0, 10).join('\n'));
    } else {
        console.log('No matches found');
    }
  });
});
