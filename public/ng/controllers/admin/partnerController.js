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
.controller('partnerCtrl', function PartnerCtrl($scope,$http,StaticMedia,Partner,Sticker,$modal,Medias,$window){


	if ( typeof url_params === "undefined" || typeof url_params.id === "undefined"){
		$scope.partner = {
			name: '',
			description: ''
		};
	}else{
		Partner.get(url_params, function(result){


			$scope.partner = result.data;	
			$scope.tagList = [];
			for(var i=0; i<$scope.partner.tags.length; i++){
				$scope.tagList.push({"name" : $scope.partner.tags[i]});
			}

		});


		Sticker.get(function(result){
			//console.log(result);

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
		
		console.log($scope.tagList);
		$scope.partner.tags =[];

		for (var i = 0; i < $scope.tagList.length; i++) {
			$scope.partner.tags.push($scope.tagList[i].name);
		};
		console.log($scope.partner);
		Partner.update($scope.partner, function(result){
			if(result.status == 'ok'){
				ShowGritterCenter('System', "Partner information updated");
			}else{
				ShowGritterCenter('Error',result.messages);
			}

		});
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

			console.log(result);
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


});

