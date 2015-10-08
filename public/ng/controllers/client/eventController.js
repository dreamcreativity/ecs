'use strict';
angular.module('ClientApp')
.controller('EventCtrl',function EventCtrl($rootScope,$scope,$filter,$interpolate ,$http,Events){


	// create calendar event data

	var eventData = {};
	var eventRawData={};
	// eventData = {
 //        '10-17-2015' : '<div class="event-images"><img src="http://stylonica.com/wp-content/uploads/2014/04/Cat-Wallpaper.jpg" /></div>',
 //        '10-21-2015' : '<div class="event-images"><img src="http://tokyodesu.com/wp-content/uploads/2014/05/cat2.jpg" /></div>',

 //    };

    Events.query({}, function(result){

    	var eventList = result.data;

    	angular.forEach(eventList, function(value, key) {
		  	console.log(value);
		 

		  	
		  	var dateString = $filter('date')(value.date, "MM-dd-yyyy");
		  	console.log(dateString);

		  	if(typeof eventRawData[dateString] ===  'undefined'){
		  		eventRawData[dateString] = [];
		  	}

		  	eventRawData[dateString].push(value);


		});

    	console.log(eventRawData);

		angular.forEach(eventRawData, function(value, key) {

			
			var slidersHTML = '';
		 	angular.forEach(value, function(event, eventDateString) {

		  		slidersHTML += document.getElementById('image-slider').innerHTML.replace('##eventcover##', event.cover.thumbnail).replace(/(\r\n|\n|\r)/gm,"");

		  	});
		 	
		 	var eventHTML = document.getElementById('images').innerHTML.replace('##sliders##', slidersHTML).replace(/(\r\n|\n|\r)/gm,"");


		 	eventData[key] = eventHTML;

		});


		console.log(eventData);
	
	

	    var numberFormat =  function(num){

	    	console.log(typeof num);
	    	if(num <10 )
	    		return '0' + num.toString();
	    	else
	    		return num.toString();
	    }

	    var cal = $( '#calendar' ).calendario( {
		        onDayClick : function( $el, $contentEl, dateProperties ) {

		            for( var key in dateProperties ) {
		                console.log( key + ' = ' + dateProperties[ key ] );
		            }

		        },
		        	caldata : eventData
		        } ),
		        $month = $( '#calendar-month' ).html( cal.getMonthName() ),
		        $year = $( '#calendar-year' ).html( cal.getYear() );

		$( '#calendar-next' ).on( 'click', function() {
		    cal.gotoNextMonth( updateMonthYear );
		} );
		$( '#calendar-prev' ).on( 'click', function() {
		    cal.gotoPreviousMonth( updateMonthYear );
		} );
		$( '#calendar-current' ).on( 'click', function() {
		    cal.gotoNow( updateMonthYear );
		} );

		function updateMonthYear() {
	        $month.html( cal.getMonthName() );
	        $year.html( cal.getYear() );

	    }
    	
    });


	
});














