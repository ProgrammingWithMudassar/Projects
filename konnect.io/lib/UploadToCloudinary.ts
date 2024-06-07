import axios from 'axios';
import { LogError } from './LogFiles';

const UploadToCloudinary = async (file: any, cloud: string | undefined, upload_preset: string | undefined, folder: string | undefined) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud}/raw/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                upload_preset,
                folder,
            },
        });
        return response.data.secure_url
    } catch (error) {
        LogError('Error uploading file:', error)
        return false
    }
};

export default UploadToCloudinary;