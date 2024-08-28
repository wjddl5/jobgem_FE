"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import styles from "/public/css/board.css";
import { Button } from "@mui/material";

// (관리자) 공지사항 게시글 상세보기
export default function page(props) {
  // 초기화
  const router = useRouter();
  // API_URL = `api/bbs/notice/view?bo_idx=${props.params.bo_idx}`;
  // const [vo, setVo] = useState({});

  // useEffect(() => {
  //   axios.get(API_URL).then((res) => {
  //     setVo(res.data.vo);
  //   });
  // }, []);
  const comments = [
    {
      author: "Jane Doe",
      content: "This is a fantastic post! Thanks for sharing.",
      date: "August 24, 2024",
    },
    {
      author: "Alice",
      content: "I learned so much from this. Great insights!",
      date: "August 25, 2024",
    },
    {
      author: "Bob",
      content: "Could you provide more examples? It would be really helpful.",
      date: "August 26, 2024",
    },
    {
      author: "Charlie",
      content: "I disagree with some points, but overall a good read.",
      date: "August 27, 2024",
    },
    {
      author: "Diana",
      content: "This was exactly what I was looking for, thank you!",
      date: "August 28, 2024",
    },
  ];

  return (
    <div className="post_detail-container">
      <div className="post_header">
        <h1 className="post_title">post.title</h1>
        <div className="post_meta">
          <span>By post.author</span>
          <span>post.date</span>
          <span>Views: post.views</span>
          <span>Likes: post.likes</span>
        </div>
      </div>
      <div className="post_content">
        <p>post.content</p>
      </div>
      <div className="post_comments">
        <h2>Comments</h2>
        <ul>
          {comments.map((comment, index) => (
            <li key={index} className="comment_item">
              <p className="comment_author">
                <strong>{comment.author}</strong> says:
              </p>
              <Button className="delete-button" variant="text" color="error" size="small" onClick={() => router.push(`delete` /*선택항목 idx*/)}>
                삭제
              </Button>
              <p className="comment_content">{comment.content}</p>
              <p className="comment_date">{comment.date}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="btn_group">
        <Button variant="outlined" size="small" onClick={() => router.push("/bbs/notice/list")}>
          목록
        </Button>
        <Button variant="outlined" size="small">
          수정
        </Button>
        <Button variant="outlined" size="small" color="error">
          삭제
        </Button>
      </div>
    </div>
  );
}
