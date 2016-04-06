'use strict';
angular.module('ClientApp')
.controller('OnlineTestCtrl',function RegisterCtrl($rootScope,$scope,$http,$interval,Constants,OnlineTest,$window){
	
	$scope.firstName = '';
	$scope.lastName = '';
	$scope.email = '';
	$scope.country = '';

	$scope.currentAnswer = '';

	$scope.started = false;
	$scope.done = false;
	$scope.submited = false;
	$scope.trySubmit = false;
	$scope.timeout = false;
	$scope.index = 1;


	// time limit for test
	//var timeLimit = 60 * 30;
	var timeLimit = 60;
	$scope.time = timeLimit;

	Constants.get({name: 'Country'}, function(result){
		$scope.countries = result.data;		
	});


	$scope.start = function(){
		
		$scope.trySubmit = true;
		if($scope.validateForm.$valid){
	
			OnlineTest.getTestQuestions({}, function(result){
				$scope.time = timeLimit;
				$scope.index = 0;
				$scope.questions = result.data;
				$scope.started = true;

				$scope.done = false;
				$scope.submited = false;
				$scope.timeout = false;
				$scope.answers = {}; 

				$scope.timeStart();
				
			});

		}


	};

	$scope.timeStart = function(){
		$scope.stopTime = $interval(function(){
			$scope.time--;
			if($scope.time <= 0){
				$interval.cancel($scope.stopTime);
				$scope.timeout = true;
				// do some handling when times up
				$http.post('/api/onlineTest/sendEmail',{test_result: false,email:$scope.email})
						.success(function(data,status,headers,config){
							setInterval(function(){
									$window.location='/onlineTest';
								}, 2000); 
						})

			}
		}, 1000);
	}


	$scope.next = function(){

		if($scope.currentAnswer == '')
			return;

		// if($scope.questions[$scope.index].type == 'Sentence Completion'){
			
		// 	$scope.answers[questions[$scope.index]._id] = $scope.currentAnswer;
		// }
		$scope.answers[$scope.questions[$scope.index]._id] = $scope.currentAnswer;


		if( $scope.index < $scope.questions.length -1 ){
			$scope.index++;
			$scope.currentAnswer = '';
		}else{

			$scope.testFinish();
		}
	};

	$scope.testFinish = function(){
		$scope.done = true;
	};

	$scope.submitTest = function(){

		// create record question and answer list
		var recordQuestions = [];
		angular.forEach($scope.questions , function(question, key) {
		  	
		  	recordQuestions.push({
		  		title: question.title,
		  		subTitle: question.subTitle,
		  		answer: $scope.answers[question._id],
		  		correctAnswer: question.correctAnswer

		  	});

		});
				

		// get empty test record
		OnlineTest.getNewRecord({}, function(result){

			var newRecord = result.data;

			newRecord.firstName = $scope.firstName;
			newRecord.lastName = $scope.lastName;
			newRecord.email = $scope.email;
			newRecord.country = $scope.country;
			newRecord.questions = recordQuestions;
			

			// submit the test and store as a record
			OnlineTest.createTestRecord({testRecord:newRecord}, function(result){
				$scope.submited = true;	
				$http.post('/api/onlineTest/sendEmail',{result_obj:result.data, test_result: true, email:$scope.email})
						.success(function(data,status,headers,config){
							setInterval(function(){
									$window.location='/onlineTest';
								}, 2000); 
						})
			});

		});
	
	};

	$scope.selectAnswer = function(answer){
		$scope.currentAnswer = answer.title;
	};


	$scope.getFirstPartOfQuestion = function(question){

		if ( typeof question !== 'undefined'){
			var list = question.title.split('###');
			return list[0].trim();
		}else{
			return '';
		}
		
	};

	$scope.getLastPartOfQuestion = function(question){
		if ( typeof question !== 'undefined'){
			var list = question.title.split('###');
			return list[1].trim();
		}else{
			return '';
		}
	};





})

.filter('toMin', function() {
  return function(input) {
    var min = Math.floor(input/60);
    return min;
  };
})

.filter('toMin', function() {
  return function(input) {
    var min = Math.floor(input/60);
    return min;
  };
})

.filter('toSec', function() {
  return function(input) {

    var second = input % 60;

    return second;
  };
});
