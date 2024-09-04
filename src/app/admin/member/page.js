"use client"
import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, FormControl, Select, InputLabel, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Pagination, Button, Grid, Avatar, Checkbox } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';


function EnhancedTable() {
    const api_url = "/api/admin/list";
    const [ar, setAr] = useState([]);
    useEffect(() => {
        axios.get(api_url).then((response) => {
            console.log(response.data.data);
            setAr(response.data.data);
        });
    }, []);
    console.log(ar.data);
    const member = {
        name: 'Ansolo Lazinatov',
        photo: '/path/to/photo.jpg', // 사진 경로
        reports: 1,
        address: 'Shatdown Meklan\nVancouver, British Columbia',
        email: 'shatnion@email.com',
        phone: '+1234567890'
    };
    const [open, setOpen] = useState(false);
    const [searchType, setSearchType] = useState('');
    const [search, setSearch] = useState('');
    const [chkSet, setChkSet] = useState(new Set());
    const [chkAll, setChkAll] = useState(false); //false=전체선택해제
    
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
    const handleChange = (event) => {
        setSearchType(event.target.value);
    };
    const handleSearchChange = async (event) => {
        const searchValue = event.target.value;
        setSearch(searchValue);
        try {
            const response = await axios.post('http://localhost:8080/api/admin/search', {
                searchType: searchType,
                search: search, 
            });
            if (response.data.result > 0) {
                // 성공적인 검색 처리
            } else {
                console.log('검색 실패');
            }
        } catch (error) {
            console.error('검색 중 오류 발생:', error);
            console.log('검색 중 오류 발생');
        }
    }
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 3, boxShadow: 3, padding: 5 }}>
            <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
                <Typography sx={{ flex: '1 1 100%', fontWeight: 'bold' }} variant="h6" id="tableTitle" component="div">
                    회원 리스트
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, bgcolor: 'common.white', p: 0.5, borderRadius: 1 }}>
                    <IconButton sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <TextField
                        label="검색"
                        variant="outlined"
                        size="small"
                        value={search}
                        onChange={handleSearchChange}
                        sx={{ width: '25ch' }}
                    />
                    <FormControl size="small" sx={{ width: '15ch' }}>
                        <InputLabel id="category-select-label">카테고리</InputLabel>
                        <Select
                            labelId="category-select-label"
                            id="category-select"
                            value={searchType}
                            onChange={handleChange}
                            label="카테고리"
                        >
                            <MenuItem value="name">이름</MenuItem>
                            <MenuItem value="address">주소</MenuItem>
                            <MenuItem value="edu">학력</MenuItem>
                            <MenuItem value="gender">성별</MenuItem>
                            <MenuItem value="imgUrl">사진</MenuItem>
                            <MenuItem value="sal">월급</MenuItem>
                            <MenuItem value="tel">전화번호</MenuItem>
                            <MenuItem value="joinDate">가입일자</MenuItem>
                            <MenuItem value="leaveDate">탈퇴일자</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Toolbar>
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'primary.dark' }}>
                            <TableCell sx={{ width: "50px" }} align="center">
                                <Checkbox onChange={allCheckChange} checked={chkSet.size === ar.length} />
                            </TableCell>
                            <TableCell sx={{ color: 'common.white', fontWeight: 'medium' }}>이름</TableCell>
                            <TableCell align="right" sx={{ color: 'common.white', fontWeight: 'medium' }}>주소</TableCell>
                            <TableCell align="right" sx={{ color: 'common.white', fontWeight: 'medium' }}>학력</TableCell>
                            <TableCell align="right" sx={{ color: 'common.white', fontWeight: 'medium' }}>성별</TableCell>
                            <TableCell align="right" sx={{ color: 'common.white', fontWeight: 'medium' }}>사진</TableCell>
                            <TableCell align="right" sx={{ color: 'common.white', fontWeight: 'medium' }}>월급</TableCell>
                            <TableCell align="right" sx={{ color: 'common.white', fontWeight: 'medium' }}>전화번호</TableCell>
                            <TableCell align="right" sx={{ color: 'common.white', fontWeight: 'medium' }}>가입일자</TableCell>
                            <TableCell align="right" sx={{ color: 'common.white', fontWeight: 'medium' }}>탈퇴일자</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ar.map((user) => (
                            <TableRow   
                                key={user.usIdx} // 키를 user.usIdx로 변경
                                hover
                                onClick={handleClick}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">
                                    <Checkbox checked={chkSet.has(user.usIdx)} onChange={(event) => checkChange(event, user.usIdx)} onClick={(event) => event.stopPropagation()} />
                                </TableCell>
                                <TableCell align="right">{user.joName}</TableCell>
                                <TableCell align="right">{user.joAddress}</TableCell>
                                <TableCell align="right">{user.joEdu}</TableCell>
                                <TableCell align="right">{user.joGender}</TableCell>
                                {user.joImgUrl == null ? <TableCell align="right">없음</TableCell> : <TableCell align="right"><img src={user.joImgUrl} alt="회원사진" style={{ width: '50px', height: '50px' }} /></TableCell>}
                                <TableCell align="right">{user.joSal}</TableCell>
                                <TableCell align="right">{user.joTel}</TableCell>
                                <TableCell align="right">{user.user.usJoinDate}</TableCell>
                                {user.user.usLeaveDate == null ? <TableCell align="right">활동중</TableCell> : <TableCell align="right">{user.user.usLeaveDate}</TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }} count={10} variant="outlined" color="primary" />
            <Dialog open={open} onClose={handleClose} aria-labelledby="member-dialog-title">
                <DialogTitle id="member-dialog-title">{member.name}</DialogTitle>
                <DialogContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: '' }}>
                    <Grid container spacing={5} alignItems="center" justifyContent="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <Avatar alt={member.name} src={member.photo} sx={{ width: 90, height: 90, margin: 'auto' }} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={8}>
                            <Paper variant="outlined" sx={{ padding: 2 }}>
                                <Typography variant="body6" color="success">회원 정보</Typography>
                                <Typography variant="body2" color="info" style={{ marginTop: 10 }}>주소</Typography>
                                <Typography variant="body2" color="textSecondary">{member.address}</Typography>
                                <Typography variant="body2" color="info">이메일</Typography>
                                <Typography variant="body2" color="textSecondary">{member.email}</Typography>
                                <Typography variant="body2" color="info">전화번호</Typography>
                                <Typography variant="body2" color="textSecondary">{member.phone}</Typography>
                                <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 'bold', color: 'red', marginTop: 10 }}>신고건수: {member.reports}건</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">확인</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}

export default EnhancedTable;