/* eslint-disable operator-linebreak */
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

function generateOtp(len) {
  const newRan = String(parseInt(Math.random() * 12345678910, 10))
    .split("")
    .slice(0, len)
    .join("");
  return parseInt(newRan, 10);
}

function apiResponse(res, msg, status, code, payload) {
  if (code) {
    return res.status(code).json({
      msg,
      status,
      ...(payload ? { data: payload } : {}),
    });
  }
  return res.json({
    msg,
    status,
    ...(payload ? { data: payload } : {}),
  });
}

function calculateTravelDistance(origin, destination) {
  const lat1 = origin.lat;
  const lat2 = destination.lat;
  const lon1 = origin.long;
  const lon2 = destination.long;

  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const correctionFactor =
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) ** 2;
  const distance = (R * c) / (1 + correctionFactor);
  return distance;
}

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
  },
});

const uploadImageToS3 = async (imagePath, fileName) => {
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: fileName, // The name of the file you want to save in S3
    Body: imagePath,
    ContentType: "image/jpeg", // Change the content type if your image is different
  };
  // eslint-disable-next-line no-useless-catch
  try {
    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);

    return response;
  } catch (err) {
    throw err;
  }
};

const uploadImageToOpenTextCS = () => {};

// eslint-disable-next-line import/prefer-default-export
export const COMMON_SERVICE = {
  generateOtp,
  apiResponse,
  calculateTravelDistance,
  uploadImageToS3,
  uploadImageToOpenTextCS,
};
