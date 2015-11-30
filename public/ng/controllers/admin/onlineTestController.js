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


});
