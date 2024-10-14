"use client";

import React, { useState, useRef, useEffect } from 'react';
import Script from 'next/script';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { getToken } from '@/app/util/token/token';
export default function CompanyMyPage() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCompanyImage, setSelectedCompanyImage] = useState(null);
  const [login, setLogin] = useState(null); // 초기값을 null로 설정
  const [companyData, setCompanyData] = useState({
    coName: '',
    coType: '',
    coManagerName: '',
    coManagerTel: '',
    coTel: '',
    coAddress: '',
    coEmployee: '',
    coOpen: '',
    coSales: '',
    coThumbimgUrl: '',
    coImgUrl: '',
  });
  const [address, setAddress] = useState('');
  const id = 1;

  

  useEffect(() => {
    getToken().then((res) => {
      setLogin(res.IDX); // login 값 설정
      console.log(res);
  });
    daumPostcode();
  }, []);
  useEffect(() => {
    if (login !== null) {
        getCompanyData();
    }
}, [login]);
  function daumPostcode() {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }
  function getCompanyData() {
    axios.get(`/api/company/${login}`)
      .then((res) => {
        console.log(res);
        setCompanyData(res.data);
        setAddress(res.data.coAddress)
        document.getElementById('coName').innerText = res.data.coName;
        document.getElementById('coType').innerText = res.data.coType;
      })
  }
  const handleImageClick = () => { 
    fileInputRef.current.click();
    console.log(imagePreview);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setCompanyData(prevData => ({ ...prevData, coThumbimgUrl: file.name }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleCompanyImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedCompanyImage(file);
      setCompanyData(prevData => ({ ...prevData, coImgUrl: file.name }));
    }
  };
  const handleAddressClick = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setAddress(data.address);
      }
    }).open();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData(prevData => {
      const newData = { ...prevData, [name]: value };
      return newData;
    });
  };

  const handleCompanyImageClick = () => {
    document.getElementById('companyImage').click();
  };
  const handleSubmit = () => {
    if (selectedFile) {
    const formData = new FormData();
    formData.append('file', selectedFile);
    axios.post(`/api/files/upload`, formData);
    }
    if (selectedCompanyImage) {
    const formData = new FormData();
    formData.append('file', selectedCompanyImage);
    axios.post(`/api/files/upload`, formData);
    }
    axios.put(`/api/company`, companyData)
      .then((res) => {
        console.log(res);
        router.push('/company');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center mb-8">
        <div className="mr-6 relative cursor-pointer" onClick={handleImageClick}>
          <div className="w-24 h-24 relative overflow-hidden rounded-full bg-gray-200">
            <img
              src={imagePreview || (companyData.coThumbimgUrl ? `/s3/${companyData.coThumbimgUrl}` : "/path/to/default-logo.jpg")}
              alt="Company Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity">
            <span className="text-white text-sm">변경</span>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
          />
        </div>
        <div>
          <h1 id="coName" className="text-2xl font-bold">회사명</h1>
          <p id="coType" className="text-gray-600">기업형태: </p>
        </div>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg shadow">
        <form>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="coName" className="block mb-2 font-semibold">회사명</label>
              <input
                type="text"
                id="coName"
                name="coName"
                className="w-full p-2 border border-gray-300 rounded"
                value={companyData.coName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="coType" className="block mb-2 font-semibold">기업형태</label>
              <select id="coType" name="coType" className="w-full p-2 border border-gray-300 rounded" value={companyData.coType} onChange={handleChange}>
                <option value="">선택하세요</option>
                <option value="주식회사">주식회사</option>
                <option value="유한회사">유한회사</option>
                <option value="합명회사">합명회사</option>
                <option value="합자회사">합자회사</option>
                <option value="개인사업자">개인사업자</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="coManagerName" className="block mb-2 font-semibold">담당자 이름</label>
              <input type="text" id="coManagerName" name="coManagerName" className="w-full p-2 border border-gray-300 rounded" value={companyData.coManagerName} onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="coManagerTel" className="block mb-2 font-semibold">담당자 전화번호</label>
              <input type="tel" id="coManagerTel" name="coManagerTel" className="w-full p-2 border border-gray-300 rounded" value={companyData.coManagerTel} onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="coTel" className="block mb-2 font-semibold">전화번호</label>
              <input type="tel" id="coTel" name="coTel" className="w-full p-2 border border-gray-300 rounded" value={companyData.coTel} onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="coAddress" className="block mb-2 font-semibold">주소</label>
              <input
                type="text"
                id="coAddress"
                name="coAddress"
                value={address}
                onChange={handleChange}
                onClick={handleAddressClick}
                className="w-full p-2 border border-gray-300 rounded cursor-pointer"
                placeholder="클릭하여 주소 검색"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="coEmployee" className="block mb-2 font-semibold">직원 수</label>
              <input type="number" id="coEmployee" name="coEmployee" className="w-full p-2 border border-gray-300 rounded" value={companyData.coEmployee} onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="coOpen" className="block mb-2 font-semibold">기업창립일</label>
              <input type="date" id="coOpen" name="coOpen" className="w-full p-2 border border-gray-300 rounded" value={companyData.coOpen} onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="coSales" className="block mb-2 font-semibold">매출</label>
              <input type="number" id="coSales" name="coSales" className="w-full p-2 border border-gray-300 rounded" value={companyData.coSales} onChange={handleChange} />
            </div>
            <div className="justify-end">
              <label htmlFor="companyImage" className="block mb-2 font-semibold">기업 이미지</label>
              <div className="flex items-center">
                <button 
                  type="button" 
                  onClick={handleCompanyImageClick}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                  파일 선택
                </button>
                <span className="ml-2">{selectedCompanyImage ? selectedCompanyImage.name : companyData.coImgUrl}</span>
                <input
                  type="file"
                  id="companyImage"
                  name="companyImage"
                  accept="image/*"
                  onChange={handleCompanyImageChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>
          <button type="button" onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
            정보 수정
          </button>
        </form>
      </div>
    </div>
  );
}
