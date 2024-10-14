"use client"

import { Divider } from "@mui/material"


export default function SearchPwPage() {

    return (
        <div className="justify-center items-center">
            <div>
                <h1 className="text-2xl font-bold mb-6">비밀번호 찾기</h1>
                <p className="mb-4 text-gray-600">회원 구분별로 가입 시 입력한 본인정보를 입력해 주세요.</p>
            </div>
            <div className="flex border p-4">
                <form className="px-8 pt-6 pb-8 mb-4 w-1/2">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">개인회원</h2>
                        <div className="flex items-center mb-4">
                            <input type="radio" />
                            <label htmlFor="individual" className="mx-2"> 휴대폰 번호 인증</label>
                        </div>
                        <div className="mb-4">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="이름"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="이메일"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="휴대폰 번호"
                            />
                            <label className="mx-3">-</label>
                            <input
                                className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                            />
                            <label className="mx-3">-</label>
                            <input
                                className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                            />
                        </div>
                    </div>
                </form>
                <Divider orientation="vertical" flexItem />
                <form className="px-8 pt-6 pb-8 mb-4 w-1/2">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">기업회원</h2>
                        <div className="flex items-center mb-4">
                            <input type="radio" />
                            <label htmlFor="individual" className="mx-2">사업자 번호 인증</label>
                        </div>
                        <div className="mb-4">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="기업명"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="이메일"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="사업자 등록 번호"
                            />
                        </div>
                    </div>
                </form>
            </div>
            <div className="flex justify-center items-center mt-10">
                <button className="text-lg p-3 bg-blue-500 text-white rounded ">비밀번호 찾기</button>
            </div>

        </div>
    )
}