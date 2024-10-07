'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompanyInfo = ({params}) => {
  const [companyInfo, setCompanyInfo] = useState(null);
  useEffect(() => {
    getCompanyInfo();
  }, []);
  function getCompanyInfo() {
    axios.get(`/api/company/${params.coIdx}`).then((res) => {
      console.log(res.data);
      setCompanyInfo(res.data);
    });
  }
  if (!companyInfo) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center">
        <div>{companyInfo.coName}</div>
        <div>
          {[...Array(5)].map((_, index) => (
            <span key={index} className="text-yellow-400 text-2xl">
              {index < Math.round(companyInfo.coScore) ? '★' : '☆'}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold mb-4">기업정보</h2>
          <div>주소: {companyInfo.coAddr}</div>
          <div>전화번호: {companyInfo.coTel}</div>
          <div>직원수: {companyInfo.coEmployee}</div>
          <div>매출: {companyInfo.coSales ? `${Math.floor(companyInfo.coSales / 100000000) > 0 ? `${Math.floor(companyInfo.coSales / 100000000)}억 ` : ''}${Math.floor((companyInfo.coSales % 100000000) / 10000) > 0 ? `${Math.floor((companyInfo.coSales % 100000000) / 10000)}만원` : ''}`.trim() || '정보 없음' : '정보 없음'}</div>
          <div>설립일: {companyInfo.coOpen}</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold mb-4">Manager Information</h2>
          <div>Name: {companyInfo.coManagerName}</div>
          <div>Phone: {companyInfo.coManagerTel}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Company Image</h2>
        <div className="bg-gray-200 aspect-square w-full">
          <img src={`s3/${companyInfo.coImgUrl}`} alt={companyInfo.coName} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
