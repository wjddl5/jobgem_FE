"use client"

import { Divider } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function SearchIdPage() {

    const [selectedOption, setSelectedOption] = useState('');
    const [name, setName] = useState('');
    const [phone1, setPhone1] = useState('');
    const [phone2, setPhone2] = useState('');
    const [phone3, setPhone3] = useState('');
    const [company, setCompany] = useState('');
    const [businessNumber, setBusinessNumber] = useState('');

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const getJobseekerId = async (formData) => {
        try {
            const response = await axios.get('/api/jobseeker/search/id', {
                params: {
                    joName: formData.name,
                    joTel: formData.phone1 + formData.phone2 + formData.phone3,
                }
            });
            alert(`아이디는 ${response.data} 입니다.`);
            window.location.href = '/login';
        } catch (error) {
            alert('존재하지 않는 회원입니다.');
        }
    };

    const getCompanyId = async (formData) => {
        try {
            const response = await axios.get('/api/company/search/id', {
                params: {
                    coName: formData.company,
                    coNumber: formData.businessNumber,
                }
            });
            alert(`아이디는 ${response.data} 입니다.`);
            window.location.href = '/login';    
        } catch (error) {
            alert('존재하지 않는 회원입니다.');
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedOption === 'individual') {
            if (name === '' || phone1 === '' || phone2 === '' || phone3 === '') {
                alert('모든 항목을 입력해주세요.');
                return;
            }
            const formData = {
                name: name,
                phone1: phone1,
                phone2: phone2,
                phone3: phone3,
            };
            getJobseekerId(formData);
        } else if (selectedOption === 'business') {
            if (company === '' || businessNumber === '') {
                alert('모든 항목을 입력해주세요.');
                return;
            }
            const formData = {
                company: company,
                businessNumber: businessNumber,
            };
            getCompanyId(formData);
        }
    };

    return (
        <div className="justify-center items-center">
            <div>
                <h1 className="text-2xl font-bold mb-6">아이디 찾기</h1>
                <p className="mb-4 text-gray-600">회원 구분별로 가입 시 입력한 본인정보를 입력해 주세요.</p>
            </div>
            <div className="flex border p-4">
                <form className="px-8 pt-6 pb-8 mb-4 w-1/2">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">개인회원</h2>
                        <div className="flex items-center mb-4">
                            <input type="radio" value="individual" checked={selectedOption === 'individual'} onChange={handleRadioChange} />
                            <label htmlFor="individual" className="mx-2"> 휴대폰 번호 인증</label>
                        </div>
                        <div className="mb-4">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                name="name"
                                placeholder="이름"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="휴대폰 번호"
                                name="phone1"
                                maxLength={3}
                                onChange={(e) => setPhone1(e.target.value)}
                            />
                            <label className="mx-3">-</label>
                            <input
                                className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                name="phone2"
                                maxLength={4}
                                onChange={(e) => setPhone2(e.target.value)}
                            />
                            <label className="mx-3">-</label>
                            <input
                                className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                name="phone3"
                                maxLength={4}
                                onChange={(e) => setPhone3(e.target.value)}
                            />
                        </div>
                    </div>
                </form>
                <Divider orientation="vertical" flexItem />
                <form className="px-8 pt-6 pb-8 mb-4 w-1/2">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">기업회원</h2>
                        <div className="flex items-center mb-4">
                            <input type="radio" value="business" checked={selectedOption === 'business'} onChange={handleRadioChange} />
                            <label htmlFor="business" className="mx-2">사업자 번호 인증</label>
                        </div>
                        <div className="mb-4">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="company"
                                type="text"
                                placeholder="기업명"
                                onChange={(e) => setCompany(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="businessNumber"
                                type="text"
                                maxLength={10}
                                placeholder="사업자 등록 번호"
                                onChange={(e) => setBusinessNumber(e.target.value)}
                            />
                        </div>
                    </div>
                </form>
            </div>
            <div className="flex justify-center items-center mt-10">
                <button className="text-lg p-3 bg-blue-500 text-white rounded " onClick={handleSubmit}>아이디 찾기</button>
            </div>
        </div>
    )
}
