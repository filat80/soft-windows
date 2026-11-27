const PREFIX='soft-windows-pwa-'+self.registration.scope+'-';
const CACHE=PREFIX+'v4';
const FILES=['./index.html','./manifest.webmanifest','./pwa.js','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES.map(f=>new Request(new URL(f,self.registration.scope),{cache:'reload'})) ))));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith(PREFIX)&&k!==CACHE)await caches.delete(k);await self.clients.claim();})()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||!e.request.url.startsWith(self.registration.scope))return;const u=new URL(e.request.url);if(e.request.mode==='navigate'){e.respondWith(caches.open(CACHE).then(c=>c.match(new URL('./index.html',self.registration.scope))).then(r=>r||fetch(e.request)));return;}if(FILES.some(f=>new URL(f,self.registration.scope).href===u.href))e.respondWith(caches.open(CACHE).then(c=>c.match(e.request)).then(r=>r||fetch(e.request)));});
