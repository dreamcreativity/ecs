'use strict';
angular.module('ClientApp')
.controller('PartnerCtrl',function RegisterCtrl($rootScope,$scope,$http,Partner,Constants,$window,$sce){

	console.log('PartnerCtrl start..');


	$scope.keyword = '';
	
	$scope.mode = "list";
	$scope.partnerDetail = null; 

	// load partner list

	Partner.query(function(result){
		$scope.partners = result.data;
	});

	
	$scope.clearSearch = function(){
		$scope.keyword = '';
	}


	$scope.showDetail = function(partner){
		//$scope.mode = "detail";
		
		$scope.partnerDetail = partner;


	}

	$scope.showList =  function(){
		$scope.mode = "list";
	}

})

.filter('unsafe', function($sce) { return $sce.trustAsHtml; });

