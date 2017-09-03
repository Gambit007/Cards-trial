var mongoose = require('mongoose');
var userData = mongoose.model("tbl_user_data");
var users = mongoose.model("tbl_users");

var cardsApp = {
    saveProgress: function(req, res) {
        console.log("inside save progress change");
        var changeData = {
            userID: req.body.userID,
            savedValues: req.body.savedValues,
        }
        userData.find({
            userID: changeData.userID
        }).exec().then(function(object) {
            if (object.length > 0) {
                console.log("inside obj length")
                object.savedValues = changeData.savedValues;
                console.log(object[0].id)
                console.log(object.savedValues)
                userData.update({
                    _id: object[0].id
                }, {
                    $set: {
                        savedValues: changeData.savedValues
                    }
                }).exec().then(function(data) {
                    console.log(data)
                    var response = ({
                        code: 0,
                        message: "",
                        data: data
                    });
                    res.send(response);
                });
            } else {
                console.log("no obj length")
                var attUpdates = new userData(changeData);
                attUpdates.save(function(err, doc) {
                    if (err) return console.error({
                        code: 0,
                        message: "error",
                        data: {
                            error: err
                        }
                    });
                    var response = ({
                        code: 1,
                        message: "success",
                        data: {}
                    });
                    res.json(response);
                });
            }
        })


    },
    getProgress: function(req, res) {
        var changeData = {
            userID: req.body.userID,
        }
        userData.find({
            userID: changeData.userID
        }).exec().then(function(object) {
            if (object.length > 0) {
                var response = ({
                    code: 0,
                    message: "success",
                    data: object
                });
                res.send(response);
            } else {
                var response = ({
                    code: 0,
                    message: "no data exists",
                    data: object
                });
                res.send(response);
            }
        });
    },
    login: function(req, res) {
        var changeData = {
            email: req.body.email,
            password: req.body.password,
        }
        users.find({
            email: changeData.email
        }).exec().then(function(object) {
            if (object.length > 0) {
                if (object[0].password == changeData.password) {
                    var response = ({
                        code: 0,
                        message: "success",
                        data: object
                    });

                } else {
                    var response = ({
                        code: 1,
                        message: "password mismatch",
                        data: {}
                    });
                }

                res.send(response);
            } else {
                var response = ({
                    code: 1,
                    message: "user does not exist",
                    data: {}
                });
                res.send(response);
            }
        });
    },
    register: function(req, res) {
        console.log("inside save progress change");
        var changeData = {
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
        }
        users.find({
            email: changeData.email
        }).exec().then(function(object) {
            console.log(object)
            console.log(object.length)
            if (object.length > 0) {

                var response = ({
                    code: 1,
                    message: "Email id already exists",
                    data: {}
                });
                res.send(response);
            } else {
                console.log("no obj length")
                var attUpdates = new users(changeData);
                attUpdates.save(function(err, doc) {
                    if (err) return console.error({
                        code: 0,
                        message: "error",
                        data: {
                            error: err
                        }
                    });
                    var response = ({
                        code: 1,
                        message: "success",
                        data: {}
                    });
                    res.json(response);
                });
            }
        })

    }

};
module.exports = cardsApp;