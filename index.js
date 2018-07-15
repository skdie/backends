var express = require('express');
var app =express();
var mongoose = require('mongoose');
var cors = require('cors');
const MongoClient = require('mongodb');

var config = require('./config');

// var jwt = require('jsonwebtoken');

var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');


const {user} = require('./model/user');

var db = mongoose.connect('mongodb://127.0.0.1/authenticate', (err, res) =>{
    if(err){
        return console.log('Not connected to mongodDB');  
    }
    console.log('Connected to mongoDB')
});
app.use(cors());

// app.set('port',process.env.port || 3000);
// app.listen(3000, '192.168.4.105');
// app.listen(3000);
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello friend');
});

var http = require('http');

// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello World!');
// }).listen(80, '192.168.100.5'); 

// var http = require('http');
// http.createServer(function (req, res) {
// }).listen(80, '192.168.100.5');
// console.log('Server running at http://192.168.100.5/');


app.post('/authenticate', (req, res) => {
    console.log('Checking');
    console.log(req.body.email+req.body.password);
    user.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
            
                var token = jwt.sign({ id: user._id }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours  
                }); 

                // user.findOne({id: user._id}, (err,doc) =>{
                //     doc.token = token;
                //     doc.visits.$inc();
                //     doc.save();
                // });

                var conditions = { email: req.body.email };
                var update = { token: 'token '};
               
                // MongoClient.connect('mongodb://localhost:27017/authenticate', (err , db) =>{
                //     db.collection('user').findOneAndUpdate({
                //         _id : user._id
                //     },{
                //         token: token
                //     });
                //     db.close();
                // });

                // user.findByIdAndUpdate(user._id, 
                //     {$set: {token: token}},
                //     {new: true},
                    
                // )
            


                // user.findOne(conditions, update, (err) =>{
                //     if(err){
                //         return console.log('Unable to save token');
                //     }
                //     console.log('Successfully saved token to database');

                // });

                // user.update({email:'galabpokh@gmail.com'},{ $set:{firstName: "galabtoken"}});

                // var query = { _id: user._id};
                // user.update(query,{ $set: { token: token }}, options,callback);
                res.json({
                    type: true,
                    data: user,
                    token: token
                }); 
            } else {
                res.json({
                    type: false,
                    data: "Incorrect email/password"
                });    
            }
        }
    });
});


//
//
//

app.post('/user', (request, res) => {
    console.log(request.body);
    console.log("Request arrives");
    var firstName = request.body.firstName;
    var lastName = request.body.lastName;
    var email = request.body.email;
    var password = request.body.password;
    var middleName = request.body.middleName;
    var bloodGroup = request.body.bloodGroup;
    console.log(firstName);

    var newUser = new user({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        bloodGroup: bloodGroup,
        middleName: middleName

    });
 

    // newUser.save((err,result) =>{
    //     if(err){
            
    //         console.log('Error in adding user to database');
    //         res.sendStatus(500);
    //     }
    //     res.sendStatus(200);
  
    // })
    
    newUser.save().then((doc) =>{
        // res.send(doc);
        res.send({success: "Created new user", status: 200});





        // var transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //       user: 'galabpokh@gmail.com',
        //       pass: 'qwerpoiu1234'
        //     }
        //   });
          
        //   var mailOptions = {
        //     from: 'galabpokh@gmail.com',
        //     to: email,
        //     subject: 'Verification Email',
        //     text: 'That is a verification email'
        //   };
          
        //   transporter.sendMail(mailOptions, function(error, info){
        //     if (error) {
        //       console.log(error);
        //     } else {
        //       console.log('Email sent: ' + info.response);
        //     }
        //   }); 






    }, (e) =>{
        res.send({success: "Failed to add user", status: 500});
    });

    
});



// app.listen(app.get('port'),(err,res) => {
//     console.log('Server is running');
// });