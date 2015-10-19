'use strict';
angular.module('AdminApp')

.controller('PromotionCtrl',function AgentCtrl($rootScope,$scope,$http,Promotions,Constants,$window){
	 loading();

	 function loading() {
	 	Promotions.query(function(result){
	 			$scope.promotions = result;
	 		});

	 	Constants.get({name:"Country"}, function(result){
			 		var regions = result.data;
			 		var list =[]
			 		for(var i=0; i<regions.length; i++){
			 			list.push({"name" : regions[i]});
			 		}
			 		$scope.regionsList = list;
			 	});
	 }

	 $scope.create = function(isValid){
	 	Promotions.create($scope.promotion,function(result){
	 		    if(result.status == 'ok'){	    
	 		    	ShowGritterCenter('System Notification','Material document has been updated');
	 			}
	 			setInterval(function(){
  					 $window.location='/admin/promotion/all';
				}, 2000); 
 		})
	 }


});