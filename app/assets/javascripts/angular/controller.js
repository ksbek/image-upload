'use strict';

var myApp = angular.module('app', ['angularFileUpload']);


myApp.controller('AppController', ['$scope', 'FileUploader', '$rootScope', '$http', '$timeout', function($scope, FileUploader, $rootScope, $http, $timeout) {
    
    //Get All Gifs
    $http.get('/images').success(function(result){
        $scope.images = result.images
    });

    var uploader = $scope.uploader = new FileUploader({
        url: '/images',
        alias: 'avatar',
        filters: [{
            name: 'imagefilter',
            fn: function(item) {
                return item.type == 'image/jpg' || item.type == 'image/jpeg' || item.type == 'image/png' || item.type == 'image/gif'
            }
        }]
    });

    // FILTERS

    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
        $scope.images.push(response)
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };

    console.info('uploader', uploader);


    $scope.deleteImage = function(image) {
        $http.delete('/images/'+image.id)
        .success(function(result){
            var index = $scope.images.indexOf(image);
            $scope.images.splice(index,1)
        });
    };

    $scope.pushImage = function(image) {
        $http.put('/images/'+image.id, {status: 'pushed'})
        .success(function(result){
            var index = $scope.images.indexOf(image);
            $scope.images[index] = result

        });
    }
}]);