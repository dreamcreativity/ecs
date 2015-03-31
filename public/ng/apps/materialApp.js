'use strict';

angular.module('materialApp', ['ngResource','esc.filters','esc.resources'])

.controller('NewMeterialController',function NewMeterialController($rootScope,$scope,$location,$http,$window,Regions,Medias,Meterials){

	//var token = sessionStorage.token;
	
	$scope.material = {
		'name' : '',
		'description':'',
		'region' : ''
	};
	$scope.regions = Regions.query();
	console.log($scope.regions);

	$scope.create = function(){
		Meterials.create($scope.material,function(result){

			if(result.status == 'ok'){
				location = '/admin/material/edit/'+ result.data._id;
			}else{
				ShowGritterCenter('System Notification','material document can not be created..' +  result.messages);
				console.log(result.messages);
			}
				
		});
	}
})

.controller('MaterialController',function MaterialController($rootScope,$scope,$location,$http,$window,Regions,Meterials){
	
	$scope.materials = Meterials.query();
	$scope.regions = Regions.query();
})

.controller('EditMaterialController',function EditMaterialController($rootScope,$scope,$location,$http,$window,Regions,Medias,Meterials){
	var id = url_params.id;

	$scope.material = Meterials.get(url_params, function(){
		$scope.material = $scope.material.data;	
	});


	$scope.regions = Regions.query();
	$scope.regionNames = [];


	$scope.resourceSearch = '';
	$scope.resourceType = '';
	$scope.resourceDate = '';


	//$scope.medias = Medias.query({'targer':'Material'});

	$scope.medias = getMedias();

	$scope.update = function(){
		Meterials.update($scope.material,function(result){
				if(result.status == 'ok'){
					ShowGritterCenter('System Notification','Material document has been updated');
				}else{
					ShowGritterCenter('System Notification','Material document update fail : ' + result.messages.err);
				}
		});
	}

	function getMedias(){
		return Medias.query({'target': 'Material'});
	}

})

.directive('resourcePicker', function() {
  return {
  	link: function (scope, element, attrs) {
            element.on('click', function () {
            	var newMedia = scope.media;
            	delete newMedia.$$hashKey;

            	scope.$parent.material.media = newMedia._id;
            	scope.$parent.material.mediaObject = scope.media;
            	scope.$parent.$apply();
            });
        }
  };
})

.factory('Regions',['$resource',
	function($resource){
		return $resource('/api/region/:id', {}, {
		query:{ method: 'GET'}
	});
}])
	
.factory('Meterials',['$resource',
	function($resource){
		return $resource('/api/materials/:id', {}, {
		query:{method: 'GET'},
		create:{ method: 'POST'},
		get:{ method: 'GET', params: {id:'@_id'} },
		update:{ method: 'PUT', params: {id:'@_id'} }
	});
}]);


// .factory('Medias',['$resource',
// 	function($resource){
// 		return $resource('/api/region/', {}, {
// 		query:{ method: 'GET'}
// 	});
// }]);
