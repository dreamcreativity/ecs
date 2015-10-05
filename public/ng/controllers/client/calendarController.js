'use strict';
angular.module('ClientApp')
.controller('CalendarCtrl',function CalendarCtrl($rootScope,$scope,$http,Courses){
	
	var eventData = {};
	// create calendar event data
	Courses.getSimpleList({},function(result){

		$scope.courses = result.data;
		console.log($scope.courses );

		Courses.getCourstStartDateList({id:$scope.courses[0]._id, year: 2016},function(result){

			$scope.startDateList = result.data;
			console.log($scope.startDateList );

			for( var i in $scope.startDateList){
				var eventDate = new Date($scope.startDateList[i]);
				var dateString = numberFormat(eventDate.getMonth()) + '-' + numberFormat(eventDate.getDate()) + '-' + eventDate.getFullYear();
				console.log(eventDate );
				console.log(dateString );

				eventData[dateString] = '<a>' + 
										$scope.courses[0].title +
										' - (' + $scope.courses[0].durations[0].title + ')'
										+ '</a>';
			}


			// init calendar object
			var cal = $( '#calendar' ).calendario( {
			        onDayClick : function( $el, $contentEl, dateProperties ) {

			            for( var key in dateProperties ) {
			                console.log( key + ' = ' + dateProperties[ key ] );
			            }

			        },
			        	caldata : eventData
			        } ),
			        $month = $( '#calendar-month' ).html( cal.getMonthName() ),
			        $year = $( '#calendar-year' ).html( cal.getYear() 
			    );

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
		    function numberFormat(num){
		    	if(num <10 )
		    		return '0' + num.toString();
		    	else
		    		return num.toString();
		    }



		});

	});



	/*
	var eventData = {
        '10-05-2015' : '<a>this is test this is test this is test this is test this is test this is test this is test this is test this is test </a><a>second event here </a>',
        '10-04-2015' : '<a>this is test this is test this is test this is test this is test this is test this is test this is test this is test </a><a>second event here </a>',

    };
	*/



    


	
});