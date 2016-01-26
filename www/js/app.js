// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase', 'chart.js'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/landing.html',
    controller: 'AppCtrl'
  })

    .state('app.login', {
    url: '/login',
    views: {
      'landing': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  })

    .state('app.home', {
    url: '/home',
    views: {
      'landing': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

    .state('app.newgame1', {
    cache: false,
    url: '/game1/new/:retry',
    views: {
      'landing': {
        templateUrl: 'templates/new-game-1.html',
        controller: 'NewGameCtrl'
      }
    }
  })

    .state('app.newgame2', {
    cache: false,
    url: '/game2/new/:retry',
    views: {
      'landing': {
        templateUrl: 'templates/new-game-2.html',
        controller: 'NewGameCtrl'
      }
    }
  })

    .state('app.newgame3', {
    cache: false,
    url: '/game3/new/:retry',
    views: {
      'landing': {
        templateUrl: 'templates/new-game-3.html',
        controller: 'NewGameCtrl'
      }
    }
  })

    .state('app.newgame4', {
    cache: false,
    url: '/game4/new/:retry',
    views: {
      'landing': {
        templateUrl: 'templates/new-game-4.html',
        controller: 'NewGameCtrl'
      }
    }
  })

    .state('app.newgamehome', {
    cache: false,
    url: '/game/new/home',
    views: {
      'landing': {
        templateUrl: 'templates/new-game-home.html',
        controller: 'NewGameHomeCtrl'
      }
    }
  })

    .state('app.highscores', {
    url: '/game/highscores',
    views: {
      'landing': {
        templateUrl: 'templates/high-scores.html',
        controller: 'HighScoresCtrl'
      }
    }
  })

    .state('app.myscores', {
    url: '/game/myscores',
    views: {
      'landing': {
        templateUrl: 'templates/my-scores.html',
        controller: 'MyScoresCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
  // $urlRouterProvider.otherwise('/app/game4/new/false');
});
