"use client";
import { Button, Checkbox, MenuItem, Pagination, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "/public/css/board.css";
import axios from "axios";
import SideMenu from "@/components/sidemenu/SideMenu";

// 공지사항 게시판 리스트
export default function page(props) {
  // 초기화
  const router = useRouter();
  const [searchType, setSearchType] = useState(props.searchParams.searchType ? props.searchParams.searchType : "title");
  const [searchValue, setSearchValue] = useState(props.searchParams.searchValue ? props.searchParams.searchValue : "");
  const [ar, setAr] = useState([]);
  const [arLength, setArLength] = useState(0);
  const API_URL = "/api/bbs/notice/list";

  // 페이징
  const [cPage, setCPage] = useState(Number(props.searchParams.cPage));
  const [page, setPage] = useState(cPage ? cPage : 0);
  const [totalPage, setTotalPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  function changePage(event, value) {
    setPage(value - 1);
    router.replace(`/company/bbs/bbs-notice-list?cPage=${value - 1}&searchType=${searchType}&searchValue=${searchValue}`, { shallow: true }); // 뒤로가기에도 원래 페이지로 갈 수 있게 URL수정
  }

  useEffect(() => {
    setPage(cPage ? Math.max(0, Math.min(cPage, totalPage)) : 0);
  }, [cPage, totalPage]);
  //=========================

  // 함수
  function search() {
    setPage(0);
    getData();
  }

  function getData() {
    if (searchValue.trim().length < 1) {
      axios
        .get(API_URL, {
          params: {
            page: page,
            size: pageSize,
          },
        })
        .then((res) => {
          setAr(res.data.content);
          setArLength(res.data.content.length);
          setTotalPage(res.data.totalPages);
        });
    } else {
      axios
        .get(API_URL, {
          params: {
            page: page,
            size: pageSize,
            searchType: searchType,
            searchValue: searchValue,
          },
        })
        .then((res) => {
          setAr(res.data.content);
          setArLength(res.data.content.length);
          setTotalPage(res.data.totalPages);
        });
    }
  }

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      // 페이지를 완전히 떠날 때 검색 데이터를 삭제
      sessionStorage.removeItem("searchValue");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  //========================

  // 페이지
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">공지사항</h1>
        <div className="bbs_search">
          <Select className="selectBox" value={searchType} onChange={(event) => setSearchType(event.target.value)}>
            <MenuItem value={"title"}>제목</MenuItem>
            <MenuItem value={"writer"}>작성자</MenuItem>
            <MenuItem value={"content"}>내용</MenuItem>
          </Select>
          <TextField className="textfield" variant="outlined" onChange={(event) => setSearchValue(event.target.value)} defaultValue={searchValue} />
          <Button className="search_btn" variant="contained" onClick={search}>
            검색
          </Button>
        </div>
      </div>
      <Table className="bbs_table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "80px" }} align="center">
              번호
            </TableCell>
            <TableCell sx={{ width: "*" }} align="center">
              제목
            </TableCell>
            <TableCell sx={{ width: "150px" }} align="left">
              작성자
            </TableCell>
            <TableCell sx={{ width: "80px" }} align="center">
              댓글
            </TableCell>
            <TableCell sx={{ width: "80px" }} align="center">
              조회
            </TableCell>
            <TableCell sx={{ width: "80px" }} align="center">
              추천
            </TableCell>
            <TableCell sx={{ width: "150px" }} align="center">
              작성일
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ar.map((row) => (
            <TableRow
              key={row.id}
              className={styles.tableRow}
              onClick={() => router.push(`bbs-notice-view/${row.id}?cPage=${page}&searchType=${searchType}&searchValue=${searchValue}`)}
              hover
            >
              <TableCell align="center">{row.id}</TableCell>
              <TableCell className={styles.tableRow}>{row.boTitle}</TableCell>
              <TableCell align="left">{row.usId}</TableCell>
              <TableCell align="center">{row.commCount}</TableCell>
              <TableCell align="center">{row.boHit}</TableCell>
              <TableCell align="center">{row.boLike}</TableCell>
              <TableCell align="center">{row.boWritedate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="pagination" count={totalPage} page={page + 1} color="primary" onChange={changePage} />
    </div>
  );
}
