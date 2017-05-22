var fs = require('fs');


module.exports = function(app) {
	app.all('/' , function(req, res, next){ console.log('here');
        fs.readFile('../index.html' , function(err , data){
            return res.send(data.toString());
        })
	})

}
