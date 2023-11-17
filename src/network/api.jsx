import axios from "axios"
axios.defaults.baseURL =
    process.env.NODE_ENV === 'development' && `http://localhost:8080`

// apiNoToken 함수 수정
export const apiNoToken = async (url, method, data) => {
    try {
        const response = await axios({ url, method, data });
        console.log('apiNoToken response:', response);
        return response;
    } catch (error) {
        console.error('apiNoToken error:', error);
        throw error;
    }
}

// api 함수 수정
export const api = async (url, method, data) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios({
            url, method, data, headers: { "Authorization": `Bearer ${token}` }
        });
        console.log('api response:', response);
        return response;
    } catch (error) {
        console.error('api error:', error);
        throw error;
    }
}