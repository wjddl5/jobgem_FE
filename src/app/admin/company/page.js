"use client"
import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, FormControl, Select, InputLabel, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography, IconButton, Pagination, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

const initialState = {
    isOpenDatePicker: false,
    isSalesRange: false,
    openStartDate: null,
    openEndDate: null,
    minSales: '',
    maxSales: '',
};

function EnhancedTable() {
    const [page, setPage] = useState(0);
    const [api_url, setApiUrl] = useState("/api/admin/companies?size=6");
    const [ar, setAr] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [searchType, setSearchType] = useState('name');
    const [searchValue, setSearchValue] = useState('');
    const [state, setState] = useState(initialState);
    const [params, setParams] = useState({});
    useEffect(() => {
        getMemberList();
    }, [page, api_url]);

    function getMemberList() {
        axios.get(api_url).then((response) => {
            setAr(response.data.content);
            console.log(response.data.content);
            setTotalPage(response.data.totalPages);
            setPage(response.data.pageable.pageNumber);
        });
    }

    const changePage = (event, value) => {
        setPage(value - 1);
        setApiUrl(`/api/admin/companies?size=6&page=${value - 1}&${new URLSearchParams(params).toString()}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    const handleSearch = async () => {
        try {
            let params = {};
            if (searchType && searchValue) {
                params.searchType = searchType;
                params.searchValue = searchValue;
            }
            if (state.openStartDate) {
                params.openStartDate = dayjs(state.openStartDate).format('YYYY-MM-DD');
            }
            if (state.openEndDate) {
                params.openEndDate = dayjs(state.openEndDate).format('YYYY-MM-DD');
            }
            if (state.minSales) {
                params.minSales = state.minSales;
            }
            if (state.maxSales) {
                params.maxSales = state.maxSales;
            }
            setParams(params);
            setApiUrl(`/api/admin/companies?size=6&page=${page}&${new URLSearchParams(params).toString()}`);
        } catch (error) {
            console.error('검색 중 오류 발생:', error);
            alert("검색 중 오류 발생");
        }
    };

    const handleSearchTypeChange = (e) => {
        const value = e.target.value;
        setSearchType(value);
        setSearchValue('');

        const newState = { ...initialState };

        switch (value) {
            case 'open':
                newState.isOpenDatePicker = true;
                break;
            case 'sales':
                newState.isSalesRange = true;
                break;
            default:
                break;
        }

        setState(newState);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 3, boxShadow: 3, padding: 5 }}>
            <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
                <Typography sx={{ flex: '1 1 100%', fontWeight: 'bold', fontFamily: 'pl,sans-serif', fontSize: 30 }} variant="h6" id="tableTitle" component="div">
                    기업 리스트
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, bgcolor: 'common.white', p: 0.5, borderRadius: 1 }}>
                    <FormControl size="small" sx={{ width: '15ch' }}>
                        <InputLabel id="category-select-label" sx={{ fontFamily: 'pl,sans-serif' }}>카테고리</InputLabel>
                        <Select
                            labelId="category-select-label"
                            id="category-select"
                            value={searchType}
                            label="카테고리"
                            onChange={handleSearchTypeChange}
                            sx={{ fontFamily: 'pl,sans-serif' }}
                        >
                            <MenuItem value="name" sx={{ fontFamily: 'pl,sans-serif' }}>기업명</MenuItem>
                            <MenuItem value="number" sx={{ fontFamily: 'pl,sans-serif' }}>기업번호</MenuItem>
                            <MenuItem value="tel" sx={{ fontFamily: 'pl,sans-serif' }}>전화번호</MenuItem>
                            <MenuItem value="address" sx={{ fontFamily: 'pl,sans-serif' }}>주소</MenuItem>
                            <MenuItem value="type" sx={{ fontFamily: 'pl,sans-serif' }}>종류</MenuItem>
                            <MenuItem value="open" sx={{ fontFamily: 'pl,sans-serif' }}>개업일</MenuItem>
                            <MenuItem value="employee" sx={{ fontFamily: 'pl,sans-serif' }}>직원수</MenuItem>
                            <MenuItem value="sales" sx={{ fontFamily: 'pl,sans-serif' }}>매출</MenuItem>
                            <MenuItem value="score" sx={{ fontFamily: 'pl,sans-serif' }}>평점</MenuItem>
                            <MenuItem value="managerName" sx={{ fontFamily: 'pl,sans-serif' }}>담당자이름</MenuItem>
                            <MenuItem value="managerTel" sx={{ fontFamily: 'pl,sans-serif' }}>담당자전화번호</MenuItem>
                        </Select>
                    </FormControl>
                    {state.isOpenDatePicker ? (
                        <>
                            <DatePicker
                                selected={state.openStartDate}
                                onChange={(date) => setState({ ...state, openStartDate: date })}
                                dateFormat="yyyy-MM-dd"
                                customInput={<TextField label="시작 날짜" variant="outlined" size="small" sx={{ width: '12ch' }} />}
                            />
                            <DatePicker
                                selected={state.openEndDate}
                                onChange={(date) => setState({ ...state, openEndDate: date })}
                                dateFormat="yyyy-MM-dd"
                                customInput={<TextField label="끝 날짜" variant="outlined" size="small" sx={{ width: '12ch' }} />}
                            />
                        </>
                    ) : state.isSalesRange ? (
                        <>
                            <TextField
                                label="최소 매출"
                                variant="outlined"
                                size="small"
                                value={state.minSales}
                                onChange={(e) => setState({ ...state, minSales: e.target.value })}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">₩</InputAdornment>,
                                }}
                                sx={{ width: '12ch', fontFamily: 'pl,sans-serif' }}
                                onKeyDown={handleKeyDown}
                            />
                            <TextField
                                label="최대 매출"
                                variant="outlined"
                                size="small"
                                value={state.maxSales}
                                onChange={(e) => setState({ ...state, maxSales: e.target.value })}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">₩</InputAdornment>,
                                }}
                                sx={{ width: '12ch', fontFamily: 'pl,sans-serif' }}
                                onKeyDown={handleKeyDown}
                            />
                        </>
                    ) : (
                        <TextField
                            label="검색"
                            variant="outlined"
                            size="small"
                            value={searchValue}
                            sx={{ width: '25ch', fontFamily: 'pl,sans-serif' }}
                            onKeyDown={handleKeyDown}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    )}
                    <IconButton sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                        <SearchIcon />
                    </IconButton>
                </Box>
            </Toolbar>
            <TableContainer>
                <Table sx={{ minWidth: 750, border: '1px solid #e0e0e0' }} aria-labelledby="tableTitle" size="medium">
                    <TableHead >
                        <TableRow sx={{ bgcolor: 'primary.main' }}>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>사진</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>썸네일 사진</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>기업명</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>기업번호</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>주소</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>전화번호</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>종류</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>개업일</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>직원수</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>매출</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>평점</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>담당자 이름</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>담당자 전화번호</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ar.map((user) => (
                            <TableRow
                                key={user.id} // 키를 user.usIdx로 변경
                                hover
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>
                                    {user.coImgUrl == null ? '없음' : (
                                        <img
                                            src={`/s3/${user.coImgUrl}`}
                                            alt="사진"
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                display: 'block',
                                                margin: 'auto',
                                                objectFit: 'cover',
                                                borderRadius: '5px'
                                            }}
                                        />
                                    )}
                                </TableCell>
                                <TableCell align="center" sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>
                                    {user.coThumbimgUrl == null ? '없음' : (
                                        <img
                                            src={`/s3/${user.coThumbimgUrl}`}
                                            alt="썸네일"
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                display: 'block',
                                                margin: 'auto',
                                                objectFit: 'cover',
                                                borderRadius: '5px'
                                            }}
                                        />
                                    )}
                                </TableCell>
                                <TableCell align="center" sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{user.coName ? user.coName : '없음'}</TableCell>
                                <TableCell align="center" sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{user.coNumber ? user.coNumber : '없음'}</TableCell>
                                <TableCell align="center" sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{user.coAddress ? user.coAddress : '없음'}</TableCell>
                                <TableCell align="center" sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{user.coTel ? user.coTel : '없음'}</TableCell>
                                <TableCell align="center" sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{user.coType ? user.coType : '없음'}</TableCell>
                                <TableCell align="center" sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{user.coOpen ? user.coOpen : '없음'}</TableCell>
                                <TableCell align="center" sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{user.coEmployee ? user.coEmployee : '없음'}</TableCell>
                                <TableCell align="center" sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{user.coSales ? user.coSales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '없음'}</TableCell>
                                <TableCell align="center" sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{user.coScore ? user.coScore : '없음'}</TableCell>
                                <TableCell align="center" sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{user.coManagerName ? user.coManagerName : '없음'}</TableCell>
                                <TableCell align="center" sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{user.coManagerTel ? user.coManagerTel : '없음'}</TableCell>
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