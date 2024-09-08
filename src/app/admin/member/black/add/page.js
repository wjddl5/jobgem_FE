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
  const api_url = "/api/notBlack";
  useEffect(() => {
    getMemberList();
  }, []);
  function getMemberList() {
    axios.get(api_url).then((response) => {
      console.log(response);
      setAr(response.data);
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
      <Box>
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
          <Typography sx={{ flex: '1 1 100%', fontWeight: 'bold' }} variant="h6" id="tableTitle" component="div">
            회원 선택
          </Typography>
          {ar.map((user, idx) => (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="subtitle1">{user.joName}</Typography>
              <Typography variant="body2">
                전화번호: {user.joTel} | 성별: {user.joGender}
              </Typography>
              <Typography variant="body2">
                주소: {user.joAddress}
              </Typography>
              <Typography variant="body2">
                학력: {user.joEdu} | 월급: {user.joSal}
              </Typography>
              <Typography variant="body2">
                사진: {user.joImgUrl ? '있음' : '없음'}
              </Typography>
              <Typography variant="body2">
                가입일자: {user.user.usJoinDate} | 탈퇴일자: {user.user.usLeaveDate || '활동중'}
              </Typography>
            </Box>
          ))}
        </Toolbar>
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="member-select-label">회원 선택</InputLabel>
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
      </Box>
    </Paper>
  );
}
