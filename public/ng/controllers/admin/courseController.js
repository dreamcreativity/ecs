'use strict';
angular.module('AdminApp')


.controller('CourseCtrl',function CourseCtrl($rootScope,$scope,$http,Courses,$window){
	 $scope.courses = getAllCourses();

 	function getAllCourses(){
 		return Courses.query();
 	}

 	$scope.create = function(isValid){
	 	Courses.save($scope.course,function(result){
	 		    var message = result.messages;	    
	 		     $scope.returnMessage = "successfully";
	 			setInterval(function(){
  					 $window.location='/admin/course/all';
				}, 1000); 
 		})
	 }

})


.controller('CourseEditCtrl', function CourseEditCtrl($rootScope,$scope,$http,$modal,Courses,Duration,CourseLink,Medias,$window) {
	var course_id = url_params.id;

	 if(course_id !=null){
	 	Courses.get({id:course_id}, function(result){

	 		$scope.course = result.data;
	 		$scope.course.durations.sort(SortByOrder);
	 		console.log($scope.course)
	 		$scope.newDuration = {
			 	'title': '',
			 	'price': 0.0,
			 	'course': $scope.course._id
			};

			$scope.newCourseLink = {
			 	'title': '',
			 	'href': '',
			 	'course': $scope.course._id
			};
	 	});	 	
	 }


	function SortByOrder(a, b){
		var aOrder= a.order;
		var bOrder = b.order; 
		return ((aOrder < bOrder) ? -1 : ((aOrder > bOrder) ? 1 : 0));
	}


	 // load meida image
	Medias.getCategoryTargetMedia({target:'Course',type:'Image'}, function(result){
	 	$scope.meidas = result.data;
	 	console.log($scope.meidas);
	});


	// function for duration control
	$scope.selectedDuration = null;
	$scope.removeDuration = function(object) {
		var index = $scope.course.durations.indexOf(object);
		$scope.course.durations.splice(index, 1);
	}

	 $scope.editDuration = function(object) {
	 	
	 	$scope.selectedDuration = object;

	 	var newObject = jQuery.extend(true, {}, object);
		var modalInstance = $modal.open({
		  templateUrl: 'myModalContent.html',
		  controller: 'ModalInstanceCtrl',
		  resolve: {
		    editDuration: function () {
		      return newObject;
		    }
		  }
		});

		modalInstance.result.then(function (duration) {
		  //$scope.user.name = user.name;
		  console.log(duration);
		  var result = $.grep($scope.course.durations, function(e){ return e._id == duration._id; });
		  console.log(result[0]);
		  result[0].title = duration.title;
		  result[0].price = duration.price;
		  //$scope.selectedDuration = duration;
		}, function () {
		  	// done
		});
	 	
	 }

	 $scope.createDuration = function() {
	 	Duration.create($scope.newDuration, function(result){
	 		 var newDuration = result.data;
	 		 newDuration.order = $scope.course.durations.length;

	 		$scope.course.durations.push(newDuration);
	 		$scope.newDuration.title = '';
	 		$scope.newDuration.price = 0.0;
	 		$('#addNewDuration').modal('hide');
	 	});
	 }



	// change banner
	$scope.changeBanner = function(){
	var modalInstance = $modal.open({
		  templateUrl: 'courseMedias.html',
		  controller: 'ModalMediaInstanceCtrl',
		  windowClass: 'app-modal-lg',
		  resolve: {
		  	meidas: function(){
		  		return $scope.meidas 
		  	}
		  }
		});

		modalInstance.result.then(function (selectedMedia) {
		  $scope.course.banner = selectedMedia;
		}, function () {
		  	// done
		});
	}


	 // change cover image for course
	 $scope.changeCover = function(){
		var modalInstance = $modal.open({
		  templateUrl: 'courseMedias.html',
		  controller: 'ModalMediaInstanceCtrl',
		  windowClass: 'app-modal-lg',
		  resolve: {
		  	meidas: function(){
		  		return $scope.meidas 
		  	}
		  }
		});

		modalInstance.result.then(function (selectedMedia) {
		  //$scope.user.name = user.name;
		  $scope.course.cover = selectedMedia;
		  
		  //$scope.selectedDuration = duration;
		}, function () {
		  	// done
		});
	 }

	$scope.createLink = function() {
		CourseLink.create($scope.newCourseLink, function(result){
			$scope.course.links.push(result.data);
			$scope.newCourseLink.title = '';
			$scope.newCourseLink.href = '';
			$scope.newCourseLink.order = $scope.course.links.length;
			$('#addNewLink').modal('hide');
		});
	}

	$scope.removeLink = function(object) {
		var index = $scope.course.links.indexOf(object);
		$scope.course.links.splice(index, 1);
	}

	$scope.selectedCourseLink = null;
	$scope.editLink = function(link) {

		$scope.selectedCourseLink = link;

		var newLink = jQuery.extend(true, {}, link);
		var modalInstance = $modal.open({
		  templateUrl: 'EditLinkModalContent.html',
		  controller: 'EditLinkModalInstanceCtrl',
		  windowClass: 'app-modal-lg',
		  resolve: {
		  	editCourseLink: function(){
		  		return newLink;
		  	}
		  }
		});

		modalInstance.result.then(function (editCourseLink) {

		  $scope.selectedCourseLink.title = editCourseLink.title;
		  $scope.selectedCourseLink.href = editCourseLink.href;
		}, function () {
		  	// done
		});
	}

	
	// move list items
	$scope.moveListItemUp = function(list, index){
		if(index > 0){
			var preOrderIndex = list[index-1].order;
			list[index-1].order = list[index].order;
			list[index].order = preOrderIndex;
			list.sort(SortByOrder);
		}
	}

	$scope.moveListItemDown = function(list, index){
		if(index < list.length-1){
			var preOrderIndex = list[index+1].order;
			list[index+1].order = list[index].order;
			list[index].order = preOrderIndex;
			list.sort(SortByOrder);
		}
	}
		

	// update course
	$scope.update = function(isValid) {
	$scope.returnMessage="";
		$("#messageReturn").fadeIn('slow');
		Courses.update($scope.course, function(result){
				var message = result.messages;	   
				console.log(message); 
			    $scope.returnMessage = message;
			    $("#messageReturn").delay(2000).fadeOut('slow');
				// $window.location='/admin/staff/detail/'+ staff_id;
		})
	}




})

.controller('ModalMediaInstanceCtrl', function ($scope, $modalInstance, meidas) {

	$scope.Medias = meidas;
	$scope.selectedMedia = null;
	$scope.ok = function () {
	//$modalInstance.close($scope.duration );
	$modalInstance.close($scope.selectedMedia);
	};

	$scope.cancel = function () {
	$modalInstance.dismiss('cancel');
	};

	$scope.selectMedia = function(selectedMedia){
		$modalInstance.close(selectedMedia);
	}
})
.controller('EditLinkModalInstanceCtrl', function ($scope, $modalInstance, editCourseLink) {


	$scope.link = editCourseLink;
	$scope.ok = function () {
	$modalInstance.close($scope.link );
	};

	$scope.cancel = function () {
	$modalInstance.dismiss('cancel');
	};
})

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, editDuration) {


	$scope.duration = editDuration;
	$scope.ok = function () {
		$modalInstance.close($scope.duration );
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});




