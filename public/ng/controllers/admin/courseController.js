'use strict';
angular.module('AdminApp')


.controller('CourseCtrl',function CourseCtrl($rootScope,$scope,$http,Constants,Courses,$window){
	 $scope.courses = getAllCourses();

 	function getAllCourses(){
 		return Courses.query();
 	}

 	$scope.create = function(isValid){
	 	Courses.save($scope.course,function(result){
   				if(result.status == 'ok') {
	 		    ShowGritterCenter('System Notification','Course has been created');
	 		     $scope.returnMessage = "successfully";
	 			setInterval(function(){
  					 $window.location='/admin/course/edit/' + result.data._id;
				}, 2000); 
	 		}
 		})
	 }

	// load contants for level and type
	Constants.get({name: 'CourseLevel'}, function(result){
		$scope.levels = result.data;		
	});

	Constants.get({name: 'CourseType'}, function(result){
		$scope.types = result.data;		
	});
	
	Constants.get({name: 'CourseCategory'}, function(result){
		$scope.categories = result.data;
		$scope.onMainCategoryChanged();		
	});

	$scope.onMainCategoryChanged = function(){
		for( var i in $scope.categories){
			if($scope.categories[i].category == $scope.course.category){
				$scope.selectedCategory = $scope.categories[i];
				break;
			}
		}

		$scope.course.subCategory = 'None';
	}


})


