'use strict';
angular.module('AdminApp')
.controller('StaffCtrl',function StaffCtrl($rootScope,$scope,$http,Regions,Staffs,Constants,$window){
	 var token = sessionStorage.token;
	 loading();
	 //$scope.staffs = loading();
	 $scope.ph_numbr = /^(\d{3})[- ](\d{3})[- ](\d{4})$/;

	 $scope.create = function(isValid){
	 	$scope.returnMessage ="";
	 	$scope.staff.regions =[];
	 	for(var i=0; i<$scope.region_tags.length; i++){
	 		$scope.staff.regions.push($scope.region_tags[i].name);
	 	}
	 	Staffs.save($scope.staff,function(result){
	 			console.log(result);
	 		    ShowGritterCenter('System Notification','Staff has been created');
	 			setInterval(function(){
  					 $window.location='/admin/staff/all';
				}, 2000); 
 		})
	 }

	 function loading() {
	 	var list = [];

	 	Constants.get({name:"Country"}, function(result){
	 		var regions = result.data;
	 		for(var i=0; i<regions.length; i++){
	 			list.push({"name" : regions[i]});
	 		}
	 		$scope.regionsList = list;
	 	});

	 	Staffs.query(function(result){
	 			$scope.staffs = result;
	 		});
	 }


	  $scope.loadCountries = function($query) {
	 	var countries = $scope.regionsList;
	 	return countries.filter(function(country) {
       		 return country.name.toLowerCase().indexOf($query.toLowerCase()) != -1;
      });
	 }
})


.controller('StaffEditCtrl', function StaffEditCtrl($rootScope,$q,$scope,$http,$filter,$modal,Regions,Staffs,Agents,Constants,Medias,$window) {
	var staff_id = url_params.id;
	$scope.ph_numbr = /^(\d{3})[- ](\d{3})[- ](\d{4})$/;
	
	loading();

	$scope.update = function(isValid) {
		$scope.staff.regions =[];
	 	for (var i = 0; i < $scope.region_tags.length; i++) {
	 		$scope.staff.regions.push($scope.region_tags[i].name);
	 	};
	 	Staffs.update($scope.staff, function(result){
	 			var message = result.messages;	    
	 		    ShowGritterCenter('System Notification','Staff has been updated');
	 	})
	 }

	 $scope.getAgentbyRegion = function(name, callback){
	 	return Agents.getAgentbyRegion({name:name}, function(result){
	 		return callback(result.data);
	 	})
	 }

	 function loading() {
	 	var list = [];
	 	Constants.get({name:"Country"}, function(result){
	 		var regions = result.data;
	 		for(var i=0; i<regions.length; i++){
	 			list.push({"name" : regions[i]});
	 		}
	 		if(staff_id !=null){
	 			Staffs.get({id:staff_id}, function(result){
	 				$scope.staff = result.data;
	 				$scope.regionsList = list;
	 				if($scope.staff.regions !=null){
	 				for(var i=0; i<$scope.staff.regions.length; i++){
		 					$scope.region_tags.push({"name" : $scope.staff.regions[i]});
		 					}
		 				var prom =[];
		 				var list =[];
		 				$scope.agents=[];
		 				$scope.staff.regions.forEach(function (obj, i) {
					           prom.push($scope.getAgentbyRegion(obj, function(result){
					           	 list.push(result);
					           }));
					      });
		 				$q.all(prom).then(function(res){
		 					var re= res;
		 					var i = $scope.agents;
		 				});
		 				deferred.resolve();
	 				}


	 			});
	 		}
	 	});
	 }

	 $scope.loadCountries = function($query) {
	 	var countries = $scope.regionsList;
	 	return countries.filter(function(country) {
       		 return country.name.toLowerCase().indexOf($query.toLowerCase()) != -1;
      });
	 }


	 // load meida image
	Medias.getCategoryTargetMedia({target:'Staff',type:'Image'}, function(result){
	 	$scope.meidas = result.data;
	 	console.log($scope.meidas);

			
		$scope.changeCover = createMediaSelectorFunction($modal, $scope.meidas,function( selectedMedia){ 
			$scope.staff.cover = selectedMedia;
		});
	});

});









