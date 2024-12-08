import axios from 'axios';

const apiClient = axios.create({
    baseURL: "http://localhost:8080/api/",
    headers: {
        "Content-Type": "application/json",
    },
});

// 게시글 목록 호출
export const getPosts = async () => {
    const response = await apiClient.get("/board/list");
    return response.data.data;
}

// 게시글 등록
export const createPost = async (postData) => {
    const response = await apiClient.post("board/regist", postData);
    return response.data;
}



