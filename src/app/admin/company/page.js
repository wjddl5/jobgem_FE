// ... 기존 코드 ...
"use client"
import BusinessIcon from '@mui/icons-material/Business';
import { Paper, Toolbar, Typography, Box, IconButton, TextField, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState } from 'react';

const companies = [
    { id: 1, name: 'Tech Innovations', industry: 'Software', revenue: '$1M', employees: 150, location: 'San Francisco', founded: '2011' },
    { id: 2, name: 'Green Solutions', industry: 'Renewable Energy', revenue: '$1.2M', employees: 75, location: 'Berlin', founded: '2015' },
    // 다른 데이터도 이와 같이 추가...
];

function CompanyTable() {
    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', mt: 3, boxShadow: 3, padding: 5 }}>
            <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
                <Typography sx={{ flex: '1 1 100%', fontWeight: 'bold' }} variant="h6" id="tableTitle" component="div">
                    기업 리스트
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, bgcolor: 'common.white', p: 0.5, borderRadius: 1 }}>
                    <IconButton sx={{ p: '10px' }} aria-label="search">
                        <BusinessIcon />
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
                            <MenuItem value="name">회사명</MenuItem>
                            <MenuItem value="industry">산업</MenuItem>
                            <MenuItem value="revenue">매출</MenuItem>
                            <MenuItem value="employees">직원 수</MenuItem>
                            <MenuItem value="location">위치</MenuItem>
                            <MenuItem value="founded">설립 연도</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Toolbar>
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'primary.dark' }}>
                            <TableCell sx={{ color: 'common.white', fontWeight: 'medium' }}>회사명</TableCell>
                            <TableCell align="right" sx={{ color: 'common.white', fontWeight: 'medium' }}>산업</TableCell>
                            <TableCell align="right" sx={{ color: 'common.white', fontWeight: 'medium' }}>매출</TableCell>
                            <TableCell align="right" sx={{ color: 'common.white', fontWeight: 'medium' }}>직원 수</TableCell>
                            <TableCell align="right" sx={{ color: 'common.white', fontWeight: 'medium' }}>위치</TableCell>
                            <TableCell align="right" sx={{ color: 'common.white', fontWeight: 'medium' }}>설립 연도</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies.map((company) => (
                            <TableRow
                                key={company.id}
                                hover
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {company.name}
                                </TableCell>
                                <TableCell align="right">{company.industry}</TableCell>
                                <TableCell align="right">{company.revenue}</TableCell>
                                <TableCell align="right">{company.employees}</TableCell>
                                <TableCell align="right">{company.location}</TableCell>
                                <TableCell align="right">{company.founded}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default CompanyTable;