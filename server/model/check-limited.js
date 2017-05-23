var DBAccountLimited = require('../db/accounts-limited');
var req = require('./req');
var xray = require('x-ray');
var q = require('q');


function checkLimitedScraping(bank , branch , acount_number){ return  q('correct')
    var d = q.defer();
    var url = 'http://www.boi.org.il/_layouts/boi/handlers/WebPartHandler.aspx?wp=RestrictedAccountsSearch&lang=en&' +
              'Bank=' + bank + '&Branch=' + branch + '&Account=' + acount_number;
    req.action('GET' , url).then(function(html){
        var x = xray();
        x(html ,'div .BoiRestrictedAccountsNotRestricted' , { txt : '@html' }  )(function(err , obj){
            var result = obj.txt.trim();
            if(result == 'The account number you have entered is not on the list of restricted accounts')
                return d.resolve('correct');
            else return d.resolve('limited');
        })

    })
    return d.promise;
}

function checkLimitedScrapingPersonal(){
    var d = q.defer();
    var url = 'http://www.boi.org.il/_layouts/boi/handlers/WebPartHandler.aspx?wp=RestrictedAccountsSearch&lang=en&' +
              'Bank=' + bank + '&Branch=' + branch + '&Account=' + acount_number;
    req.action('GET' , url).then(function(html){
        var x = xray();
        x(html ,'div .BoiRestrictedAccountsNotRestricted' , { txt : '@html' }  )(function(err , obj){
            var result = obj.txt.trim();
            if(result == 'The account number you have entered is not on the list of restricted accounts')
                return d.resolve('correct');
            else return d.resolve('limited');
        })

    })
    return d.promise;
}

function checkLimitedDB(bank , branch , acount_number){
    var account = {
        bank : bank,
        branch : branch,
        acount_number : acount_number
    }
    console.log(account);
    return DBAccountLimited.checkAccounts(account).then(function(result){ console.log(result);
         var status = '';
         if(!result) status = 'correct';
         if(result) status = 'limited';
        return status;
    })
}

module.exports.action = function(req , res , next){
    switch (req.params.action) {
        case 'sql' : {
            checkLimitedDB(req.body.bank , req.body.branch , req.body.account).then(function(status){
                return res.json({ status : status })
            })
        }
        break;
        case 'scrape-account' : {
            checkLimitedScrapingAccount(req.body.bank , req.body.branch , req.body.account).then(function(status){
                return res.json({ status : status })
            })
        }
        case 'scrape-personal' : {
            checkLimitedScrapingPersonal(req.body.bank , req.body.branch , req.body.account).then(function(status){
                return res.json({ status : status })
            })
        }
        break;
        default:

    }

}
