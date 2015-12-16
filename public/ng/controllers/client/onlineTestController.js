'use strict';
angular.module('ClientApp')
.controller('OnlineTestCtrl',function RegisterCtrl($rootScope,$scope,$interval,Constants,OnlineTest,$window){
	
	$scope.firstName = '';
	$scope.lastName = '';
	$scope.email = '';
	$scope.country = '';

	$scope.currentAnswer = '';

	$scope.started = false;
	$scope.done = false;
	$scope.submited = false;
	$scope.index = 1;


	// time limit for test
	var timeLimit = 60 * 30;
	$scope.time = timeLimit;

	Constants.get({name: 'Country'}, function(result){
		$scope.countries = result.data;		
	});


	$scope.start = function(){
		
		OnlineTest.getTestQuestions({}, function(result){
			$scope.time = timeLimit;
			$scope.index = 0;
			$scope.questions = result.data;
			$scope.started = true;
			$scope.done = false;
			$scope.submited = false;
			$scope.answers = {}; 

			$scope.timeStart();
			console.log($scope.questions);
		});
	};

	$scope.timeStart = function(){
		$scope.stopTime = $interval(function(){
			$scope.time--;
			if($scope.time <= 0){
				$interval.cancel($scope.stopTime);

				// do some handling when times up

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
		
		//console.log($scope.answers);
		
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
				
		console.log(recordQuestions);

		// get empty test record
		OnlineTest.getNewRecord({}, function(result){

			var newRecord = result.data;

			newRecord.firstName = $scope.firstName;
			newRecord.lastName = $scope.lastName;
			newRecord.email = $scope.email;
			newRecord.country = $scope.country;
			newRecord.questions = recordQuestions;
			

			console.log(newRecord);

			// submit the test and store as a record

			OnlineTest.createTestRecord({testRecord:newRecord}, function(result){

				console.log(result);
				$scope.submited = true;	
			
				
			});


		});
	
	};

	$scope.selectAnswer = function(answer){
		$scope.currentAnswer = answer.title;

		//$scope.answers[question._id] = answer.title;
		
		//console.log($scope.answers);
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

.filter('toCountTime', function() {
  return function(input) {
    // input = input || '';
    // var out = "";
    // for (var i = 0; i < input.length; i++) {
    //   out = input.charAt(i) + out;
    // }
    var min = Math.floor(input/60);
    var second = input % 60;
    var min_str = '';
    var second_str = '';
    if(min < 10)
    	min_str = '0'+ min;
    else
    	min_str = ''+ min;
    if(second < 10)
    	second_str = '0'+ second;
    else
    	second_str = ''+ second;

    var output = min_str + ' : ' + second_str;
    return output;
  };
});
