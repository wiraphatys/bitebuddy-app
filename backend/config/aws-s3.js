const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const crpyto = require("node:crypto");
const sharp = require('sharp');

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const randomImageName = () => crpyto.randomBytes(32).toString('hex');

exports.s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion
})

exports.uploadImageToS3 = async (req) => {
    const img = randomImageName()
    const resizedImageBuffer = await sharp(req.file.buffer).resize({ width: 800 }).toBuffer()

    // S3 service
    const params = {
        Bucket: bucketName,
        Key: img,
        Body: resizedImageBuffer,
        ContentType: req.file.mimetype
    };
    const command = new PutObjectCommand(params);
    await this.s3.send(command);

    return img
}

exports.getImageUrl = async (imgName) => {
    const getObjectParams = {
        Bucket: bucketName,
        Key: imgName
    }
    
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(this.s3, command, { expiresIn: 900 });

    return url
}