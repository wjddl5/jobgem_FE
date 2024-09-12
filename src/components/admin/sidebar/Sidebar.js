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
			...prev,
			[linkName]: !prev[linkName],
		}));
	};

	function removeSession() {
		sessionStorage.removeItem('searchType');
		sessionStorage.removeItem('searchValue');
		sessionStorage.removeItem('selectType');
	}

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
						<a className='collapse-item' href='/admin/member' onClick={removeSession}>
							회원 리스트
						</a>
						<a className='collapse-item' href='/admin/member/black' onClick={removeSession}>
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
							{' '}
							onClick={removeSession}
							기업 리스트
						</a>
						<a className='collapse-item' href='/admin/company/black' onClick={removeSession}>
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
						<a className='collapse-item' href='/admin/post' onClick={removeSession}>
							공고 관리
						</a>
						<a className='collapse-item' href='/admin/post/chart' onClick={removeSession}>
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
						<a className='collapse-item' href='/admin/bbs/notice/list' onClick={removeSession}>
							공지사항
						</a>
						<a className='collapse-item' href='/admin/bbs/qna/list' onClick={removeSession}>
							QnA
						</a>
					</div>
				</div>
			</li>

			{/* 고객지원 */}
			<li className='nav-item'>
				<a
					className='nav-link collapsed'
					href='#'
					onClick={() => handleLinkClick('collapseFive')}
					data-toggle='collapse'
					data-target='#collapseFive'
					aria-expanded={activeLink['collapseFive']}
					aria-controls='collapseFive'
				>
					<HeadsetMicIcon />
					<span style={{ marginLeft: '10px' }}>고객지원</span>
					<ExpandMoreIcon style={{ transform: activeLink['collapseFive'] ? 'rotate(180deg)' : 'rotate(0deg)' }} className='ml-auto' />
				</a>
				<div id='collapseFive' className={`collapse ${activeLink['collapseFive'] ? 'show' : ''}`} style={{ visibility: 'visible' }} aria-labelledby='headingFive' data-parent='#accordionSidebar'>
					<div className='bg-white py-2 collapse-inner rounded'>
						<h6 className='collapse-header'>고객지원:</h6>
						<a className='collapse-item' href='/question' onClick={removeSession}>
							질문 관리
						</a>
						<a className='collapse-item' href='/answer' onClick={removeSession}>
							답변 관리
						</a>
					</div>
				</div>
			</li>

			{/* 컨텐츠 관리 */}
			<li className='nav-item'>
				<a
					className='nav-link collapsed'
					href='#'
					onClick={() => handleLinkClick('collapseSix')}
					data-toggle='collapse'
					data-target='#collapseSix'
					aria-expanded={activeLink['collapseSix']}
					aria-controls='collapseSix'
				>
					<NewspaperIcon />
					<span style={{ marginLeft: '10px' }}>컨텐츠 관리</span>
					<ExpandMoreIcon style={{ transform: activeLink['collapseSix'] ? 'rotate(180deg)' : 'rotate(0deg)' }} className='ml-auto' />
				</a>
				<div id='collapseSix' className={`collapse ${activeLink['collapseSix'] ? 'show' : ''}`} style={{ visibility: 'visible' }} aria-labelledby='headingSix' data-parent='#accordionSidebar'>
					<div className='bg-white py-2 collapse-inner rounded'>
						<h6 className='collapse-header'>컨텐츠 관리:</h6>
						<a className='collapse-item' href='/content/job' onClick={removeSession}>
							취업 정보 관리
						</a>
						<a className='collapse-item' href='/content/news' onClick={removeSession}>
							뉴스 업데이트
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

			{/* <li className='nav-item'>
				<a
					className='nav-link collapsed'
					href='#'
					onClick={() => handleLinkClick('collapseEight')}
					data-toggle='collapse'
					data-target='#collapseEight'
					aria-expanded={activeLink['collapseEight'] || activeLink['collapseNine'] || activeLink['collapseTen']}
					aria-controls='collapseEight'
				>
					<ListIcon />
					<span style={{ marginLeft: '10px' }}>카테고리 관리</span>
					<ExpandMoreIcon style={{ transform: activeLink['collapseEight'] || activeLink['collapseNine'] || activeLink['collapseTen'] ? 'rotate(180deg)' : 'rotate(0deg)' }} className='ml-auto' />
				</a>
				<div id='collapseEight' className={`collapse ${activeLink['collapseEight'] ? 'show' : ''}`} style={{ visibility: 'visible' }} aria-labelledby='headingEight' data-parent='#accordionSidebar'>
					<a
						className='nav-link collapsed'
						href='#'
						onClick={() => handleLinkClick('collapseNine')}
						data-toggle='collapse'
						data-target='#categoryOne'
						aria-expanded={activeLink['collapseNine']}
						aria-controls='categoryOne'
					>
						<SearchIcon />
						<span>검색 카테고리 관리</span>
					</a>
					<div
						id='categoryOne'
						className={`collapse ${activeLink['collapseNine'] ? 'show' : ''}`}
						style={{ visibility: 'visible' }}
						aria-labelledby='headingcategoryOne'
						data-parent='#accordionSidebar'
					>
						<div className='bg-white py-2 collapse-inner rounded'>
							<h6 className='collapse-header'>검색 카테고리 관리:</h6>
							<a className='collapse-item' href='/category'>
								구직자
							</a>
							<a className='collapse-item' href='/category'>
								기업
							</a>
						</div>
					</div>
					<a
						className='nav-link collapsed'
						href='#'
						onClick={() => handleLinkClick('collapseTen')}
						data-toggle='collapse'
						data-target='#categoryTwo'
						aria-expanded={activeLink['collapseTen']}
						aria-controls='categoryTwo'
					>
						<SettingsIcon />
						<span>핵심역량 카테고리 관리</span>
					</a>
					<div
						id='categoryTwo'
						className={`collapse ${activeLink['collapseTen'] ? 'show' : ''}`}
						style={{ visibility: 'visible' }}
						aria-labelledby='headingcategoryTwo'
						data-parent='#accordionSidebar'
					>
						<div className='bg-white py-2 collapse-inner rounded'>
							<h6 className='collapse-header'>핵심역량 카테고리 관리:</h6>
							<a className='collapse-item' href='/skill/job'>
								구직자
							</a>
							<a className='collapse-item' href='/skill/company'>
								기업
							</a>
						</div>
					</div>
				</div>
			</li> */}

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
					{/* <ExpandMoreIcon className='ml-auto' /> */}
					{/*style={{ transform: activeLink['collapseSeven'] ? 'rotate(180deg)' : 'rotate(0deg)' }} */}
				</a>
				{/* <div id='collapseSeven' className={`collapse ${activeLink['collapseSeven'] ? 'show' : ''}`} style={{ visibility: 'visible' }} aria-labelledby='headingSeven' data-parent='#accordionSidebar'> */}
				{/* <div className='bg-white py-2 collapse-inner rounded'>
						<h6 className='collapse-header' href='/report/member'>
							신고 관리
						</h6>
						<a className="collapse-item" href="/report/member">회원 신고</a>
                        <a className="collapse-item" href="/report/company">기업 신고</a>
					</div> */}
				{/* </div> */}
			</li>

			<hr className='sidebar-divider d-none d-md-block' />

			<div className='text-center d-none d-md-inline'>
				<button className='rounded-circle border-0' id='sidebarToggle'></button>
			</div>
		</ul>
	);
}
