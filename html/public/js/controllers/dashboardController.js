'use strict'

angular
	.module('controllers.dashboard',['angular-jwt'])
	.controller('DashboardController',DashboardController);

 DashboardController.$inject = ['$scope','$http','$location','Staffs'];

 function DashboardController(jwtHelper,$scope,$http,$location,Staffs){
 	var token = sessionStorage.token;
 	var tokenPayload = jwtHelper.decodeToken(token);
 	$scope.staff = Staffs.get({id:'54d03229b35b9b2602829de3'});
 	$scope.staffs = getAllStaffs();

 	function getAllStaffs(){
 		return Staffs.query();
 	}

 	function getStaff(){

 	}
 }