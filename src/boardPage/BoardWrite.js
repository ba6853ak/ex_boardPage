import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/boardApi";

function BoardWrite() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);  


  const containerStyle = {
    width: "1200px",
    margin: "0 auto", // 가운데 정렬
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
    resize: "none", // 크기 조정 비활성화
  };

  const buttonContainerStyle = {
    marginTop: "15px",
  };

  const buttonStyle1 = {
    background: isHovered1 ? "#6c757d" : "#5a6268", // 호버 시 색상 변경
    transition: "0.5s", // 부드러운 전환 효과
    outline: "none", // 포커스 테두리 제거
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    width: "60px",
  };

  const buttonStyle2 = {
    background: isHovered2 ? "#0056b3" : "#007BFF", // 호버 시 색상 변경
    transition: "0.5s", // 부드러운 전환 효과
    outline: "none", // 포커스 테두리 제거
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    width: "60px",
  };

  const handleSave = async () => {

    if(title===""){
      alert("제목을 입력하세요.");
      return;
    }
    else if(content===""){
      alert("내용을 입력하세요.");
      return;
    }

    const submit = {title, content, memberId:"hong"};
    const response = await createPost(submit);
    alert("게시글이 등록되었습니다!");
    navigate("/")
    
  };

  const handleCancel = () => {
    
    navigate("/")

  };

  return (
    <div style={containerStyle}>
      <h1>게시글 작성</h1>

      <input
        type="text"
        style={inputStyle}
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        style={textareaStyle}
        placeholder="내용을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div style={buttonContainerStyle}>
        <button style={{ ...buttonStyle1, marginRight: "10px" }} 
        onMouseEnter={() => setIsHovered1(true)}
        onMouseLeave={() => setIsHovered1(false)}
        onClick={handleCancel}>
          취소
        </button>
        <button style={buttonStyle2} 
        onMouseEnter={() => setIsHovered2(true)}
        onMouseLeave={() => setIsHovered2(false)}
        onClick={handleSave}>
          등록
        </button>
      </div>
    </div>
  );
}

export default BoardWrite;
