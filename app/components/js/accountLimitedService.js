
app.service('accountLimitedService', accountLimitedService)
function accountLimitedService(serverRequest) {

    var service = {};
    service.checkLimited = function(account) {
        service.result = serverRequest.API('/checkLimited/scrape-account' , account);
        return service.result
    };

    return service;
}
