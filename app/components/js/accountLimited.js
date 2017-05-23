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
        { textHolder : view.bank , name : 'account' ,  txt : 'חשבון' , status :  false } ,
        { textHolder : view.branch ,  name : 'branch' ,  txt : 'סניף' , status :  false } ,
        { textHolder : view.bank , name : 'bank' ,   name : 'bank' , txt : 'בנק' , status :  false } ,
        { textHolder : view.numCheck , name : 'check' ,  txt : 'מס ציק', status :  false } ,
        { textHolder : view.name ,  name : 'namePerson',  txt : 'שם' , status :  false } ,
        { textHolder : view.id ,  name : 'IDPerson',  txt : 'מ.ז / תאגיד' , status :  false }
    ]
    view.changePerson = function(){
        view.status = 'pending'
        if(!view.id) {
            view.list_inputs[view.list_inputs.length - 1].status = false;
            return;
        }
        accountLimitedService.checkLimitedPersonal( view.id).then(function(result){
            view.list_inputs[view.list_inputs.length - 1].status = true;
            view.status = result.status;
            result.account = view.account;
            result.type = 'person';
            $rootScope.$emit('send status' , result);
        })
    }
    view.changeD = function(){
        console.log(view.branch ,view.bank, view.account);
        if(!view.branch || !view.bank || !view.account){
            view.list_inputs[0].status = false;
             return;
         }
        var accountCheck = {
            account : view.account,
            bank : view.bank,
            branch : view.branch
        }
        view.status = 'pending'
        accountLimitedService.checkLimited(accountCheck).then(function(result){
            view.list_inputs[0].status = true;
            result.type = 'account'
            view.status = result.status;
            result.account = view.account;
            $rootScope.$emit('send status' , result);
        })
    }
}
