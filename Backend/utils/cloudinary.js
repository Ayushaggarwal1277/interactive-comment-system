import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configuration will be done lazily on first upload
let isConfigured = false;

const ensureCloudinaryConfigured = () => {
    if (!isConfigured) {
        cloudinary.config({ 
            cloud_name: 'dlq3ujarz', 
            api_key: '618888558794451', 
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        
        console.log("Cloudinary configured:", {
            cloud_name: 'dlq3ujarz',
            api_key: '618888558794451',
            api_secret_exists: !!process.env.CLOUDINARY_API_SECRET,
            api_secret_value: process.env.CLOUDINARY_API_SECRET ? '***' + process.env.CLOUDINARY_API_SECRET.slice(-4) : 'MISSING'
        });
        
        if (!process.env.CLOUDINARY_API_SECRET) {
            console.error("WARNING: CLOUDINARY_API_SECRET is not set in environment variables!");
        }
        
        isConfigured = true;
    }
};

const uploadOnCloudinary = async (localFilePath) => {
    try {
        // Ensure Cloudinary is configured before upload
        ensureCloudinaryConfigured();
        
        if (!localFilePath || typeof localFilePath !== 'string') {
            throw new Error("Invalid file path provided");
        }
        
        if(!fs.existsSync(localFilePath)) {
            throw new Error("File not found at path: " + localFilePath);
        }
        
        console.log("Starting Cloudinary upload for:", localFilePath);
        
        const result = await cloudinary.uploader.upload(localFilePath, {
            folder: 'avatars',
            resource_type: 'auto'
        });
        
        console.log("Cloudinary upload successful:", result.secure_url);
        
        // Delete the local file after uploading
        fs.unlinkSync(localFilePath);
        
        return result;
    } catch (error) {
        console.error("Cloudinary upload error:", error.message);
        
        // Try to delete the local file if it exists
        try {
            if (localFilePath && fs.existsSync(localFilePath)) {
                fs.unlinkSync(localFilePath);
            }
        } catch (unlinkError) {
            console.error("Error deleting local file:", unlinkError.message);
        }
        
        throw new Error("Error uploading file to Cloudinary: " + error.message);
    }
};


export { uploadOnCloudinary };
