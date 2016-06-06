	'use strict';
	angular.module('AdminApp')

	.controller('EventCtrl',function EventCtrl($rootScope,$scope,$http,Events,Medias,$window,DateRanges){
		$scope.dateRanges = DateRanges;
		$scope.dateAfter = $scope.dateRanges[0];
		loading();

		function loading() {
			$scope.events = Events.query();
		
			Medias.get({target : 'Event'},function(result){
				$scope.medias=result;
			})
		}

		$scope.create = function(isValid){
			
			Events.save($scope.event,function(result){
				if(result.type == true){
					ShowGritterCenter('System Notification','Event document has been updated');
					setInterval(function(){
  					 $window.location='/admin/event/detail/' + result.data._id;
				}, 2000); 
				}else{
					ShowGritterCenter('System Notification','Event document update fail : ' + result.messages.err);
				}
			})
		}

	})

	.controller('EventEditCtrl', function ActivityEditCtrl($scope,$http,Events,$modal,Medias,$window,DateRanges){
		var event_id = url_params.id;
		$scope.dateRanges = DateRanges;
		$scope.dateAfter = $scope.dateRanges[0];
		$scope.array = [];

		if(event_id !=null){
			Events.get({id:event_id}, function(result){
				$scope.event = result.data;
				$scope.event.date = new Date($scope.event.date);
			});	
		}

		Medias.getCategoryTargetMedia({target : 'Event', type:'Image'},function(result){
			$scope.medias=result.data;
			//console.log($scope.medias);

			// init text editor
	 		$('#event-desc').wysihtml5();


			$scope.changeCover = createMediaSelectorFunction($modal, $scope.medias,function(selectedMedia){ 
				$scope.event.cover = selectedMedia;
			});

		})

		$scope.update = function(isValid) {

			$scope.event.description = $($('.wysihtml5-sandbox')[0].contentDocument).find('body').first().html();

			console.log($scope.event);
			Events.update($scope.event, function(result){
	 		 if(result.type == true){
	 		 	ShowGritterCenter('System Notification','Event document has been updated');
	 
	 		 }else{
	 		 	ShowGritterCenter('System Notification','Event document update fail : ' + result.messages.err);
	 		 }
	 		})
		}
	})


	.filter('isAfter', function() {
		return function(medias, dateAfter) {
			if(!medias || !medias.length){return;}
			return medias.filter(function(item){
				return moment(item.createDate).isAfter(dateAfter);
			})
		}
	})

	// .value('DateRangesEvent', [
	// 	{name:'All', date:moment().subtract(10, 'year')},
	// 	{name:'Last one day', date:moment().subtract(1, 'day')},
	// 	{name:'Last one month', date:moment().subtract(1, 'month')},
	// 	{name:'Last three months', date:moment().subtract(3, 'month')}
	// 	])

	.directive("checkboxSelectEvent", function () {
			return {
				restrict: "A",
				link: function (scope, elem, attrs) {
		        // Update array on click
		        elem.bind('click', function () {
		        	scope.array[0] = scope.item._id;
		        	scope.$apply();
		        });

		    }
		}
	})

	.directive("checkboxUnselectEvent", function () {
			return {
				restrict: "A",
				link: function (scope, elem, attrs) {
		        // Update array on click
		        elem.bind('click', function () {
		        	var index = scope.array.indexOf(scope.item._id);
					scope.array.splice(index, 1);     
	                scope.$apply();
		        });
		    }
		}
	})

	.controller('EventStaticCtrl', function ActivityEditCtrl($scope,$http,Events,$modal,Medias,$window,DateRanges){

		Events.getStaticEvent({},function(result){
			
			$scope.staticEvent = result.data;
			
			//$scope.staticEvent.modified = new Date();
			console.log($scope.staticEvent);
		});	

		Medias.getCategoryTargetMedia({target : 'Event', type:'Document'},function(result){
			$scope.medias=result.data;
			//console.log($scope.medias);

  
			$scope.changeEvent = createMediaSelectorFunction($modal, $scope.medias,function(selectedMedia){ 
				//$scope.event.cover = selectedMedia;
				//console.log(selectedMedia);
				$scope.staticEvent.media = selectedMedia;
			});

		})

		$scope.update = function() {

	 		console.log('do save');

	 		Events.updateStaticEvent($scope.staticEvent,function(result){
				console.log(result);
			});	
		}
	});





















