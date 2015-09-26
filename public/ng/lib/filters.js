'use strict';

var filters = angular.module('esc.filters', []);


filters.filter('filesize', function() {
  return function(input) {
    //return input ? '\u2713' : '\u2718';
    var outputVal = 0;
    var outputString = "KV";

    if(input / (1024*1024) >= 1.0){
    	outputVal = Math.round(input / (1024*1024), -1);
    	outputString =  outputVal + ' MB';
    }else{
    	if(input / 1024 >= 1.0){
    		outputVal = Math.round(input / 1024);
    		outputString  =	outputVal + ' KB'; 
    	}else{
    		outputVal = Math.round(input / 1024, -2);
    		outputString  =	outputVal + ' KB'; 
    	}
    }

    return outputString;
  };
})