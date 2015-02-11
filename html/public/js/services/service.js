'use strict'

angular
	.module('services.staff',['ngResource'])
    .factory('Staffs', staff);

function staff($resource) {
	return $resource('http://localhost:3000/api/staffs:id', {}, {
		query:{method: 'GET'}
	});
}

//--------------OR-----------------------
/*
var service = angular.module('services.staff',['ngResource']);

service.factory('Staffs',['$resource',
	function($resource){
		return $resource('http://localhost:3000/api/staffs:id', {}, {
		query:{method: 'GET'}
	});
}]);
*/