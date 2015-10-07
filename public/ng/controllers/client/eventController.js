'use strict';
angular.module('ClientApp')
.controller('EventCtrl',function EventCtrl($rootScope,$scope,$http,Courses){


	// create calendar event data

	var eventData = {};
	eventData = {
        '10-07-2015' : '<div class="event-images"><img src="https://www.google.ca/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" /></div>',
        '10-17-2015' : '<div class="event-images"><img src="http://stylonica.com/wp-content/uploads/2014/04/Cat-Wallpaper.jpg" /></div>',
        '10-21-2015' : '<div class="event-images"><img src="http://tokyodesu.com/wp-content/uploads/2014/05/cat2.jpg" /></div>',
        '10-23-2015' : '\
<div class="fslider testimonial testimonial-full noborder noshadow nopadding" data-arrows="false">\
    <div class="flexslider">\
        <div class="slider-wrap">\
            <div class="slide">\
                <div class="event-images"><img src="http://stylonica.com/wp-content/uploads/2014/04/Cat-Wallpaper.jpg" /></div>\
            </div>\
            <div class="slide">\
               <div class="event-images"><img src="http://tokyodesu.com/wp-content/uploads/2014/05/cat2.jpg" /></div>\
            </div>\
            <div class="slide">\
                <div class="event-images"><img src="http://previews.123rf.com/images/ollikainen/ollikainen0901/ollikainen090100004/4249274-two-sleeping-kittens-hug-one-another-Stock-Photo-cats-kitten-kittens.jpg" /></div>\
            </div>\
        </div>\
    </div>\
</div>\
        ',

        '10-27-2015' : '\
<div class="fslider testimonial testimonial-full noborder noshadow nopadding" data-arrows="false">\
    <div class="flexslider">\
        <div class="slider-wrap">\
            <div class="slide">\
                <div class="event-images"><img src="http://stylonica.com/wp-content/uploads/2014/04/Cat-Wallpaper.jpg" /></div>\
            </div>\
            <div class="slide">\
               <div class="event-images"><img src="http://tokyodesu.com/wp-content/uploads/2014/05/cat2.jpg" /></div>\
            </div>\
            <div class="slide">\
                <div class="event-images"><img src="http://previews.123rf.com/images/ollikainen/ollikainen0901/ollikainen090100004/4249274-two-sleeping-kittens-hug-one-another-Stock-Photo-cats-kitten-kittens.jpg" /></div>\
            </div>\
        </div>\
    </div>\
</div>\
        ',
    };


	var insertStartDate = function(startDateList, course, eventDataList){

		// if(course.title == 'English for Health Care')
		// 	console.log(startDateList);

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


 //    // get all course records
	// Courses.getSimpleList({},function(result){

	// 	$scope.courses = result.data;
		
	// 	var today = new Date();
	// 	var currentYear = today.getFullYear();

	// 	async.eachSeries($scope.courses, function iterator(course, next) {
	// 		async.series([
	// 		    function(nextYear){
	// 				Courses.getCourstStartDateList({id: course._id, year: currentYear},function(result){
	// 					var startDateList = result.data;
	// 					insertStartDate(startDateList, course,eventData);
	// 					nextYear();
	// 				});
	// 		    },
	// 		    function(nextYear){
	// 				Courses.getCourstStartDateList({id: course._id, year: currentYear+1},function(result){
	// 					var startDateList = result.data;
	// 					insertStartDate(startDateList, course,eventData);
	// 					nextYear();
	// 				});
	// 		    },
	// 		    function(nextYear){
	// 				Courses.getCourstStartDateList({id: course._id, year: currentYear+2},function(result){
	// 					var startDateList = result.data;
	// 					insertStartDate(startDateList, course,eventData);
	// 					nextYear();
	// 				});
	// 		    },

	// 		], function(){
	// 			next();
	// 		});
	// 	}, function done() {
	// 		// init calendar object
	// 		var cal = $( '#calendar' ).calendario( {
	// 		        onDayClick : function( $el, $contentEl, dateProperties ) {

	// 		            for( var key in dateProperties ) {
	// 		                console.log( key + ' = ' + dateProperties[ key ] );
	// 		            }

	// 		        },
	// 		        	caldata : eventData
	// 		        } ),
	// 		        $month = $( '#calendar-month' ).html( cal.getMonthName() ),
	// 		        $year = $( '#calendar-year' ).html( cal.getYear() 
	// 		    );

	// 		$( '#calendar-next' ).on( 'click', function() {
	// 		    cal.gotoNextMonth( updateMonthYear );
	// 		} );
	// 		$( '#calendar-prev' ).on( 'click', function() {
	// 		    cal.gotoPreviousMonth( updateMonthYear );
	// 		} );
	// 		$( '#calendar-current' ).on( 'click', function() {
	// 		    cal.gotoNow( updateMonthYear );
	// 		} );

	// 		function updateMonthYear() {
	// 	        $month.html( cal.getMonthName() );
	// 	        $year.html( cal.getYear() );

	// 	    }

	// 	});




	//});



	/*
	var eventData = {
        '10-05-2015' : '<a>this is test this is test this is test this is test this is test this is test this is test this is test this is test </a><a>second event here </a>',
        '10-04-2015' : '<a>this is test this is test this is test this is test this is test this is test this is test this is test this is test </a><a>second event here </a>',

    };
	*/



    


	
});