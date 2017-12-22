"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/gov-timeline/index.html","a4390dde59e3c2bfa371fde06f9f3eef"],["/gov-timeline/static/css/main.88f025da.css","02473ae45de86541a84b2425546e1168"],["/gov-timeline/static/js/main.70ab05d4.js","00aa0864fc02db520617023e0e61aad3"],["/gov-timeline/static/media/gillsans-heavy-italic.37a203fc.woff","37a203fce903f6eb46f9e1e818acb921"],["/gov-timeline/static/media/gillsans-heavy-italic.59dec178.ttf","59dec1780b19825b859bc9c00615683e"],["/gov-timeline/static/media/gillsans-heavy-italic.708e8642.woff2","708e864283a1430a65c7fc47e2f8bb3a"],["/gov-timeline/static/media/gillsans-heavy-italic.fe647159.eot","fe647159e94a4ea84cb6f4c918cd3602"],["/gov-timeline/static/media/gillsans-heavy.1441f7a2.woff2","1441f7a2d41f7824740b4d63d8b5c336"],["/gov-timeline/static/media/gillsans-heavy.667e20d8.eot","667e20d84e2973a885582ea2d4f83af5"],["/gov-timeline/static/media/gillsans-heavy.93c896a2.ttf","93c896a2174bf3111b8a9297e2015d0c"],["/gov-timeline/static/media/gillsans-heavy.e12df326.woff","e12df3262c0e04fc604dc0d6ceed4ade"],["/gov-timeline/static/media/gillsans-italic.1748af29.eot","1748af290c11a0c2ba89ea5f1c200553"],["/gov-timeline/static/media/gillsans-italic.6885c19e.ttf","6885c19eaee665d7b6a68ded846a5059"],["/gov-timeline/static/media/gillsans-italic.c99c69cc.woff","c99c69cc3824ad06a9dc2aa336c66d80"],["/gov-timeline/static/media/gillsans-italic.cc06d64e.woff2","cc06d64e668084b230c87ee587eb79e2"],["/gov-timeline/static/media/gillsans-light.24b9433b.woff2","24b9433b974212c9c449295a44dc043a"],["/gov-timeline/static/media/gillsans-light.2ea1cbe1.ttf","2ea1cbe119b3389229d6f28fb8ffe8f0"],["/gov-timeline/static/media/gillsans-light.6ad4b824.woff","6ad4b8245704f17e9e12895618b8d349"],["/gov-timeline/static/media/gillsans-light.b77cf440.svg","b77cf440b17c5f06a08679f40a9afe89"],["/gov-timeline/static/media/gillsans-light.b7928e29.eot","b7928e2903c3291ae1bc049a2e4dfead"],["/gov-timeline/static/media/gillsans-regular.12341fd5.woff","12341fd5d6efd79f0f0bd83d5f5a2abb"],["/gov-timeline/static/media/gillsans-regular.3dac8089.woff2","3dac808959bb033a0529cdfe62274ea0"],["/gov-timeline/static/media/gillsans-regular.77fabd7f.ttf","77fabd7f7938bc52346ee3e9724a858a"],["/gov-timeline/static/media/gillsans-regular.e2206332.eot","e2206332b587a41312e665c430cbc0cb"],["/gov-timeline/static/media/macron.b3c5b8c9.jpg","b3c5b8c92cf6b9787272979d67f0e1e0"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){if(!e.redirected)return Promise.resolve(e);return("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})})},createCacheKey=function(e,t,a,i){var n=new URL(e);return i&&n.pathname.match(i)||(n.search+=(n.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),n.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],i=new URL(t,self.location),n=createCacheKey(i,hashParamName,a,/\.\w{8}\./);return[i.toString(),n]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var i=new Request(a,{credentials:"same-origin"});return fetch(i).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),i="index.html";(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,i),t=urlsToCacheKeys.has(a));var n="/gov-timeline/index.html";!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL(n,self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});