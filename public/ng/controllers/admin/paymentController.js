'use strict';
angular.module('AdminApp')

.controller('PaymentController',function PaymentController($rootScope,$scope,$http,Students,Courses,Payments,Constants,Registrations,StaffAccount,Agents,$window){
	loading();

	function loading() {
		var token = sessionStorage.token;
		var registerId = url_params.id;

		Registrations.get({id : registerId}, function(result){
			$scope.registration = result.data;
			var programes = $scope.registration.programRegistration;
			var payments = $scope.registration.payments;
			 $scope.total =0;
			 $scope.pay = 0;
			 $scope.refund = 0;
			for (var i = 0; i < programes.length; i++) {
				$scope.total = $scope.total + (programes[i].price * (1 - programes[i].promotionRate)); 
			};

			for (var i = 0; i < payments.length; i++) {
				if(payments[i].paymentMethod == 'Payment' && payments[i].isVoid == false) {
					$scope.pay = $scope.pay + payments[i].amount;
				}
				if(payments[i].paymentMethod == 'Refund' && payments[i].isVoid == false) {
					$scope.refund = $scope.refund + payments[i].amount;
				}
			};

		    $scope.balance = $scope.total - $scope.pay +$scope.refund;


		});

		Constants.get({name : "PaymentType"}, function(result){
			if(result.status =="ok"){
				$scope.PaymentType = result.data;
			}
		});

		Constants.get({name : "PaymentMethod"}, function(result){
			if(result.status =="ok"){
				$scope.PaymentMethod = result.data;
			}
		});

		StaffAccount.query({}, function(result){
			$scope.staff = result.data;
			});

		$scope.addNewRow = function() {
			$scope.newrowShow = true;
			$("#addrow_button").attr("disabled", true)
		}

		$scope.removeRow = function(){
			$scope.newrowShow = false
			$("#addrow_button").attr("disabled", false)
		}

		$scope.create = function(){
			if($scope.payment.paymentMethod=='Refund') {
				$scope.payment.amount = 0-$scope.payment.amount;
			}
			$scope.payment.createBy = $scope.staff.id;
			$http.post('/api/student/payment',{payment : $scope.payment, registerId : registerId}).success(function(result){
				if(result){
					ShowGritterCenter('System Notification','Payment record has been created');
		 			setInterval(function(){
	  					 $window.location='/admin/student/payment/' + registerId;
					}, 2000); 
				}
			});
		}

		$scope.update = function(payment) {
			Payments.update(payment, function(result){
				if(result.messages == "successed"){
	 		    ShowGritterCenter('System Notification','Payment has been updated');
	 		    setInterval(function(){
	  					 $window.location='/admin/student/payment/' + registerId;
					}, 2000); 
	 		}
	 	});
		}

	}
});