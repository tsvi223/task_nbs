

app.component('appElement', {
    transclude: true,
    template :  "<top-side></top-side>" +
                "<left-side/></left-side/>" +
                "<account-limited></account-limited> <ng-outlet></ng-outlet>" ,
    bindings : {
        status : '<',
        onChange : '=',
        setStatus : '<'
    },
    scope : {
        status : 'yes'
    },
    controller : ctrl
});

function ctrl(){
    var appComponent = this;
    this.onChange = function(){

    }
    this.$onInit = function(){
        this.status = 'yes'
        console.log();
    }

    this.setStatus = function(status){
        console.log('status' ,status);
    }


}
