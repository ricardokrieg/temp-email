const AWS = require('aws-sdk');
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const getMessageContentFromS3 = async (bucket, key) => {
  const params = {
    Bucket: bucket,
    Key: key,
  };

  const { Body } = await s3.getObject(params).promise();
  return JSON.parse(Body);
}

const getMessagesFromS3 = async (email, timestamp) => {
  const bucket = 'email-temporario-messages';
  const emailDomain = email.split('@')[1];
  const prefix = `${emailDomain}/${email}/`;

  const params = {
    Bucket: bucket,
    Prefix: prefix,
  };

  const data = await s3.listObjectsV2(params).promise();
  console.log(data);

  const messages = [];
  let maxLastModified = timestamp;
  for (let element of data.Contents) {
    const {Key, LastModified} = element;
    const lastModified = Math.floor(new Date(LastModified).getTime() / 1000);

    if (lastModified <= timestamp) continue;
    maxLastModified = Math.max(maxLastModified, lastModified);

    messages.push(await getMessageContentFromS3(bucket, Key));
  }

  return {messages, lastModified: maxLastModified};
}

exports.handler = async (event, context) => {
  const params = event.queryStringParameters;
  const email = params.email;
  const timestamp = params.timestamp;

  const {messages, lastModified} = await getMessagesFromS3(email, timestamp);

  let body = JSON.stringify({ messages, timestamp: lastModified });
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
