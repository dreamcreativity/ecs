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

	.controller('EventStaticCtrl', function ActivityEditCtrl($scope,$http,Events,StaticMedia,$modal,Medias,$window,DateRanges){

		$scope.calendarIndex = [1,2,3,4,5,6,7,8,9,10,11,12];
		$scope.calendars = [];

		StaticMedia.getActivityCalendars({}, function(result){
			result.data.forEach(function(element, index, array){
				console.log(element);
				$scope.calendars[element.typeIndex] = element;
			});
		});


		$scope.changeCalendar = [];

		Medias.getCategoryTargetMedia({target : 'Event', type:'Document'},function(result){
			$scope.medias=result.data;

			$scope.changeCalendar[1]=createMediaSelectorFunction($modal, $scope.medias,function(selectedMedia){ 
				$scope.calendars[1].media = selectedMedia;
			});
			$scope.changeCalendar[2]=createMediaSelectorFunction($modal, $scope.medias,function(selectedMedia){ 
				$scope.calendars[2].media = selectedMedia;
			});
			$scope.changeCalendar[3]=createMediaSelectorFunction($modal, $scope.medias,function(selectedMedia){ 
				$scope.calendars[3].media = selectedMedia;
			});
			$scope.changeCalendar[4]=createMediaSelectorFunction($modal, $scope.medias,function(selectedMedia){ 
				$scope.calendars[4].media = selectedMedia;
			});
			$scope.changeCalendar[5]=createMediaSelectorFunction($modal, $scope.medias,function(selectedMedia){ 
				$scope.calendars[5].media = selectedMedia;
			});
			$scope.changeCalendar[6]=createMediaSelectorFunction($modal, $scope.medias,function(selectedMedia){ 
				$scope.calendars[6].media = selectedMedia;
			});
			$scope.changeCalendar[7]=createMediaSelectorFunction($modal, $scope.medias,function(selectedMedia){ 
				$scope.calendars[7].media = selectedMedia;
			});
			$scope.changeCalendar[8]=createMediaSelectorFunction($modal, $scope.medias,function(selectedMedia){ 
				$scope.calendars[8].media = selectedMedia;
			});
			$scope.changeCalendar[9]=createMediaSelectorFunction($modal, $scope.medias,function(selectedMedia){ 
				$scope.calendars[9].media = selectedMedia;
			});
			$scope.changeCalendar[10]=createMediaSelectorFunction($modal, $scope.medias,function(selectedMedia){ 
				$scope.calendars[10].media = selectedMedia;
			});
			$scope.changeCalendar[11]=createMediaSelectorFunction($modal, $scope.medias,function(selectedMedia){ 
				$scope.calendars[11].media = selectedMedia;
			});
			$scope.changeCalendar[12]=createMediaSelectorFunction($modal, $scope.medias,function(selectedMedia){ 
				$scope.calendars[12].media = selectedMedia;
			});

		})

		$scope.update = function() {

	 		StaticMedia.updateActivityCalendars( { calenders: $scope.calendars},function(result){
				console.log(result);
			});	
		}
	});





















