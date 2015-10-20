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
			$http.post('/api/pdf',{registerId:$scope.student._id})
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
			$http.post('/api/pdf',{registerId:$scope.student._id})
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
	var template = '<div class="form-group"><label class="col-sm-offset-4 col-sm-5"><strong>Add new courses</strong><button id="addrow_button" type="button" class="btn btn-danger btn-xs btn-circle" ng-click="addNewRow()"><i class="fa fa-plus icon-only"></i></button></label></div><div class="form-group"><div class="col-sm-12"><table class="table table-bordered table-striped table-hover tc-table table-primary"><thead><tr><tr><th class="hidden-xs center">Course</th><th class="hidden-xs center">Description</th><th class="hidden-xs center">Level</th><th class="hidden-xs center">Year</th><th class="hidden-xs center">Start Date</th><th class="hidden-xs center">Duration</th><th class="col-medium center">Action</th></tr></tr></thead><tbody><tr id="newrow" ng-show="newrowShow"><td class="hidden-xs center"><select ng-model="course" ng-init="course = courses[0]" ng-options="course as course.title for course in courses " ng-change="changeCourse(course)"></select></td><td class="hidden-xs center"><label class="label label-lg arrowed">{{course.tag}}</label></td><td class="hidden-xs center"><select ng-model="course.level"><option value="" selected>--Select--</option><option ng-repeat="item in corseLevel">{{item}}</option></select></td><td class="hidden-xs center"><select ng-model="course.year" ng-change="changeStartYear(course,year)"><option value="" selected>--Select--</option><option ng-repeat="year in course.availableYears">{{year}}</option></select></td><td class="hidden-xs center"><select ng-model="course.startDate"><option value="" selected>--Select--</option><option ng-repeat="sd in course.startDates", value="{{sd}}">{{sd | date:"MMMM d"}}</option></select></td><td class="hidden-xs center"><select ng-model="course.duration"><option value="" selected>--Select--</option><option ng-repeat="duration in course.durations">{{duration.title}}</option></select></td><td class="col-medium center"><button type="button" class="btn btn-danger btn-xs btn-circle" ng-click="addCourse(course)"><i class="fa fa-check icon-only"></i></button><button type="button" class="btn btn-info btn-xs btn-circle" ng-click="removeRow()"><i class="fa fa-times icon-only"></i></button></td></tr><tr ng-repeat="c in courseList"><td class="hidden-xs center">{{c.title}}</td><td class="hidden-xs center"><label class="label label-lg arrowed">{{c.tag}}</label></td><td class="hidden-xs center">{{c.level}}</td><td class="hidden-xs center">{{c.year}}</td><td class="hidden-xs center">{{c.startDate | date:"MMMM d"}}</td><td class="hidden-xs center">{{c.duration}}</td><td class="col-medium center"><button type="button" class="btn btn-info btn-xs btn-circle" ng-click="removeCourse(c)"><i class="fa fa-times icon-only"></i></button></td></tr></tbody></table></div></div>',
	controller = ['$scope', function($scope){
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

