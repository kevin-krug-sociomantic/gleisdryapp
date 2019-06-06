

var CACHE_NAME ='shell-cache-v2';
var DATA_CACHE_NAME = 'data-cache-v1';
var urlsToCache = [
  '/',
  '/dist/app.dist.js',
  '/dist/index.html',
  '/node_modules/bootstrap/dist/css/bootstrap.min.css',
  '/offline/'
];

// cache static assets
self.addEventListener( 'install', function( event )
{
    event.waitUntil(
        // Open a cache providing a name
        caches.open( CACHE_NAME ).then( function( cache )
        {
            // addAll requests, fetches all urls and adds them to the cache.
            return cache.addAll( urlsToCache );
        } )
    );
});

self.addEventListener( 'activate', function( event )
{
    console.log('[ServiceWorker] Activate');
    event.waitUntil(
        caches.keys().then( function( keyList )
        {
            return Promise.all( keyList.map( function( key )
            {
                if ( key !== CACHE_NAME && key !== DATA_CACHE_NAME )
                {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete( key );
                }
            } ) );
        } )
    );
    return self.clients.claim();
});

// intercept fetch requests
self.addEventListener( 'fetch', function( event )
{
    console.log( event.request.url );
    var dataUrl = 'https://api.openweathermap.org/data';
    if ( event.request.url.indexOf( dataUrl ) > -1 )
    {
        // cache then network
        event.respondWith(
            caches.open( DATA_CACHE_NAME ).then( function( cache )
            {
                return fetch( event.request ).then( function( response )
                {
                  cache.put( event.request.url, response.clone() );
                  return response;
                } )
                .catch( function()
                {
                    return caches.match( event.request.url ); //
                } );
            } )
        );
    }
    else
    {
        event.respondWith(
            // find any cached results from service worker entries matching request
            caches.match( event.request ).then( function( response )
            {
                return response || fetch( event.request );
            } )
            .catch( function()
            {
                return caches.match( '/offline/' );
            } )
        );
    }
} );
