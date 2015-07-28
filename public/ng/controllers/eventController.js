'use strict';
angular.module('AdminApp')

.controller('EventCtrl',function EventCtrl($rootScope,$scope,$http,Events,$window){
	loading();

	function loading() {
		$scope.events = Events.query();
	}

})