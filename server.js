const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    assert = require('assert'),
    bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;

const dB = 'luma',
    con_url = 'mongodb://localhost:27017/'+dB;

if(process.env.NODE_ENV === 'test'){
    const Mockgoose = require('mockgoose').Mockgoose;
    const mockgoose = new Mockgoose(mongoose);

    mockgoose.prepareStorage()
        .then(() => {
            mongoose.connect(con_url, function (err, db) {
                assert.strictEqual(null, err);
                console.log("* DB Connected *")

            });
        });
}else {
    mongoose.connect(con_url, function (err, db) {
        assert.strictEqual(null, err);
        console.log("* DB Connected *")
    });
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var server = app.listen(port, () => {
    console.log('App listening at port: %s', port);
});

module.exports = server;
