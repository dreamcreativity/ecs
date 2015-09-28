'use strict';

var resources = angular.module('esc.resources', ['ngResource']);


resources.factory('StaffAccount',['$resource',
    function($resource){
        return $resource('/api/staff-account/:id', {}, {
        query:{ method: 'GET'}
    });
}]);

resources.factory('Staffs',['$resource',
    function($resource){
        return $resource('/api/staffs/:id', {}, {
        query:{ method: 'GET'},
        update : { method : 'PUT', params: {id:'@_id'}}
    });
}]);


resources.factory('Agents',['$resource',
    function($resource){
        return $resource('/api/agent/region/:name', {}, {
        query:{ method: 'GET'}
    });
}]);


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
        deleteMedias : { 
            url: '/api/media/deleteMedias',
            method : 'POST', 
            params: {ids:'@_ids'}
        },
        getCategoryTargetMedia : 
        {
            url: '/api/media/target/:target/type/:type',
            method : 'GET', 
            params: {target:'@_target', type:'@_type'}
        },
        getMediaByTarget : 
        {
            url: '/api/media/target/:target',
            method : 'GET', 
            params: {target:'@_target'}
        },
    });
}]);


resources.factory('Regions',['$resource',
    function($resource){
        return $resource('/api/region/:id', {}, {
        query:{ method: 'GET'},
        update : { method : 'PUT', params: {id:'@_id'}}
    });
}]);


resources.factory('Agents',['$resource',
    function($resource){
        return $resource('/api/agent/:id', {}, {
        query:{ method: 'GET'},
        update : { method : 'PUT', params: {id:'@_id'}}
    });
}])

// resources.factory('Students',['$resource',
//     function($resource){
//         return $resource('/api/student/agent/:agent_id', {}, {
//         query:{ method: 'GET'},
//     });
// }])

.factory('Students',['$resource',
    function($resource){
        return $resource('/api/student/:id', {}, {
        query:{ method: 'GET'},
        update : { method : 'PUT', params: {id:'@_id'}}
    });
}])

.factory('Accommodations',['$resource',
    function($resource){
        return $resource('/api/accommodation', {}, {
        create:{ method: 'POST'}
    });
}])

.factory('FlightInfos',['$resource',
    function($resource){
        return $resource('/api/flightInfo', {}, {
        create:{ method: 'POST'}
    });
}])

resources.factory('StudentByAgent',['$resource',
    function($resource){
        return $resource('/api/student/:id', {}, {
        query:{ method: 'GET'},
        update : { method : 'PUT', params: {id:'@_id'}}
    });
}])


.factory('Events',['$resource',
    function($resource){
        return $resource('/api/events/:id', {}, {
        query:{ method: 'GET'},
        update : { method : 'PUT', params: {id:'@_id'}}
    });
}])



resources.factory('Meterials',['$resource',
    function($resource){
        return $resource('/api/materials/:id', {}, {
        query:{method: 'GET'},
        create:{ method: 'POST'},
        get:{ method: 'GET', params: {id:'@_id'} },
        update:{ method: 'PUT', params: {id:'@_id'} }
    });
}]);


resources.factory('SendEmail', ['$http',function($http){
    return {
        postEmail : function (emailData, callback){
            $http.post("/api/postEmail/", emailData).success(callback);
        }
    }
}]);


resources.factory('Courses',['$resource',
    function($resource){
        return $resource('/api/courses/:id', {}, {
        query:{ method: 'GET'},
        get:{ method: 'GET', params: {id:'@_id'}},
        update : { method : 'PUT', params: {id:'@_id'}},
        getSimpleList: {
            url: '/api/infocourses/',
            method : 'GET', 
            params: {}
        },
        getCourstStartDateList: {
            url: '/api/courses/startdate/:id/:year',
            method : 'GET', 
            params: {id:'@_id',year:'@year'}
        },
    });
}]);


resources.factory('Duration',['$resource',
    function($resource){
        return $resource('/api/duration/:id', {}, {
        //query:{ method: 'GET'},
        create:{method: 'POST'},
        update : { method : 'PUT', params: {id:'@_id'}}
    });
}]);

resources.factory('CourseLink',['$resource',
    function($resource){
        return $resource('/api/courselink/:id', {}, {
        //query:{ method: 'GET'},
        create:{method: 'POST'},
        //update : { method : 'PUT', params: {id:'@_id'}}
    });
}]);


resources.factory('Registrations',['$resource',
    function($resource){
        return $resource('/api/registration/:id', {}, {
        query:{ method: 'GET'},
        create:{ method: 'POST'},
        get:{ method: 'GET', params: {id:'@_id'} },
        update:{ method: 'PUT', params: {id:'@_id'} }
    });
}]);




// resources.factory('SendEmail', ['$resource',function($resource){
//     return $resource("/postEmail/", {},{
//         post : {
//             method : 'POST'
//         }
//     });
// }]);