.controller('CourseEditCtrl', function CourseEditCtrl($rootScope,$scope,$http,$modal,Constants,Courses,Duration,CourseLink,Medias,$window,dateFilter) {
	var course_id = url_params.id;

	 if(course_id !=null){
	 	Courses.get({id:course_id}, function(result){

	 		$scope.course = result.data;
	 		$scope.course.durations.sort(SortByOrder);
	 		$scope.course.startPoint =  new Date($scope.course.startPoint);
	 		

	 		// init text editor
	 		$('#page-content').wysihtml5();


	 		$scope.newDuration = {
			 	'title': '',
			 	'price': 0.0,
			 	'week': 1,
			 	'level': 'Standard',
			 	'course': $scope.course._id
			};

			$scope.newCourseLink = {
			 	'title': '',
			 	'href': '',
			 	'course': $scope.course._id
			};

			// load meida image
			Medias.getCategoryTargetMedia({target:'Course',type:'Image'}, function(result){
			 	$scope.meidas = result.data;
			 	//console.log($scope.meidas);
			 	
				// create media seleoct click buttons
				$scope.changeCover = createMediaSelectorFunction($modal, $scope.meidas,function( selectedMedia){ 
					$scope.course.cover = selectedMedia;
				});
				$scope.changeBanner = createMediaSelectorFunction($modal, $scope.meidas,function( selectedMedia){ 
					$scope.course.banner = selectedMedia;
				});
			});	


			// load contants for category
			Constants.get({name: 'CourseCategory'}, function(result){
				$scope.categories = result.data;
				var currentSubCategory = $scope.course.subCategory;
				$scope.onMainCategoryChanged();		
				$scope.course.subCategory = currentSubCategory;
			});

	

			// $( "#slider-range-2" ).css({width:'250px', margin:'30px 5px'}).slider({
			// 	range: true,
			// 	min: 1,
			// 	max: 10,
			// 	values: [$scope.course.startLevel, $scope.course.endLevel],
			// 	slide: function( event, ui ) {
			// 		var val = ui.values[$(ui.handle).index()-1]+"";
					
			// 		var newVal = ui.values[$(ui.handle).index()-1];


					

			// 		if(newVal-$scope.course.startLevel > $scope.course.endLevel-newVal){
			// 			$scope.course.endLevel = newVal;
			// 		}else if(newVal-$scope.course.startLevel < $scope.course.endLevel-newVal){
			// 			$scope.course.startLevel = newVal;
			// 		}else{

			// 		}

			// 		console.log($scope.course);

			

					


			// 		if(! ui.handle.firstChild ) {
			// 			$(ui.handle).append("<div class='tooltip top in' style='display:none;left:-10px;top:-35px;'><div class='tooltip-arrow'></div><div class='tooltip-inner'></div></div>");
			// 		}
			// 		$(ui.handle.firstChild).show().children().eq(1).text(val);
			// 	}
			// 	}).find('a').on('blur', function(){
			// 		$(this.firstChild).hide();
			// });

	 	});	 	
	 }



	function SortByOrder(a, b){
		var aOrder= a.order;
		var bOrder = b.order; 
		return ((aOrder < bOrder) ? -1 : ((aOrder > bOrder) ? 1 : 0));
	}


	

	// load contants for level and type
	Constants.get({name: 'CourseLevel'}, function(result){
		$scope.levels = result.data;		
	});

	Constants.get({name: 'CourseType'}, function(result){
		$scope.types = result.data;		
	});

	
	

	$scope.onMainCategoryChanged = function(){
		for( var i in $scope.categories){
			if($scope.categories[i].category == $scope.course.category){
				$scope.selectedCategory = $scope.categories[i];
				break;
			}
		}

		$scope.course.subCategory = 'None';
	}





	// function for duration control
	$scope.selectedDuration = null;
	$scope.removeDuration = function(object) {
		var index = $scope.course.durations.indexOf(object);
		$scope.course.durations.splice(index, 1);
	}

	$scope.createDuration = function() {
	 	
	 	
		var obj = $scope.newDuration;
		var modalInstance = $modal.open({
		  templateUrl: 'addNewDurationModalContent.html',
		  controller: 'NewDurationModalInstanceCtrl',
		  resolve: {
		    newDuration: function () {
		      return obj;
		    },
		    levels: function(){
		    	return $scope.levels;
		    }
		  }
		});

		modalInstance.result.then(function (newDuration) {

		 	Duration.create(newDuration, function(result){
		 		 var newDuration = result.data;
		 		 console.log(newDuration);
		 		 newDuration.order = $scope.course.durations.length;

		 		$scope.course.durations.push(newDuration);
		 		$scope.newDuration.title = '';
		 		$scope.newDuration.price = 0.0;
		 		$scope.newDuration.week = 1;
		 		$scope.newDuration.level = 'Standard';
		 		$scope.newDuration.order = $scope.newDuration.length + 1;
		 		
		 	});
		}, function () {
		  	// done
		});
	 	
	}

	$scope.editDuration = function(object) {
	 	
	 	$scope.selectedDuration = object;

	 	var newObject = jQuery.extend(true, {}, object);
		var modalInstance = $modal.open({
		  templateUrl: 'editDurationModalContent.html',
		  controller: 'ModalInstanceCtrl',
		  resolve: {
		    editDuration: function () {
		      return newObject;
		    },
		    levels: function(){
		    	return $scope.levels;
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
		  result[0].week = duration.week;
		  result[0].level = duration.level;
		  //$scope.selectedDuration = duration;
		}, function () {
		  	// done
		});
	 	
	}




	$scope.createLink = function() {

		var modalInstance = $modal.open({
		  templateUrl: 'NewLinkModalContent.html',
		  controller: 'NewLinkModalInstanceCtrl',
		  windowClass: 'app-modal-lg',
		  resolve: {
		  	newCourseLink: function(){
		  		return $scope.newCourseLink;
		  	}
		  }
		});

		modalInstance.result.then(function (editCourseLink) {
	
			CourseLink.create(editCourseLink, function(result){
				$scope.course.links.push(result.data);
				$scope.newCourseLink.title = '';
				$scope.newCourseLink.href = '';
				$scope.newCourseLink.order = $scope.course.links.length+1;
			
			});
		}, function () {
		  	// done
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


		//console.log($($('.wysihtml5-sandbox')[0].contentDocument).find('body').first().html());

		$scope.course.content = $($('.wysihtml5-sandbox')[0].contentDocument).find('body').first().html();
		

		$scope.returnMessage="";
		$("#messageReturn").fadeIn('slow');

		setTimeout(function(){
			Courses.update($scope.course, function(result){

				console.log(result);
					var message = result.messages;	   
					if(result.status == 'ok')
						ShowGritterCenter('System Notification','Couse info has been updated');
					else
						ShowGritterCenter('System Notification',message);
	
			})

		},200);

	}




})




.controller('NewLinkModalInstanceCtrl', function ($scope, $modalInstance, newCourseLink) {
	$scope.link = newCourseLink;
	
	$scope.ok = function () {
		$modalInstance.close($scope.link );
	};

	$scope.cancel = function () {
	$modalInstance.dismiss('cancel');
	};
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

.controller('NewDurationModalInstanceCtrl', function ($scope, $modalInstance, newDuration, levels) {

	console.log(newDuration);

	$scope.newDuration = newDuration;
	$scope.levels = levels;
	$scope.ok = function () {
		$modalInstance.close($scope.newDuration );
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
})


.controller('ModalInstanceCtrl', function ($scope, $modalInstance, editDuration, levels) {


	$scope.duration = editDuration;
	$scope.levels = levels;
	$scope.ok = function () {
		$modalInstance.close($scope.duration );
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});




