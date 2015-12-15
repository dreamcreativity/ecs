'use strict';

angular.module('AdminApp')

.controller('ListOnlineTestController',  function($scope,$rootScope, OnlineTest){

	OnlineTest.getAll({}, function(result){
		$scope.questions = result.data;
	});
})

.controller('ListOnlineTestRecordController',  function($scope,$rootScope, OnlineTest){

	OnlineTest.getTestRecords({}, function(result){
		$scope.records = result.data;
		//console.log($scope.records);
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
