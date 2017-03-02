angular.module('starter.controllers', ['ionic', 'ui.router'])

.controller('DashCtrl', function($scope, $cordovaSocialSharing, $cordovaFile, ImageService, FileService,$cordovaCamera ) {

//add 5 img to scrollign  view and  presentation

    $scope.images = [];
 
    $scope.loadImages = function() {
        for(var i = 0; i < 5; i++) {
            $scope.images.push({id: i, src: "https://dummyimage.com/100x100/000/fff"});
        }
    }

    //social sharing test
     $scope.shareAnywhere = function() {
       //alert('oui ici social');
        $cordovaSocialSharing.share("This is your message", "This is your subject", "www/img/perry.png", "https://dummyimage.com/100x100/000/fff");
    }

    
   
    //test recup url du projet
    $scope.ding = function() {

        //return   "jaaaddauuiiop" ;
           // return      cordova.file.dataDirectory + 'xyz';

            return cordova.file.externalRootDirectory;
     
   }

     $scope.free=function() {
      return "hello";
      //return Camera.PictureSourceType.SAVEDPHOTOALBUM;
        // alert("library : " + Camera.PictureSourceType.PHOTOLIBRARY);
        //return   "jaaaddauuiiop" ;
            // CHECK
    // return $cordovaFile.checkFile(cordova.file.dataDirectory, "IMG_20170222_091301.jpg")
    //   .then(function (success) {
    //     // success
    //     alert("img trouvée");
    //   }, function (error) {
    //     // error
    //     alert("img non trouvée");
    //   });


    // CHECK
    // $cordovaFile.checkDir(cordova.file.dataDirectory, "Pictures")
    //   .then(function (success) {
    //     return "" +success ;
    //   }, function (error) {
    //     return "" + error;
    //   });




     
   }

   
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

})


.controller('ImageController', function($scope, $cordovaDevice, $cordovaFile, $ionicPlatform, $cordovaEmailComposer, $ionicActionSheet, ImageService, FileService) {
 
  $ionicPlatform.ready(function() {
    $scope.images = FileService.images();
    if(!$scope.$$phase) {
      $scope.$apply();
    }
   
  });
 
  $scope.urlForImage = function(imageName) {
    var trueOrigin = cordova.file.dataDirectory + imageName;
    return trueOrigin;
  }
 
  $scope.addMedia = function() {
    $scope.hideSheet = $ionicActionSheet.show({
      buttons: [
        { text: 'Take photo' },
        { text: 'Photo from library' }
      ],
      titleText: 'Add images',
      cancelText: 'Cancel',
      buttonClicked: function(index) {
        $scope.addImage(index);
      }
    });
  }
 
  $scope.addImage = function(type) {
    $scope.hideSheet();
    ImageService.handleMediaDialog(type).then(function() {
       if(!$scope.$$phase) {
        $scope.$apply();
       }
    });
  }
  
})





.controller('ChatDetailCtrl', function($scope, $stateParams, Chats,firebase) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('MytabCtrl', function($scope,$ionicPopup) {

    $scope.images = [];
    $scope.loadImages = function() {
        for(var i = 0; i < 50; i++) {
            $scope.images.push({id: i, src: "https://dummyimage.com/50x50/000/fff"});
        }
    }
  $scope.chat = "";

  // firebase auth create
  $scope.signupEmail = function(user){  
     //Initialize Firebase
      // var config = {
      //   apiKey: "AIzaSyCMfUBCO-TSQ0Uv9j2uVt44koL_K2oFQAU",
      //   authDomain: "styleroom-a3010.firebaseapp.com",
      //   databaseURL: "https://styleroom-a3010.firebaseio.com",
      //   storageBucket: "styleroom-a3010.appspot.com",
      //   messagingSenderId: "495424637152"
      // };

      // if (!firebase) {
      //   if (firebase.app().name != [DEFAULT]) {
      //    firebase.initializeApp(config);
      //   }
     
      // }

      

      
    firebase.initializeApp(config);
      console.log(firebase.app().name);
      
 
  // var ref = new Firebase("https://styleroom-a3010.firebaseio.com");
 
  // ref.createUser({
  //     email    : $scope.data.email,
  //     password : $scope.data.password
  //   }, function(error, userData) {
  //     if (error) {
  //       console.log("Error creating user:", error);
  //     } else {
  //       console.log("Successfully created user account with uid:", userData.uid);
  //     }
  //   });
   



      var  email  = user.email;
      var password = user.password;
      console.log("mail:", email);
      console.log("password:", password);

   firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(firebaseUser) {
       // Success 
            $ionicPopup.alert({
              title: "l'utilisateur a bien été créé",
              template: 'redirection en cours'
          });

         console.log("user",firebase.auth().currentUser.email);

       }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
           $ionicPopup.alert({
              title: 'create failed!',
              template: 'Please check your credentials!'
          });
    });

    //on affiche le  user

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          email = user.email;

           $ionicPopup.alert({
                  title: 'Create login Ok ok ok !',
                  template: '' + email
              });
        } else {
          // No user is signed in.
        }
      });




 }





})
.controller('LoginCtrl', function($scope,$ionicPopup,$state) {
  $scope.signupEmail = function(user){  
     // Initialize Firebase
      // var config = {
      //   apiKey: "AIzaSyCMfUBCO-TSQ0Uv9j2uVt44koL_K2oFQAU",
      //   authDomain: "styleroom-a3010.firebaseapp.com",
      //   databaseURL: "https://styleroom-a3010.firebaseio.com",
      //   storageBucket: "styleroom-a3010.appspot.com",
      //   messagingSenderId: "495424637152"
      // };
      firebase.initializeApp(config);
   
      var  email  = user.email;
      var password = user.password;
      console.log("mail:", email);
      console.log("password:", password);

   firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
           $ionicPopup.alert({
              title: 'login failed!',
              template: 'Please check your credentials!'
          });
    });
    //fin  auth


      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          email = user.email;

           $ionicPopup.alert({
                  title: 'login réussit !',
                  template: '' + email
              });
           $scope.showmyuser = true;
           $scope.nouser = false;

           $state.go('tab.dash');
        } else {
          // No user is signed in.
          $scope.showmyuser = false;
          $scope.nouser = true;
        }
      });

      $scope.nouser = true;



 }

 $scope.logOut = function(){ 

  firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log('Signed Out');
    }, function(error) {
      // An error happened.
      console.error('Sign Out Error', error);
    });
 
 }

})



.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
