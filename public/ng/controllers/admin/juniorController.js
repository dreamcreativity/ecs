'use strict';
angular.module('AdminApp')

.controller('JuniorStudentsCtrl',function StudentCtrl($rootScope,$scope,$http,JuniorPrograms,$window){
	$scope.students = JuniorPrograms.query();
})

.controller('JuniorStudentEditCtrl',function StudentCtrl($rootScope,$scope,$http,JuniorPrograms,Constants,$window){
	var junior_id = url_params.id;
	loading(); 

	function loading() {
		if(junior_id !=null){
			JuniorPrograms.get({id:junior_id}, function(result){
				$scope.student = result.data;
			});

			Constants.get({name:"SummerProgramTorontoStartDate"}, function(result){
				var startdates = result.data;
				var list =[]
				for(var i=0; i<startdates.length; i++){
					list.push({"name" : startdates[i]});
				}
				$scope.SummerProgramTorontoStartDateList = list;
			});

			Constants.get({name:"SummerProgramTorontoDuration"}, function(result){
				var durations = result.data;
				var list =[]
				for(var i=0; i<durations.length; i++){
					list.push({"name" : durations[i]});
				}
				$scope.SummerProgramTorontoDurationList = list;
			});

			Constants.get({name:"SummerProgramKingstonStartDate"}, function(result){
				var startdates = result.data;
				var list =[]
				for(var i=0; i<startdates.length; i++){
					list.push({"name" : startdates[i]});
				}
				$scope.SummerProgramKingstonStartDateList = list;
			});

			Constants.get({name:"SummerProgramKingstonDuration"}, function(result){
				var durations = result.data;
				var list =[]
				for(var i=0; i<durations.length; i++){
					list.push({"name" : durations[i]});
				}
				$scope.SummerProgramKingstonDurationList = list;
			});
		}
	}

	$scope.update = function(isValid) {
		JuniorPrograms.update($scope.student, function(result){
			if(result.status == 'ok'){
				ShowGritterCenter('System Notification','Junior Program has been updated');
				setInterval(function(){
					$window.location='/admin/junior-Program/edit/' + junior_id;
				}, 2000);
			}else{
				ShowGritterCenter('System Notification','Junior Program document update fail : ' + result.messages.err);
			}
		})
	}
});