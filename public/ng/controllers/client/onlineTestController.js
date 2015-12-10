'use strict';
angular.module('ClientApp')
.controller('OnlineTestCtrl',function RegisterCtrl($rootScope,$scope,Constants,OnlineTest,$window){
	
	$scope.firstName = '';
	$scope.lastName = '';
	$scope.email = '';
	$scope.country = '';

	$scope.currentAnswer = '';

	$scope.started = false;

	$scope.index = 1;

	Constants.get({name: 'Country'}, function(result){
		$scope.countries = result.data;		
	});


	$scope.start = function(){
		
		OnlineTest.getTestQuestions({}, function(result){

			$scope.index = 0;
			$scope.questions = result.data;
			$scope.started = true;
			$scope.answers = {}; 
			console.log($scope.questions);
		});
	};

	$scope.next = function(){

		if($scope.questions[$scope.index].type == 'Sentence Completion'){
			// $scope.answers[index] = answer.
		}


		if( $scope.index < $scope.questions.length -1 )
			$scope.index++;
	};

	$scope.done = function(){
		
		console.log()
	};

	$scope.selectAnswer = function(index, answer){
		$scope.answers[index] = answer
		console.log($scope.answers);
	};


	$scope.getFirstPartOfQuestion = function(question){
		var list = question.title.split('###');
		return list[0].trim();
	};

	$scope.getLastPartOfQuestion = function(question){
		var list = question.title.split('###');
		return list[1].trim();
	};



});
