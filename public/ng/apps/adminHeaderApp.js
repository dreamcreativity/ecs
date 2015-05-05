'use strict';



angular.module('ActivityApp').controller('Ctrlr1', ['$scope','$http','$window','$location', function($scope,$http,$window,$location){
	$scope.ssss = 'test';
}]);


// .factory('authInterceptor', function ($rootScope, $q, $window) {
//   return {
//     request: function (config) {
//       config.headers = config.headers || {};
//       if ($window.sessionStorage.token) {
//         config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
//         config.headers.token = $window.sessionStorage.token;
//       }
//       return config;
//     },
//     response: function (response) {
//       if (response.status === 401) {
//         // handle the case where the user is not authenticated
//       }
//       if (response.status === 403) {
//         console.log('please log in ');
//       }
//       return response || $q.when(response);
//     }
//   };
// })

// .config(function ($httpProvider) {
//   $httpProvider.interceptors.push('authInterceptor');
// });

