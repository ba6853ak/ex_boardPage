import React, { useState } from "react";

const BoardList = () => {
  const sampleData = [
    { id: 1, title: "[공지] 데이터자격검정 응시자 유의사항(2024.09)", views: 15866, date: "2024.09.13" },
    { id: 2, title: "2025년도 데이터자격검정 시행 공고", views: 6436, date: "2024.11.29" },
    { id: 3, title: "제9회 빅데이터분석기사 실기 자격검정 안내", views: 9545, date: "2024.11.04" },
    { id: 4, title: "제9회 빅데이터분석기사 실기 자격검정 대전 고사장 추가 안내", views: 804, date: "2024.10.30" },
    { id: 5, title: "제33회 데이터분석 전문가(ADP) 실기시험 응시안내", views: 2767, date: "2024.09.20" },
    { id: 6, title: "제9회 빅데이터분석기사 응시자 심사 서류제출 안내", views: 16868, date: "2024.09.20" },
    { id: 7, title: "데이터자격검정 전자통신기기 관리운영 안내", views: 353, date: "2024.09.13" },
    { id: 8, title: "제57회 데이터기획특화 준전문가(DAsP) 서울 고사장 추가 안내", views: 2250, date: "2024.08.28" },
    { id: 9, title: "데이터자격검정 수험자 시험 중 화장실 이용 안내", views: 1987, date: "2024.08.21" },
    { id: 10, title: "데이터자격검정 응시자 유의사항(2024.08)", views: 2134, date: "2024.08.13" },
  ];

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>자유게시판</h1>
      <div style={headerStyle}>
        <div style={{ fontSize: "14px", color: "#333" }}>
          검색결과: <span style={{ fontWeight: "bold", color: "#007BFF" }}>864개</span> | 현재 : <span style={{ fontWeight: "bold" }}>1/87페이지</span>
        </div>
        <div>
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            style={searchInputStyle}
          />
          <button style={searchButtonStyle}>검색</button>
        </div>
      </div>

      <table style={tableStyle}>
        <thead>
          <tr style={tableHeaderStyle}>
            <th style={thStyle}>No.</th>
            <th style={thStyle}>제목</th>
            <th style={thStyle}>조회수</th>
            <th style={thStyle}>등록일</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((item, index) => (
            <tr key={index} style={tableRowStyle}>
              <td style={tdStyle}>{item.id}</td>
              <td style={{ ...tdStyle, textAlign: "left" }}>{item.title}</td>
              <td style={tdStyle}>{item.views}</td>
              <td style={tdStyle}>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={paginationContainerStyle}>
        <button style={paginationButtonStyle}>{"<<"}</button>
        {[...Array(10)].map((_, index) => (
          <button key={index} style={paginationButtonStyle}>
            {index + 1}
          </button>
        ))}
        <button style={paginationButtonStyle}>{">>"}</button>
      </div>
    </div>
  );
};

// 스타일링
const containerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "20px",
  backgroundColor: "#fff",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
};

const titleStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const searchInputStyle = {
  padding: "5px",
  border: "1px solid #CCC",
  borderRadius: "3px",
  marginRight: "5px",
  fontSize: "14px",
};

const searchButtonStyle = {
  padding: "5px 10px",
  backgroundColor: "#007BFF",
  color: "#FFF",
  border: "none",
  borderRadius: "3px",
  cursor: "pointer",
  fontSize: "14px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "14px",
};

const tableHeaderStyle = {
  backgroundColor: "#f5f5f5",
  borderBottom: "2px solid #ddd",
};

const thStyle = {
  padding: "10px",
  textAlign: "center",
  fontWeight: "bold",
  color: "#333",
};

const tableRowStyle = {
  borderBottom: "1px solid #ddd",
};

const tdStyle = {
  padding: "10px",
  textAlign: "center",
};

const paginationContainerStyle = {
  marginTop: "20px",
  textAlign: "center",
};

const paginationButtonStyle = {
  margin: "0 5px",
  padding: "5px 10px",
  border: "1px solid #ccc",
  backgroundColor: "#fff",
  cursor: "pointer",
  borderRadius: "3px",
};

export default BoardList;
