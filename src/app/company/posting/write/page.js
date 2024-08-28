'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';

export default function ApplicationForm() {
    useKakaoLoader({
        appkey: "50d846af06392a3886e7875ff3d64eca",
        libraries: ["services","clusterer"]
    })


    let today = new Date();
    /* 접수기간 */
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedPeriod, setSelectedPeriod] = useState(1);



    /* 접수방법 */
    const [jobjam, setJobjam] = useState(false);
    const [homepage, setHomepage] = useState(false);
    const [mail, setMail] = useState(false);
    const [fax, setFax] = useState(false);
    const [post, setPost] = useState(false);
    const [visit, setVisit] = useState(false);

    /* 홈페이지 */
    const [homepageUrl, setHomepageUrl] = useState('https://career.doodlin.co.kr/o/');

    /* 이메일 */
    const [emailDomain, setEmailDomain] = useState('직접입력');

    /* 위치 */
    const [location, setLocation] = useState({
        lat: 33.450701,
        lng: 126.570667
    });
    const [address, setAddress] = useState('');
    const [center, setCenter] = useState({
        lat: 33.450701,
        lng: 126.570667
    });

    /* 추가 필드 */
    const [poTitle, setPoTitle] = useState('');
    const [poContent, setPoContent] = useState('');
    const [poEdu, setPoEdu] = useState('');
    const [poImgUrl, setPoImgUrl] = useState('');
    const [poSal, setPoSal] = useState('');
    const [poPrefer, setPoPrefer] = useState('');
    const [poCareer, setPoCareer] = useState('');
    const [poType, setPoType] = useState('');
    const [poWorkHour, setPoWorkHour] = useState('');
    const [poState, setPoState] = useState(0);
    const [poSubType, setPoSubType] = useState('');

    /* 접수기간 초기화*/
    useEffect(() => {
        const today = new Date();
        const formattedToday = today.toISOString().split('T')[0];
        setStartDate(formattedToday);

        const newDate = new Date(today);
        newDate.setMonth(newDate.getMonth() + 2);
        setEndDate(newDate.toISOString().split('T')[0]);
    }, []);

    /* 주소 초기화*/
    useEffect(() => {
        mapApi();
    }, [location]);

    /* 주소 변경 이벤트*/
    const addressApi = () => {
        axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
            params: {
                query: `${address}`,
                page: 1,
                size: 1
            },
            headers: {
                Authorization: `KakaoAK 990c8d937be4d53cc487628c2776da49`
            }
        })
        .then(response => {
            const data = response.data.documents[0];
            setLocation({
                lat: data.y,
                lng: data.x
            });
            setCenter({
                lat: data.y,
                lng: data.x
            });
        })
        .catch(error => {
            console.error('Error fetching address:', error);
        });
    };
    /* 접수기간 클릭 이벤트*/
    const handlePeriodClick = (index) => {
        const newDate = new Date(today);
        newDate.setMonth(newDate.getMonth() + index + 1);
        setStartDate(today.toISOString().split('T')[0]);
        setEndDate(newDate.toISOString().split('T')[0]);
        setSelectedPeriod(index);
    };

    /* 이메일 도메인 변경 이벤트*/
    const handleEmailDomainChange = (e) => {
        if(e.target.value === '직접입력') {
            setEmailDomain('');
        } else {
            setEmailDomain(e.target.value);
        }
    };
    /* 주소 변경 이벤트*/
    const mapApi = async () => {
        try {
            const response = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json`, {
                params: {
                    x: location.lng,
                    y: location.lat,
                    input_coord: 'WGS84'
                },
                headers: {
                    Authorization: `KakaoAK 990c8d937be4d53cc487628c2776da49`
                }
            });
            setAddress(response.data.documents[0].address.address_name);
            console.log(address);
        } catch (error) {
            console.error('Error fetching address:', error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white  rounded-lg">
            <h1 className="text-2xl font-bold mb-2">채용공고 작성</h1>
            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">채용공고 제목*</label>
                <input type="text" className="w-full border rounded px-3 py-2" />
                <label className="block text-sm font-medium text-gray-700 mb-2">채용공고 내용*</label>
                <textarea className="w-full border rounded px-3 py-2 h-[300px]"></textarea>
            </div>
            <h1 className="text-2xl font-bold mb-2">채용 정보</h1>
            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">채용 학력*</label>
                <input type="text" className="w-full border rounded px-3 py-2" />
                <label className="block text-sm font-medium text-gray-700 mb-2">채용 경력*</label>
                <input type="text" className="w-full border rounded px-3 py-2" />
                <label className="block text-sm font-medium text-gray-700 mb-2">채용 직무*</label>
                <input type="text" className="w-full border rounded px-3 py-2" />
                <label className="block text-sm font-medium text-gray-700 mb-2">채용 근무형태*</label>
                <input type="text" className="w-full border rounded px-3 py-2" />
            </div>
            <h1 className="text-2xl font-bold mb-2">접수기간과 방법을 선택해주세요</h1>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">접수기간*</label>
                <div className="flex space-x-2 mb-2">
                    {['1개월', '2개월', '3개월'].map((period, index) => (
                        <button 
                            onClick={() => handlePeriodClick(index)} 
                            key={index} 
                            className={`px-3 py-1 border rounded ${index === selectedPeriod ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                        >
                            {period}
                        </button>
                    ))}
                    <button onClick={() => handlePeriodClick(-1)} className={`px-3 py-1 border rounded ${-1 === selectedPeriod ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}>상시채용</button>
                </div>
                <div className={`flex items-center space-x-2 ${selectedPeriod === -1 ? 'hidden' : ''}`}>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border rounded px-2 py-1" />
                    <span>~</span>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border rounded px-2 py-1" />
                    <select className="border rounded px-2 py-1">
                        <option>시간</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                        <option>16</option>
                        <option>17</option>
                        <option>18</option>
                        <option>19</option>
                        <option>20</option>
                        <option>21</option>
                        <option>22</option>
                        <option>23</option>
                        <option>24</option>
                    </select>
                    <select className="border rounded px-2 py-1">
                        <option>분</option>
                        <option>00</option>
                        <option>05</option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                        <option>25</option>
                        <option>30</option>
                        <option>35</option>
                        <option>40</option>
                        <option>45</option>
                        <option>50</option>
                        <option>55</option>
                        <option>60</option>

                    </select>
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">채용 시 마감</span>
                    </label>
                </div>
            </div>
            
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">접수방법*</label>
                <div className="flex flex-wrap gap-2 mb-2">
                    {[
                        { label: '잡잼지원', state: jobjam, setState: setJobjam },
                        { label: '홈페이지', state: homepage, setState: setHomepage },
                        { label: '우편', state: post, setState: setPost },
                        { label: '방문', state: visit, setState: setVisit },
                        { label: 'e-메일', state: mail, setState: setMail },
                        { label: 'Fax', state: fax, setState: setFax },
                    ].map(({ label, state, setState }) => (
                        <button
                            key={label}
                            onClick={() => setState(!state)}
                            className={`px-3 py-1 border rounded ${
                                state ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                {homepage && (
                    <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">홈페이지 URL</label>
                        <input type="text" value={homepageUrl} onChange={(e) => setHomepageUrl(e.target.value)} className="w-[500px] border rounded px-3 py-2" />
                    </div>
                )}
                {(post || visit) && (
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
                        <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} className="w-[500px] border rounded px-3 py-2 mr-2" />
                        <button onClick={addressApi} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">주소검색</button>
                        <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">상세주소</label>
                        <input type="text" className="w-[500px] border rounded px-3 py-2" />
                        <Map /* 지도를 표시할 Container*/id="map" center={center} 
                                className="w-[500px] h-[400px] mr-3 mt-6" level={3} /* 지도의 확대 레벨 */
                                onClick={(_, mouseEvent) => {
                                    const latlng = mouseEvent.latLng
                                    setLocation({
                                        lat: latlng.getLat(),
                                        lng: latlng.getLng(),
                                    })
                                    
                                }}>
                            <MapMarker position={location} />
                        </Map>
                    </div>
                )}
                {mail && (
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                        <input type="text" className="border rounded px-3 py-2 mr-2" />
                        <span className="mr-2">@</span>
                        {emailDomain==='직접입력' ? (
                            <input type="text" className="border rounded px-3 py-2 mr-2"/>
                        ) : (
                            <input type="text" className="border rounded px-3 py-2 mr-2" value={emailDomain} onChange={(e)=>setEmailDomain(e.target.value)}/>
                        )}
                        <select className="border rounded px-3 py-2" onChange={handleEmailDomainChange}>
                            <option>직접입력</option>
                            <option>naver.com</option>
                            <option>daum.net</option>
                            <option>gmail.com</option>
                            <option>nate.com</option>
                            <option>hanmail.net</option>
                            <option>korea.com</option>
                            <option>hanmail.net</option>
                            <option>korea.com</option>
                            <option>hanmail.net</option>
                            <option>korea.com</option>
                            <option>hanmail.net</option>
                            <option>korea.com</option>
                        </select>
                    </div>
                )}
                {
                    fax && (
                        <div className="mt-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fax</label>
                            <input type="text" className=" border rounded px-3 py-2 mr-2" />
                            <span className="mr-2">-</span>
                            <input type="text" className=" border rounded px-3 py-2 mr-2" />
                            <span className="mr-2">-</span>
                            <input type="text" className=" border rounded px-3 py-2" />
                        </div>
                    )
                }
            </div>
            {

            }
            
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">참고사항</label>
                <textarea className="w-full border rounded px-3 py-2 h-24"></textarea>
            </div>

            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">파일첨부</button>
        </div>
    );
}
