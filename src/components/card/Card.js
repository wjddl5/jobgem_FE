import React from 'react';
import Image from "next/image";

function Card({ item }) {
    const date = new Date();
    const nowDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // Get the current date without time

    const deadlineDate = new Date(item.poDeadline);

    const timeDiff = deadlineDate - nowDate;
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

    const deadlineDisplay = dayDiff > 0 ? `D-${dayDiff}` : (dayDiff === 0 ? "D-Day" : `D+${Math.abs(dayDiff)}`);

    return (
        <article className="bg-white p-6 mb-6 shadow transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl cursor-pointer border">
            <a target="_self" href="/blog/slug"
               className="absolute opacity-0 top-0 right-0 left-0 bottom-0"></a>
            <div className="relative mb-4 rounded-2xl">
                <Image
                    className="max-h-80 rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105"
                    src={`/img/1.jpg`} width={'100'} height={'100'}
                    alt="썸네일이미지" />
                <button
                    className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md z-20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5 text-red-700">
                        <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                    <span className="ml-1 text-sm text-slate-400">2</span>
                </button>

                <a className="flex justify-center items-center bg-cyan-200 bg-opacity-80 z-10 absolute top-0 left-0 w-full h-full text-gray-700 rounded-2xl opacity-0 transition-all duration-300 transform group-hover:scale-105 text-xl group-hover:opacity-100"
                   href="/blog/slug" target="_self" rel="noopener noreferrer">
                    자세히 보기
                    <svg className="ml-2 w-6 h-6" fill="none" stroke="currentColor"
                         viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                    </svg>
                </a>
            </div>
            <div className="flex justify-between items-center w-full pb-4 mb-auto">
                <div className="flex items-center">
                    <div className="pr-3">
                        <Image className="h-12 w-12 rounded-full object-cover" src={`/img/1.jpg`} width={'100'} height={'100'} alt="커버이미지" />
                    </div>
                    <div className="flex flex-1">
                        <div className="">
                            <p className="text-sm font-semibold ">공고이름</p>
                            <p className="text-sm text-gray-500">공고일자</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="text-sm flex items-center text-gray-500 ">
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor"
                             viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        남은기간
                    </div>
                </div>
            </div>
            <h3 className="font-medium text-xl leading-8">
                <a href="/blog/slug"
                   className="block relative group-hover:text-blue-700 transition-colors duration-200 ">
                    공고내용
                </a>
            </h3>
            <div>
            </div>
        </article>
    );
}

export default Card;
