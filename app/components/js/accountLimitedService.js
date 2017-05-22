(function(angular) {
  'use strict';
angular.module('home', ['requset'])
.service('accountLimitedService', accountLimitedService)
    function accountLimitedService(serverRequest) {
      
        var service = {};
        service.checkLimited = function(account) {
            service.result = serverRequest.API('/checkLimited' , account);
            return service.result
        };

        return service;
    }
})(window.angular);
