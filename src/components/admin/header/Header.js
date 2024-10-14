'use client';
import React, { useEffect, useState } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { qnaState, blacklistState } from '../alert/atom';

export default function Header() {
	const router = useRouter();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [dropdownOpen2, setDropdownOpen2] = useState(false);
	const [qna, setQna] = useRecoilState(qnaState);
	const [blacklist, setBlacklist] = useRecoilState(blacklistState);
	useEffect(() => {
		axios
			.get('/api/admin/unanswered-questions')
			.then((res) => setQna(res.data))
			.catch((error) => console.error('Error fetching QnA:', error));
		axios
			.get('/api/admin/pending-blacklist')
			.then((res) => setBlacklist(res.data))
			.catch((error) => console.error('Error fetching blacklist:', error));
	}, []);
	const handleToggleDropdown = () => {
		setDropdownOpen2(false);
		setDropdownOpen((prev) => !prev);
	};

	const handleToggleDropdown2 = () => {
		setDropdownOpen(false);
		setDropdownOpen2((prev) => !prev);
	};

	const handleButtonClick = () => {
		const URL = '/api/logout';

		const logout = async () => {
			try {
				const result = await axios.get(URL);
				if (result.status == 200) {
					router.push('/');
					setIsToken(false);
				}
			} catch {}
		};

		logout();
	};
	return (
		<nav className='navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow '>
			<div className='d-flex position-absolute right-0'>
				<div className='dropdown no-arrow'>
					<a className='nav-link dropdown-toggle' href='#' id='alertsDropdown' role='button' onClick={handleToggleDropdown} aria-haspopup='true' aria-expanded={dropdownOpen}>
						<NotificationsIcon />
						<div className='flex justify-center items-center'>
							{qna.length + blacklist.length > 0 ? <span className='badge badge-danger badge-counter'>{qna.length + blacklist.length}</span> : null}
						</div>
					</a>
					{qna.length > 0 || blacklist.length > 0 ? (
						<div className='dropdown-menu dropdown-menu-right' aria-labelledby='alertsDropdown' style={{ display: dropdownOpen ? 'block' : 'none', maxHeight: '300px', overflowY: 'auto' }} onMouseLeave={() => setDropdownOpen(false)}>
							<div className='dropdown-header' style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#333' }}>
								미답변: {qna.length} &nbsp;신고대기: {blacklist.length}
							</div>
							<div className='dropdown-divider'></div>
							{qna.map((q, index) => (
								<a className='dropdown-item d-flex align-items-center' key={index} onClick={() => { router.push(`/admin/bbs/qna/view/${q.id}`); }}>
									<div className='mr-3'>
										<div className='icon-circle bg-primary'>
												<i className='fas fa-question text-white'></i>
										</div>
									</div>
									<div>
										<div className='small text-gray-500'>{q.boWritedate}</div>
										<span className='font-weight-bold'>
											{q.boTitle} <span className='badge badge-info'>미답변</span>
										</span>
									</div>
								</a>
							))}
							{blacklist.map((b, index) => (
								<a className='dropdown-item d-flex align-items-center' key={index} onClick={() => { router.push(`/admin/blackList/view/${b.id}`); }}>
									<div className='mr-3'>
										<div className='icon-circle bg-warning'>
											<i className='fas fa-exclamation-triangle text-white'></i>
										</div>
									</div>
									<div>
										<div className='small text-gray-500'>{b.blDate}</div>
										<span className='font-weight-bold'>
											{b.blTitle} <span className='badge badge-warning'>신고대기</span>
										</span>
									</div>
								</a>
							))}
						</div>
					) : null}
				</div>
				<div className='dropdown no-arrow'>
					<a className='nav-link dropdown-toggle' href='#' id='messagesDropdown' role='button' onClick={handleToggleDropdown2} aria-haspopup='true' aria-expanded={dropdownOpen2}>
						<SettingsIcon />
					</a>
					<div className='dropdown-menu dropdown-menu-right' aria-labelledby='messagesDropdown' style={{ display: dropdownOpen2 ? 'block' : 'none' }} onMouseLeave={() => setDropdownOpen2(false)}>
						<a className='dropdown-item' href='/admin/myPage'>
							관리자 설정
						</a>
						<a className='dropdown-item' onClick={handleButtonClick}>
							로그아웃
						</a>
					</div>
				</div>
			</div>
		</nav>
	);
}
