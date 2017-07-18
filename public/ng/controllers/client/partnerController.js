'use strict';
angular.module('ClientApp')
.controller('PartnerCtrl',function PartnerCtrl($rootScope,$scope,$http,Partner,Constants,$window,$location,$sce, $timeout){

	console.log('PartnerCtrl start..');



	// load partner list

	// Partner.keywords(function(result){
	// 	console.log(result.data);
	// 	$scope.data = result.data;
	// });


	Partner.query(function(result){
		$scope.partners = result.data;
	});


	Partner.getAreaCategoryList(function(result){
		$scope.areas = result.data;	
	});


	$scope.showDetail = function(partner_id){

		location = '/partner/'+partner_id;
	}

	$scope.selectedCategoryId = '';


	$scope.changeSelectedCategory = function(area_id){
		$scope.selectedCategoryId = area_id;
	}

	$scope.showAllCategory = function(area_id){
		$scope.selectedCategoryId = '';
	}


	$scope.isSelectedCategory = function(areas){
		
		if($scope.selectedCategoryId == '')
			return true;
		
		var isFound = false;
		areas.forEach(function(element) {
		    //console.log(element);
		    if(element == $scope.selectedCategoryId)
		    	isFound = true;
		});

		return isFound;

	}

	// $scope.keywordEnter = '';	
	// $scope.keyword = '';

	// $scope.enterKeyword = function(){
	// 	$timeout(function(){

	// 		$scope.keyword = $scope.keywordEnter;
	// 		Partner.addKeyRecord({key: $scope.keywordEnter, type: 'partner'}, function(err, result){

	// 		});
	// 	});
	// }


	// $scope.clearSearch = function(){
	// 	$scope.keywordEnter = '';
	// 	$scope.keyword = '';
	// }

	// $scope.partnerHasTag = function(partner){

	// 	if($scope.keyword.trim()=='')
	// 		return true;

	// 	var isTagFound = false;

	// 	angular.forEach(partner.tags, function(value, key) {
	// 	  	var tagVal = value.toLowerCase().split('-').join(' ');
	// 	  	if( tagVal == $scope.keyword.toLowerCase()){
	// 	  		isTagFound = true;
	// 	  	}
	// 	});

	// 	return isTagFound;
	// }


})

// .directive('ngEnter', function () {
//     return function (scope, element, attrs) {
//         element.bind("keydown keypress", function (event) {
//             if(event.which === 13) {
//                 scope.$apply(function (){
//                     scope.$eval(attrs.ngEnter);
//                 });
 
//                 event.preventDefault();
//             }
//         });
//     };
// })

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
