'use strict';
angular.module('AgentApp')

.controller('StudentRegister', function StudentRegister($rootScope, $scope, $http, Registrations, $window){
	loading();

	$scope.register = function(isValid){
		Registrations.save($scope.student, function(result){
			var message = result.messages;	  
		});
	}

	function loading() {
		Registrations.query(function(result){
			$scope.registrations = result;
			console.log("loaded registrations");
		});
	}
})


.controller('StudentRegisterDetail',function StudentRegisterDetail($rootScope,$scope,$http,Registrations,$window){
	var registrationId = url_params.id;
	loading();

	function loading() {
		if(registrationId !=null){
			Registrations.get({id:registrationId}, function(result){
				$scope.registration = result.data;
			});
		};
	}

	$scope.toggle = function() {
		console.log("here");
		var htmlContext = angular.element('#formPrint');
		$http.get('/api/pdf')
		.success(function(data,status,headers,config){
			console.log("success to pdf")
		})
		.error(function(data,status,headers,config){
			console.log("fail to pdf")
		});
	}
});