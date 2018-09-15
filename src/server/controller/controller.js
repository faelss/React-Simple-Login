require('dotenv').config({path:'../../.env'});
var Elasticsearch = require('elasticsearch');
var bcrypt = require('bcrypt');
var client = new Elasticsearch.Client({
    host: process.env.DB_HOST + ':' + process.env.DB_PORT,
    log: 'trace'
});

class Controller {

    static login(req , res) {

        client.search({
            index:'login',
            type:'data',
            body: {
                query: {
                    match: {
                        login: req.body.login
                    }
                }
            }
        }).then( (data) => {
            bcrypt.compare(req.body.pass , data.hits.hits[0]._source.pass).then( (result) => {
                res.send({response:result})
            });
        }).catch( (err) => {
            res.send({error:err});
        });

    }
}

module.exports = Controller;
