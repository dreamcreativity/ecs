'use strict';

var directives = angular.module('esc.directives', [])

directives.directive('logoutButton', function() {
	return {
		restrict: 'A',

		link: function (scope, element, attrs) {

			$(element).on('click', function (e) 
			{
			});

		}
	};
});



directives.directive('downloadForm01', [function(){
	var controller = ['$scope','$http', function($scope,$http){
		$scope.download_student = function() {
			var htmlContext = angular.element('#formPrint');
			$http.post('/api/pdf',{registerId:$scope.registration._id, studentId : null})
			.success(function(data,status,headers,config){
				if(data.status == "successed"){
					$http.get('/api/pdf/Download_01',{responseType:'arraybuffer'})
					.success(function(data,status,headers,config){
						var blob = new Blob([data], {type: 'application/pdf' });
						var objectUrl = URL.createObjectURL(blob);
						var element = angular.element('<a/>');
						element.attr({
							href: objectUrl,
							target: '_self',
							download:'Register Form 01.pdf'
						})[0].click();
					})
					.error(function(data, status, headers, config) {
					});
				}})
			.error(function(data,status,headers,config){
			});
		}	
	}];
	return{
		restrict : 'A',
		controller : controller
	}
}]);

directives.directive('downloadForm02', [function(){
	var controller = ['$scope','$http', function($scope,$http){
		$scope.download_accommdation = function() {
			var htmlContext = angular.element('#formPrint');
			$http.post('/api/pdf',{registerId:null, studentId: $scope.student._id})
			.success(function(data,status,headers,config){
				if(data.status == "successed"){
					$http.get('/api/pdf/Download_02',{responseType:'arraybuffer'})
					.success(function(data,status,headers,config){
						var blob = new Blob([data], {type: 'application/pdf' });
						var objectUrl = URL.createObjectURL(blob);
						var element = angular.element('<a/>');
						element.attr({
							href: objectUrl,
							target: '_self',
							download:'Register Form 02.pdf'
						})[0].click();
					//window.open(objectUrl);
				})
					.error(function(data, status, headers, config) {
					});
				}})
			.error(function(data,status,headers,config){
			});
		}

	}];
	return{
		restrict : 'A',
		controller : controller
	}
}]);




directives.directive('courseRegister', ['Courses',function(Courses){
	var controller = ['$scope', function($scope){
		loading();

		$scope.loading = function(){
			
		}

		$scope.addNewRow = function() {
			$scope.newrowShow = true;
			$("#addrow_button").attr("disabled", true)
		}

		$scope.addCourse = function(course) {
			if(typeof course != "undefined"){
				if (typeof course.startDate == "undefined" ||typeof course.duration == "undefined" ||typeof course.year == "undefined") {
					ShowGritterCenter('System Notification','Please enter complete course information');
				}
				else{
					var course_obj = {id : course._id,
						tag : course.tag,
						title: course.title,
						course : course._id,
						level: course.level,
						startDate: course.startDate,
						duration: angular.fromJson(course.duration),
						year:course.year};
						var isConflict = false;
						for (var i = 0; i < $scope.courseList.length; i++) {
							if($scope.courseList[i].startDate == course_obj.startDate && $scope.courseList[i].title == course_obj.title){
								isConflict =true;
							}
						};
					if(!isConflict){
						$scope.courseList.push(course_obj);
						$scope.newrowShow = false
						delete $scope.course
						$("#addrow_button").attr("disabled", false)
					}
					else {
						ShowGritterCenter('System Notification','This course has been selected already');
					}
				}
			}
			else {
				ShowGritterCenter('System Notification','Please enter complete course information');
			}
		}

		$scope.removeRow = function(){
			$scope.newrowShow = false
			$("#addrow_button").attr("disabled", false)
		}

		$scope.removeCourse = function(course){
			var index = $scope.courseList.indexOf(course);
			$scope.courseList.splice(index, 1);     
		}


		$scope.changeCourse = function(targetCourse){
			Courses.getCourstStartDateList({id:targetCourse._id,year:$scope.availableYears[0]},function(data){
				$scope.course.availableYears = $scope.availableYears;
				$scope.course.startDates = data.data
			});
		}

		$scope.changeStartDate = function(course, startDate){
			course.startDate =  startDate;
		}

		$scope.changeStartYear =  function(course){
			if(typeof course != "undefined"){
				Courses.getCourstStartDateList({id:course._id, year:course.year}, function(data){
					course.startDate = data.data[0];
					course.startDates = data.data;
			//closeAllSelectList();
		});
			}
		}
	}];


	return {
		restrict : 'A',
		controller : controller,
		//template : template
		templateUrl : '/agent/courseRegisterTemplate'
	};
}]
);

