import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const ApplicationPeriodMethod = React.forwardRef(({ posting, timeLeft, send, location, center }, ref) => {
    return (
        <>
            <h2 ref={ref} className='text-2xl font-bold mb-4'>접수기간/방법</h2>
            <div className='bg-white shadow-md p-6 mb-8 flex '>
                <div className='w-1/4 pr-4 border-r border-gray-200'>
                    <div className='flex flex-col items-center mb-4'>
                        <svg className='w-6 h-6 mb-2 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'></path>
                        </svg>
                        <h3 className='text-xl font-semibold mb-2'>남은시간</h3>
                        <div className='text-center'>
                            <p className='text-2xl font-bold text-red-500'>{timeLeft}</p>
                        </div>
                    </div>
                    <div className='flex flex-col mb-4'>
                        <div className='flex flex-col items-center justify-center mb-2'>
                            <div className='text-center mb-2'>
                                <p className='text-gray-600'>시작일</p>
                                <p className='font-medium'>{posting && posting.poDate}</p>
                            </div>
                            <div className='text-center'>
                                <p className='text-gray-600'>마감일</p>
                                <p className='font-medium'>{posting && posting.poDeadline}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-3/4 pl-4 border-l border-gray-200'>
                    <div className='flex justify-between pl-4 border-b-2 border-black pb-4 mb-4'>
                        <div>
                            <h3 className='text-xl font-semibold mb-2'>지원방법</h3>
                            <p className='text-gray-600'>아래 지원 방법 중 하나를 선택하세요</p>
                        </div>
                    </div>

                    <div className='space-y-4'>
                        {posting && posting.poSubType.includes("jobgem") && (
                            <div className='flex justify-between items-center p-3 bg-gray-100 rounded'>
                                <p className='text-gray-600'>잡잼지원</p>
                                <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600' onClick={send}>
                                    바로지원
                                </button>
                            </div>
                        )}
                        {posting && posting.poSubType.includes("email") && (
                            <div className='flex justify-between items-center p-3 bg-gray-100 rounded'>
                                <p className='text-gray-600'>이메일: {posting.poEmail}</p>
                                <span>
                                    <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600' onClick={() => window.location.href = `mailto:${posting.poEmail}`}>
                                        이메일 지원
                                    </button>
                                </span>
                            </div>
                        )}
                        {posting && posting.poSubType.includes("fax") && (
                            <div className='flex justify-between items-center p-3 bg-gray-100 rounded'>
                                <p className='text-gray-600'>팩스: {posting.poFax}</p>
                            </div>
                        )}
                        {posting && posting.poSubType.includes("post") && (
                            <div className='flex justify-between items-center p-3 bg-gray-100 rounded'>
                                <p className='text-gray-600'>우편: {posting.poAddr}</p>
                            </div>
                        )}
                        {posting && posting.poSubType.includes("visit") && (
                            <div className='flex flex-col items-start p-3 bg-gray-100 rounded'>
                                <p className='text-gray-600 mb-2'>방문: {posting.poAddr}</p>
                                <Map
                                    id="map"
                                    center={center}
                                    style={{
                                    width: "100%",
                                    height: "350px",
                                    }}
                                    level={3}
                                    draggable = {false}
                                >
                                <MapMarker position={location} />
                                </Map>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
});

ApplicationPeriodMethod.displayName = 'ApplicationPeriodMethod';

export default ApplicationPeriodMethod;