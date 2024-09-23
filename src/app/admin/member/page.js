"use client"
import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, FormControl, Select, InputLabel, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Pagination, Button, Grid, Avatar, Checkbox } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

function EnhancedTable() {
    const [page, setPage] = useState(0);
    const [api_url, setApiUrl] = useState("/api/admin/jobseekers?size=10");
    const [ar, setAr] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [searchType, setSearchType] = useState('name');
    const [searchValue, setSearchValue] = useState('');
    useEffect(() => {
        getMemberList();
    }, [page]);

    function getMemberList() {
        axios.get(api_url).then((response) => {
            setAr(response.data.content);
            setTotalPage(response.data.totalPages);
            setPage(response.data.pageable.pageNumber);
        });
    }

    const changePage = (event, value) => {
        setPage(value - 1); // 페이지 번호는 0부터 시작하므로 1을 빼줍니다.
        setApiUrl("/api/admin/jobseekers?size=10&page=" + (value - 1));
        getMemberList();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    const handleSearch = async (e) => {
        try {
            const response = await axios.get(api_url, {
                params: {
                    type: searchType,
                    value: searchValue,
                }
            });
            if (response.status === 200) {
                setAr(response.data.content);
                setTotalPage(response.data.pageable.totalPages);
                setPage(response.data.pageable.pageNumber);
            } else {
                alert("검색 실패");
            }
        } catch (error) {
            console.error('검색 중 오류 발생:', error);
            alert("검색 중 오류 발생");
        }
    };
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 3, boxShadow: 3, padding: 5 }}>
            <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
                <Typography sx={{ flex: '1 1 100%', fontWeight: 'bold' }} variant="h6" id="tableTitle" component="div">
                    회원 리스트
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, bgcolor: 'common.white', p: 0.5, borderRadius: 1 }}>
                    <FormControl size="small" sx={{ width: '15ch' }}>
                        <InputLabel id="category-select-label">카테고리</InputLabel>
                        <Select
                            labelId="category-select-label"
                            id="category-select"
                            value={searchType}
                            label="카테고리"
                            onChange={(e) => setSearchType(e.target.value)}
                        >
                            <MenuItem value="name">회원명</MenuItem>
                            <MenuItem value="birth">생년월일</MenuItem>
                            <MenuItem value="tel">전화번호</MenuItem>
                            <MenuItem value="address">주소</MenuItem>
                            <MenuItem value="edu">학력</MenuItem>
                            <MenuItem value="sal">월급</MenuItem>
                            <MenuItem value="gender">성별</MenuItem>
                            <MenuItem value="joinDate">가입일자</MenuItem>
                            <MenuItem value="leaveDate">탈퇴일자</MenuItem>
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
            </Toolbar>
            <TableContainer>
                <Table sx={{ minWidth: 750, border: '1px solid #e0e0e0' }} aria-labelledby="tableTitle" size="medium">
                    <TableHead >
                        <TableRow sx={{ bgcolor: 'primary.dark' }}>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium' }}>이름</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium' }}>생년월일</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium' }}>전화번호</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium' }}>주소</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium' }}>학력</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium' }}>월급</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium' }}>성별</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium' }}>사진</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium' }}>가입일자</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium' }}>탈퇴일자</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ar.map((user) => (
                            <TableRow
                                key={user.id}
                                hover
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{user.joName}</TableCell>
                                <TableCell align="center">{user.joBirth}</TableCell>
                                <TableCell align="center">{user.joTel}</TableCell>
                                <TableCell align="center">{user.joAddress}</TableCell>
                                <TableCell align="center">{user.joEdu}</TableCell>
                                <TableCell align="center">{user.joSal}</TableCell>
                                <TableCell align="center">{user.joGender}</TableCell>
                                <TableCell align="center">{user.joImgUrl == null ? '없음' : <TableCell align="center"><img src={user.joImgUrl} alt="회원사진" style={{ width: '50px', height: '50px' }} /></TableCell>}</TableCell>
                                <TableCell align="center">{user.user.usJoinDate}</TableCell>
                                <TableCell align="center">{user.user.usLeaveDate == null ? '활동중' : user.user.usLeaveDate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                onChange={changePage}
                page={page + 1}
                count={totalPage}
                color="primary"
                style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}
                className="pagination"
            />
        </Paper>
    );
}

export default EnhancedTable;