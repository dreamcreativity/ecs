'use strict';

angular.module('AdminApp')


.controller('EditOnlineTestController',  function($scope,$rootScope, Constants, OnlineTest){



	Constants.get({name: 'OnlineTestQuestionType'}, function(result){
		$scope.questionType = result.data;		
	});

	OnlineTest.getNew({},function(result){
		console.log(result.data);
		$scope.question = result.data;
	});

	$scope.onTypeChanged =  function(){
		$scope.question.answers = [];
		$scope.question.correctAnswer = '';
	}


	$scope.addAnswer =  function(){

		if($scope.question.type.id == 1){
			var newAnswer = {
				title: 'add you answer here ...'
			};
		}else{
			var newAnswer = {
				title: ''
			};
		}
		
		$scope.question.answers.push(newAnswer);

		console.log($scope.question);
	}

	$scope.removeAnswer =  function(target){
		
		$scope.question.answers = $scope.question.answers.filter(function(obj) {
			return obj !== target;
		});
	}

	$scope.setCorrectAnswer =  function(target){
		
		$scope.question.correctAnswer = target.title;
	}

});
