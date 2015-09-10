


var NewDate = function(year, month, day){
	var d = new Date(year, month-1, day);
	//d.setTime( d.getTime() + d.getTimezoneOffset()*60*1000 	);


	var result = {
		year : d.getFullYear(),
		month : d.getMonth()+1,
		day : d.getDate()
	};

	return result;
}


var DateByConditions = function(
		Year, 
		TargetMonth,
		TargetDay,
		TargetNumberOfDay
	){


	// get last date of this month
	var d = new Date(Year,TargetMonth,0);
	//console.log(d);
	var lastDateOfMonth = d.getDate();
	//console.log(lastDateOfMonth);

	var d = new Date(Year, TargetMonth-1, 1);
	
	// init result object
	var result = {
		year : Year,
		month : TargetMonth,
		day : 0
	};


	var currentTargetNumberOfDay = 0; 
	for(var i = 1 ; i<= lastDateOfMonth; i++){
		if(d.getDay() == TargetDay)
			currentTargetNumberOfDay++;

		if(currentTargetNumberOfDay == TargetNumberOfDay){
			result.day = d.getDate();
			break;
		}else{
			// add one day
			d.setDate(d.getDate()+1);	
		}


	}

	return result;
}


var GetVictoriaDay= function(Year){
	var d = new Date(Year, 4, 25);
	var result = {
		year : Year,
		month : 5,
		day : 0
	};
	for(var i=0; i <8; i++){
		// minus one day
		d.setDate(d.getDate()-1);

		if(d.getDay() == 1){
			result.day = d.getDate();
			break;
		}
	}

	

	return result;	
}

var GetGoodFirday= function(Year){
	// ---------------------------------------------------
	// ref: http://easter.h.baike.com/article-258586.html
	// ---------------------------------------------------

	// calculate Easter Sunday First
	var y = Year;
	var n = y-1900;
	var a = n % 19;
	var q = Math.floor(n/4);
	var b = Math.floor((7*a+1)/19);
	var m = (11*a+4-b) % 29;
	var w = (n+q+31-m) % 7;
	var d = 25-m-w;

	var month = 0;
	var day = 0;

	if(d >0){
		month = 4;
		day = d;
	}else if ( d < 0){
		month = 3;
		day = 31 + d;
	}else{
		month = 3;
		day = 31;
	}
	

	var result = {
		year : Year,
		month : month,
		day : day -2
	};

	return result;
}



exports.getPublicHolidayList = function(Year) {
 	var holidayList = [];

 	holidayList.push({
 		Holiday: 'New Year\'s Day',
 		Date: NewDate(Year,1,1)
 	});

 	holidayList.push({
 		Holiday: 'Family Day',
 		Date: DateByConditions(Year,2,1,3)
 	});

 	holidayList.push({
 		Holiday: 'Good Firday',
 		Date: GetGoodFirday(Year)
 	});

 	holidayList.push({
 		Holiday: 'Victoria Day',
 		Date: GetVictoriaDay(Year)
 	});


 	holidayList.push({
 		Holiday: 'Canada Day',
 		Date: NewDate(Year,7,1)
 	});

 	
 	holidayList.push({
 		Holiday: 'Civic Holiday',
 		Date: DateByConditions(Year,8,1,1)
 	});
 	
 	holidayList.push({
 		Holiday: 'Labour Day',
 		Date: DateByConditions(Year,9,1,1)
 	});

 	holidayList.push({
 		Holiday: 'Thanksgiving Day',
 		Date: DateByConditions(Year,10,1,2)
 	});


 	holidayList.push({
 		Holiday: 'Christmas Day',
 		Date: NewDate(Year,12,25)
 	});

 	holidayList.push({
 		Holiday: 'Boxing Day',
 		Date: NewDate(Year,12,26)
 	});



 	return holidayList;
}


exports.isPublicHoliday = function(holidayList,targetDate) {


	var year = targetDate.getFullYear();
	var month = targetDate.getMonth()+1;
	var day = targetDate.getDate();
	var result = false;

	for (var i = 0; i < holidayList.length; i++) {
		if( holidayList[i].Date.year == year && 
			holidayList[i].Date.month == month && 
			holidayList[i].Date.day == day )
		{
			result = true;
			break;
		}

	};


	return result;

}













