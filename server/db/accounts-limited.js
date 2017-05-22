var mysql = require('./connect');

var statements = {
  add_account : 'INSERT INTO accounts_limited SET :account',
  accounts : 'SELECT * FROM accounts_limited',

};

module.exports ={
    addAccount :  function(account){
        return mysql.Query(statements.add_account, {account : account});
    },
    accounts : function(){
        return mysql.Query(statements.accounts);
    }
}
