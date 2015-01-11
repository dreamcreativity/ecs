'use strict';

angular.module('EscApp', [
    'ngRoute'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/employees', {templateUrl: 'subviews/view1.html'});
    $routeProvider.otherwise({redirectTo: '/'});
}]);