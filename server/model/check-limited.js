var DBAccountLimited = require('../db/accounts-limited');

var checkLimitedDB = function(bank , branch , acount_number){
    return DBAccountLimited.accounts().then(function(list){
         var status = '';
        list.forEach(function(account_details){
            if(account_details.bank == bank && account_details.branch == branch && account_details.account == acount_number)
                status = 'limited'
        })
        if(status == '') status = 'correct';
        return status;
    })
}

module.exports.action = function(req , res , next){
    checkLimitedDB(req.body.bank , req.body.branch , req.body.account).then(function(status){
        return res.json({ status : status })
    })
}
