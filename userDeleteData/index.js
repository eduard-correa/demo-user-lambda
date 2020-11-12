const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'us-east-2', apiVersion: '2012-08-10'});

exports.handler = (event, context, callback) => {
    const userId = event.userId;
    const params = {
        Key: {
            "UserId": {
                S: userId
            }
        },
        TableName: "User"
    };
    dynamodb.deleteItem(params, function (err, data) {
        if (err) {
            console.log(err);
            callback(err);     
        } else {
            console.log(data);
            callback(null, data);
        }
    });
};