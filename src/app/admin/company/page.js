"use client"
import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, FormControl, Select, InputLabel, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Pagination, Button, Grid, Avatar, Checkbox } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

function EnhancedTable() {
    const [page, setPage] = useState(0);
    const [api_url, setApiUrl] = useState("/api/admin/companies?size=10");
    const [ar, setAr] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [searchType, setSearchType] = useState('name');
    const [searchValue, setSearchValue] = useState('');
    useEffect(() => {
        getMemberList();
    }, [page]);
    // 회원 리스트 불러오기
    function getMemberList(){
    axios.get(api_url).then((response) => {
            setAr(response.data.content);
            setTotalPage(response.data.totalPages);
            setPage(response.data.pageable.pageNumber);
        });
    }
    // 페이지 변경 핸들러 수정
    const changePage = (event, value) => {
        setPage(value - 1); // 페이지 번호는 0부터 시작하므로 1을 빼줍니다.
        setApiUrl("/api/admin/companies?size=10&page="+(value-1));
    };
    //엔터키 검색
    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            handleSearch();
        }
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
                setTotalPage(response.data.pageable.totalPages);
                setPage(response.data.pageable.pageNumber);
            } else {
                alert("검색 실패");
            }
        } catch (error) {
            alert("검색 중 오류 발생");
        }
    };
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 3, boxShadow: 3, padding: 5 }}>
            <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
                <Typography sx={{ flex: '1 1 100%', fontWeight: 'bold',fontFamily: 'pl,sans-serif',fontSize: 30 }} variant="h6" id="tableTitle" component="div" >
                    기업 리스트
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, bgcolor: 'common.white', p: 0.5, borderRadius: 1 }}>
                    <FormControl size="small" sx={{ width: '15ch' }}>
                        <InputLabel id="category-select-label" sx={{fontFamily: 'pl,sans-serif'}}>카테고리</InputLabel>
                        <Select
                            labelId="category-select-label"
                            id="category-select"
                            value={searchType}
                            label="카테고리"
                            onChange={(e) => setSearchType(e.target.value)}
                            sx={{fontFamily: 'pl,sans-serif'}}
                        >
                            <MenuItem value="name" sx={{fontFamily: 'pl,sans-serif'}}>기업명</MenuItem>
                            <MenuItem value="number" sx={{fontFamily: 'pl,sans-serif'}}>기업번호</MenuItem>
                            <MenuItem value="tel" sx={{fontFamily: 'pl,sans-serif'}}>전화번호</MenuItem>
                            <MenuItem value="address" sx={{fontFamily: 'pl,sans-serif'}}>주소</MenuItem>
                            <MenuItem value="type" sx={{fontFamily: 'pl,sans-serif'}}>종류</MenuItem>
                            <MenuItem value="open" sx={{fontFamily: 'pl,sans-serif'}}>개업일</MenuItem>
                            <MenuItem value="employee" sx={{fontFamily: 'pl,sans-serif'}}>직원수</MenuItem>
                            <MenuItem value="sales" sx={{fontFamily: 'pl,sans-serif'}}>매출</MenuItem>
                            <MenuItem value="score" sx={{fontFamily: 'pl,sans-serif'}}>평점</MenuItem>
                            <MenuItem value="managerName" sx={{fontFamily: 'pl,sans-serif'}}>담당자이름</MenuItem>
                            <MenuItem value="managerTel" sx={{fontFamily: 'pl,sans-serif'}}>담당자전화번호</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="검색"
                        variant="outlined"
                        size="small"
                        value={searchValue}
                        sx={{ width: '25ch',fontFamily: 'pl,sans-serif'}}
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
                        <TableRow sx={{ bgcolor: 'primary.main' }}>
                            {/* co_idx, us_idx, co_name, co_number, co_address, co_tel, co_type, co_open, co_employee, co_img_url, co_thumbimg_url, co_sales, co_score, co_manager_name, co_manager_tel */}
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium',fontFamily: 'pl,sans-serif' }}>기업명</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium',fontFamily: 'pl,sans-serif' }}>기업번호</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium',fontFamily: 'pl,sans-serif' }}>주소</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium',fontFamily: 'pl,sans-serif' }}>전화번호</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium',fontFamily: 'pl,sans-serif' }}>종류</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium',fontFamily: 'pl,sans-serif' }}>개업일</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium',fontFamily: 'pl,sans-serif'  }}>직원수</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium',fontFamily: 'pl,sans-serif'  }}>사진</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium',fontFamily: 'pl,sans-serif'  }}>썸네일 사진</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium',fontFamily: 'pl,sans-serif'  }}>매출</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium',fontFamily: 'pl,sans-serif'  }}>평점</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium',fontFamily: 'pl,sans-serif'  }}>담당자 이름</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium',fontFamily: 'pl,sans-serif'  }}>담당자 전화번호</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ar.map((user) => (
                            <TableRow
                                key={user.id} // 키를 user.usIdx로 변경
                                hover
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" sx={{fontFamily: 'pl,sans-serif' }}>{user.coName}</TableCell>
                                <TableCell align="center" sx={{fontFamily: 'pl,sans-serif' }}>{user.coNumber}</TableCell>
                                <TableCell align="center" sx={{fontFamily: 'pl,sans-serif' }}>{user.coAddress}</TableCell>
                                <TableCell align="center" sx={{fontFamily: 'pl,sans-serif' }}>{user.coTel}</TableCell>
                                <TableCell align="center" sx={{fontFamily: 'pl,sans-serif' }}>{user.coType}</TableCell>
                                <TableCell align="center" sx={{fontFamily: 'pl,sans-serif' }}>{user.coOpen}</TableCell>
                                <TableCell align="center" sx={{fontFamily: 'pl,sans-serif' }}>{user.coEmployee}</TableCell>
                                <TableCell align="center" sx={{fontFamily: 'pl,sans-serif' }}>{user.coImgUrl == null ? '없음' : <img src={user.coImgUrl} alt="사진" style={{ width: '50px', height: '50px', display: 'block', margin: 'auto' }} />}</TableCell>
                                <TableCell align="center" sx={{fontFamily: 'pl,sans-serif' }}>{user.coThumbImgUrl == null ? '없음' : <img src={user.coThumbImgUrl} alt="썸네일" style={{ width: '50px', height: '50px', display: 'block', margin: 'auto' }} />}</TableCell>
                                <TableCell align="center" sx={{fontFamily: 'pl,sans-serif' }}>{user.coSales}</TableCell>
                                <TableCell align="center" sx={{fontFamily: 'pl,sans-serif' }}>{user.coScore}</TableCell>
                                <TableCell align="center" sx={{fontFamily: 'pl,sans-serif' }}>{user.coManagerName}</TableCell>
                                <TableCell align="center" sx={{fontFamily: 'pl,sans-serif' }}>{user.coManagerTel}</TableCell>
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