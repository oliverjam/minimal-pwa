# Minimal PWA

https://src-yqbqdyglpz.now.sh/

This was created for a talk about PWAs at Founders & Coders. This repo is both the slides and an example of a simple PWA. You can view the app/slides at the live URL above, or pull this repo and serve it with `npx serve src`.

The service worker code especially is extensively commented to hopefully explain what is happening every step of the way.

`index.html` contains the code that installs the service worker. From there the code in `serviceworker.js` takes over. `manifest.json` contains the configuration telling browsers how to display our PWA.
