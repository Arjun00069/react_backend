import {v2 as cloudinary} from "cloudinary";
import fs from "fs";






const uploadOnCloudinary = async (localfilepath)=>{
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    // console.log(process.env);
    try{
        if(!localfilepath){
            return null;
        }
        //upload the file on clodinary
        const response = await cloudinary.uploader.upload(localfilepath,{
            resource_type:"auto"
        })

        // file has been uploaded successfully
        // console.log("file is uploaded on cloudinary",response.url);
        // fs.unlinkSync(localfilepath);
        return response;

    }catch(error){
        fs.unlinkSync(localfilepath)//remove the locally saved temporary fileas the upload operation get failed
        console.log("error on uploading file",error)
        return null;
    }
}

export {uploadOnCloudinary};