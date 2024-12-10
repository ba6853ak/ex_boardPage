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
    const response = await apiClient.post("/board/regist", postData);
    return response.data;
}

export const getPostDetail = async (boardId) => {
    const response = await apiClient.get(`/board/find?boardId=${boardId}`);
    return response.data.data; // 서버 응답에서 필요한 데이터 추출
}

// 게시글 삭제
export const deletePost = async (boardId) => {
    const response = await apiClient.post("/board/remove", {
        boardId: boardId.toString(), // 문자열로 변환
      });
      return response.data;
}

// 게시글 수정
export const updatePost = async (boardIndex, title, content, memberId) => {


    const response = await apiClient.post("/board/modify", {
        boardId: boardIndex,
        title: title,
        content: content,
        memberId: memberId,
      });
      return response.data;
}


// 게시글 추천
export const recommendPost = async (boardIndex) => {
    const response = await apiClient.post("/board/good", {
        boardId: boardIndex,
      });
      return response.data;
}