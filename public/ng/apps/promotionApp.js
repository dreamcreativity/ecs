'use strict';

angular.module('promotionApp', ['ngRoute','ngResource','ngBootbox'])


.controller('PromotionCtrl',function AgentCtrl($rootScope,$scope,$http,Promotions,$window){
	 $scope.promotions = getAllPromotions();

 	function getAllPromotions(){
 		return Promotions.query();
 	}

 	$scope.create = function(isValid){
	 	Agents.save($scope.agent,function(result){
	 		    var message = result.messages;	    
	 		     $scope.returnMessage = "successfully";
	 			setInterval(function(){
  					 $window.location='/admin/promotion/all';
				}, 2000); 
 		})
	 }



})

.controller('PromotionEditCtrl', function PromotionEditCtrl($rootScope,$scope,$http,Promotions,$window) {
	var promotion_id = url_params.id;

	 if(promotion_id !=null){
	 	Promotion.get({id:promotion_id}, function(result){
	 		$scope.promotion = result.data;
	 	});
	 	
	 }

	$scope.update = function(isValid) {
	 	Promotions.update($scope.promotions, function(result){
	 			var message = result.messages;	    
	 		    $rootScope.returnMessage = message;
	 			$window.location='/admin/promotion/all';
	 	})
	 }
})


.factory('Promotions',['$resource',
	function($resource){
		return $resource('http://localhost:3000/api/promotion/:id', {}, {
		query:{ method: 'GET'},
		update : { method : 'PUT', params: {id:'@_id'}}
	});
}])
