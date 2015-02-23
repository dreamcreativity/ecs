'use strict';

angular.module('adminApp', ['ngResource'])

.controller('SliderController',function SliderController($rootScope,$scope,$location,$http,$window){


	 var token = sessionStorage.token;

	 $scope.textColor = "#cccccc";

	 $scope.colors = [
	 	{ name: 'grey', code: '#cccccc'},
	 	{ name: 'white', code: '#ffffff'},
	 	{ name: 'black', code: '#000000'},
	 	{ name: 'red', code: '#f00'}
	 ];

	 $scope.rgb2hex = function (rgb) {
	    rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
	    function hex(x) {
	        return ("0" + parseInt(x).toString(16)).slice(-2);
	    }
	    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
	}
})


.directive('colorPickerClick', function() {
  return {
  	scope: { textColor: '='},
    link: function (scope, element, attrs) {
    		
            element.on('click', function () {
                console.log( scope.rgb2hex(element.css('background-color')));
                //scope.textColor = scope.rgb2hex(element.css('background-color'));
                console.log(scope.textColor);
                scope.$apply(function(){
		           scope.textColor = '#444444';
		      	});
       
            });
            
        }
  };
});