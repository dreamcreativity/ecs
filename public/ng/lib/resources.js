'use strict';

var resources = angular.module('esc.resources', ['ngResource'])

.factory('Staffs',['$resource',
    function($resource){
        return $resource('http://localhost:3000/api/staffs/:id', {}, {
        query:{ method: 'GET'},
        update : { method : 'PUT', params: {id:'@_id'}}
    });
}])


.factory('Agents',['$resource',
    function($resource){
        return $resource('/api/agent/region/:name', {}, {
        query:{ method: 'GET'}
    });
}])


resources.factory('MediaTarget',['$resource',
    function($resource){
        return $resource('/api/media/target/:target', {}, {
        query:{ method: 'GET',params: {target:'@target'}}
    });
}]);



resources.factory('Medias',['$resource',
    function($resource){
        return $resource('/api/media/:id', {}, {
        query:{ method: 'GET'},
        get : { method : 'GET', params: {id:'@_id'}},
        update : { method : 'PUT', params: {id:'@_id'}},
        delete : { method : 'DELETE', params: {id:'@_id'}},
    });
}]);


resources.factory('Regions',['$resource',
    function($resource){
        return $resource('/api/region/:id', {}, {
        query:{ method: 'GET'},
        update : { method : 'PUT', params: {id:'@_id'}}
    });
}]);


resources.factory('SendEmail', ['$http',function($http){
    return {
        postEmail : function (emailData, callback){
            $http.post("/api/postEmail/", emailData).success(callback);
        }
    }
}]);

// resources.factory('SendEmail', ['$resource',function($resource){
//     return $resource("/postEmail/", {},{
//         post : {
//             method : 'POST'
//         }
//     });
// }]);
