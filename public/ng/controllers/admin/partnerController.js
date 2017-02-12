'use strict';
angular.module('AdminApp')
.controller('partnerListCtrl', function PartnerCtrl($scope,$http,StaticMedia,Partner,$modal,Medias,$window){
	Partner.query(function(result){
		$scope.partners = result.data;
	});


	Medias.getCategoryTargetMedia({target : 'Partner', type:'Image'},function(result){

		console.log(result);
		$scope.medias=result.data;

		$scope.changeSource = createMediaSelectorFunction($modal, $scope.medias,function(selectedMedia){ 
			$scope.staticCalendar.media = selectedMedia;
		});


	})

})
.controller('partnerCtrl', function PartnerCtrl($scope,$http,StaticMedia,Partner,$modal,Medias,$window){


	if ( typeof url_params === "undefined" || typeof url_params.id === "undefined"){
		$scope.partner = {
			name: '',
			description: ''
		};
	}else{
		Partner.get(url_params, function(result){
			$scope.partner = result.data;	
		});
	}

	$scope.test  = 'andy';



	$scope.create = function(){

		Partner.create($scope.partner, function(result){
			if(result.status == 'ok'){			
				ShowGritterCenter('System', "Partner created");
				setInterval(function(){
  					 $window.location='/admin/partner/detail/'+ result.data._id;
				}, 2000); 
			}else{
				// display error message.
				ShowGritterCenter('Error',result.messages);
			}
		});
	}

	$scope.update = function(){
		Partner.create($scope.partner, function(result){

			console.log(result);

			if(result.status == 'ok'){
				ShowGritterCenter('System', "Partner created");
				setInterval(function(){
  					 $window.location='/admin/partner/detail/'+ result.data._id;
				}, 2000); 
			}else{
				// display error message.
				ShowGritterCenter('Error',result.messages);
			}

		});
	}

	// StaticMedia.getFutureAcademyCalendar({},function(result){
	// 	$scope.staticFutureCalendar = result.data;
	// });	


	Medias.getCategoryTargetMedia({target : 'Partner', type:'Image'},function(result){

		console.log(result);
		$scope.medias=result.data;

		$scope.changeSource = createMediaSelectorFunction($modal, $scope.medias,function(selectedMedia){ 
			$scope.partner.cover = selectedMedia;
		});


	})

	// $scope.update = function() {

 // 		console.log('do save');

 // 		StaticMedia.updateCurrentYearAcademyCalendar($scope.staticCalendar,function(result){
	// 		console.log(result);
			
	// 	});

	// 	StaticMedia.updateFutureAcademyCalendar($scope.staticFutureCalendar,function(result){
	// 		console.log(result);
			
	// 	});	
	// }
});

