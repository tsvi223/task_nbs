app.component('accountLimited', {
  templateUrl: 'app/components/html/accountLimited.html',
  controller: accountLimitedComponent,
})
.component('checkForm' , {
    templateUrl: 'app/components/html/checkForm.html',
    controller: checkFormComponent,
    bindings :{
        branch : '<',
        account : '<',
        bank : '<',
        changeCallback: '&',
    }
})

function accountLimitedComponent(){
}

function checkFormComponent($rootScope , accountLimitedService){
    var view = this;
    view.list_inputs = [
        { textHolder : view.bank , name : 'account' ,  txt : 'חשבון' , status :  true } ,
        { textHolder : view.branch ,  name : 'branch' ,  txt : 'סניף' , status :  false } ,
        { textHolder : view.bank , name : 'bank' ,   name : 'bank' , txt : 'בנק' , status :  false } ,
        { textHolder : view.numCheck , name : 'check' ,  txt : 'מס ציק', status :  false } ,
        { textHolder : view.name ,  name : 'namePerson',  txt : 'שם' , status :  false } ,
        { textHolder : view.id ,  name : 'IDPerson',  txt : 'מ.ז / תאגיד' , status :  true }
    ]

    view.changeD = function(){
        console.log('stat');
        console.log(view.branch ,view.bank, view.account);
        if(!view.branch || !view.bank || !view.account) return;
        var accountCheck = {
            account : view.account,
            bank : view.bank,
            branch : view.branch
        }
        console.log(accountCheck);
        view.status = 'pending'
        accountLimitedService.checkLimited(accountCheck).then(function(result){
            view.status = result.status;
            result.account = view.account;
            $rootScope.$emit('send status' , result);
        })
    }
}
