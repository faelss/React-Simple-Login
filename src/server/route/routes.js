const controller = require('../controller/controller.js');

module.exports = (app) => {

    app.route('/login')
        .post(controller.login);

}
