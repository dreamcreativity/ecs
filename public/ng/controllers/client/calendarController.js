'use strict';
angular.module('ClientApp')
.controller('CalendarCtrl',function CalendarCtrl($rootScope,$scope,$http,Courses){


	// create calendar event data

	var eventData = {};
	
	var insertStartDate = function(startDateList, course, eventDataList){

	
		for( var i in startDateList){
			var eventDate = new Date(startDateList[i]);
			var dateString = numberFormat(eventDate.getMonth()+1) + '-' + numberFormat(eventDate.getDate()) + '-' + eventDate.getFullYear();
			// console.log(eventDate );
			// console.log(dateString );


			if( typeof eventDataList[dateString] === 'undefined')
				eventDataList[dateString] = '';

			eventDataList[dateString] += '<a>' +  course.title +
										' - (' + course.durations[0].title + ')'
										+ '</a>';


		}
	}
    var numberFormat =  function(num){
    	if(num <10 )
    		return '0' + num.toString();
    	else
    		return num.toString();
    }

    // get all course records
	Courses.getSimpleList({},function(result){

		$scope.courses = result.data;
		
		var today = new Date();
		var currentYear = today.getFullYear();

		async.eachSeries($scope.courses, function iterator(course, next) {
			async.series([
			    function(nextYear){
					Courses.getCourstStartDateList({id: course._id, year: currentYear},function(result){
						var startDateList = result.data;
						insertStartDate(startDateList, course,eventData);
						nextYear();
					});
			    },
			    function(nextYear){
					Courses.getCourstStartDateList({id: course._id, year: currentYear+1},function(result){
						var startDateList = result.data;
						insertStartDate(startDateList, course,eventData);
						nextYear();
					});
			    },
			    function(nextYear){
					Courses.getCourstStartDateList({id: course._id, year: currentYear+2},function(result){
						var startDateList = result.data;
						insertStartDate(startDateList, course,eventData);
						nextYear();
					});
			    },

			], function(){
				next();
			});
		}, function done() {
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

		});




	});
	
})
.controller('NewCalendarCtrl',function CalendarCtrl($rootScope,$scope,$http,Courses){


	// create calendar event data

	var eventData = {};
	
	// var insertStartDate = function(startDateList, course, eventDataList){

	
	// 	for( var i in startDateList){
	// 		var eventDate = new Date(startDateList[i]);
	// 		var dateString = numberFormat(eventDate.getMonth()+1) + '-' + numberFormat(eventDate.getDate()) + '-' + eventDate.getFullYear();
	// 		// console.log(eventDate );
	// 		// console.log(dateString );


	// 		if( typeof eventDataList[dateString] === 'undefined')
	// 			eventDataList[dateString] = '';

	// 		eventDataList[dateString] += '<a>' +  course.title +
	// 									' - (' + course.durations[0].title + ')'
	// 									+ '</a>';


	// 	}
	// }



    var numberFormat =  function(num){
    	if(num <10 )
    		return '0' + num.toString();
    	else
    		return num.toString();
    }


    var eventDataList = {};
    
    var insertStartDate = function(startDateList, course, eventDataList){


    	console.log( course.title);
		for( var i in startDateList){
			var eventDate = new Date(startDateList[i]);
			var dateString = eventDate.getFullYear() + '-' + numberFormat(eventDate.getMonth()+1)  + '-' +  numberFormat(eventDate.getDate());
			// console.log(eventDate );
			//console.log(dateString );

			if( typeof eventDataList[dateString] === 'undefined')
				eventDataList[dateString] = [];

			eventDataList[dateString].push(course.title);

		}

		console.log(eventDataList );

		
	}


    // get all course records
	Courses.getCalendarCourseList({},function(result){

		$scope.courses = result.data;
		

		console.log(result);
		var today = new Date();
		var currentYear = today.getFullYear();

		async.eachSeries($scope.courses, function iterator(course, next) {




			Courses.getCourstStartDateList({id: course._id, year: currentYear},function(result){
				var startDateList = result.data;
				console.log(startDateList);
				insertStartDate(startDateList, course,eventData);
				next();
			});

			// async.series([
			//     function(nextYear){
			// 		Courses.getCourstStartDateList({id: course._id, year: currentYear},function(result){
			// 			var startDateList = result.data;
			// 			insertStartDate(startDateList, course,eventData);
			// 			nextYear();
			// 		});
			//     },
			//     function(nextYear){
			// 		Courses.getCourstStartDateList({id: course._id, year: currentYear+1},function(result){
			// 			var startDateList = result.data;
			// 			insertStartDate(startDateList, course,eventData);
			// 			nextYear();
			// 		});
			//     },
			//     function(nextYear){
			// 		Courses.getCourstStartDateList({id: course._id, year: currentYear+2},function(result){
			// 			var startDateList = result.data;
			// 			insertStartDate(startDateList, course,eventData);
			// 			nextYear();
			// 		});
			//     },

			// ], function(){
			// 	next();
			// });


		}, function done() {
			// init calendar object

			    for (var i = 1; i <= 12; i++) {    
			        $("#month-" + i).zabuto_calendar({
			          cell_border: false,
			          today: true,
			          show_days: false,
			          weekstartson: 0,
			          show_previous: false,
			          show_next: false,
			          month: i,
			        
			          data: [
			            {"date":"2016-01-01","badge":false,"title":"Example 1",classname:"grade-2"},
			            {"date":"2016-04-11","badge":false,"title":"Example 2",classname:"grade-3"},
			            
			            {"date":"2016-04-12","badge":false,"title":"Example 2",classname:"purple",},
			          ]
			          // ,
			          // legend: [
			          //           {type: "text", label: "Special event", badge: "00"},
			          //           {type: "block", label: "Regular event", classname: "purple"},
			          //           {type: "spacer"},
			          //           {type: "text", label: "Bad"},
			          //           {type: "list", list: ["grade-1", "grade-2", "grade-3", "grade-4"]},
			          //           {type: "text", label: "Good"}
			          //         ]
			        });
			    }


			// var cal = $( '#calendar' ).calendario( {
			//         onDayClick : function( $el, $contentEl, dateProperties ) {

			//             for( var key in dateProperties ) {
			//                 console.log( key + ' = ' + dateProperties[ key ] );
			//             }

			//         },
			//         	caldata : eventData
			//         } ),
			//         $month = $( '#calendar-month' ).html( cal.getMonthName() ),
			//         $year = $( '#calendar-year' ).html( cal.getYear() 
			//     );

			// $( '#calendar-next' ).on( 'click', function() {
			//     cal.gotoNextMonth( updateMonthYear );
			// } );
			// $( '#calendar-prev' ).on( 'click', function() {
			//     cal.gotoPreviousMonth( updateMonthYear );
			// } );
			// $( '#calendar-current' ).on( 'click', function() {
			//     cal.gotoNow( updateMonthYear );
			// } );

			// function updateMonthYear() {
		 //        $month.html( cal.getMonthName() );
		 //        $year.html( cal.getYear() );

		 //    }

		});




	});
	
});