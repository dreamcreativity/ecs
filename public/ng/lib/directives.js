'use strict';

var directives = angular.module('esc.directives', [])

directives.directive('logoutButton', function() {
  return {
    restrict: 'A',
    
    link: function (scope, element, attrs) {

            $(element).on('click', function (e) 
            {
                console.log('logout');
            });
            
        }
  };
})

