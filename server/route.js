var fs = require('fs');
var cars = require('./model/cars.js')


module.exports = function(app) {
	app.all('/' , function(req, res, next){ console.log('here');
        fs.readFile('../index.html' , function(err , data){
            return res.send(data.toString());
        })
	})

	app.all('/cars/:action' , cars.API)

	app.get('/:folder/:file' , function(req, res, next){
        var array = ['cores' , 'css' ,  'js' , 'db' , 'views'];
        if( array.indexOf(req.params.folder) == -1)
            return res.send('url error');
        fs.readFile('../' +req.params.folder + '/' + req.params.file , function(err , data){
            if(err) return res.send('url error');
            if(req.params.folder == 'db')
                return res.json( JSON.parse( data.toString() ) );
            else
            return res.send(data);
        })
    });
}
