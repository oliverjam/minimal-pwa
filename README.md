# Minimal PWA

https://pwa-fac.surge.sh

This was created to supplement my PWA talk at Founders & Coders. You can find the slides for that here: http://slides.com/oliverphillips/pwa

The service worker code especially is extensively commented to hopefully explain what is happening every step of the way.

`index.html` contains the code that installs the service worker. From there the code in `serviceworker.js` takes over. `manifest.json` contains the configuration telling browsers how to display our PWA.
