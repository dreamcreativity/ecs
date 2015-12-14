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
			$scope.answers = {}; 
			console.log($scope.questions);
		});
	};

	$scope.next = function(){

		if($scope.currentAnswer == '')
			return;

		if($scope.questions[$scope.index].type == 'Sentence Completion'){
			// $scope.answers[index] = answer.
		}


		//console.log($scope.index);

		if( $scope.index < $scope.questions.length -1 ){
			$scope.index++;
			$scope.currentAnswer = '';
		}else{

			$scope.testFinish();
		}
		//console.log($scope.index);
		
	};

	$scope.testFinish = function(){
		$scope.done = true;

		// OnlineTest.getNewRecord({}, function(result){
		// 	console.log(result);
		// });

	
	};

	$scope.submitTest = function(){
		
		OnlineTest.getNewRecord({}, function(result){

			var newRecord = result.data;

			newRecord.questions = $scope.questions;
			newRecord.answers = $scope.answers;

			console.log(newRecord);
		});
	
	};

	$scope.selectAnswer = function(index, answer){
		$scope.currentAnswer = answer;


		$scope.answers[index] = answer
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
