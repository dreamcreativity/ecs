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
	 		    	ShowGritterCenter('System Notification','Promotion has been updated');
	 		    	setInterval(function(){
  					 $window.location='/admin/promotion/edit/' +result.data._id;
				}, 2000); 
	 			}
 		})
	 }


})

.controller('PromotionDetail', function PromotionDetail($rootScope,$scope,$http,Promotions,Constants,$window){
	 var promotion_id = url_params.id;
	 loading();

	 function loading() {
	 	Promotions.get({id: promotion_id }, function(result){
	 			$scope.promotion = result.data;
	 			$scope.promotion.startDate = new Date($scope.promotion.startDate);
				$scope.promotion.endDate = new Date($scope.promotion.endDate);
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

	  $scope.update = function(isValid){
	 	Promotions.update($scope.promotion,function(result){
	 		    if(result.status == 'ok'){	    
	 		    	ShowGritterCenter('System Notification','Promotion has been updated');
	 			}
 		})
	 }
});