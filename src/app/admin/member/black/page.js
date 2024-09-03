"use client"
import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, FormControl, Select, InputLabel, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography, IconButton, Button, Pagination, Dialog, DialogTitle, DialogContent, Avatar, DialogActions, Grid, Input, Checkbox } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';
const ar = [
    { bo_idx: 1, name: 'Carry Anna', email: 'anna34@gmail.com', age: 89, balance: '$23,987', city: 'Budapest', lastActive: '34 min ago', joinDate: 'Dec 12, 1:25 PM' },
    { bo_idx: 2, name: 'Carry Anna', email: 'anna34@gmail.com', age: 89, balance: '$23,987', city: 'Budapest', lastActive: '34 min ago', joinDate: 'Dec 12, 1:25 PM' },
    { bo_idx: 3, name: 'Carry Anna', email: 'anna34@gmail.com', age: 89, balance: '$23,987', city: 'Budapest', lastActive: '34 min ago', joinDate: 'Dec 12, 1:25 PM' },
    { bo_idx: 4, name: 'Carry Anna', email: 'anna34@gmail.com', age: 89, balance: '$23,987', city: 'Budapest', lastActive: '34 min ago', joinDate: 'Dec 12, 1:25 PM' },
    { bo_idx: 5, name: 'Carry Anna', email: 'anna34@gmail.com', age: 89, balance: '$23,987', city: 'Budapest', lastActive: '34 min ago', joinDate: 'Dec 12, 1:25 PM' },
    { bo_idx: 6, name: 'Carry Anna', email: 'anna34@gmail.com', age: 89, balance: '$23,987', city: 'Budapest', lastActive: '34 min ago', joinDate: 'Dec 12, 1:25 PM' },
    { bo_idx: 7, name: 'Carry Anna', email: 'anna34@gmail.com', age: 89, balance: '$23,987', city: 'Budapest', lastActive: '34 min ago', joinDate: 'Dec 12, 1:25 PM' },
    { bo_idx: 8, name: 'Carry Anna', email: 'anna34@gmail.com', age: 89, balance: '$23,987', city: 'Budapest', lastActive: '34 min ago', joinDate: 'Dec 12, 1:25 PM' },
    { bo_idx: 9, name: 'Carry Anna', email: 'anna34@gmail.com', age: 89, balance: '$23,987', city: 'Budapest', lastActive: '34 min ago', joinDate: 'Dec 12, 1:25 PM' },
    { bo_idx: 10, name: 'Carry Anna', email: 'anna34@gmail.com', age: 89, balance: '$23,987', city: 'Budapest', lastActive: '34 min ago', joinDate: 'Dec 12, 1:25 PM' },
    { bo_idx: 11, name: 'Carry Anna', email: 'anna34@gmail.com', age: 89, balance: '$23,987', city: 'Budapest', lastActive: '34 min ago', joinDate: 'Dec 12, 1:25 PM' },
    { bo_idx: 12, name: 'Carry Anna', email: 'anna34@gmail.com', age: 89, balance: '$23,987', city: 'Budapest', lastActive: '34 min ago', joinDate: 'Dec 12, 1:25 PM' },
    { bo_idx: 13, name: 'Carry Anna', email: 'anna34@gmail.com', age: 89, balance: '$23,987', city: 'Budapest', lastActive: '34 min ago', joinDate: 'Dec 12, 1:25 PM' },
    { bo_idx: 14, name: 'Carry Anna', email: 'anna34@gmail.com', age: 89, balance: '$23,987', city: 'Budapest', lastActive: '34 min ago', joinDate: 'Dec 12, 1:25 PM' },
    // 다른 데이터도 이와 같이 추가...
];
const member = {
    name: 'Ansolo Lazinatov',
    photo: '/path/to/photo.jpg', // 사진 경로
    reports: 1,
    address: 'Shatdown Meklan\nVancouver, British Columbia',
    email: 'shatnion@email.com',
    phone: '+1234567890'
};

function EnhancedTable() {
    const [mid, setMid] = useState(null);
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('');
    const [chkSet, setChkSet] = useState(new Set());
    const [chkAll, setChkAll] = useState(false); //false=전체선택해제
    const router = useRouter();
    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };
    const handleRowClick = (id) => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
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

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 3, boxShadow: 3, padding: 5 }}>
            <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
                <Typography sx={{ flex: '1 1 100%', fontWeight: 'bold' }} variant="h6" id="tableTitle" component="div">
                    블랙 리스트
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
                            value={category}
                            onChange={handleChange}
                            label="카테고리"
                        >
                            <MenuItem value="name">회원명</MenuItem>
                            <MenuItem value="email">이메일</MenuItem>
                            <MenuItem value="age">나이</MenuItem>
                            <MenuItem value="balance">회원등급</MenuItem>
                            <MenuItem value="city">주소</MenuItem>
                            <MenuItem value="lastActive">최근활성일</MenuItem>
                            <MenuItem value="joinDate">가입일자</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="info" onClick={() => router.push(`/admin/member/black/add/${mid}`)}>추가</Button>
                    <Button variant="contained" color="warning">삭제</Button>
                    <Button variant="contained" color="error">차단</Button>
                </Box>
            </Toolbar>
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'primary.dark' }}>
                            <TableCell sx={{ width: "50px" }} align="center">
                                <Checkbox onChange={allCheckChange} checked={chkSet.size === ar.length} />
                            </TableCell>
                            <TableCell sx={{ color: 'common.white', fontWeight: 'medium' }}>회원명</TableCell>
                            <TableCell align="right" sx={{ color: 'common.white', fontWeight: 'medium' }}>이메일</TableCell>
                            <TableCell align="right" sx={{ color: 'common.white', fontWeight: 'medium' }}>나이</TableCell>
                            <TableCell align="right" sx={{ color: 'common.white', fontWeight: 'medium' }}>회원등급</TableCell>
                            <TableCell align="right" sx={{ color: 'common.white', fontWeight: 'medium' }}>주소</TableCell>
                            <TableCell align="right" sx={{ color: 'common.white', fontWeight: 'medium' }}>최근활성일</TableCell>
                            <TableCell align="right" sx={{ color: 'common.white', fontWeight: 'medium' }}>가입일자</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ar.map((row) => (
                            <TableRow
                                key={row.bo_idx}
                                hover
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={() => handleRowClick(row.id)}
                            >
                                <TableCell align="center">
                                    <Checkbox checked={chkSet.has(row.bo_idx)} onChange={(event) => checkChange(event, row.bo_idx)} onClick={(event) => event.stopPropagation()} />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.age}</TableCell>
                                <TableCell align="right">{row.balance}</TableCell>
                                <TableCell align="right">{row.city}</TableCell>
                                <TableCell align="right">{row.lastActive}</TableCell>
                                <TableCell align="right">{row.joinDate}</TableCell>
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