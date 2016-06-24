'use strict';

var resources = angular.module('esc.resources', ['ngResource']);


resources.factory('StaffAccount',['$resource',
    function($resource){
        return $resource('/api/staff-account/:id', {}, {
        query:{ method: 'GET'},
        changePassword:{
            url: '/api/staffs/changepassword',
            method: 'POST',
            params: {passwordInfo: '@info'}
        }

    });
}]);

resources.factory('Staffs',['$resource',
    function($resource){
        return $resource('/api/staffs/:id', {}, {
        query:{ method: 'GET'},
        update : { method : 'PUT', params: {id:'@_id'}},
        resetpassword : {
            url: '/api/staffs/resetpassword/:id',
            method: 'POST',
            params: {id:'@_id'}
       } 
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
        update : { method : 'PUT', params: {id:'@_id'}},
        getAgentbyRegion : 
        {
            url: '/api/agent/region/:name',
            method : 'GET', 
            params: {name:'@_name'}
        }
    });
}])

resources.factory('JuniorPrograms',['$resource',
    function($resource){
        return $resource('/api/juniorprograms/:id', {}, {
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
        update : { method : 'PUT', params: {id:'@_id'}},
        updateByAgent : {
            url : '/api/student/agent/:id',
            method : 'PUT',
            params : {id : '@_id'}
        },
        getStudentsByAgent : {
            url : '/api/student/agent/:id',
            method : 'GET',
            params : {id : '@_id'}
        },
        getRegistrationsByAgent : {
            url : '/api/registration/agent/:id',
            method : 'GET',
            params : {id : '@_id'}
        },
        getRegistrationsByStudent : {
            url : '/api/registration/student/:id',
            method : 'GET',
            params : {id : '@_id'}
        },
        ExtendingCourse : {
            url : '/api/student/extending',
            method : 'POST',
            params : {student_id : '@student_id', courseList : '@courseList'}
        },
        getTopRegistrations : {
             url : '/api/registration/top',
             method : 'GET'
        }
    });
}])


.factory('Commissions',['$resource',
    function($resource){
        return $resource('/api/commissions', {}, {
        getByAgentId :{
            url: '/api/commission/byAgentId',
            method : 'POST',
            params : {agentId: '@agentId'}
        }
    });
}])


.factory('Accommodations',['$resource',
    function($resource){
        return $resource('/api/accommodation', {}, {
        create:{ method: 'POST'},
        update :{
            url: '/api/student/accommodation/:id',
            method : 'PUT',
            params : {id : '@_id'}
        }
    });
}])

.factory('FlightInfos',['$resource',
    function($resource){
        return $resource('/api/flightInfo', {}, {
        create:{ method: 'POST'},
        update :{
            url: '/api/student/flightInfo/:id',
            method : 'PUT',
            params : {id : '@_id'}
        }
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
        update : { method : 'PUT', params: {id:'@_id'}},
        getStaticEvent : { url: '/api/events-static', method: 'GET'},
        updateStaticEvent: { url: '/api/events-static', method: 'PUT'}
    });
}])


.factory('Calendar',['$resource',
    function($resource){
        return $resource('/api/calendar-static', {}, {
        getCalendarEvent : { url: '/api/calendar-static', method: 'GET'},
        updateCalendarEvent: { url: '/api/calendar-static', method: 'PUT'}
    });
}])


.factory('StaticMedia',['$resource',
    function($resource){
        return $resource('/api/static-media/', {}, {
        getCurrentYearAcademyCalendar : { url: '/api/static-media/CurrentAcademyCalendar', method: 'GET'},
        updateCurrentYearAcademyCalendar: { url: '/api/static-media/CurrentAcademyCalendar', method: 'PUT'},
        getFutureAcademyCalendar : { url: '/api/static-media/FutureAcademyCalendar', method: 'GET'},
        updateFutureAcademyCalendar: { url: '/api/static-media/FutureAcademyCalendar', method: 'PUT'},
        getActivityCalendars: { url: '/api/static-media/ActivityCalendar', method: 'GET'}
    });
}])



resources.factory('Meterials',['$resource',
    function($resource){
        return $resource('/api/materials/:id', {}, {
        query:{method: 'GET'},
        create:{ method: 'POST'},
        get:{ method: 'GET', params: {id:'@_id'} },
        update:{ method: 'PUT', params: {id:'@_id'}},
        getMaterialByAgentId :{
            url: '/api/materials/agent/:id',
            method : 'GET',
            params : {id : '@_id'}
        }
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
        getCalendarCourseList: {
            url: '/api/courses-calendar',
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

resources.factory('ProgramRegister',['$resource',
    function($resource){
         return $resource('/api/student/programregister/:id', {}, {
        get:{ method: 'GET', params: {id:'@_id'} },
        update:{ method: 'POST', params: {id:'@_id',course : '@course'} }
    });
}]);

resources.factory('Payments',['$resource',
    function($resource){
        return $resource('/api/student/payment/:id', {}, {
        query:{ method: 'GET'},
        create:{method: 'POST'},
        update : { method : 'PUT', params: {id:'@_id'}}
    });
}]);

resources.factory('Constants',['$resource',
    function($resource){
        return $resource('/api/constants/:name', {}, {
        get:{ method: 'GET', params: {name:'@_name'} }
    });
}]);

resources.factory('AgentTokens',['$resource',
    function($resource){
        return $resource('/api/agent/token/:token', {}, {
        post:{ method: 'POST', params: {token:'@token'} }
        
    });
}]);


resources.factory('Promotions',['$resource',
    function($resource){
        return $resource('/api/promotions/:id', {}, {
        query:{ method: 'GET'},
        create:{ method: 'POST'},
        get:{ method: 'GET', params: {id:'@_id'} },
        update:{ method: 'PUT', params: {id:'@_id'}},
        getPromotionByRegion: {
            url: '/api/promotions/region/:region',
            method : 'GET', 
            params: {region:'@region'}
        },
    });
}]);

resources.factory('OnlineTest',['$resource',
    function($resource){
        return $resource('/api/onlineTest/getNew/:id', {}, {
        
        getNew: {
            url: '/api/onlineTest/getNew',
            method : 'GET', 
            params: {}
        },

        getAll: {
            url: '/api/onlineTest/getAll',
            method : 'GET', 
            params: {}
        },

        get: {
            url: '/api/onlineTest/get/:id',
            method : 'GET', 
            params: {id:'@_id'}
        },

        getTestQuestions: {
            url: '/api/onlineTest/getTestQuestions',
            method : 'GET',
        },

        create: {
            url: '/api/onlineTest/create',
            method : 'POST', 
            params: {question:'@question'}
        },

        save: {
            url: '/api/onlineTest/save/:id',
            method : 'PUT', 
            params: {id:'@_id'}
        },


        getNewRecord: {
            url: '/api/onlineTest/getNewTestRecord',
            method : 'GET', 
            params: {}
        },

        createTestRecord: {
            url: '/api/onlineTest/submitTestRecord',
            method : 'POST', 
            
        },

        getTestRecords: {
            url: '/api/onlineTest/records',
            method : 'GET',        
        },

        getTestRecord: {
            url: '/api/onlineTest/record/:id',
            method : 'GET', 
            params: {id:'@_id'}
        },

    });
}]);



// resources.factory('SendEmail', ['$resource',function($resource){
//     return $resource("/postEmail/", {},{
//         post : {
//             method : 'POST'
//         }
//     });
// }]);
