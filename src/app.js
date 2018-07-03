// requires
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/payslip-routes');

// this block contains configurations

const PORT = process.env.PORT || 8000;

// creating server and setting up middlewares
const app = express();
try {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    // middleware to check special characters entered by user that can break the router
    app.use(function(req, res, next) {
        const err = null;
        try {
            decodeURIComponent(req.path);
        } catch (e) {
            console.log(err, req.url);
            const response = {
                error: 'User Input',
                errorMessage: `Please make sure that your request matches the application prototype
                  and does not containg % for the super rate field`
            };
            res.status(400).send(response);
        }

        next();
    });
    app.use('/payslip', routes);
    app.get('*', (req, res) => {
        res.status(404).send('page not found');
    });

    app.listen(PORT);
} catch (e) {
    console.log('App crashed throwing:', e);
}

module.exports = app;
