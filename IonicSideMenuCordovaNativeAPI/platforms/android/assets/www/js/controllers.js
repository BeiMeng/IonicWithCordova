angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('DeviceMotionCtrl', function ($scope, $stateParams, $cordovaDeviceMotion) {
    $scope.DeviceMotionModel = {};
    var watch;

    $scope.getAcceleration = function () {
        $cordovaDeviceMotion.getCurrentAcceleration().then(function (acceleration) {
            $scope.DeviceMotionModel.CurrentAccelerationX = acceleration.x;
        }, function (err) {
            console.log(err);
        });
    };

    $scope.watchAcceleration = function () {
        var options = { frequency: 1000 };  // Update every 1 second
        watch = $cordovaDeviceMotion.watchAcceleration(options);
        watch.then(
          function () {/* unused */ },
          function (err) { },
          function (acceleration) {
              $scope.DeviceMotionModel.AccelerationX = acceleration.x;
              $scope.DeviceMotionModel.AccelerationY = acceleration.y;
              $scope.DeviceMotionModel.AccelerationZ = acceleration.z;
              $scope.DeviceMotionModel.Timestamp = acceleration.timestamp;
          });
    };
    $scope.clearWatch = function () {
        // use watchID from watchAccelaration()
        if (!watch) { return; }
        $cordovaDeviceMotion.clearWatch(watch.watchID);
            //.then(function (result) {
        //    // Success! 
        //}, function (err) {
        //    // An error occured. Show a message to the user
        //});
    }
})


.controller('DeviceCtrl', function ($scope, $stateParams, $cordovaDevice) {
    $scope.deviceInfos = {};

    $scope.deviceInfos.DeviceModel =$cordovaDevice.getModel();
    $scope.deviceInfos.CordovaVersion = $cordovaDevice.getCordova();
    $scope.deviceInfos.DeviceUUID = $cordovaDevice.getUUID();
    $scope.deviceInfos.OperatingSystem = $cordovaDevice.getPlatform();
    $scope.deviceInfos.OperatingSystemVersion = $cordovaDevice.getVersion();

    //var device = $cordovaDevice.getDevice();


})
.controller('NetworkCtrl', function ($scope, $stateParams,$cordovaNetwork) {
    $scope.deviceInfos = {};
 
    $scope.deviceInfos.IsOnLine = $cordovaNetwork.isOnline();
 
    $scope.deviceInfos.IsOffLine = $cordovaNetwork.isOffline();
    $scope.deviceInfos.NetworkInformation = $cordovaNetwork.getNetwork();
})
.controller('BarcodeScannerCtrl', function ($scope, $stateParams, $cordovaBarcodeScanner) {
    $scope.BarcodeScannerModel = {}

    $scope.scanBarcode = function () {
        $cordovaBarcodeScanner.scan().then(function (imageData) {
            $scope.BarcodeScannerModel.scanBarcodeModel = "We got a barcode\n" +
                        "Result: " + imageData.text + "\n" +
                        "Format: " + imageData.format + "\n" +
                        "Cancelled: " + imageData.cancelled
        }, function (err) {
            $scope.BarcodeScannerModel.scanBarcodeModel=err;
        });
    };


    // NOTE: encoding not functioning yet
    $scope.encodeData = function () {
        $cordovaBarcodeScanner.encode("TEXT_TYPE", "http://www.nytimes.com").then(function (success) {
            console.log("encode"+success);
        }, function (err) {
            console.log("encode" + err);
        });
    }
})
.controller('CompassCtrl', function ($scope, $cordovaDeviceOrientation) {
    var watch;
    document.addEventListener("deviceready", function () {

        $scope.getCurrentHeading = function () {
            $cordovaDeviceOrientation.getCurrentHeading().then(function (result) {
                var magneticHeading = result.magneticHeading;
                var trueHeading = result.trueHeading;
                var accuracy = result.headingAccuracy;
                var timeStamp = result.timestamp;
                $scope.CurrentMagneticHeading = magneticHeading;
            }, function (err) {
                console.log(err.magneticHeading);
            });
        };

        $scope.watchHeading = function () {
            var options = { frequency: 1000 };  // Update every 1 second
            watch = $cordovaDeviceMotion.watchHeading(options);
            watch.then(
              function () {/* unused */ },
              function (err) { },
              function (acceleration) {
                  var magneticHeading = result.magneticHeading;
                  var trueHeading = result.trueHeading;
                  var accuracy = result.headingAccuracy;
                  var timeStamp = result.timestamp;
                  $scope.MagneticHeading = magneticHeading;
              });
        };

        $scope.clearWatch = function () {
            //watch.clearWatch();
            // OR
            $cordovaDeviceOrientation.clearWatch(watch.watchID);
              //.then(function (result) {
              //    // Success!
              //}, function (err) {
              //    // An error occurred
              //});
        };
    }, false);
})
.controller('GeolocationCtrl', function ($scope, $cordovaGeolocation) {
    $scope.GeolocationModel = {};

    var posOptions = { timeout: 10000, enableHighAccuracy: false };

    $scope.getCurrentPosition = function () {
        $cordovaGeolocation
          .getCurrentPosition(posOptions)
          .then(function (position) {
              $scope.GeolocationModel.CurrentLatitude = position.coords.latitude
              $scope.GeolocationModel.CurrentLongitude = position.coords.longitude
          }, function (err) {
              // error
          });
    };
    var watch
    $scope.startWatchPosition = function () {
        var watchOptions = {
            timeout: 3000,
            enableHighAccuracy: false // may cause errors if true
        };

        watch = $cordovaGeolocation.watchPosition(watchOptions);
        watch.then(
          null,
          function (err) {
              // error
          },
          function (position) {
              $scope.GeolocationModel.Latitude = position.coords.latitude
              $scope.GeolocationModel.Longitude = position.coords.longitude
          });
    };
    $scope.stopWatchPosition = function () {
        watch.clearWatch();
    };
})
.controller('StorageCtrl', function ($scope) {
    $scope.StorageModel = {};
    $scope.StorageModel.Key = "A";
    $scope.StorageModel.Value = "B";
    $scope.StorageModel.SavedValue = "C";
    $scope.SaveItem = function () {
        window.localStorage.setItem($scope.StorageModel.Key, $scope.StorageModel.Value);
    };
    $scope.GetItem = function () {
        $scope.StorageModel.SavedValue = window.localStorage.getItem($scope.StorageModel.Key);
    };
    $scope.DeleteItem = function () {
        window.localStorage.removeItem($scope.StorageModel.Key);
    };
})
.controller('DatabaseCtrl', function ($scope, $cordovaSQLite) {
    $scope.StorageModel = {};
    $scope.StorageModel.Key = "A";
    $scope.StorageModel.Value = "B";
    //猜测新建并打开一个新的BeiDream.db
    var db = $cordovaSQLite.openDB({ name: "BeiDream.db" });

    // for opening a background db:猜测打开一个存在的BeiDream.db
    //var db = $cordovaSQLite.openDB({ name: "BeiDream.db", bgType: 1 });
    $scope.execute = function () {
        var query = "INSERT INTO test_table (data, data_num) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [$scope.StorageModel.Key, $scope.StorageModel.Value]).then(function (res) {
            $scope.StorageModel.Id = res.insertId;
        }, function (err) {
            console.error(err);
        });
    };
})
.controller('CameraCtrl', function ($scope, $cordovaCamera) {
    $scope.ImgUrl = "AA";
    var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation: true
    };
    $scope.getPicture = function () {
        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.ImgUrl = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            // error
        });
    };

});
