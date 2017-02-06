angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaSocialSharing) {

//add 5 img to scrollign  view and  presentation

    $scope.images = [];
 
    $scope.loadImages = function() {
        for(var i = 0; i < 5; i++) {
            $scope.images.push({id: i, src: "https://dummyimage.com/100x100/000/fff"});
        }
    }

    //social sharing test
     $scope.shareAnywhere = function() {
      // alert('oui ici social');
        $cordovaSocialSharing.share("This is your message", "This is your subject", "www/imagefile.png", "https://www.thepolyglotdeveloper.com");
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





.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('MytabCtrl', function($scope) {




    $scope.images = [];
 
    $scope.loadImages = function() {
        for(var i = 0; i < 50; i++) {
            $scope.images.push({id: i, src: "https://dummyimage.com/50x50/000/fff"});
        }
    }
  $scope.chat = "";
})


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
