"use client"
import React from 'react'
import { Paper, Box, Typography, Button, Card, CardContent, CardActions, Grid, Pagination, FormControl, InputLabel, Select, MenuItem, TextField, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CardLayout from '@/components/admin/card/CardLayout';
import SearchIcon from '@mui/icons-material/Search';

export default function page() {
    const [ar, setAr] = useState([]);
    const [apiUrl, setApiUrl] = useState("/api/admin/posts?size=6");
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [searchType, setSearchType] = useState('title'); // 기본 선택으로 설정
    const [searchValue, setSearchValue] = useState('');
    useEffect(() => {
        getPosts();
    }, [page]);

    function getPosts() {
        axios.get(apiUrl)
            .then(response => {
                setAr(response.data.content);
                setTotalPage(response.data.totalPages);
                setPage(response.data.pageable.pageNumber);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }

    const changePage = (event, value) => {
        setPage(value - 1); // 페이지 번호는 0부터 시작하므로 1을 빼줍니다.
        setApiUrl("/api/admin/posts?size=6&page=" + (value - 1));
        getPosts();
    };

    // 검색
    const handleSearch = async (e) => {
        console.log(searchType, searchValue);
        try {
            const response = await axios.get(apiUrl, {
                params: {
                    type: searchType,
                    value: searchValue,
                }
            });
            if (response.status === 200) {
                setAr(response.data.content);
                setTotalPage(response.data.totalPages);
                setPage(response.data.pageable.pageNumber);
            } else {
                alert("검색 실패");
            }
        } catch (error) {
            console.error('검색 중 오류 발생:', error);
            alert("검색 중 오류 발생");
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 0, boxShadow: 3, padding: 5, bgcolor: 'background.paper' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 ,mt: 4 }}>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'black' }}>
                    공고 관리
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, bgcolor: 'common.white', p: 0.5, borderRadius: 1 }}>
                    <FormControl size="small" sx={{ width: '15ch' }}>
                        <InputLabel id="title">카테고리</InputLabel>
                        <Select
                            labelId="category-select-label"
                            id="category-select"
                            value={searchType}
                            label="카테고리"
                            onChange={(e) => setSearchType(e.target.value)}
                        >
                            <MenuItem value="" disabled>
                                <em>카테고리 선택</em>
                            </MenuItem>
                            <MenuItem value="title">제목</MenuItem> 
                            <MenuItem value="content">내용</MenuItem>
                            <MenuItem value="date">등록일</MenuItem>
                            <MenuItem value="deadline">마감일</MenuItem>
                            <MenuItem value="sal">월급</MenuItem>
                            <MenuItem value="starttime">근무시작시간</MenuItem>
                            <MenuItem value="endtime">근무종료시간</MenuItem>
                            <MenuItem value="type">공고유형</MenuItem>
                            <MenuItem value="addr">주소</MenuItem>
                            <MenuItem value="email">이메일</MenuItem>
                            <MenuItem value="fax">팩스</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="검색"
                        variant="outlined"
                        size="small"
                        value={searchValue}
                        sx={{ width: '25ch' }}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <IconButton sx={{ p: '10px' }} aria-label="search" onClick={handleSearch} >
                        <SearchIcon />
                    </IconButton>
                </Box>
            </Box>
            <CardLayout list={ar} />
            <Pagination
                onChange={changePage}
                page={page + 1} 
                count={totalPage} 
                color="primary"
                style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}
                className="pagination"
            />
        </Paper>
    )
}

