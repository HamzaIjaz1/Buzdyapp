var db = require('../db');
var mysql = require('mysql');

module.exports.create_conversation_model = function (inputs) {
    console.log('create model received inputs as', inputs);
    return new Promise(function (resolve, reject) {
        var queryString = 'select * from conversations where user1= ' + mysql.escape(inputs.user1) + ' and user2= ' + mysql.escape(inputs.user2);
        db.query(queryString, inputs, function (err, queryresult) {
            if (err) {
                console.log('error occured while getting conversation is', err);
                reject(err);
            } else {
                console.log('query Result is', queryresult);
                if (queryresult.length >= 1) {
                    var queryable = 'insert into conversationable (conversation_id, user_id, message) values (' + mysql.escape(queryresult[0].id) + ',' + mysql.escape(inputs.user1) + ',' + mysql.escape(inputs.message) + ') ';
                    return new Promise(function (resolve, reject) {
                        db.query(queryable, function (err, insertresult) {
                            if (err) {
                                console.log('inserting into conversationable generated an error ', err);
                                reject(err);
                            } else {
                                console.log('result from conversationable is ', insertresult);
                                resolve(insertresult);
                            }
                        });
                    });
                } else {
                    console.log('No such conversation for user1 and user2', queryresult);
                    var queryinsert = 'insert into conversations( user1, user2) values (' + mysql.escape(inputs.user1) + ',' + mysql.escape(inputs.user2) + ') ';
                    return new Promise(function (resolve, reject) {
                        db.query(queryinsert, function (err, insertresult) {
                            if (err) {
                                console.log('inserting into conversations generated an error ', err);
                                reject(err);
                            } else {
                                console.log('result from conversations is ', insertresult);
                                var querycoversation = 'insert into conversationable (conversation_id, user_id, message) values (' + mysql.escape(insertresult.insertId) + ',' + mysql.escape(inputs.user1) + ',' + mysql.escape(inputs.message) + ') ';

                                return new Promise(function (resolve, reject) {
                                    db.query(querycoversation, function (err, addresult) {
                                        if (err) {
                                            console.log('error occurred while inserting conversationable row');
                                            reject(err);
                                        } else {
                                            console.log('add result is', addresult);
                                            resolve(addresult);
                                        }
                                    });

                                });
                            }
                        });
                    });

                }
                console.log('Inside else model result after conversation is', queryresult);
                resolve(queryresult);
            }

        });

    });

};

module.exports.getAll = function (id) {

    var queryString = 'select * from conversationable join conversations on conversationable.conversation_id=conversations.id where user1= ' + mysql.escape(id) ;

    return new Promise(function (resolve, reject) {

        db.query(queryString, function (err, result) {

            if (err) {
                console.log(' Error occurred while getting conversations ', err);
                reject(err);
            } else {
                console.log('result for getting all conversations is', result);
                resolve(result);
            }
        });
    });
};


module.exports.getbyid = function (inputs) {

    var queryString = 'select * from conversationable join conversations on conversationable.conversation_id=conversations.id where user1= ' + mysql.escape(inputs.user1)+' and user2= '+mysql.escape(inputs.user2);

    return new Promise(function (resolve, reject) {

        db.query(queryString, function (err, result) {

            if (err) {
                console.log(' Error occurred while getting conversations ', err);
                reject(err);
            } else {
                console.log('result for getting all conversations is', result);
                resolve(result);
            }
        });
    });
};