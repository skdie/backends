var mongoose  = require('mongoose');

var user = mongoose.model('user', {
    firstName: {
        type: String,
        required: true
    },
    middleName:{
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    token: {
        type: String
    },
    bloodGroup: {
        type: String
    }

});

module.exports = {user};

// var user = module.exports = mongoose.model('user',userSchema);
