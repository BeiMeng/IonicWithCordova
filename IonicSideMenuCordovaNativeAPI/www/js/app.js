// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ngCordova','ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (cordova.platformId === 'ios' && window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
  })
        .state('app.accelerometer', {
            url: '/accelerometer',
            views: {
                'menuContent': {
                    templateUrl: 'templates/accelerometer.html',
                    controller: 'DeviceMotionCtrl'
                }
            }
        })
        .state('app.device ', {
            url: '/device',
            views: {
                'menuContent': {
                    templateUrl: 'templates/device.html',
                    controller: 'DeviceCtrl'
                }
            }
        })
        .state('app.networkinformation', {
            url: '/networkinformation',
            views: {
                'menuContent': {
                    templateUrl: 'templates/networkinformation.html',
                    controller: 'NetworkCtrl'
                }
            }
        })
        .state('app.barcodescanner', {
            url: '/barcodescanner',
            views: {
                'menuContent': {
                    templateUrl: 'templates/barcodescanner.html',
                    controller: 'BarcodeScannerCtrl'
                }
            }
        })
        .state('app.compass', {
            url: '/compass',
            views: {
                'menuContent': {
                    templateUrl: 'templates/compass.html',
                    controller: 'CompassCtrl'
                }
            }
        })
        .state('app.geolocation', {
            url: '/geolocation',
            views: {
                'menuContent': {
                    templateUrl: 'templates/geolocation.html',
                    controller: 'GeolocationCtrl'
                }
            }
        })
        .state('app.storage', {
            url: '/storage',
            views: {
                'menuContent': {
                    templateUrl: 'templates/storage.html',
                    controller: 'StorageCtrl'
                }
            }
        })
        .state('app.database', {
            url: '/database',
            views: {
                'menuContent': {
                    templateUrl: 'templates/database.html',
                    controller: 'DatabaseCtrl'
                }
            }
        })
        .state('app.camera', {
            url: '/camera',
            views: {
                'menuContent': {
                    templateUrl: 'templates/camera.html',
                    controller: 'CameraCtrl'
                }
            }
        })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
