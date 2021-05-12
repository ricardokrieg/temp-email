const AWS = require('aws-sdk');
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const deleteMessageFromS3 = async (email, messageId) => {
  const bucket = 'email-temporario-messages';
  const emailDomain = email.split('@')[1];
  const prefix = `${emailDomain}/${email}/`;

  const params = {
    Bucket: bucket,
    Key: `${prefix}${messageId}`,
  };

  await s3.deleteObject(params).promise();
}

exports.handler = async (event, context) => {
  const params = event.queryStringParameters;
  const email = params.email;
  const messageId = params.messageId;

  await deleteMessageFromS3(email, messageId);

  let body = JSON.stringify({});
  let statusCode = '200';
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'content-type',
  };

  return {
    statusCode,
    body,
    headers,
  };
};
