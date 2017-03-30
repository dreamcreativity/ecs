'use strict';
angular.module('ClientApp')
.controller('PartnerCtrl',function PartnerCtrl($rootScope,$scope,$http,Partner,Constants,$window,$location,$sce, $timeout){

	console.log('PartnerCtrl start..');

	$scope.keywordEnter = '';	
	$scope.keyword = '';


	// load partner list

	Partner.keywords(function(result){
		$scope.data = result.data;
	});

	

	Partner.query(function(result){
		$scope.partners = result.data;
	});

	
	$scope.clearSearch = function(){
		$scope.keywordEnter = '';
		$scope.keyword = '';
	}


	$scope.enterKeyword = function(){
		// console.log($scope.keywordEnter);
		// $scope.keyword = $scope.keywordEnter;

		Partner.addKeyRecord({key: $scope.keywordEnter, type: 'partner'}, function(err, result){

			console.log(result);

		});

		$timeout(function(){
			//console.log($scope.keywordEnter);
			$scope.keyword = $scope.keywordEnter;
			$scope.keywordEnter = '';
		});

		// send keyword to api as a record

	}

	$scope.showDetail = function(partner_id){
		location = '/partner/'+partner_id;
	}

	$scope.partnerHasTag = function(partner){

		if($scope.keyword.trim()=='')
			return true;

		var isTagFound = false;

		angular.forEach(partner.tags, function(value, key) {
		  	var tagVal = value.replace('-',' ');
		  	if( tagVal == $scope.keyword){
		  		isTagFound = true;
		  	}
		});

		return isTagFound;
	}


})

.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
})

.controller('PartnerDetailCtrl',function PartnerDetailCtrl($rootScope,$scope,$http,Partner,Constants,$window,$sce){

	console.log('PartnerDetailCtrl start..');


	console.log(url_params);
	Partner.get({id: url_params.id}, function(result){

		if(result.status == 'ok')
			$scope.partnerDetail = result.data;
		console.log(result);
	})


})

.filter('unsafe', function($sce) { return $sce.trustAsHtml; });
