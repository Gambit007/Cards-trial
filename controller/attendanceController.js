var Q = require('q');
var request = require('request');
var mongoose = require('mongoose');
var fs = require('fs');
var appList = mongoose.model("tbl_applists");
var Validator = require('validatorjs');
var moment = require('moment');
var Promise = require('bluebird');
var attendanceApp = {
    setAppList: function (req, res) {
        console.log(req.body);
    },
    getAppList: function (req, res) {
        console.log("inside list all exams");
        appList.find({}).exec().then(function (object) {
            //console.log(appList.find());
            if (object.length > 0) {
                var response = ({
                    code: 1,
                    message: "",
                    data: object
                });

            } else {
                var response = ({
                    code: 0,
                    message: "no records found",
                    data: {}
                });
            }
            res.send(response);
        });
    },
    uploadFile: function (req, res) {
        console.log("upload called");
        var filename = moment().format("YYYYMMDDHHmmss");
        var count = req.body.count;
        var array = [];
        for (var i = 0; i < count; i++) {
            array.push(i);
        }


        Promise.map(array, function (m) {
            return attendanceApp.fileUploadMethod(req.file("file" + m)).then(function (filename) {
                return filename.filename
            })
        }).then(function (object) {
console.log(object)            
if (count == 1) {
                var locDetails = {
                    icon: object[0],
                    desc: req.body.desc,
                    location: req.body.location,
                    package: req.body.package
                }

            } else {
                for (var z = 0; z < array.length; z++) {
                    var locDetails = {
                        icon: object[z],
                        desc: req.body.desc[z],
                        location: req.body.location[z],
                        package: req.body.package[z]
                    }
                }
            }

            console.log("locDetails");
            console.log(locDetails);
            var appData = new appList(locDetails);
            appData.save(function (err, doc) {
                if (err) return console.error({
                    code: 0,
                    message: "error",
                    data: {error: err}
                });
            });
            res.send({
                code: 1,
                message: "success",
                data: {files: object}
            });
        });
    },
    fileUploadMethod: function (fileObject) {
        //console.log("FILE ",fileObject);
        var rootPath = "/home/rohit/work/appList";
        return new Promise(function (f, r) {
            fileObject.upload({
                dirname: rootPath + "/uploads/"
            }, function (err, uploadedFiles) {
                for (var i = 0; i < uploadedFiles.length; i++) {
                    var file = uploadedFiles[i].fd.split("/");
                    var filename = file[file.length - 1];
                    f({
                        filename: "uploads/" + filename
                    })
                }
            });
        })
    }
};
module.exports = attendanceApp;
