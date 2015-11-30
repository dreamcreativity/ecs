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


});
