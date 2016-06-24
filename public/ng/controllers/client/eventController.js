'use strict';
angular.module('ClientApp')
.controller('EventCtrl',function EventCtrl($rootScope,$scope,$filter,$interpolate ,$http,Events,StaticMedia){


	// create calendar event data

	var eventData = {};
	var eventRawData={};

	StaticMedia.getActivityCalendars({}, function(result){

		$scope.calendarList = [];

		//$scope.calendarList = result.data;

		result.data.forEach(function(element, index, array){
			console.log(element);
			if(element == null){}
				
			else
				$scope.calendarList[element.typeIndex] = element;
		});
		console.log($scope.calendarList );
	});


	$scope.changeMonth = function(month){
		$scope.selectedCalendar = $scope.calendarList[month-1];
	}

	// Events.getStaticEvent(function(result){
	// 	$scope.eventStatic = result.data;

	// 	console.log($scope.eventStatic );
	// 	if($scope.eventStatic.isActived){



	// 	}else{

	// 	    Events.query({}, function(result){
	// 	    	var eventList = result.data;
	// 	    	async.series([
	// 			    function(next){ 
	// 			    	async.eachSeries(eventList, function(value, callback) {

	// 			    		if(value.cover != null){
	// 						  	var dateString = $filter('date')(value.date, "MM-dd-yyyy");
					
	// 						  	if(typeof eventRawData[dateString] ===  'undefined'){
	// 						  		eventRawData[dateString] = [];
	// 						  	}

	// 						  	eventRawData[dateString].push({
	// 						  		'key': dateString,
	// 						  		'event': value
	// 						  	});
				    			
	// 			    		}

	// 					  	callback();

	// 					}, function(){

	// 						next();
	// 					});
	// 			    },
	// 			    function(next){ 
	// 					async.eachSeries(eventRawData, function(events, callback) {
	// 						var slidersHTML = '';
	// 					 	angular.forEach(events, function(event, eventDateString) {
	// 					  		slidersHTML += document.getElementById('image-slider').innerHTML
	// 					  						.replace('##eventcover##', event.event.cover.thumbnail)
	// 					  						.replace(/(\r\n|\n|\r)/gm,"")
	// 					  						.replace('##title##', event.event.title)
	// 					  						.replace('##url##', '/event/'+ event.event._id);
	// 					  	});
	// 					 	var eventHTML = document.getElementById('images').innerHTML.replace('##sliders##', slidersHTML).replace(/(\r\n|\n|\r)/gm,"");

	// 					 	eventData[events[0].key] = eventHTML;
	// 					 	callback();
	// 					},function(){
	// 						next();
	// 					});
	// 			    },
				    
	// 			],function(){

				
	// 			    var cal = $( '#calendar' ).calendario( {
	// 				        onDayClick : function( $el, $contentEl, dateProperties ) {
	// 				            for( var key in dateProperties ) {
	// 				                console.log( key + ' = ' + dateProperties[ key ] );
	// 				            }
	// 				        },
	// 				        	caldata : eventData
	// 				        } ),
	// 				        $month = $( '#calendar-month' ).html( cal.getMonthName() ),
	// 				        $year = $( '#calendar-year' ).html( cal.getYear() );

	// 				$( '#calendar-next' ).on( 'click', function() {
	// 				    cal.gotoNextMonth( updateMonthYear );
	// 				    SEMICOLON.widget.loadFlexSlider();
	// 				} );
	// 				$( '#calendar-prev' ).on( 'click', function() {
	// 				    cal.gotoPreviousMonth( updateMonthYear );
	// 				    SEMICOLON.widget.loadFlexSlider();
	// 				} );
	// 				$( '#calendar-current' ).on( 'click', function() {
	// 				    cal.gotoNow( updateMonthYear );
	// 				    SEMICOLON.widget.loadFlexSlider();
	// 				} );

	// 				function updateMonthYear() {
	// 			        $month.html( cal.getMonthName() );
	// 			        $year.html( cal.getYear() );
	// 			    }

	// 			    SEMICOLON.widget. loadFlexSlider();
	// 			});
	// 	    });

	// 	}


	// });



});














