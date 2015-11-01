'use strict';
angular.module('AdminApp')


.controller('MaterialController',function MaterialController($rootScope,$scope,$location,$http,$window,Regions,Constants,Meterials,DateRanges){
	
	$scope.materials = Meterials.query();
	$scope.regions = Regions.query();
	$scope.dateRanges = DateRanges;
	$scope.dateAfter = $scope.dateRanges[0];


	Constants.get({name:"Country"}, function(result){
			 		var regions = result.data;
			 		var list =[]
			 		for(var i=0; i<regions.length; i++){
			 			list.push({"name" : regions[i]});
			 		}
			 		$scope.regionsList = list;
			 	});



	$scope.create = function(isValid){
		Meterials.create($scope.material,function(result){
			if(result.status == 'ok'){
				ShowGritterCenter('System Notification','material document has been created');
				setInterval(function(){
  					 $window.location='/admin/material/edit/'+ result.data._id;
				}, 2000); 
			}else{
				ShowGritterCenter('System Notification','material document can not be created..' +  result.messages);
			}
				
		});
	}
})

.controller('EditMaterialController',function EditMaterialController($rootScope,$scope,$location,$http,$modal,$window,Constants,Medias,Meterials,Agents,DateRanges){
	var id = url_params.id;

	// load material record
	$scope.material = Meterials.get(url_params, function(){
		$scope.material = $scope.material.data;	
		// load all agent list
		Agents.query(function(result){
			$scope.allAgents =result.data;
			$scope.RefreshAgentList();
		});
	});


	// load meida image
	Medias.getMediaByTarget({target:'Material'}, function(result){
	 	$scope.medias = result.data;
		$scope.changeMeida = createMediaSelectorFunction($modal, $scope.medias,function( selectedMedia){ 
			$scope.material.media = selectedMedia;
		});
	});

	// load Region List
	Constants.get({name:'Country'}, function(result){
		console.log(result);
		$scope.regions = result.data;
	});

	$scope.selectedAgents = [];
	$scope.unselectedAgents = [];


	

	// $scope.dateRanges = DateRanges;
	// $scope.dateAfter = $scope.dateRanges[0];
	// $scope.regions = Regions.query();
	// $scope.regionNames = [];



	$scope.addAgentPremission =  function(agent){

		$scope.material.agents.push(agent);
		$scope.RefreshAgentList();
	}

	$scope.removeAgentPremission =  function(agent){

		$scope.material.agents = jQuery.grep($scope.material.agents , function(value) {
							  return value._id != agent._id;
							});

		$scope.RefreshAgentList();
	}

	$scope.SelectAllAgentPremission =  function(){
		$scope.material.agents = $scope.allAgents;
		$scope.RefreshAgentList();
	}

	$scope.RemoveAllAgentPremission =  function(){
		$scope.material.agents = [];

		

		$scope.RefreshAgentList();
	}


	var IsObjectExistInArray =  function(arr, object){

	  	var isExist = false;
	  	for (var i = 0; i < arr.length; i++) {
	  		if(arr[i]._id == object._id){
	  			isExist = true;
	  			break;
	  		}
	  	};
	  	return isExist;
	}

	$scope.RefreshAgentList = function(){
		$scope.selectedAgents = jQuery.grep($scope.allAgents , function(value) {
								//return jQuery.inArray(value, $scope.material.agents)  > -1;
								if(IsObjectExistInArray($scope.material.agents, value))
									return true;
								else
									return false;

							});


		$scope.unselectedAgents = jQuery.grep($scope.allAgents , function(value) {
								//return jQuery.inArray(value, $scope.material.agents)  <= -1;
								if(IsObjectExistInArray($scope.material.agents, value))
									return false;
								else
									return true;
							});
	}



	$scope.update = function(){
		Meterials.update($scope.material,function(result){
				if(result.status == 'ok'){
					ShowGritterCenter('System Notification','Material document has been updated');
				}else{
					ShowGritterCenter('System Notification','Material document update fail : ' + result.messages.err);
				}
		});
	}



});

// .directive('resourcePicker', function() {
//   return {
//   	link: function (scope, element, attrs) {
//             element.on('click', function () {
//             	var newMedia = scope.media;
//             	delete newMedia.$$hashKey;

//             	scope.$parent.material.media = newMedia._id;
//             	scope.$parent.material.mediaObject = scope.media;
//             	scope.$parent.$apply();
//             });
//         }
//   };
// })

// .filter('isAfter', function() {
//   return function(medias, dateAfter) {
//      if(!medias || !medias.length){return;}
//      return medias.filter(function(item){
//       return moment(item.createDate).isAfter(dateAfter);
//     })
//   }
// })

// .value('DateRanges', [
//   {name:'All', date:moment().subtract(10, 'year')},
//   {name:'Last one day', date:moment().subtract(1, 'day')},
//   {name:'Last one month', date:moment().subtract(1, 'month')},
//   {name:'Last three months', date:moment().subtract(3, 'month')}
// ])

// .factory('Regions',['$resource',
// 	function($resource){
// 		return $resource('/api/region/:id', {}, {
// 		query:{ method: 'GET'}
// 	});
// }]);



























