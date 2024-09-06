'use client'
import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, FormControl, Select, InputLabel, Box, Paper, Button, Typography, Toolbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Page() {
  const router = useRouter();
  const [member, setMember] = useState('');
  const [reason, setReason] = useState('');
  const [ar, setAr] = useState([]);
    const api_url = "/api/userlist";
useEffect(() => {
    getMemberList();
}, []);
    function getMemberList(){
        axios.get(api_url).then((response) => {
            console.log(response);
            setAr(response.data.content);
        });
    }
  const handleSubmit = (e) => {
    e.preventDefault();
    // 블랙리스트 추가 로직
    console.log(`Member: ${member}, Reason: ${reason}`);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 3, boxShadow: 3, padding: 5 }}>
      <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
        <Typography sx={{ flex: '1 1 100%', fontWeight: 'bold' }} variant="h6" id="tableTitle" component="div">
          블랙리스트 추가
        </Typography>
      </Toolbar>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="member-select-label">회원 선택</InputLabel>
            <Select
              labelId="member-select-label"
              id="member-select"
              value={member}
              label="회원 선택"
              onChange={(e) => setMember(e.target.value)}
            >
              <MenuItem value=""><em>회원 선택</em></MenuItem>
              <MenuItem value="member1">회원 1</MenuItem>
              <MenuItem value="member2">회원 2</MenuItem>
              {/* 회원 목록을 동적으로 생성할 수 있습니다 */}
            </Select>
          </FormControl>
          <TextField
            label="신고 사유"
            variant="outlined"
            multiline
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button variant="contained" color="primary" type="submit">추가</Button>
            <Button variant="contained" color="secondary" onClick={() => router.push('/admin/member/black')}>취소</Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
}
