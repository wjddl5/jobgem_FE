"use client"
import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, FormControl, Select, InputLabel, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography, IconButton, Button, Pagination, Dialog, DialogTitle, DialogContent, Avatar, DialogActions, Grid, Input, Checkbox } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function EnhancedTable() {
    const router = useRouter();
    const [api_url, setApiUrl] = useState("/api/company/blackList?size=10");
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
            alert("검색 중 오류 발생");
        }
    };
    const changePage = (event, value) => {
        setPage(value - 1); // 페이지 번호는 0부터 시작하므로 1을 빼줍니다.
        setApiUrl("/api/company/blackList?size=10&page=" + (value - 1));
        getBlockList();
        setChkSet(new Set());
        setChkAll(false);
    };
    //엔터키 검색
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }
    useEffect(() => {
        setChkAll(chkSet.size === ar.length && ar.length > 0);
    }, [chkSet, ar]);
    // 체크박스 상태 변경 함수 수정
    function checkChange(event, idx) {
        const newChkSet = new Set(chkSet);
        if (event.target.checked) {
            newChkSet.add(idx);
        } else {
            newChkSet.delete(idx);
        }
        setChkSet(newChkSet);
    }
    // 전체 선택 체크박스 상태 변경 함수 수정
    function allCheckChange(event) {
        const isChecked = event.target.checked;
        setChkSet(isChecked ? new Set(ar.map((company) => company.id)) : new Set());
    }
    // 체크박스 삭제
    const handleDelete = async () => {
        if(chkSet.size === 0){
            alert("삭제할 항목을 선택해주세요");
            return;
        }
        try {
            const response = await axios.get("/api/company/deletecompanyBlock", {
                params: {
                    chkList: Array.from(chkSet).join(',')
                }
            });
            if (response.status === 200) {
                let count = response.data;
                alert(`${count}개의 항목이 삭제되었습니다.`);
                getBlockList();
            }
        } catch (error) {
            alert("삭제 중 오류 발생");
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
                    <Button variant="contained" color="info" onClick={() => router.push('/admin/company/black/add')}>추가</Button>
                    <Button variant="contained" color="warning" onClick={handleDelete}>삭제</Button>
                    {/* <Button variant="contained" color="error">차단</Button> */}
                </Box>
            </Toolbar>
            <TableContainer>
                <Table sx={{ minWidth: 750, border: '1px solid #e0e0e0' }} aria-labelledby="tableTitle" size="medium">
                    <TableHead >
                        <TableRow sx={{ bgcolor: 'primary.dark' }}>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium' }}><Checkbox checked={chkAll} onChange={allCheckChange} /></TableCell>
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
                        {ar.map((company, index) => (
                            <TableRow
                                key={index} // 키를 user.usIdx로 변경
                                hover
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center"><Checkbox checked={chkSet.has(company.id)} onChange={(e) => checkChange(e, company.id)} /></TableCell>
                                <TableCell align="center">{company.blDate}</TableCell>
                                <TableCell align="center">{company.blContent}</TableCell>
                                <TableCell align="center">{company.company.coName}</TableCell>
                                <TableCell align="center">{company.company.coNumber}</TableCell>
                                <TableCell align="center">{company.company.coAddress}</TableCell>
                                <TableCell align="center">{company.company.coTel}</TableCell>
                                <TableCell align="center">{company.company.coType}</TableCell>
                                <TableCell align="center">{company.company.coOpen}</TableCell>
                                <TableCell align="center">{company.company.coEmployee}</TableCell>
                                <TableCell align="center">{company.company.coImgUrl == null ? '없음' : <TableCell align="center"><img src={company.company.coImgUrl} alt="회원사진" style={{ width: '50px', height: '50px' }} /></TableCell>}</TableCell>
                                <TableCell align="center">{company.company.coThumbImgUrl == null ? '없음' : <TableCell align="center"><img src={company.company.coThumbImgUrl} alt="회원사진" style={{ width: '50px', height: '50px' }} /></TableCell>}</TableCell>
                                <TableCell align="center">{company.company.coSales}</TableCell>
                                <TableCell align="center">{company.company.coScore}</TableCell>
                                <TableCell align="center">{company.company.coManagerName}</TableCell>
                                <TableCell align="center">{company.company.coManagerTel}</TableCell>
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