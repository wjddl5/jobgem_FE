'use client'
import { useState } from 'react';

export default function BusinessReg() {
  const [formData, setFormData] = useState({
    businessNumber: '',
    companyName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    agreement: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">사업자 등록번호</label>
        <input
          type="text"
          name="businessNumber"
          value={formData.businessNumber}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="사업자 등록번호를 입력하세요"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">회사명</label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="회사명을 입력하세요"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">담당자 이름</label>
        <input
          type="text"
          name="contactName"
          value={formData.contactName}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="담당자 이름을 입력하세요"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">담당자 이메일</label>
        <input
          type="email"
          name="contactEmail"
          value={formData.contactEmail}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="담당자 이메일을 입력하세요"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">담당자 전화번호</label>
        <input
          type="text"
          name="contactPhone"
          value={formData.contactPhone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="담당자 전화번호를 입력하세요"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">
          <input
            type="checkbox"
            name="agreement"
            checked={formData.agreement}
            onChange={handleChange}
            className="mr-2"
          />
          개인정보 수집 및 이용에 동의합니다.
        </label>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        가입하기
      </button>
    </form>
  );
}