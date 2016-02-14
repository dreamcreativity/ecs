'use strict';
angular.module('AdminApp')

.controller('JuniorStudentsCtrl',function StudentCtrl($rootScope,$scope,$http,JuniorPrograms,$window){
	$scope.students = JuniorPrograms.query();
})

.controller('JuniorStudentEditCtrl',function StudentCtrl($rootScope,$scope,$http,JuniorPrograms,$window){
	var junior_id = url_params.id;
	loading(); 

	 function loading() {
	 		if(junior_id !=null){
	 			JuniorPrograms.get({id:junior_id}, function(result){
	 				$scope.student = result.data;
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