import axios from "axios";

export const useImageUpload = () => {
    const imageUpload = async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const result = await axios.post('http://localhost:8000/imgupload', formData);
            return result.data; 
        } catch (error) {
            console.error("이미지 업로드 중 오류 발생:", error);
            return ''; 
        }
    };

    return { imageUpload };
};