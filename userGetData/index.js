const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({region: 'us-east-2', apiVersion: '2012-08-10'});

exports.handler = (event, context, callback) => {
    const type = event.type;
    if (type == 'all') {
        const params = {
            TableName: 'User'
        };
        dynamodb.scan(params, function(err, data) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                console.log(data);
                const items = data.Items.map(
                    (dataField) => {
                        return {age: +dataField.Age.N, height: +dataField.Height.N, income: +dataField.Income.N};
                    }    
                );
                callback(null, items);
            }
        });
    } else if (type == 'single') {
        const userId = event.userId;
        const params = {
            Key: {
                "UserId": {
                    S: userId
                }
            },
            TableName: "User"
        };
        dynamodb.getItem(params, function(err, data) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                console.log(data);
                callback(null, [{age: +data.Item.Age.N, height: +data.Item.Height.N, income: +data.Item.Income.N}]);
            }
        });
    } else {
        callback('Something went wrong!');   
    }
};