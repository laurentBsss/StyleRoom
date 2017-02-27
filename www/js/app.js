// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','firebase', 'starter.controllers', 'starter.services','ngCordova'])

.run(function($ionicPlatform, $ionicPopup,$interval, $cordovaFile) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    //add test network connection
    function checkConnection() {
     if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                        title: "No Internet Conection",
                        content: "The internet is disconnected on your device.Please reconnect and try again"
                    })
                    .then(function(result) {
                        if(!result) {
                          //faire quitter l app au  bout de 30 s??
                           // ionic.Platform.exitApp();
                        }
                    });
                }
            }
        }
      //tchek connection toute les 7secondes
      $interval(function(){
        
        checkConnection();
      }, 7000)



    //end test network connection

    //test dir existence
     // CHECK
     //alert(cordova.file.dataDirectory);
    $cordovaFile.checkDir(cordova.file.externalRootDirectory, "styleroom")
      .then(function (success) {
        // success


        alert("exist");


      }, function (error) {
        // error
        alert("dir n'existe pas");
      });




      // CREATE
        $cordovaFile.createDir(cordova.file.externalRootDirectory, "styleroom", false)
          .then(function (success) {
            // success

        alert("dossier creé");
          }, function (error) {
            // error

        //alert("aurait du creer un dossier");
          });



           // Initialize Firebase
      // var config = {
      //   apiKey: "AIzaSyCMfUBCO-TSQ0Uv9j2uVt44koL_K2oFQAU",
      //   authDomain: "styleroom-a3010.firebaseapp.com",
      //   databaseURL: "https://styleroom-a3010.firebaseio.com",
      //   storageBucket: "styleroom-a3010.appspot.com",
      //   messagingSenderId: "495424637152"
      // };
      // firebase.initializeApp(config);



  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ImageController'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.share', {
   url: '/share',
   views: {
     'tab-share': {
       templateUrl: 'templates/tab-share.html',
        controller: 'ShareCtrl'
     }
   }
 })

  .state('tab.login', {
   url: '/login',
   views: {
     'tab-login': {
       templateUrl: 'templates/tab-login.html',
        controller: 'LoginCtrl'
     }
   }
 })

  .state('tab.mytab', {
   url: '/mytab',
   views: {
     'tab-mytab': {
       templateUrl: 'templates/tab-mytab.html',
        controller: 'MytabCtrl'
     }
   }
 });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
