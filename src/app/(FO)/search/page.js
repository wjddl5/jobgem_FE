"use client"

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from 'react';

const TabButton = ({ children, isActive, onClick }) => (
  <button
    className={`px-4 py-2 ${isActive ? 'border-b-2 border-blue-500' : ''}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const JobListing = ({ job }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div>
      <div className="border-b pb-4 ">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg mb-1">{job.company}</h3>
            <h4 className="text-blue-600 mb-2">{job.title}</h4>
            <div className="text-sm text-gray-600 space-x-2">
              <span>{job.type}</span>
              <span>{job.education}</span>
              <span>{job.location}</span>
              {job.area && <span>{job.area}</span>}
              <span className="text-red-500">{job.deadline}</span>
            </div>
            {job.tags && (
              <div className="mt-2 space-x-2">
                {job.tags.map((tag, index) => (
                  <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col items-end">
            <button
              className={`text-gray-400 ${isFavorite ? 'text-red-500' : ''}`}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              {isFavorite ? <FavoriteIcon className="h-4 w-4" /> : <FavoriteBorderIcon className="h-4 w-4" />}
            </button>
            {job.isHot && <span className="text-red-500 text-sm">즉시지원</span>}
            {job.isHomepage && <span className="text-blue-500 text-sm">홈페이지 지원</span>}
          </div>
        </div>
      </div>
    </div>

  );
};

const JobListings = () => {
  const [activeTab, setActiveTab] = useState('채용정보');
  const [sortOrder, setSortOrder] = useState('관련도순');

  const jobListings = [
    {
      company: "(주)하이디어아카데미",
      title: "[전액무료IT개발자취업생모집]JAVA개발자/풀스택개발자/AI서비스개발자",
      type: "신입/경력",
      education: "학력무관",
      location: "연수생/교육생",
      deadline: "D-14",
      isHot: true
    },
    {
      company: "유코카캐리어스(주)",
      title: "2024 하반기 EUKOR Car Carriers 신입사원 채용",
      type: "신입",
      location: "대졸↑",
      region: "경규직",
      area: "서울 종로구",
      deadline: "D-9",
      tags: ["경조사 지원", "자기 교육비 지원", "재택근무", "복지포인트"],
      isHomepage: true
    },
    {
      company: "(주)세종교육",
      title: "[IT취업률100프로]개발자 채용연계(국내/일본, 수도권무료숙식 제공/비전공자...",
      type: "신입/경력",
      education: "학력무관",
      location: "연수생/교육생",
      area: "경기 성남시 외",
      deadline: "D-26",
      isHot: true
    },
    {
      company: "휴먼교육센터",
      title: "[전액무료 IT취업] 파이썬/데이터분석/인공지능/풀스택(무료숙식제공)",
      type: "신입/경력",
      education: "학력무관",
      location: "연수생/교육생",
      area: "서울 영등포구 외",
      deadline: "D-3",
      isHot: true
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <div>
          <TabButton isActive={activeTab === '채용정보'} onClick={() => setActiveTab('채용정보')}>채용정보</TabButton>
          <TabButton isActive={activeTab === '기업정보'} onClick={() => setActiveTab('기업정보')}>기업정보</TabButton>
          <TabButton isActive={activeTab === '알바몬공고'} onClick={() => setActiveTab('알바몬공고')}>알바몬 공고</TabButton>
        </div>
        <div className="text-orange-500 font-bold">
          지원가능 공고 <span className="text-2xl">52</span>건 
        </div>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <div>'Java' 검색 결과 총 3,653건</div>
        <div className="flex items-center space-x-2">
          <select
            className="border rounded p-1"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option>관련도순</option>
            <option>최신순</option>
            <option>마감임박순</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {jobListings.map((job, index) => (
          <JobListing key={index} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobListings;