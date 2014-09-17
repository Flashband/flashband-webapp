'use strict';

angular.module('flashbandWebapp').controller('EnableFlashbandsCtrl', function ($scope, $upload) {
  $scope.message = false;

  $scope.uploadFile = function() {
    $scope.message = {
      type: "warning",
      text: "FLASHBAND.MESSAGE.ERROR.VALIDATION"
    };
  };

  $scope.onFileSelect = function($files) {
    $scope.flashbandsEnabled = false;
    var onSuccess = function(data) { //(data, status, headers, config)
      $scope.flashbandsEnabled = true;
      $scope.message = data.message;
    };

    var onProgress = function(evt) {
      console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
    };

    //$files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
      $scope.upload = $upload.upload({
        method: 'POST',
        url: 'http://localhost:1337/flashband/enable',
        data: { name: $scope.name },
        file: file, // or list of files ($files) for html5 only
        fileFormDataName: 'flashbands' //or a list of names for multiple files (html5). Default is 'file', customize file formData name ('Content-Disposition'), server side file variable name.
        //fileName: 'flashbands-to-enable.csv', // or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
        //headers: {'header-key': 'header-value'},
        //withCredentials: true,
        //formDataAppender: function(formData, key, val){} //customize how data is added to formData. See #40#issuecomment-28612000 for sample code
      }).progress(onProgress).success(onSuccess);
      //.error(...)
      //.then(success, error, progress);
      // access or attach event listeners to the underlying XMLHttpRequest.
      //.xhr(function(xhr){xhr.upload.addEventListener(...)})
    }
    /* alternative way of uploading, send the file binary with the file's content-type.
       Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed.
       It could also be used to monitor the progress of a normal http post/put request with large data*/
    // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
  };
});
