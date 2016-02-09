'use strict';
angular.module('ClientApp')
.controller('JuniorProgramCtrl',function JuniorProgramCtrl($rootScope,$scope,$http,JuniorPrograms,$window){
	$scope.register = function(isValid){
		var studentId = null;
		var studentNumber = null;
		var agentEmail = null;
		$http.post('/api/juniorprogram/create',{student:$scope.student})
		.success(function(data,status,headers,config){
			if(data.messages == 'successed'){
				setInterval(function(){
					$window.location='/welcome';
				}, 2000); 
			}
		})

	}
});
