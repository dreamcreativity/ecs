'use strict';
angular.module('AdminApp')

.controller('DashboardController',function DashboardController($rootScope,$scope,$http,Students,Agents, Staffs,$window){

	Students.getTopRegistrations(function(data){
			$scope.registrations = data.data;
		});

	Staffs.query(function(result){
	 			$scope.staffs = result.data;
	 		});

	Agents.query(function(result){
	 			$scope.agents = result.data;
	 		});

	Students.query(function(result){
	 			$scope.students = result.data;
	 		});

});