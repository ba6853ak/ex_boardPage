import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostDetail, updatePost } from "../api/boardApi";

function BoardEdit() {
  const { boardIndex } = useParams(); // URL 파라미터에서 ID 가져오기
  const [data, setData] = useState({ title: "", content: "", memberId: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await getPostDetail(boardIndex); // 공지사항 상세 정보 가져오기
        console.log("게시글 데이터:", response);
        setData({
          title: response.title,
          content: response.content,
          memberId: response.memberId,
        });
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    };
    fetchNotice();
  }, [boardIndex]);

  const handleSave = async () => {
    if (!data.title || !data.content || !data.memberId) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
      const response = await updatePost(boardIndex, data.title, data.content, data.memberId);
      if (response.code === "200") {
        alert("게시글이 수정되었습니다.");
        navigate(`/boardDetail/${boardIndex}`);
      } else {
        alert("수정에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleCancel = () => {
    navigate(`/boardDetail/${boardIndex}`);
  };

  const containerStyle = {
    width: "1200px",
    margin: "0 auto",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontFamily: "'Roboto', Arial, sans-serif",
    fontSize: "16px",
  };

  const textareaStyle = {
    width: "100%",
    height: "400px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
    fontFamily: "'Roboto', Arial, sans-serif",
    resize: "none",
  };

  const buttonContainerStyle = {
    marginTop: "15px",
  };

  const buttonStyle1 = {
    background: "#5a6268",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    width: "60px",
    marginRight: "10px",
    cursor: "pointer",
  };

  const buttonStyle2 = {
    background: "#007BFF",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    width: "60px",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <h1>게시글 수정</h1>
      <input
        type="text"
        style={inputStyle}
        placeholder="제목을 입력하세요"
        value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
      />
      <textarea
        style={textareaStyle}
        placeholder="내용을 입력하세요"
        value={data.content}
        onChange={(e) => setData({ ...data, content: e.target.value })}
      />
      <div style={buttonContainerStyle}>
        <button style={buttonStyle1} onClick={handleCancel}>
          취소
        </button>
        <button style={buttonStyle2} onClick={handleSave}>
          저장
        </button>
      </div>
    </div>
  );
}

export default BoardEdit;
