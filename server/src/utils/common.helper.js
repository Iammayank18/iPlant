"use strict";

import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
function generateOtp(len) {
    let newRan = String(parseInt(Math.random() * 12345678910))
        .split("")
        .slice(0, len)
        .join("");
    return parseInt(newRan);
}

function apiResponse(res, msg, status, code, payload) {
    if (code) {
        return res.status(code).json({
            msg,
            status,
            ...(payload ? { data: payload } : {}),
        });
    } else {
        return res.json({
            msg,
            status,
            ...(payload ? { data: payload } : {}),
        });
    }
}

function calculateTravelDistance(origin, destination) {
    const lat1 = origin.lat;
    const lat2 = destination.lat;
    const lon1 = origin.long;
    const lon2 = destination.long;

    // const R = 6371; // Earth's radius in kilometers
    // const dLat = deg2rad(lat2 - lat1);
    // const dLon = deg2rad(lon2 - lon1);
    // const a =
    //   Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    // const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // const distance = R * c; // Distance in kilometers
    // return distance;

    // =====================
    // const R = 6378137;
    // const p1 = (lat1 * Math.PI) / 180;
    // const p2 = (lat2 * Math.PI) / 180;
    // const deltaLon = lon2 - lon1;
    // const deltaLambda = (deltaLon * Math.PI) / 180;
    // const d = Math.acos(Math.sin(p1) * Math.sin(p2) + Math.cos(p1) * Math.cos(p2) * Math.cos(deltaLambda)) * R;
    // return d;

    // ===================
    // const R = 6378137;
    // const p1 = (lat1 * Math.PI) / 180;
    // const p2 = (lat2 * Math.PI) / 180;
    // const deltaP = p2 - p1;
    // const deltaLon = lon2 - lon1;
    // const deltaLambda = (deltaLon * Math.PI) / 180;
    // const a =
    //   Math.sin(deltaP / 2) * Math.sin(deltaP / 2) + Math.cos(p1) * Math.cos(p2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    // const d = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * R;
    // return d / 1000;

    // ===============================

    const R = 6371; // Earth's radius in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const correctionFactor = Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.pow(Math.sin(dLon / 2), 2);
    const distance = (R * c) / (1 + correctionFactor);
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

// ---- extend Number object with methods for converting degrees/radians
Number.prototype.toRad = function () {
    return (this * Math.PI) / 180;
};

Number.prototype.toDeg = function () {
    return (this * 180) / Math.PI;
};

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey,
    },
});
async function uploadImageToS3(imagePath, fileName) {
    const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: fileName, // The name of the file you want to save in S3
        Body: imagePath,
        ContentType: "image/jpeg", // Change the content type if your image is different
    };

    try {
        const command = new PutObjectCommand(params);
        const response = await s3Client.send(command);

        return response;
    } catch (err) {
        throw err;
    }
}

export const COMMON_SERVICE = {
    generateOtp,
    apiResponse,
    calculateTravelDistance,
    uploadImageToS3,
};
