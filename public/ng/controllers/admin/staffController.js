'use strict';
angular.module('AdminApp')
.controller('StaffCtrl',function StaffCtrl($rootScope,$scope,$http,Regions,Staffs,Constants,$window){
	var token = sessionStorage.token;
	loading();
	 //$scope.staffs = loading();
	 $scope.ph_numbr = /^(\d{3})[- ](\d{3})[- ](\d{4})$/;

	 $scope.create = function(isValid){
	 	$scope.returnMessage ="";
	 	$scope.staff.regions =[];
	 	for(var i=0; i<$scope.region_tags.length; i++){
	 		$scope.staff.regions.push($scope.region_tags[i].name);
	 	}
	 	Staffs.save($scope.staff,function(result){
	 		if(result.status == 'ok'){
	 			$http.post('/api/staffs/register/sendEmail',{staff: $scope.staff,password:$scope.staff.password})
				.success(function(data,status,headers,config){
					ShowGritterCenter('System Notification','Staff has been created');
		 			setInterval(function(){
		 				$window.location='/admin/staff/detail/' + result.data._id;
		 			}, 2000); 
				})
	 		}
	 		else if(result.status == 'exist') {
	 			ShowGritterCenter('System Notification',result.messages);
	 		}
	 	});
	 }

	 function loading() {
	 	var list = [];
	 	Constants.get({name:"Country"}, function(result){
	 		var regions = result.data;
	 		for(var i=0; i<regions.length; i++){
	 			list.push({"name" : regions[i]});
	 		}
	 		$scope.regionsList = list;
	 	});

	 	Staffs.query(function(result){
	 		$scope.staffs = result;
	 	});
	 }


	 $scope.loadCountries = function($query) {
	 	var countries = $scope.regionsList;
	 	return countries.filter(function(country) {
	 		return country.name.toLowerCase().indexOf($query.toLowerCase()) != -1;
	 	});
	 }

	 $scope.generate = function() {
	 	$scope.staff.password = randomPassword(8);
	 }

	 function randomPassword(length) {
	 	var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
	 	var pass = "";
	 	for (var x = 0; x < length; x++) {
	 		var i = Math.floor(Math.random() * chars.length);
	 		pass += chars.charAt(i);
	 	}
	 	$("#staff_pwd").get(0).type ='text';
	 	return pass;
	 }
	})


.controller('StaffEditCtrl', function StaffEditCtrl($rootScope,$q,$scope,$http,$filter,$modal,Regions,Staffs,Agents,Constants,Medias,$window) {
	var staff_id = url_params.id;
	$scope.ph_numbr = /^(\d{3})[- ](\d{3})[- ](\d{4})$/;
	var list = [];
	
	loading();

	$scope.update = function(isValid) {
		$scope.staff.regions =[];
		for (var i = 0; i < $scope.region_tags.length; i++) {
			$scope.staff.regions.push($scope.region_tags[i].name);
		};
		Staffs.update($scope.staff, function(result){
			var message = result.messages;	    
			ShowGritterCenter('System Notification','Staff has been updated');
		})
	}

	$scope.getAgentbyRegion = function(name, callback){
		return Agents.getAgentbyRegion({name:name}, function(result){
			return callback(result.data);
		})
	}

	function loading() {
		Constants.get({name:"Country"}, function(result){
			$scope.regionsList=[];
			var regions = result.data;
			for(var i=0; i<regions.length; i++){
				$scope.regionsList.push({"name" : regions[i]});
			}
			if(staff_id !=null){
				Staffs.get({id:staff_id}, function(result){
					$scope.staff = result.data;
					if($scope.staff.regions !=null){
						for(var i=0; i<$scope.staff.regions.length; i++){
							$scope.region_tags.push({"name" : $scope.staff.regions[i]});
						}
						var prom =[];
						var list =[];
						$scope.agents=[];
						$scope.staff.regions.forEach(function (obj, i) {
							prom.push($scope.getAgentbyRegion(obj, function(result){
								list.push(result);
							}));
						});
					}


				});
			}
		});
	}

	$scope.loadCountries = function($query) {
		var countries = $scope.regionsList;
		return countries.filter(function(country) {
			return country.name.toLowerCase().indexOf($query.toLowerCase()) != -1;
		});
	}

	$scope.resetpwd = function(isValid) {
		var newpassword = $scope.resetpassword;
		$scope.staff.password = newpassword;
		Staffs.resetpassword($scope.staff, function(result){
			if(result.status == 'ok'){
				ShowGritterCenter('System Notification','Staff passowrd has been updated');
				$http.post('/api/staff/resetpassword/sendEmail',{staff: $scope.staff,password:newpassword})
				.success(function(data,status,headers,config){
					setInterval(function(){
						$window.location='/admin/staff/detail/' + $scope.staff._id;
					}, 2000); 
				})
				.error(function(data,status,headers,config){

				});
			}
		})
	}

	$scope.generate = function() {
		$scope.resetpassword = randomPassword(8);
	}

	function randomPassword(length) {
		var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
		var pass = "";
		for (var x = 0; x < length; x++) {
			var i = Math.floor(Math.random() * chars.length);
			pass += chars.charAt(i);
		}
		$("#agent_pwd").get(0).type ='text';
		return pass;
	}


	 // load meida image
	 Medias.getCategoryTargetMedia({target:'Staff',type:'Image'}, function(result){
	 	$scope.meidas = result.data;
	 	console.log($scope.meidas);


	 	$scope.changeCover = createMediaSelectorFunction($modal, $scope.meidas,function( selectedMedia){ 
	 		$scope.staff.cover = selectedMedia;
	 	});
	 });

	});









