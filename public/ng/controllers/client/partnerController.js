'use strict';
angular.module('ClientApp')
.controller('PartnerCtrl',function RegisterCtrl($rootScope,$scope,$http,Partner,Constants,$window){

	console.log('PartnerCtrl start..');

	
	$scope.keyword = '';
	

	// load partner list

	Partner.query(function(result){
		$scope.partners = result.data;
	});
});