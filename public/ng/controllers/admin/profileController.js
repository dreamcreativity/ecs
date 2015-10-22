'use strict';

angular.module('AdminApp')

.controller('ProfileController',  function($scope,$http,$window,$location,StaffAccount){


	// function getAccountInfo(){
		
	// 	return StaffAccount.query({});
	// }
	StaffAccount.query({}, function(result){
		//console.log(result);
		$scope.info = result.data;
	});
	

	$scope.changePasswordInfo = {
		changePasswordSubmited: false,
		currentPassword: '',
		newPassword: '',
		confirmPassword:''
	};

	$scope.isPasswordMatch = function(){
		return $scope.changePasswordInfo.newPassword == $scope.changePasswordInfo.confirmPassword;
	}
	$scope.changePasswordClick = function(){

		$scope.changePasswordInfo.changePasswordSubmited = true;

		StaffAccount.changePassword({info:$scope.changePasswordInfo},function(result){

			if(result.status == 'fail'){
				ShowGritterCenter('System Notification','Password Change Fail ...');
			}else{
				ShowGritterCenter('System Notification','Password Changed.');
				$scope.changePasswordInfo.changePasswordSubmited = false;
				$scope.changePasswordInfo.currentPassword = ''; 
				$scope.changePasswordInfo.newPassword = ''; 
				$scope.changePasswordInfo.confirmPassword = ''; 
				setInterval(function(){
					delete sessionStorage.token;
					$window.location='/admin/login';
				}, 2000); 
			}
			
		});
		

	}

});
