"use client"
import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, FormControl, Select, InputLabel, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography, IconButton, Pagination, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

function EnhancedTable() {
    const [page, setPage] = useState(0);
    const [api_url, setApiUrl] = useState("/api/admin/jobseekers");
    const [ar, setAr] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [searchType, setSearchType] = useState('name');
    const [searchValue, setSearchValue] = useState('');
    const [birthDatePicker, setBirthDatePicker] = useState(false);
    const [isSalaryRange, setIsSalaryRange] = useState(false);
    const [isJoinDatePicker, setIsJoinDatePicker] = useState(false);
    const [isLeaveDatePicker, setIsLeaveDatePicker] = useState(false);
    const [birthStartDate, setBirthStartDate] = useState(null);
    const [birthEndDate, setBirthEndDate] = useState(null);
    const [joinStartDate, setJoinStartDate] = useState(null);
    const [joinEndDate, setJoinEndDate] = useState(null);
    const [leaveStartDate, setLeaveStartDate] = useState(null);
    const [leaveEndDate, setLeaveEndDate] = useState(null);
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');

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
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    const handleBirthStartDateChange = (date) => {
        setBirthStartDate(date); 
    };

    const handleBirthEndDateChange = (date) => {
        setBirthEndDate(date); 
    };

    const handleJoinStartDateChange = (date) => {
        setJoinStartDate(date); 
    };

    const handleJoinEndDateChange = (date) => {
        setJoinEndDate(date); 
    };

    const handleLeaveStartDateChange = (date) => {
        setLeaveStartDate(date); 
    };

    const handleLeaveEndDateChange = (date) => {
        setLeaveEndDate(date); 
    };
    
    const handleSearch = async (e) => {
        try {
            let params = {};
            if (searchType && searchValue) {
                params.searchType = searchType;
                params.search = searchValue;
            };
            if (birthStartDate) {
                params.birthStartDate = dayjs(birthStartDate).format('YYYY-MM-DD');
            }
            if (birthEndDate) {
                params.birthEndDate = dayjs(birthEndDate).format('YYYY-MM-DD');
            }
            if (joinStartDate) {
                params.joinStartDate = dayjs(joinStartDate).format('YYYY-MM-DD');
            }
            if (joinEndDate) {
                params.joinEndDate = dayjs(joinEndDate).format('YYYY-MM-DD');
            }
            if (leaveStartDate) {
                params.leaveStartDate = dayjs(leaveStartDate).format('YYYY-MM-DD');
            }
            if (leaveEndDate) {
                params.leaveEndDate = dayjs(leaveEndDate).format('YYYY-MM-DD');
            }
            if (minSalary) {
                params.minSal = minSalary;
            }
            if (maxSalary) {
                params.maxSal = maxSalary;
            }
            console.log(params);
            const response = await axios.get(api_url, {
                params: params
            });
            if (response.status === 200) {
                console.log(response.data);
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

    const handleSearchTypeChange = (e) => {
        const value = e.target.value;
        setSearchType(value);
        if (value === 'birth') {
            setBirthDatePicker(true);
            setIsSalaryRange(false);
            setMinSalary('');
            setMaxSalary('');
            setSearchValue('');
            setJoinStartDate(null);
            setJoinEndDate(null);
            setLeaveStartDate(null);
            setLeaveEndDate(null);
        } else if (value === 'joinDate') {
            setBirthDatePicker(false);
            setIsJoinDatePicker(true);
            setIsSalaryRange(false);
            setBirthStartDate(null);
            setBirthEndDate(null);
            setMinSalary('');
            setMaxSalary('');
            setSearchValue('');
        } else if (value === 'leaveDate') {
            setBirthDatePicker(false);
            setIsLeaveDatePicker(true);
            setIsSalaryRange(false);
            setBirthStartDate(null);
            setBirthEndDate(null);
            setMinSalary('');
            setMaxSalary('');
            setSearchValue('');
        } else if (value === 'sal') {
            setIsSalaryRange(true);
            setBirthDatePicker(false);
            setIsJoinDatePicker(false);
            setIsLeaveDatePicker(false);
            setSearchValue('');
            setBirthStartDate(null);
            setBirthEndDate(null);
            setJoinStartDate(null);
            setJoinEndDate(null);
            setLeaveStartDate(null);
            setLeaveEndDate(null);
        } else {
            setBirthDatePicker(false);
            setIsJoinDatePicker(false);
            setIsLeaveDatePicker(false);
            setIsSalaryRange(false);
            setSearchValue('');
            setBirthStartDate(null);
            setBirthEndDate(null);
            setJoinStartDate(null);
            setJoinEndDate(null);
            setLeaveStartDate(null);
            setLeaveEndDate(null);
        }
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
                            <MenuItem value="sal" sx={{ fontFamily: 'pl,sans-serif' }}>월급</MenuItem>
                            <MenuItem value="gender" sx={{ fontFamily: 'pl,sans-serif' }}>성별</MenuItem>
                            <MenuItem value="joinDate" sx={{ fontFamily: 'pl,sans-serif' }}>가입일자</MenuItem>
                            <MenuItem value="leaveDate" sx={{ fontFamily: 'pl,sans-serif' }}>탈퇴일자</MenuItem>
                        </Select>
                    </FormControl>
                    {birthDatePicker ? (
                        <>
                            <DatePicker
                                selected={birthStartDate}
                                onChange={handleBirthStartDateChange}
                                dateFormat="yyyy-MM-dd"
                                customInput={<TextField label="시작 날짜" variant="outlined" size="small" sx={{ width: '12ch' }} />}
                            />
                            <DatePicker
                                selected={birthEndDate}
                                onChange={handleBirthEndDateChange}
                                dateFormat="yyyy-MM-dd"
                                customInput={<TextField label="끝 날짜" variant="outlined" size="small" sx={{ width: '12ch' }} />}
                            />
                        </>
                    ) : isJoinDatePicker ? (
                        <>
                            <DatePicker
                                selected={joinStartDate}
                                onChange={handleJoinStartDateChange}
                                dateFormat="yyyy-MM-dd"
                                customInput={<TextField label="시작 날짜" variant="outlined" size="small" sx={{ width: '12ch' }} />}
                            />
                            <DatePicker
                                selected={joinEndDate}
                                onChange={handleJoinEndDateChange}
                                dateFormat="yyyy-MM-dd"
                                customInput={<TextField label="끝 날짜" variant="outlined" size="small" sx={{ width: '12ch' }} />}
                            />

                        </>
                    ): isLeaveDatePicker ? (
                        <>
                            <DatePicker
                                selected={leaveStartDate}
                                onChange={handleLeaveStartDateChange}
                                dateFormat="yyyy-MM-dd"
                                customInput={<TextField label="시작 날짜" variant="outlined" size="small" sx={{ width: '12ch' }} />}
                            />
                            <DatePicker
                                selected={leaveEndDate}
                                onChange={handleLeaveEndDateChange}
                                dateFormat="yyyy-MM-dd"
                                customInput={<TextField label="끝 날짜" variant="outlined" size="small" sx={{ width: '12ch' }} />}
                            />
                        </>
                    ) : isSalaryRange ? (
                        <>
                            <TextField
                                label="최소 월급"
                                variant="outlined"
                                size="small"
                                value={minSalary}
                                onChange={(e) => setMinSalary(e.target.value)}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">₩</InputAdornment>,
                                }}
                                sx={{ width: '12ch', fontFamily: 'pl,sans-serif' }}
                                onKeyDown={handleKeyDown}
                            />
                            <TextField
                                label="최대 월급"
                                variant="outlined"
                                size="small"
                                value={maxSalary}
                                onChange={(e) => setMaxSalary(e.target.value)}
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
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>이름</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>생년월일</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>전화번호</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>주소</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>학력</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>월급</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>성별</TableCell>
                            <TableCell align="center" sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }}>사진</TableCell>
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
                                <TableCell align="center" sx={{ fontFamily: 'pl,sans-serif' }}>{user.joName}</TableCell>
                                <TableCell align="center" sx={{ fontFamily: 'pl,sans-serif' }}>{user.joBirth}</TableCell>
                                <TableCell align="center" sx={{ fontFamily: 'pl,sans-serif' }}>{user.joTel}</TableCell>
                                <TableCell align="center" sx={{ fontFamily: 'pl,sans-serif' }}>{user.joAddress.length > 10 ? user.joAddress.substring(0, 10) + '...' : user.joAddress}</TableCell>
                                <TableCell align="center" sx={{ fontFamily: 'pl,sans-serif' }}>{user.joEdu.length > 10 ? user.joEdu.substring(0, 10) + '...' : user.joEdu}</TableCell>
                                <TableCell align="center" sx={{ fontFamily: 'pl,sans-serif' }}>{user.joSal}</TableCell>
                                <TableCell align="center" sx={{ fontFamily: 'pl,sans-serif' }}>{user.joGender}</TableCell>
                                <TableCell align="center" sx={{ fontFamily: 'pl,sans-serif' }}>{user.joImgUrl == null ? '없음' : <img src={user.joImgUrl} alt="회원사진" style={{ width: '50px', height: '50px', display: 'block', margin: 'auto' }} />}</TableCell>
                                <TableCell align="center" sx={{ fontFamily: 'pl,sans-serif' }}>{user.user.usJoinDate}</TableCell>
                                <TableCell align="center" sx={{ fontFamily: 'pl,sans-serif' }}>{user.user.usState == 1 ? '활동중' : '탈퇴한 회원'}</TableCell>
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