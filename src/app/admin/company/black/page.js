"use client"
import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, FormControl, Select, InputLabel, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography, IconButton, Button, Pagination, Dialog, DialogTitle, DialogContent, Avatar, DialogActions, Grid, Input, Checkbox } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
function EnhancedTable() {
    const [api_url, setApiUrl] = useState("/api/company/blocklist?size=10");
    const [ar, setAr] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [searchType, setSearchType] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [chkSet, setChkSet] = useState(new Set());
    const [chkAll, setChkAll] = useState(false); //false=전체선택해제
    useEffect(() => {
        getBlockList();
    }, [page]);
    function getBlockList() {
        axios.get(api_url).then((response) => {
            setAr(response.data.content);
            setTotalPage(response.data.totalPages);
            setPage(response.data.pageable.pageNumber);
        });
    }
    // 검색
    const handleSearch = async (e) => {
        console.log(searchType, searchValue);
        try {
            const response = await axios.get(api_url, {
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
    function allCheckChange(event) {
        if (event.target.checked) {
            const chkRow = new Set(ar.map((row) => row.bo_idx));
            setChkSet(chkRow);
            setChkAll(true);
        } else {
            setChkSet(new Set());
            setChkAll(false);
        }
    }
    const changePage = (event, value) => {
        setPage(value - 1); // 페이지 번호는 0부터 시작하므로 1을 빼줍니다.
        setApiUrl("/api/company/blocklist?size=10&page=" + (value - 1));
        getBlockList();
    };
    function checkChange(event, bo_idx) {
        const chk = new Set(chkSet); // chkSet 가져와서 set 생성

        if (event.target.checked) {
            // 클릭된 체크박스
            chk.add(bo_idx); // 항목 추가
        } else {
            chk.delete(bo_idx); // 항목 삭제
        }
        setChkSet(chk); // 상태 업데이트
    }
    //엔터키 검색
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log("엔터눌림");
            handleSearch();
        }
    }
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 3, boxShadow: 3, padding: 5 }}>
            <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
                <Typography sx={{ flex: '1 1 100%', fontWeight: 'bold' }} variant="h6" id="tableTitle" component="div">
                    기업 블랙 리스트
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
                            <MenuItem value="bldate">차단일</MenuItem>
                            <MenuItem value="blcontent">차단사유</MenuItem>
                            <MenuItem value="name">기업명</MenuItem>
                            <MenuItem value="number">기업번호</MenuItem>
                            <MenuItem value="tel">전화번호</MenuItem>
                            <MenuItem value="address">주소</MenuItem>
                            <MenuItem value="type">종류</MenuItem>
                            <MenuItem value="open">개업일</MenuItem>
                            <MenuItem value="employee">직원수</MenuItem>
                            <MenuItem value="sales">매출</MenuItem>
                            <MenuItem value="score">평점</MenuItem>
                            <MenuItem value="managerName">담당자이름</MenuItem>
                            <MenuItem value="managerTel">담당자전화번호</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="검색"
                        variant="outlined"
                        size="small"
                        value={searchValue}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setSearchValue(e.target.value)}
                        sx={{ width: '25ch' }}
                    />
                    <IconButton sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon onClick={handleSearch} />
                    </IconButton>
                    <Button variant="contained" color="info">추가</Button>
                    <Button variant="contained" color="warning">삭제</Button>
                    <Button variant="contained" color="error">차단</Button>
                </Box>
            </Toolbar>
            <TableContainer>
                <Table sx={{ minWidth: 750, border: '1px solid #e0e0e0' }} aria-labelledby="tableTitle" size="medium">
                    <TableHead >
                        <TableRow sx={{ bgcolor: 'primary.dark' }}>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium' }}>차단일</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium' }}>차단사유</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium' }}>기업명</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium' }}>기업번호</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium' }}>주소</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium' }}>전화번호</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium' }}>종류</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium' }}>개업일</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium' }}>직원수</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium' }}>사진</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium' }}>썸네일 사진</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium' }}>매출</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium' }}>평점</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium' }}>담당자 이름</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium' }}>담당자 전화번호</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ar.map((key, index) => (
                            <TableRow
                                key={index} // 키를 user.usIdx로 변경
                                hover
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{key.blDate}</TableCell>
                                <TableCell align="center">{key.blContent}</TableCell>
                                <TableCell align="center">{key.company.coName}</TableCell>
                                <TableCell align="center">{key.company.coNumber}</TableCell>
                                <TableCell align="center">{key.company.coAddress}</TableCell>
                                <TableCell align="center">{key.company.coTel}</TableCell>
                                <TableCell align="center">{key.company.coType}</TableCell>
                                <TableCell align="center">{key.company.coOpen}</TableCell>
                                <TableCell align="center">{key.company.coEmployee}</TableCell>
                                <TableCell align="center">{key.company.coImgUrl == null ? '없음' : <TableCell align="center"><img src={key.company.coImgUrl} alt="회원사진" style={{ width: '50px', height: '50px' }} /></TableCell>}</TableCell>
                                <TableCell align="center">{key.company.coThumbImgUrl == null ? '없음' : <TableCell align="center"><img src={key.company.coThumbImgUrl} alt="회원사진" style={{ width: '50px', height: '50px' }} /></TableCell>}</TableCell>
                                <TableCell align="center">{key.company.coSales}</TableCell>
                                <TableCell align="center">{key.company.coScore}</TableCell>
                                <TableCell align="center">{key.company.coManagerName}</TableCell>
                                <TableCell align="center">{key.company.coManagerTel}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                onChange={changePage} // onClick 대신 onChange 사용
                page={page + 1} // 현재 페이지 번호
                count={totalPage} // 총 페이지 수
                color="primary"
                style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}
                className="pagination"
            />
        </Paper>

    );
}

export default EnhancedTable;