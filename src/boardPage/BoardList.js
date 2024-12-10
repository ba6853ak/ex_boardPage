import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Link 컴포넌트 import
import { getPostDetail, getPosts } from "../api/boardApi"; // API 호출 함수 가져오기

function BoardList() {
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
  const [searchOption, setSearchOption] = useState("title"); // 검색 조건 상태
  const [filteredPosts, setFilteredPosts] = useState([]); // 필터링된 게시글 상태
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]); // 게시글 데이터 관리

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPosts(await getPosts());
        setFilteredPosts(await getPosts()); // 초기 데이터 설정
      } catch (error) {
        console.error("오류 발생: ", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const result = posts.filter((post) => {
      if (searchOption === "title") {
        return post.title.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (searchOption === "content") {
        return post.content?.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (searchOption === "author") {
        return post.memberId.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    });
    setFilteredPosts(result);
  };

  const containerStyle = {
    width: "1200px",
    margin: "0 auto", // 가운데 정렬
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "separate", // 테두리 조절
    borderSpacing: "0", // separate로 인한 간격 제거
  };

  const theadStyle = {
    backgroundColor: "#F3F6F7", // thead 배경 색상 지정
    borderTop: "3px solid #ddd", // 테두리 두께, 실선, 테두리 색상 지정(연한 회색)
    borderBottom: "3px solid #ddd", // 테두리 두께, 실선, 테두리 색상 지정(연한 회색)
  };

  const thStyle = {
    padding: "15px", // th 내부 간격 조정
  };

  const colStyles = [
    { width: "20px" }, // 번호 열
    { width: "450px" }, // 제목 열
    { width: "20px" }, // 조회수 열
    { width: "20px" }, // 추천수 열
    { width: "50px" }, // 등록일 열
  ];

  const tdStyle = {
    borderBottom: "1px solid #ddd",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const searchInputStyle = {
    padding: "5px", // inputText 내부 여백
    marginRight: "10px",
    fontSize: "15px",
    border: "1px solid #ddd",
  };

  const searchButton = {
    background: isHovered1 ? "#0056b3" : "#007BFF", // 호버 시 색상 변경
    transition: "0.5s", // 부드러운 전환 효과
    outline: "none", // 포커스 테두리 제거
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    justifyContent: "center", // 가로 중앙 정렬
    alignItems: "center", // 세로 중앙 정렬
    textAlign: "center", // 텍스트 정렬
    width: "50px",
  };

  const writeButton = {
    background: isHovered2 ? "#0056b3" : "#007BFF", // 호버 시 색상 변경
    transition: "0.5s", // 부드러운 전환 효과
    outline: "none", // 포커스 테두리 제거
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    justifyContent: "center", // 가로 중앙 정렬
    alignItems: "center",
    textAlign: "center",
    width: "60px",
  };

  const writebuttonarea = {
    marginTop: "15px",
    float: "right",
    right: "0",
  };

  return (
    <div style={containerStyle}>
      <h1>자유게시판</h1>

      <div style={{ ...headerStyle, marginBottom: "5px" }}>
        <div style={{ ...headerStyle, fontSize: "15px" }}>
          <p>
            검색결과 : <b>{filteredPosts.length}개</b>
          </p>
        </div>

        <div style={headerStyle}>
          <select
            value={searchOption}
            onChange={(e) => setSearchOption(e.target.value)}
            style={searchInputStyle}
          >
            <option value="title">제목</option>
             {/* <option value="content">내용</option> */}
            <option value="author">작성자</option>
          </select>
          <input
            style={searchInputStyle}
            type="text"
            placeholder="검색어를 입력해주세요."
            value={searchQuery} // 검색어 상태와 연결
            onChange={(e) => setSearchQuery(e.target.value)} // 검색어 변경
          />
          <button
            style={searchButton}
            onMouseEnter={() => setIsHovered1(true)}
            onMouseLeave={() => setIsHovered1(false)}
            onClick={handleSearch}
          >
            검색
          </button>
        </div>
      </div>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ ...theadStyle, borderRight: "1px solid #ddd", ...thStyle, ...colStyles[0] }}>번호</th>
            <th style={{ ...theadStyle, borderRight: "1px solid #ddd", ...thStyle, ...colStyles[1] }}>제목</th>
            <th style={{ ...theadStyle, borderRight: "1px solid #ddd", ...thStyle, ...colStyles[2] }}>작성자</th>
            <th style={{ ...theadStyle, borderRight: "1px solid #ddd", ...thStyle, ...colStyles[3] }}>추천수</th>
            <th style={{ ...theadStyle, ...thStyle, ...colStyles[4] }}>등록일</th>
          </tr>
        </thead>

        <tbody>
          {[...filteredPosts]
            .sort((a, b) => b.boardIdx - a.boardIdx) // 내림차순 정렬
            .map((item, index) => (
              <tr key={index}>
                <td style={{ ...tdStyle, ...thStyle, borderRight: "1px solid #ddd" }}>{item.boardIdx}</td>
                <td style={{ ...tdStyle, borderRight: "1px solid #ddd", textAlign: "left", paddingLeft: "15px" }}>
                  <Link
                    to={`/boardDetail/${item.boardIdx}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    {item.title}
                  </Link>
                </td>
                <td style={{ ...tdStyle, borderRight: "1px solid #ddd" }}>{item.memberId}</td>
                <td style={{ ...tdStyle, borderRight: "1px solid #ddd" }}>{item.boardGood}</td>
                <td style={{ ...tdStyle }}>{new Date(item.createdAt).toISOString().split("T")[0]}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <div style={writebuttonarea}>
        <button
          style={writeButton}
          onMouseEnter={() => setIsHovered2(true)}
          onMouseLeave={() => setIsHovered2(false)}
          onClick={() => {
            navigate("/boardWrite");
          }}
        >
          글쓰기
        </button>
      </div>
    </div>
  );
}

export default BoardList;
