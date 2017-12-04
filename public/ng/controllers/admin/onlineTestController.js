'use strict';

angular.module('AdminApp')

.controller('ListOnlineTestController',  function($scope,$rootScope, OnlineTest, ){

	OnlineTest.getAll({}, function(result){
		$scope.questions = result.data;
	});
})

.controller('ListOnlineTestRecordController',  function($scope,$rootScope, OnlineTest,Constants){


	$scope.filterCountry = "";
	$scope.fromDate = new Date();
	$scope.toDate = new Date();
	$scope.fromDate.setDate($scope.toDate .getDate() - 7);

 	var list = [];
 	Constants.get({name:"Country"}, function(result){
 		var regions = result.data;
 		for(var i=0; i<regions.length; i++){
 			list.push({"name" : regions[i]});
 		}
 		$scope.CountryList = list;

 		console.log(list);
 	});


	OnlineTest.getTestRecordsByFilters({
		country: $scope.filterCountry,
        fromDate: $scope.fromDate,
        toDate: $scope.toDate
	}, function(result){
		console.log(result);
		$scope.records = result.data;
	});

	// OnlineTest.getTestRecords({}, function(result){
	// 	$scope.records = result.data;
	// });

	$scope.upateList = function(){

		// console.log($scope.filterCountry);
		// console.log($scope.filterDateRange);
		// console.log($scope.fromDate);
		// console.log($scope.toDate);

		// call service

		OnlineTest.getTestRecordsByFilters({
			country: $scope.filterCountry,
            fromDate: $scope.fromDate,
            toDate: $scope.toDate
		}, function(result){

			$scope.records = result.data;
			console.log('getTestRecordsByFilters returned result: ');
			console.log($scope.records);
		});
	}
})


.controller('OnlineTestRecordController',  function($scope,$rootScope, OnlineTest){

	OnlineTest.getTestRecord({id: url_params.id}, function(result){
		$scope.record = result.data;
		console.log($scope.record);
	});

	
	
})


.controller('EditOnlineTestController',  function($scope,$rootScope, $window, Constants, OnlineTest){



	Constants.get({name: 'OnlineTestQuestionType'}, function(result){
		$scope.questionType = result.data;		
	});



	if(mode == 'new'){

		OnlineTest.getNew({},function(result){
			console.log(result.data);
			$scope.question = result.data;
		});

	}else{

		OnlineTest.get({id: url_params.id},function(result){
			console.log(result.data);
			$scope.question = result.data;
		});
	}

	$scope.onTypeChanged =  function(){
		$scope.question.answers = [];
		$scope.question.correctAnswer = '';
	}


	$scope.addAnswer =  function(){

		if($scope.question.type== 'Multiple Choice'){
			
			$scope.question.answers.push({title:''});
		}else{

			if($scope.question.answers.length < 1){
				
				$scope.question.answers.push({title:''});
			}else{
				ShowGritterCenter('System Notification','Only one answer for Sentence Completion');
			}
			
		}
		
		

		console.log($scope.question);
	}

	$scope.removeAnswer =  function(target){
		
		$scope.question.answers = $scope.question.answers.filter(function(obj) {
			return obj != target;
		});
	}

	$scope.setCorrectAnswer =  function(target){
		
		$scope.question.correctAnswer = target.title.replace('@', '');
	}


	$scope.create =  function(){
		//console.log( angular.toJson($scope.question));
		OnlineTest.create({question:$scope.question}, function(result){
			console.log(result);

			$window.location = '/admin/OnlineTest/edit/' + result.data._id;
			
		});
	}

	$scope.save =  function(){
		console.log( angular.toJson($scope.question));
		OnlineTest.save($scope.question, function(result){
			console.log(result);
			i
			ShowGritterCenter('System Notification','Question has been updated');
			//$window.location = '/admin/OnlineTest/edit/' + result.data._id;
			
		});
	}

});
