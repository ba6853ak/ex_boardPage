import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostDetail, deletePost, recommendPost } from "../api/boardApi";

function BoardDetail() {
  const { id } = useParams(); // URL 파라미터로 공지사항 ID 가져오기
  const [notice, setNotice] = useState(null); // 초기 상태를 null로 설정
  const [likes, setLikes] = useState(0); // 추천 수
  const navigate = useNavigate();

  // 스타일 정의
  const containerStyle = {
    maxWidth: "1200px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#fff",
  };

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await getPostDetail(id); // 공지사항 상세 정보 가져오기
        console.log("게시글 데이터:", response);
        setNotice(response); // 데이터 설정
        setLikes(response.boardGood); // 추천 수 설정
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    };
    fetchNotice();
  }, [id]);

  const handleRecommend = async () => {
    try {
      const response = await recommendPost(id); // 추천 API 호출
      if (response.code === "200") {
        setLikes((prevLikes) => prevLikes + 1); // 추천 수 증가
        alert("추천되었습니다!"); // 추천 성공 메시지
      } else {
        alert("추천에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("추천 요청 중 오류 발생:", error);
      alert("추천 요청 중 문제가 발생했습니다.");
    }
  };

  const handleEdit = () => {
    navigate(`/boardEdit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        const response = await deletePost(id); // 삭제 API 호출
        if (response.code === "200") {
          alert("게시글이 삭제되었습니다.");
          navigate("/");
        } else {
          alert("삭제에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("삭제 요청 중 오류 발생:", error);
        alert("삭제 요청 중 문제가 발생했습니다.");
      }
    }
  };

  // 데이터 로딩 중일 때 처리
  if (!notice) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>로딩 중...</div>;
  }

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>{notice.title}</h1>
      <div style={{ fontSize: "14px", color: "#6c757d", marginBottom: "10px", display: "flex", justifyContent: "space-between" }}>
        <span>작성자: {notice.memberId}</span>
        <span>{new Date(notice.createdAt).toLocaleString()}</span>
      </div>
      <hr style={{ border: "none", borderTop: "1px solid #ddd", margin: "20px 0" }} />
      <div style={{ fontSize: "16px", lineHeight: "1.8", color: "#495057", whiteSpace: "pre-line", textAlign: "left", marginBottom: "30px" }}>
        {notice.content}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={{ backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", padding: "10px 20px", cursor: "pointer", fontSize: "16px" }} onClick={handleRecommend}>
            추천 ({likes})
          </button>
          <button style={{ backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", padding: "10px 20px", cursor: "pointer", fontSize: "16px" }} onClick={handleEdit}>
            수정
          </button>
          <button style={{ backgroundColor: "#dc3545", color: "#fff", border: "none", borderRadius: "5px", padding: "10px 20px", cursor: "pointer", fontSize: "16px" }} onClick={handleDelete}>
            삭제
          </button>
        </div>
        <button style={{ backgroundColor: "#6c757d", color: "#fff", border: "none", borderRadius: "5px", padding: "10px 20px", cursor: "pointer", fontSize: "16px" }} onClick={() => navigate("/")}>
          목록
        </button>
      </div>
    </div>
  );
}

export default BoardDetail;
