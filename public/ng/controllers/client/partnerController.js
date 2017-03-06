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

		console.log($scope.partners);
	});

	
	$scope.clearSearch = function(){
		$scope.keyword = '';
	}


	$scope.showDetail = function(partner){
		$scope.mode = "detail";
		$scope.partnerDetail = partner;
	}

	$scope.showList =  function(){
		$scope.mode = "list";
	}

})

.filter('unsafe', function($sce) { return $sce.trustAsHtml; })

.animation('.fade', function() {
  return {
    enter: function(element, done) {
      element.css('display', 'none');
      $(element).fadeIn(1000, function() {
        done();
      });
    },
    leave: function(element, done) {
      $(element).fadeOut(1000, function() {
        done();
      });
    },
    move: function(element, done) {
      element.css('display', 'none');
      $(element).slideDown(500, function() {
        done();
      });
    }
  }
});