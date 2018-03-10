var express = require('express'),
  app = express(),
  port = process.env.PORT || 4000,
  bodyParser = require('body-parser');
  


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// var routes = require('./api/routes/todoListRoutes'); //importing route
// routes(app); //register the route

var settleupControllers = require('./api/controllers/settleupControllers');

  // todoList Routes
    app.route('/addPayment').post(settleupControllers.addPayment);
    app.route('/getPaymentList').get(settleupControllers.getPaymentList);
    app.route('/getSummary').get(settleupControllers.getSummary);
    app.route('/deletePayment').get(settleupControllers.deletePayment);

app.listen(port);


console.log('todo list RESTful API server started onnn: ' + port);