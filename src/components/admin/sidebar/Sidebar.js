'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import CampaignIcon from '@mui/icons-material/Campaign';
import CommentIcon from '@mui/icons-material/Comment';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ListIcon from '@mui/icons-material/List';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
export default function Sidebar() {
	// 상태를 객체로 관리하여 여러 메뉴의 상태를 동시에 관리할 수 있도록 설정
	const [activeLink, setActiveLink] = useState({});

	// 클릭 이벤트 핸들러를 수정하여 상태를 토글할 수 있도록 함
	const handleLinkClick = (linkName) => {
		setActiveLink((prev) => ({
			//...prev,
			[linkName]: !prev[linkName],
		}));
	};

	return (
		<ul className='navbar-nav bg-gradient-primary sidebar sidebar-dark accordion' id='accordionSidebar'>
			<a className='sidebar-brand d-flex align-items-center justify-content-center' href='index.html'>
				<div className='sidebar-brand-icon rotate-n-15'>
					<i className='fas fa-laugh-wink'></i>
				</div>
				<div className='sidebar-brand-text mx-3'>
					JobGam <sup>admin</sup>
				</div>
			</a>

			<hr className='sidebar-divider my-0' />

			<li className='nav-item active'>
				<Link className='nav-link' href='/admin'>
					<DashboardIcon />
					<span style={{ marginLeft: '10px' }}>대시보드</span>
				</Link>
			</li>

			<hr className='sidebar-divider' />

			<div className='sidebar-heading'>관리</div>

			<li className='nav-item'>
				<a
					className='nav-link collapsed'
					href='#'
					onClick={() => handleLinkClick('collapseOne')}
					data-toggle='collapse'
					data-target='#collapseOne'
					aria-expanded={activeLink['collapseOne']}
					aria-controls='collapseOne'
				>
					<PersonIcon />
					<span style={{ marginLeft: '10px' }}>회원관리</span>
					<ExpandMoreIcon style={{ transform: activeLink['collapseOne'] ? 'rotate(180deg)' : 'rotate(0deg)' }} className='ml-auto' />
				</a>
				<div id='collapseOne' className={`collapse ${activeLink['collapseOne'] ? 'show' : ''}`} style={{ visibility: 'visible' }} aria-labelledby='headingOne' data-parent='#accordionSidebar'>
					<div className='bg-white py-2 collapse-inner rounded'>
						<h6 className='collapse-header'>회원관리:</h6>
						<a className='collapse-item' href='/admin/member'>
							회원 리스트
						</a>
						<a className='collapse-item' href='/admin/member/black'>
							블랙 리스트
						</a>
					</div>
				</div>
			</li>

			{/* 기업관리 */}
			<li className='nav-item'>
				<a
					className='nav-link collapsed'
					href='#'
					onClick={() => handleLinkClick('collapseTwo')}
					data-toggle='collapse'
					data-target='#collapseTwo'
					aria-expanded={activeLink['collapseTwo']}
					aria-controls='collapseTwo'
				>
					<BusinessIcon />
					<span style={{ marginLeft: '10px' }}>기업관리</span>
					<ExpandMoreIcon style={{ transform: activeLink['collapseTwo'] ? 'rotate(180deg)' : 'rotate(0deg)' }} className='ml-auto' />
				</a>
				<div id='collapseTwo' className={`collapse ${activeLink['collapseTwo'] ? 'show' : ''}`} style={{ visibility: 'visible' }} aria-labelledby='headingTwo' data-parent='#accordionSidebar'>
					<div className='bg-white py-2 collapse-inner rounded'>
						<h6 className='collapse-header'>기업관리:</h6>
						<a className='collapse-item' href='/admin/company'>
							기업 리스트
						</a>
						<a className='collapse-item' href='/admin/company/black'>
							블랙 기업 리스트
						</a>
					</div>
				</div>
			</li>

			{/* 공고관리 */}
			<li className='nav-item'>
				<a
					className='nav-link collapsed'
					href='#'
					onClick={() => handleLinkClick('collapseThree')}
					data-toggle='collapse'
					data-target='#collapseThree'
					aria-expanded={activeLink['collapseThree']}
					aria-controls='collapseThree'
				>
					<CampaignIcon />
					<span style={{ marginLeft: '10px' }}>공고관리</span>
					<ExpandMoreIcon style={{ transform: activeLink['collapseThree'] ? 'rotate(180deg)' : 'rotate(0deg)' }} className='ml-auto' />
				</a>
				<div id='collapseThree' className={`collapse ${activeLink['collapseThree'] ? 'show' : ''}`} style={{ visibility: 'visible' }} aria-labelledby='headingThree' data-parent='#accordionSidebar'>
					<div className='bg-white py-2 collapse-inner rounded'>
						<h6 className='collapse-header'>공고관리:</h6>
						<a className='collapse-item' href='/admin/post'>
							공고 관리
						</a>
						<a className='collapse-item' href='/admin/post/chart'>
							공고 통계
						</a>
					</div>
				</div>
			</li>

			{/* 게시판 관리 */}
			<li className='nav-item'>
				<a
					className='nav-link collapsed'
					href='#'
					onClick={() => handleLinkClick('collapseFour')}
					data-toggle='collapse'
					data-target='#collapseFour'
					aria-expanded={activeLink['collapseFour']}
					aria-controls='collapseFour'
				>
					<CommentIcon />
					<span style={{ marginLeft: '10px' }}>게시판 관리</span>
					<ExpandMoreIcon style={{ transform: activeLink['collapseFour'] ? 'rotate(180deg)' : 'rotate(0deg)' }} className='ml-auto' />
				</a>
				<div id='collapseFour' className={`collapse ${activeLink['collapseFour'] ? 'show' : ''}`} style={{ visibility: 'visible' }} aria-labelledby='headingFour' data-parent='#accordionSidebar'>
					<div className='bg-white py-2 collapse-inner rounded'>
						<h6 className='collapse-header'>게시판 관리:</h6>
						<a className='collapse-item' href='/admin/bbs/notice/list'>
							공지사항
						</a>
						<a className='collapse-item' href='/admin/bbs/qna/list'>
							QnA
						</a>
					</div>
				</div>
			</li>

			{/* 카테고리 관리 */}
			<li className='nav-item'>
				<a
					className='nav-link collapsed'
					href='/admin/category'
					onClick={() => {
						handleLinkClick('collapseSeven');
						removeSession();
					}}
					data-toggle='collapse'
					data-target='#collapseSeven'
					aria-expanded={activeLink['collapseSeven']}
					aria-controls='collapseSeven'
				>
					<ListIcon />
					<span style={{ marginLeft: '10px' }}>카테고리 관리</span>
				</a>
			</li>

			{/* 신고 관리 */}
			<li className='nav-item'>
				<a
					className='nav-link collapsed'
					href='/admin/blackList/list'
					onClick={() => handleLinkClick('collapseSeven')}
					data-toggle='collapse'
					data-target='#collapseSeven'
					aria-expanded={activeLink['collapseSeven']}
					aria-controls='collapseSeven'
				>
					<ReportProblemIcon />
					<span style={{ marginLeft: '10px' }}>신고 관리</span>
				</a>
			</li>

			<hr className='sidebar-divider d-none d-md-block' />

			<div className='text-center d-none d-md-inline'>
				<button className='rounded-circle border-0' id='sidebarToggle'></button>
			</div>
		</ul>
	);
}
