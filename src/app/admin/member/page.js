"use client"
import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, FormControl, Select, InputLabel, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography, IconButton, Pagination, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
const initialState = {
    isBlockDatePicker: false,
    isJoinDatePicker: false,
    isLeaveDatePicker: false,
    isBirthDatePicker: false,
    isSalaryRange: false,
    blockStartDate: null,
    blockEndDate: null,
    joinStartDate: null,
    joinEndDate: null,
    leaveStartDate: null,
    leaveEndDate: null,
    birthStartDate: null,
    birthEndDate: null,
    minSalary: '',
    maxSalary: '',
};

function EnhancedTable() {
    const [page, setPage] = useState(0);
    const [api_url, setApiUrl] = useState("/api/admin/jobseekers?size=6");
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
            setTotalPage(response.data.totalPages);
            setPage(response.data.pageable.pageNumber);
        });
    }
    const changePage = (event, value) => {
        if (searchType == null || searchValue == null) {
            setPage(value - 1);
            setApiUrl(`/api/admin/jobseekers?size=6&page=${value - 1}`);
        } else {
            setApiUrl(`/api/admin/jobseekers?size=6&page=${value - 1}&${new URLSearchParams(params).toString()}`);
        }
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
            if (state.birthStartDate) {
                params.birthStartDate = dayjs(state.birthStartDate).format('YYYY-MM-DD');
            }
            if (state.birthEndDate) {
                params.birthEndDate = dayjs(state.birthEndDate).format('YYYY-MM-DD');
            }
            if (state.joinStartDate) {
                params.joinStartDate = dayjs(state.joinStartDate).format('YYYY-MM-DD');
            }
            if (state.joinEndDate) {
                params.joinEndDate = dayjs(state.joinEndDate).format('YYYY-MM-DD');
            }
            if (state.leaveStartDate) {
                params.leaveStartDate = dayjs(state.leaveStartDate).format('YYYY-MM-DD');
            }
            if (state.leaveEndDate) {
                params.leaveEndDate = dayjs(state.leaveEndDate).format('YYYY-MM-DD');
            }
            if (state.minSalary) {
                params.minSal = state.minSalary;
            }
            if (state.maxSalary) {
                params.maxSal = state.maxSalary;
            }
            setApiUrl(`/api/admin/jobseekers?size=6&page=${page}&${new URLSearchParams(params).toString()}`);
            setParams(params);
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
            case 'birth':
                newState.isBirthDatePicker = true;
                break;
            case 'joinDate':
                newState.isJoinDatePicker = true;
                break;
            case 'leaveDate':
                newState.isLeaveDatePicker = true;
                break;
            case 'sal':
                newState.isSalaryRange = true;
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
                    회원 리스트
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
                            <MenuItem value="name" sx={{ fontFamily: 'pl,sans-serif' }}>회원명</MenuItem>
                            <MenuItem value="birth" sx={{ fontFamily: 'pl,sans-serif' }}>생년월일</MenuItem>
                            <MenuItem value="tel" sx={{ fontFamily: 'pl,sans-serif' }}>전화번호</MenuItem>
                            <MenuItem value="address" sx={{ fontFamily: 'pl,sans-serif' }}>주소</MenuItem>
                            <MenuItem value="edu" sx={{ fontFamily: 'pl,sans-serif' }}>학력</MenuItem>
                            <MenuItem value="sal" sx={{ fontFamily: 'pl,sans-serif' }}>연봉</MenuItem>
                            <MenuItem value="gender" sx={{ fontFamily: 'pl,sans-serif' }}>성별</MenuItem>
                            <MenuItem value="joinDate" sx={{ fontFamily: 'pl,sans-serif' }}>가입일자</MenuItem>
                            <MenuItem value="leaveDate" sx={{ fontFamily: 'pl,sans-serif' }}>탈퇴일자</MenuItem>
                        </Select>
                    </FormControl>
                    {state.isBirthDatePicker ? (
                        <>
                            <DatePicker
                                selected={state.birthStartDate}
                                onChange={(date) => setState({ ...state, birthStartDate: date })}
                                dateFormat="yyyy-MM-dd"
                                customInput={<TextField label="시작 날짜" variant="outlined" size="small" sx={{ width: '12ch' }} />}
                            />
                            <DatePicker
                                selected={state.birthEndDate}
                                onChange={(date) => setState({ ...state, birthEndDate: date })}
                                dateFormat="yyyy-MM-dd"
                                customInput={<TextField label="끝 날짜" variant="outlined" size="small" sx={{ width: '12ch' }} />}
                            />
                        </>
                    ) : state.isJoinDatePicker ? (
                        <>
                            <DatePicker
                                selected={state.joinStartDate}
                                onChange={(date) => setState({ ...state, joinStartDate: date })}
                                dateFormat="yyyy-MM-dd"
                                customInput={<TextField label="시작 날짜" variant="outlined" size="small" sx={{ width: '12ch' }} />}
                            />
                            <DatePicker
                                selected={state.joinEndDate}
                                onChange={(date) => setState({ ...state, joinEndDate: date })}
                                dateFormat="yyyy-MM-dd"
                                customInput={<TextField label="끝 날짜" variant="outlined" size="small" sx={{ width: '12ch' }} />}
                            />
                        </>
                    ) : state.isLeaveDatePicker ? (
                        <>
                            <DatePicker
                                selected={state.leaveStartDate}
                                onChange={(date) => setState({ ...state, leaveStartDate: date })}
                                dateFormat="yyyy-MM-dd"
                                customInput={<TextField label="시작 날짜" variant="outlined" size="small" sx={{ width: '12ch' }} />}
                            />
                            <DatePicker
                                selected={state.leaveEndDate}
                                onChange={(date) => setState({ ...state, leaveEndDate: date })}
                                dateFormat="yyyy-MM-dd"
                                customInput={<TextField label="끝 날짜" variant="outlined" size="small" sx={{ width: '12ch' }} />}
                            />
                        </>
                    ) : state.isSalaryRange ? (
                        <>
                            <TextField
                                label="최소 연봉"
                                variant="outlined"
                                size="small"
                                value={state.minSalary}
                                onChange={(e) => setState({ ...state, minSalary: e.target.value })}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">₩</InputAdornment>,
                                }}
                                sx={{ width: '12ch', fontFamily: 'pl,sans-serif' }}
                                onKeyDown={handleKeyDown}
                            />
                            <TextField
                                label="최대 연봉"
                                variant="outlined"
                                size="small"
                                value={state.maxSalary}
                                onChange={(e) => setState({ ...state, maxSalary: e.target.value })}
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
                <Table sx={{ minWidth: 750, border: '1px solid #e0e0e0', fontFamily: 'pl,sans-serif' }} aria-labelledby="tableTitle" size="medium">
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'primary.main' }}>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif', width: '100px' }}>사진</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>이름</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>생년월일</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>전화번호</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>주소</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>학력</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>연봉</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>성별</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>가입일자</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>탈퇴여부</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ar.map((user) => (
                            <TableRow
                                key={user.id}
                                hover
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" sx={{ fontFamily: 'pl,sans-serif', whiteSpace: 'normal', wordBreak: 'break-all' }}>
                                    {user.joImgUrl == null ? <img src='/img/profile.png' /> : <img src={`/s3/${user.joImgUrl}`} alt="회원사진" style={{ width: '50px', height: '50px', display: 'block', margin: 'auto', borderRadius: '50%' }} />}
                                </TableCell>
                                <TableCell align="center" sx={{ fontFamily: 'pl,sans-serif', whiteSpace: 'normal', wordBreak: 'break-all' }}>{user.joName ? user.joName : '없음'} </TableCell>
                                <TableCell align="center" sx={{ fontFamily: 'pl,sans-serif', whiteSpace: 'normal', wordBreak: 'break-all' }}>
                                    {user.joBirth ? (
                                        <>
                                            {user.joBirth}
                                            <br />
                                            현재 나이: {user.joAge}
                                        </>
                                    ) : '없음'}
                                </TableCell>
                                <TableCell align="center" sx={{ fontFamily: 'pl,sans-serif', whiteSpace: 'normal', wordBreak: 'break-all' }}>{user.joTel ? user.joTel : '없음'}</TableCell>
                                <TableCell align="center" sx={{ fontFamily: 'pl,sans-serif', whiteSpace: 'normal', wordBreak: 'break-all' }}>{user.joAddress ? user.joAddress : '없음'}</TableCell>
                                <TableCell align="center" sx={{ fontFamily: 'pl,sans-serif', whiteSpace: 'normal', wordBreak: 'break-all' }}>{user.joEdu ? user.joEdu : '없음'}</TableCell>
                                <TableCell align="center" sx={{ fontFamily: 'pl,sans-serif', whiteSpace: 'normal', wordBreak: 'break-all' }}>{user.joSal ? user.joSal : '없음'}</TableCell>
                                <TableCell align="center" sx={{ fontFamily: 'pl,sans-serif', whiteSpace: 'normal', wordBreak: 'break-all' }}>{user.joGender ? user.joGender : '없음'}</TableCell>
                                <TableCell align="center" sx={{ fontFamily: 'pl,sans-serif', whiteSpace: 'normal', wordBreak: 'break-all' }}>{user.user.usJoinDate ? user.user.usJoinDate : '없음'}</TableCell>
                                <TableCell align="center" sx={{ fontFamily: 'pl,sans-serif', whiteSpace: 'normal', wordBreak: 'break-all' }}>{user.user.usState == 1 ? '활동중' : '탈퇴한 회원'}</TableCell>
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