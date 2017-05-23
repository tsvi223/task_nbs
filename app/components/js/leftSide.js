
    app.component('leftSide', {
        template: '<status-account>here<status-account><ng-outlet></ng-outlet>',
        require : {
        parent : '^appElement'
        },
        controller: leftSideComponent
    })
    .component('statusAccount', {
        require : {
        parent : '^appElement'
        },
        templateUrl: 'app/components/html/statusAccount.html',
        controller: statusAccountComponent,
        bindings:{
            status : '<'
        }
    })
    function leftSideComponent() {
    }

    function statusAccountComponent($scope , $rootScope){
        var leftSideCtrl = this;
        leftSideCtrl.status = false;
        leftSideCtrl.status = 'arg.status1';
        leftSideCtrl.accountNum = '';

        $rootScope.$on('send status' , function(evn , arg){
            console.log('1' , arg);
            leftSideCtrl.status = arg.status;
             if(arg.status == 'correct') leftSideCtrl.statusText = getTextStatus('correct_text') ;
             if(arg.status == 'limited') leftSideCtrl.statusText = getTextStatus('limited_text' , arg.account);
        })
}


function getTextStatus(type , accountNum){
    var correct_text = {
        head : 'לקוח תקין',
        details : "חשוב לדעת, המידע המתקבל מבנק ישראל אינו כולל מספר החרגות."
    }
    var limited_text = {
        head : 'חשבון מוגבל',
        details : 'ע"פ נתוני בנק ישראל, מספר חשבון ' +  accountNum  + '  מוגבל.'
    }
    switch (type) {
        case 'correct_text': return correct_text; break;
        case 'limited_text': return limited_text; break;
        default:

    }
    return limited_text;

}
