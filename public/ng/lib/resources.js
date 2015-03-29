'use strict';

var resources = angular.module('esc.resources', []);


resources.factory('Medias',['$resource',
    function($resource){
        return $resource('/api/media/target/:target', {}, {
        query:{ method: 'GET',params: {target:'@target'}}
    });
}]);