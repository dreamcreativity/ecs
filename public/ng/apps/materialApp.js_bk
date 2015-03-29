'use strict';

angular.module('materialApp', ['ngRoute','ngResource'])

.controller('MaterialCtrl',function StaffController($rootScope,$scope,$http,Staffs,$window){
	
})

.factory('Materials', ['$resource',
	function($resource){
		return $resource('http://localhost:3000/api/materials/id', {}, {
			query:{ method: 'GET'},
		update : { method : 'PUT', params: {id:'@_id'}}
	});
	}]);