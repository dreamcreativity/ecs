'use strict';
angular.module('ClientApp')
.controller('OnlineTestCtrl',function RegisterCtrl($rootScope,$scope,Constants,OnlineTest,$window){
	
	$scope.firstName = '';
	$scope.lastName = '';
	$scope.email = '';
	$scope.country = '';

	$scope.currentAnswer = '';

	$scope.started = false;
	$scope.done = false;
	$scope.submited = false;
	$scope.index = 1;

	Constants.get({name: 'Country'}, function(result){
		$scope.countries = result.data;		
	});


	$scope.start = function(){
		
		OnlineTest.getTestQuestions({}, function(result){

			$scope.index = 0;
			$scope.questions = result.data;
			$scope.started = true;
			$scope.done = false;
			$scope.submited = false;
			$scope.answers = {}; 
			console.log($scope.questions);
		});
	};

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

		// OnlineTest.getNewRecord({}, function(result){
		// 	console.log(result);
		// });
		
		
	
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





});
