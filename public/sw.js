/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js',
);

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */

// Fuse-Box assets will be injected here
const cached = [];

workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(
  [
    // You can add here external scripts/styles
    // They will be cached
    //
    // 'https://use.fontawesome.com/releases/v5.0.6/css/all.css',
  ].concat(cached),
);
