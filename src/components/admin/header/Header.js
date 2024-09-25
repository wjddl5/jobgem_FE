"use client"
import React, { useEffect, useState } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Header() {
    const router = useRouter()
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen2, setDropdownOpen2] = useState(false);
    const [qna, setQna] = useState([]);
    const [blacklist, setBlacklist] = useState([]);

    useEffect(() => {
        axios.get('/api/admin/unanswered-questions')
            .then(res => setQna(res.data))
            .catch(error => console.error('Error fetching QnA:', error));
        axios.get('/api/admin/pending-blacklist')
            .then(res => setBlacklist(res.data))
            .catch(error => console.error('Error fetching blacklist:', error));
    }, [])

    const handleToggleDropdown = () => {
        setDropdownOpen2(false)
        setDropdownOpen(prev => !prev);
    };

    const handleToggleDropdown2 = () => {
        setDropdownOpen(false)
        setDropdownOpen2(prev => !prev);
    };

    // qna중에 번호 랜덤으로 뽑아오기
    const qnaNumber = qna.map(q => q.id);
    const randomQnaNumber = qnaNumber[Math.floor(Math.random() * qnaNumber.length)];

    // blacklist중에 번호 랜덤으로 뽑아오기
    const blacklistNumber = blacklist.map(b => b.id);
    const randomBlacklistNumber = blacklistNumber[Math.floor(Math.random() * blacklistNumber.length)];

    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow ">
            <div className="d-flex position-absolute right-0">
                <div className="dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" onClick={handleToggleDropdown} aria-haspopup="true" aria-expanded={dropdownOpen}>
                        <NotificationsIcon />
                        <div className='flex justify-center items-center'>
                        <span className="badge badge-danger badge-counter">{qna.length + blacklist.length}</span>
                        </div>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="alertsDropdown" style={{ display: dropdownOpen ? 'block' : 'none' }}>
                        <a className="dropdown-item" onClick={() => router.push(`/admin/bbs/qna/view/${randomQnaNumber}`)}>미답변 {qna.length}개 있습니다</a>
                        <a className="dropdown-item" onClick={() => router.push(`/admin/blackList/view/${randomBlacklistNumber}`)}>신고대기 {blacklist.length}개 있습니다</a>
                    </div>
                </div>
                <div className="dropdown no-arrow">
                    <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" onClick={handleToggleDropdown2} aria-haspopup="true" aria-expanded={dropdownOpen2}>
                        <SettingsIcon />
                    </a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="messagesDropdown" style={{ display: dropdownOpen2 ? 'block' : 'none' }}>
                        <a className="dropdown-item" href="#">관리자 설정</a>
                        <a className="dropdown-item" href="#">로그아웃</a>
                    </div>
                </div>
            </div>
        </nav>
    );
}