const AWS = require('aws-sdk');
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
const simpleParser = require('mailparser').simpleParser;

const emailContentFromS3 = async (record) => {
  const bucket = record.s3.bucket.name;
  const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, ' '));

  const params = {
    Bucket: bucket,
    Key: key,
  };

  const { Body } = await s3.getObject(params).promise();
  return Body;
}

const saveToS3 = async (email) => {
  const emailContent = {
    id : email.messageId,
    sender: email.from.text,
    receiver: email.to.text,
    timestamp: String(Math.floor(email.date.getTime() / 1000)),
    subject: email.subject,
    body: email.html ? email.html : email.text,
  };
  const emailDomain = email.to.text.split('@')[1];

  const params = {
    Bucket: 'email-temporario-messages',
    Key: `${emailDomain}/${email.to.text}/${email.messageId}`,
    ContentType: 'binary',
    Body: Buffer.from(JSON.stringify(emailContent), 'binary'),
  };

  await s3.putObject(params).promise();
}

exports.handler = async (event, context) => {
  for (let record of event['Records']) {
    const emailContent = await emailContentFromS3(record);

    try {
      const email = await simpleParser(emailContent);
      await saveToS3(email);
    } catch (err) {
      console.log(emailContent);
      throw err;
    }
  }
};
