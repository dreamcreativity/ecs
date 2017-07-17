'use strict';
angular.module('AdminApp')
.controller('partnerListCtrl', function PartnerCtrl($scope,$http,StaticMedia,Partner,$modal,Medias,$window){
	Partner.query(function(result){
		$scope.partners = result.data;
	});


	Medias.getCategoryTargetMedia({target : 'Partner', type:'Image'},function(result){

		//console.log(result);
		$scope.medias=result.data;

		$scope.changeSource = createMediaSelectorFunction($modal, $scope.medias,function(selectedMedia){ 
			$scope.staticCalendar.media = selectedMedia;
		});


	})

})
.controller('partnerCtrl', function PartnerCtrl($scope,$http,StaticMedia,Partner,Sticker,$modal,Medias,$window){


	if ( typeof url_params === "undefined" || typeof url_params.id === "undefined"){
		$scope.partner = {
			name: '',
			description: ''
		};
	}else{
		
		Partner.get(url_params, function(result){
			$scope.partner = result.data;

			console.log($scope.partner );

			Partner.getAreaCategoryList( {},function(result){
				$scope.areas = result.data;	
				console.log($scope.areas );
			});

		});


		Sticker.get(function(result){
			$scope.stickers = result.data;
		});
	}


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

		console.log($scope.partner);
		Partner.update($scope.partner, function(result){
			if(result.status == 'ok'){
				ShowGritterCenter('System', "Partner information updated");
			}else{
				ShowGritterCenter('Error',result.messages);
			}

		});
	}


	$scope.inCategory = function(catId){
		var isfound = false;
		console.log(catId);
		// $scope.partner.categoris.forEach(function(element) {

		//     if(catid == element){
		//     	isfound = true;
		//     	//break;
		//     }
		// });

		return isfound;

	}

	//----------------------------
	// sticker section
	//----------------------------
	$scope.stickerFilterString = '';
	
	$scope.celar = function(){
		$scope.stickerFilterString = '';
	}

	$scope.newSticker = function(){
		
		Sticker.create({title: 'new'},function(result){

			//console.log(result);
			$scope.stickers.push(result.data);
		});
	}

	$scope.updateSticker = function(sticker){
		Sticker.update( sticker ,function(result){
			ShowGritterCenter('System Message : ', 'Sticker "' + sticker.title +  '" Updated.');
		});
	}

	$scope.deleteSticker = function(sticker){
		if(confirm('Are you really want to delete sticker "' + sticker.title +  '" ?')){
			Sticker.delete( {id:sticker._id} ,function(result){
				$scope.stickers.splice($scope.stickers.indexOf(sticker), 1);
				ShowGritterCenter('System Message : ', 'Sticker "' + sticker.title +  '" has been removed.');
			});	
		}
	}

	Medias.getCategoryTargetMedia({target : 'Partner', type:'Image'},function(result){
		$scope.medias=result.data;
		$scope.changeSource = createMediaSelectorFunction($modal, $scope.medias,function(selectedMedia){ 
			$scope.partner.cover = selectedMedia;
		});
	})

	Medias.getCategoryTargetMedia({target : 'Partner', type:'Document'},function(result){
		$scope.reportFiles=result.data;
		$scope.changeReport = createMediaSelectorFunction($modal, $scope.reportFiles,function(selectedMedia){ 
			$scope.partner.report = selectedMedia;
		});
	})



})
.controller('partnerCategoryCtrl', function partnerCategoryCtrl($scope,$http,Partner,$modal,Medias){


	if ( typeof url_params === "undefined" || typeof url_params.id === "undefined"){
		$scope.partner = {
			name: '',
			description: ''
		};

		Partner.getAreaCategoryList( {},function(result){
			$scope.areas = result.data;	
		});

	}else{

		Partner.getAreaCategory(url_params, function(result){
			$scope.area = result.data;	
			console.log($scope.area);
		});
	}


	$scope.create = function(){
		Partner.createArea($scope.partner, function(result){
			if(result.status == 'ok'){			
				ShowGritterCenter('System', "Area of Partner created");
				setTimeout(function(){
  					 location='/admin/partner/area/detail/'+ result.data._id;
				}, 2000); 
			}else{
				// display error message.
				ShowGritterCenter('Error',result.messages);
			}
		});
	}

	$scope.update = function() {

		Partner.updateArea($scope.area, function(result){
			if(result.status == 'ok'){
				ShowGritterCenter('System', "Partner information updated");
			}else{
				ShowGritterCenter('Error',result.messages);
			}

		});

	}

	Medias.getCategoryTargetMedia({target : 'Partner', type:'Image'},function(result){

		$scope.medias=result.data;

		$scope.changeSource = createMediaSelectorFunction($modal, $scope.medias,function(selectedMedia){ 
			$scope.area.cover = selectedMedia;
		});


	})


})
.controller('partnerSearchRecorndCtrl', function PartnerCtrl($scope,$http,Partner){

	Partner.getKeyRecord(function( result){
		//console.log(result.data);
		$scope.list = result.data;
	});
});

