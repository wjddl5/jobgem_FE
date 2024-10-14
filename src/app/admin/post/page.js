"use client"
import React from 'react'
import { Paper, Box, Typography, Pagination, FormControl, InputLabel, Select, MenuItem, TextField, IconButton, InputAdornment } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CardLayout from '@/components/admin/card/CardLayout';
import SearchIcon from '@mui/icons-material/Search';
import DatePicker from 'react-datepicker'; // react-datepicker import 추가
import 'react-datepicker/dist/react-datepicker.css'; // 스타일 추가
import dayjs from 'dayjs'; // dayjs import 추가

export default function page() {
    const [ar, setAr] = useState([]);
    const [apiUrl, setApiUrl] = useState("/api/posts?curPage=0&size=8");
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [searchType, setSearchType] = useState('title');
    const [startDate, setStartDate] = useState(null); // 시작 날짜 상태 추가
    const [endDate, setEndDate] = useState(null); // 끝 날짜 상태 추가
    const [isSalaryRange, setIsSalaryRange] = useState(false);
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');
    const [isDatePicker, setIsDatePicker] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [params, setParams] = useState({});
    useEffect(() => {
        getPosts();
    }, [page, apiUrl]);

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
        setPage(value - 1);
        setApiUrl(`/api/posts?curPage=${value - 1}&size=8&${new URLSearchParams(params).toString()}`);
        getPosts();
    };

    const handleSearch = async (e) => {
        try {
            let params = {};
            if (searchType && searchValue) {
                params.searchType = searchType;
                params.search = searchValue;
            };
            if (startDate) {
                params.startDate = dayjs(startDate).format('YYYY-MM-DD');
            }
            if (endDate) {
                params.endDate = dayjs(endDate).format('YYYY-MM-DD');
            }
            if (minSalary) {
                params.minSal = minSalary;
            }
            if (maxSalary) {
                params.maxSal = maxSalary;
            }
            setParams(params);
            setApiUrl(`/api/posts?curPage=${page}&size=8&${new URLSearchParams(params).toString()}`);
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

    const handleSearchTypeChange = (e) => {
        const value = e.target.value;
        setSearchType(value);
        if (value === 'sal') {
            setIsSalaryRange(true);
            setIsDatePicker(false);
            setSearchValue('');
            setStartDate(null);
            setEndDate(null);
        } else if (value === 'date' || value === 'deadline') {
            setIsDatePicker(true);
            setIsSalaryRange(false);
            setMinSalary('');
            setMaxSalary('');
            setSearchValue('');
        } else {
            setIsSalaryRange(false);
            setIsDatePicker(false);
            setSearchValue('');
            setStartDate(null);
            setEndDate(null);
            setMinSalary('');
            setMaxSalary('');
        }
    };

    const handleStartDateChange = (date) => {
        setStartDate(date); // 시작 날짜를 설정
    };

    const handleEndDateChange = (date) => {
        setEndDate(date); // 끝 날짜를 설정
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 0, boxShadow: 3, padding: 5, bgcolor: 'background.paper', margin: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, mt: 4 }}>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: 'black', fontFamily: 'pl,sans-serif', fontSize: 30, ml: 2 }}>
                    공고 관리
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, bgcolor: 'common.white', p: 0.5, borderRadius: 1 }}>
                    <FormControl size="small" sx={{ width: '15ch' }}>
                        <InputLabel id="title" sx={{ fontFamily: 'pl,sans-serif' }}>카테고리</InputLabel>
                        <Select
                            labelId="category-select-label"
                            id="category-select"
                            value={searchType}
                            label="카테고리"
                            onChange={handleSearchTypeChange}
                            sx={{ fontFamily: 'pl,sans-serif' }}
                        >
                            <MenuItem sx={{ fontFamily: 'pl,sans-serif' }} value="title">제목</MenuItem>
                            <MenuItem sx={{ fontFamily: 'pl,sans-serif' }} value="content">내용</MenuItem>
                            <MenuItem sx={{ fontFamily: 'pl,sans-serif' }} value="date">등록일</MenuItem>
                            <MenuItem sx={{ fontFamily: 'pl,sans-serif' }} value="deadline">마감일</MenuItem>
                            <MenuItem sx={{ fontFamily: 'pl,sans-serif' }} value="sal">연봉</MenuItem>
                        </Select>
                    </FormControl>
                    {isSalaryRange ? (
                        <>
                            <TextField
                                label="최소 연봉"
                                variant="outlined"
                                size="small"
                                value={minSalary}
                                sx={{ width: '12ch' }}
                                onKeyDown={handleKeyDown}
                                onChange={(e) => setMinSalary(e.target.value)}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">₩</InputAdornment>,
                                }}
                            />
                            <TextField
                                label="최대 연봉"
                                variant="outlined"
                                size="small"
                                value={maxSalary}
                                sx={{ width: '12ch' }}
                                onKeyDown={handleKeyDown}
                                onChange={(e) => setMaxSalary(e.target.value)}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">₩</InputAdornment>,
                                }}
                            />
                        </>
                    ) : isDatePicker ? (
                        <>
                            <DatePicker
                                selected={startDate}
                                onChange={handleStartDateChange}
                                dateFormat="yyyy-MM-dd"
                                customInput={<TextField label="시작 날짜" variant="outlined" size="small" />}
                            />
                            <DatePicker
                                selected={endDate}
                                onChange={handleEndDateChange}
                                dateFormat="yyyy-MM-dd"
                                customInput={<TextField label="끝 날짜" variant="outlined" size="small" />}
                            />
                        </>
                    ) : (
                        <TextField
                            label="검색"
                            variant="outlined"
                            size="small"
                            value={searchValue}
                            sx={{ width: '25ch' }}
                            onKeyDown={handleKeyDown}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    )}
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
                style={{ display: 'flex', justifyContent: 'center', marginTop: '0px' }}
                className="pagination"
            />
        </Paper>
    )
}

