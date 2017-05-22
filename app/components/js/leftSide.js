
  app.component('leftSide', {
    template: '<statusAccount>here<statusAccount><ng-outlet></ng-outlet>',
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
    controller: statusAccountComponent

  })
  function leftSideComponent() {
     //parent.status = 'no'
    // this.parent.setStatus('no')
    var $scope = this;
    console.log($scope);

  }

  function statusAccountComponent(){
      console.log('hee');

  }
