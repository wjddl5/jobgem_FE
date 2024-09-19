'use client'

import SelectButton from '@/components/selector/SelectButton';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';
import SunEditor from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css';

export default function ApplicationForm(params) {
    useKakaoLoader({
        appkey: "50d846af06392a3886e7875ff3d64eca",
        libraries: ["services","clusterer"]
    })
    const router = useRouter();
    /*버튼관리*/
    const [selectedPeriod, setSelectedPeriod] = useState(1);
    let today = new Date();

    /* 접수방법 */
    const [selectedMethods, setSelectedMethods] = useState([]);

    const applicationMethods = [
        { id: 'jobgem', name: '잡잼지원' },
        { id: 'homepage', name: '홈페이지' },
        { id: 'post', name: '우편' },
        { id: 'visit', name: '방문' },
        { id: 'email', name: 'e-메일' },
        { id: 'fax', name: 'Fax' },
    ];

    const handleMethodToggle = (methodId) => {
        setSelectedMethods(prevMethods =>
            prevMethods.includes(methodId)
                ? prevMethods.filter(id => id !== methodId)
                : [...prevMethods, methodId]
        );
    };
    

    /* 홈페이지 */
    const [homepageUrl, setHomepageUrl] = useState('');

    /* 근무요일 */
    const [selectedWorkDay, setSelectedWorkDay] = useState([]);
    const workDayList = [{id:1,name:'월'},{id:2,name:'화'},{id:3,name:'수'},{id:4,name:'목'},{id:5,name:'금'},{id:6,name:'토'},{id:7,name:'일'}];
    const handleWorkDayToggle = (workDayId) => {
        setSelectedWorkDay(prevWorkDay =>
            prevWorkDay.includes(workDayId)
                ? prevWorkDay.filter(id => id !== workDayId)
                : [...prevWorkDay, workDayId]
        );
    };

    /* 위치 */
    const [location, setLocation] = useState({
        lat: 33.450701,
        lng: 126.570667
    });
    const [center, setCenter] = useState({
        lat: 33.450701,
        lng: 126.570667
    });

    /* 추가 필드 */
    const [EduList, setEduList] = useState([]);
    const [CareerList, setCareerList] = useState([]);
    const[LocationDoList, setLocationDoList] = useState([]);
    const[LocationSiList, setLocationSiList] = useState([]);
    const[SkillList, setSkillList] = useState([]);
    const[HiringTypeList, setHiringTypeList] = useState([]);
    

    //제출시 필요한 데이터
    const[content, setContent] = useState('');
    const[title, setTitle] = useState('');
    const[selectedEdu, setSelectedEdu] = useState([]);
    const[selectedCareer, setSelectedCareer] = useState([]);
    const[selectedHiringType, setSelectedHiringType] = useState([]);
    const[salary, setSalary] = useState(0);
    /* 선택된 지역 */
    const [selectedLocationDo, setSelectedLocationDo] = useState({id: 0,ldName: ''});
    const [selectedLocation, setSelectedLocation] = useState([]);
    /* 접수기간 */
    const [startDate, setStartDate] = useState(''); 
    const [endDate, setEndDate] = useState('');
    /* 필요스킬 */
    const [selectedSkill, setSelectedSkill] = useState([]);
    /* 위치 */
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
     /* 이메일 */
    const [email, setEmail] = useState('');
    const [emailDomain, setEmailDomain] = useState('');
    /* Fax */
    const [fax1, setFax1] = useState('');
    const [fax2, setFax2] = useState('');
    const [fax3, setFax3] = useState('');
    /* 근무시간 */
    const [workStartTime, setWorkStartTime] = useState({hour:0,minute:0});
    const [workEndTime, setWorkEndTime] = useState({hour:0,minute:0});
    /* 시간 옵션 배열 생성 */
    const timeOptions = Array.from({length: 24}, (_, i) => i + 1);
    // 분 옵션 배열 생성
    const minuteOptions = ['00', '10', '20', '30', '40', '50'];
    /* 확인 팝업 */
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [image, setImage] = useState('');

    /* 랜더링시 초기화*/
    useEffect(() => {
        init();
        initData();
    }, []);

    /* 주소 초기화*/
    useEffect(() => {
        mapApi();
    }, [location]);

    /* 초기화*/
    function init() {
        axios.get('/api/post/set')
        .then(response => {
            console.log(response.data);
            setEduList(response.data.education);
            setCareerList(response.data.career);
            setLocationDoList(response.data.locationDo);
            setLocationSiList([{id:0,lgName:'전체'},...response.data.locationGuSi]);
            setSkillList(response.data.skill);
            setHiringTypeList(response.data.hiringType);
        })
        .catch(error => {
            console.error('Error fetching edu:', error);
        });
    }
    function initData() {
        axios.get('/api/post/view',{params:{poIdx:params.params.poIdx}})
        .then(response => {
            console.log("edit",response.data);
            setTitle(response.data.poTitle || '');
            setContent(response.data.poContent || '');
            setSelectedEdu(response.data.education?.map(edu => edu.id) || []);
            setSelectedCareer(response.data.career?.map(career => career.id) || []);
            setSelectedHiringType(response.data.hireKind?.map(hiringType => hiringType.id) || []);
            setSelectedSkill(response.data.skill?.map(skill => skill.id) || []);
            setSelectedLocation(response.data.locationGuSi?.map(location => ({
                lgName: location.lgName,
                lgIdx: location.id,
                ldName: location.locationDo.ldName,
                ldIdx: location.ldIdx
            })) || []);
            setSalary(response.data.poSal);
            setStartDate(response.data.poDate);
            setEndDate(response.data.poDeadline);
            setSelectedMethods(response.data.poSubType.split(','));
            setSelectedWorkDay(response.data.workDays.map(workDay => workDay.id));
            setWorkStartTime({hour:parseInt(response.data.wsStartTime.split(':')[0]),minute:response.data.wsStartTime.split(':')[1]});
            setWorkEndTime({hour:parseInt(response.data.wsEndTime.split(':')[0]),minute:response.data.wsEndTime.split(':')[1]});
        })
        .catch(error => {
            console.error('Error fetching post:', error);
        });
    }
    /* 접수기간 초기화*/
    function initPeriod() {
        setStartDate(today.toISOString().split('T')[0]);
        const newDate = new Date(today);
        newDate.setMonth(newDate.getMonth() + 2);
        setEndDate(newDate.toISOString().split('T')[0]);
    }
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
    
    /* 학력 선택 이벤트*/
    const handleEduToggle = (eduId) => {
        setSelectedEdu(prevEdu =>
            prevEdu.includes(eduId)
                ? prevEdu.filter(id => id !== eduId)
                : [...prevEdu, eduId]
        );
    };
    /* 경력 선택 이벤트*/
    const handleCareerToggle = (careerId) => {
        setSelectedCareer(prevCareer =>
            prevCareer.includes(careerId)
                ? prevCareer.filter(id => id !== careerId)
                : [...prevCareer, careerId]
        );
    };
    /* 채용형태 선택 이벤트*/
    const handleHiringTypeToggle = (hiringTypeId) => {
        setSelectedHiringType(prevHiringType =>
            prevHiringType.includes(hiringTypeId)
                ? prevHiringType.filter(id => id !== hiringTypeId)
                : [...prevHiringType, hiringTypeId]
        );
    };
    /* 필요스킬 선택 이벤트*/
    const handleSkillToggle = (skillId) => {
        setSelectedSkill(prevSkills =>
            prevSkills.includes(skillId)
                ? prevSkills.filter(id => id !== skillId)
                : [...prevSkills, skillId]
        );
    };
    /* 지역 선택 이벤트*/
    const handleLocationClick = (location) => {
        const newLocation = {
            lgName: location.lgName,
            lgIdx: location.id,
            ldName: selectedLocationDo.ldName,
            ldIdx: selectedLocationDo.id
        }
        if(location.id === 0) {
            setSelectedLocation([...selectedLocation.filter(selected => selected.ldIdx !== selectedLocationDo.id),newLocation]);
        } else {
            setSelectedLocation([...selectedLocation.filter(selected => selected.lgIdx !== 0||selected.ldIdx !==location.ldIdx), newLocation]);
        }   

        console.log(selectedLocation);
    };
    /* 채용공고 내용 변경 이벤트*/
    const handleContentChange = (content) => {
        setContent(content);
        console.log(content);
    };
    /* 이메일 도메인 변경 이벤트*/
    const handleEmailDomainChange = (e) => {
        if(e.target.value === '직접입력') {
            setEmailDomain('');
        } else {
            setEmailDomain(e.target.value);
        }
    };

    /* 근무시간 변경 이벤트*/
    function handleWorkStartTimeChange(e) {
        setWorkStartTime({hour:e.target.value,minute:workStartTime.minute});
    }
    function handleWorkStartTimeMiChange(e) {
        setWorkStartTime({hour:workStartTime.hour,minute:e.target.value});
    }
    function handleWorkEndTimeChange(e) {
        setWorkEndTime({hour:e.target.value,minute:workEndTime.minute});
    }
    function handleWorkEndTimeMiChange(e) {
        setWorkEndTime({hour:workEndTime.hour,minute:e.target.value});
    }

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
    /* 주소 청크*/
    function chunk(array, size) {
        return Array.from({ length: Math.ceil(array.length / size) }, (v, i) =>
          array.slice(i * size, i * size + size)
        );
    }
    function showLocationSiList() {
        let ar = [];
        if(selectedLocationDo.id === 0) {
            ar = [];
        } else {
            ar = [{lgName:'전체',id:0},...LocationSiList.filter(location => location.ldIdx === selectedLocationDo.id)];
        }
        return ar;
    }

    function handleSubmit() {
        /* 유효성 검사 */
        const blankPattern = /^\s+|\s+$/g;
        const urlRegex = /^(https?|ftp):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/i;

        if(title.replace(blankPattern, '').length === 0) {
            alert('제목을 입력해주세요');
            return;
        }
        if(content.replace(blankPattern, '').length === 0) {
            alert('내용을 입력해주세요');
            return;
        }
        if(selectedEdu.length === 0) {
            alert('학력을 선택해주세요');
            return;
        }
        if(selectedCareer.length === 0) {
            alert('경력을 선택해주세요');
            return;
        }
        if(selectedHiringType.length === 0) {
            alert('채용 근무형태를 선택해주세요');
            return;
        }
        if(selectedWorkDay.length === 0) {
            alert('근무요일을 선택해주세요');
            return;
        }
        if(selectedSkill.length === 0) {
            alert('필요스킬을 선택해주세요');
            return;
        }
        if(salary=== 0) {
            alert('채용 연봉을 입력해주세요');
            return;
        }
        if(selectedLocation.length === 0) {
            alert('채용 지역을 선택해주세요');
            return;
        }
        if(selectedMethods.length === 0) {
            alert('접수 방법을 선택해주세요');
            return;
        }
        if(endDate !== '') {
            if(endDate < startDate) {
                alert('접수기간이 채용기간보다 길어야 합니다.');
                return;
            }
        }
        if(selectedMethods.includes('homepage')) {
            if(homepageUrl.replace(blankPattern, '').length === 0 || !urlRegex.test(homepageUrl)) {
                alert('유효한 홈페이지 URL을 입력해주세요');
                return;
            }
        }
        if(selectedMethods.includes('email')) {
            if(email.replace(blankPattern, '').length === 0||emailDomain.replace(blankPattern, '').length === 0||email.search("/\W|\s/g") !== -1||emailDomain.search("/\W|\s/g") !== -1) {
                alert('유효한 이메일을 입력해주세요');
                return;
            }
        }
        if(selectedMethods.includes('fax')) {
            if(fax1.replace(blankPattern, '').length === 0||fax2.replace(blankPattern, '').length === 0||fax3.replace(blankPattern, '').length === 0) {
                alert('유효한 Fax를 입력해주세요');
                return;
            }
        }
        if(selectedMethods.includes('post') || selectedMethods.includes('visit')) {
            if(address.replace(blankPattern, '').length === 0) {
                alert('주소를 입력해주세요');
                return;
            }
        }
        // 유효성 검사가 모두 통과되면 확인 팝업을 표시
        setShowConfirmPopup(true);
    }

    function confirmSubmit() {
        let subType = '';
        let location = [];
                const eduData = EduList.filter(edu => selectedEdu.includes(edu.id)).map(edu => ({
            id: edu.id,
            edName: edu.name
        }));
        const careerData = CareerList.filter(career => selectedCareer.includes(career.id)).map(career => ({
            id: career.id,
            crName: career.name
        }));
        const hiringTypeData = HiringTypeList.filter(hiringType => selectedHiringType.includes(hiringType.id)).map(hiringType => ({
            id: hiringType.id,
            hkName: hiringType.name
        }));
        const skillData = SkillList.filter(skill => selectedSkill.includes(skill.id)).map(skill => ({
            id: skill.id,
            skName: skill.name
        }));
        const workDayData = workDayList.filter(workDay => selectedWorkDay.includes(workDay.id)).map(workDay => ({
            id: workDay.id,
            dayName: workDay.name
        }));
        subType =  selectedMethods.map(method => method.name).join(', ');
        for(let i = 0; i < selectedLocation.length; i++) {
            if(selectedLocation[i].lgIdx !== 0) {
                location.push({
                    id: selectedLocation[i].lgIdx,
                    lgName: selectedLocation[i].lgName,
                    ldIdx: selectedLocation[i].ldIdx
                });
            }else{
                location = location.concat(LocationSiList.filter(location => location.ldIdx === selectedLocation[i].ldIdx));
            }
        }
        let data = {
            id: params.params.poIdx,
            coIdx: 1,
            poTitle: title,
            poContent: content,
            education: eduData,
            career: careerData,
            hireKind: hiringTypeData,
            location: location,
            skill: skillData,
            salary: salary,
            poDate: startDate,
            subType: subType,
            workStartTime: workStartTime.hour+":"+workStartTime.minute,
            workEndTime: workEndTime.hour+":"+workEndTime.minute,
            workDay: workDayData,
            imgUrl: image.name
        }
        if(endDate !== '') {
            data.poDeadline = endDate;
        }
        if(selectedMethods.includes('homepage')) {
            data.homepageUrl = homepageUrl;
        }
        if(selectedMethods.includes('email')) {
            data.email = email+'@'+emailDomain;
        }
        if(selectedMethods.includes('fax')) {
            data.fax=fax1+"-"+fax2+"-"+fax3;
        }
        if(selectedMethods.includes('post') || selectedMethods.includes('visit')) {
            data.address = address+"-"+detailAddress;
        }
        let formData = new FormData();
        formData.append('file', image);
        let filename='';
        axios.post('/api/files/upload', formData)
        .then(response => {
            console.log("response",response.data);
            data.imgUrl = response.data;
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            setShowConfirmPopup(false);
            // 에러 메시지 표시
        });
        console.log("data",data);
        axios.post('/api/post/write', data)
        .then(response => {
            console.log(response);
            setShowConfirmPopup(false);
            // 성공 메시지 표시 또는 다른 페이지로 리다이렉트
            router.push('/company/posting');
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            setShowConfirmPopup(false);
            // 에러 메시지 표시
        });
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white  rounded-lg">
            <h1 className="text-2xl font-bold mb-2">채용공고 작성</h1>
            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">채용공고 제목*</label>
                <input type="text" className="w-full border rounded px-3 py-2" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                <label className="block text-sm font-medium text-gray-700 mb-2">채용공고 내용*</label>
                <SunEditor
                height="600px"
                setOptions={{
                    buttonList: [
                    ["undo", "redo", "bold", "underline", "italic", "strike", "subscript", "superscript"],
                    ["font", "fontSize", "formatBlock"],
                    ["fontColor", "hiliteColor", "align", "list", "table"],
                    ["link", "image", "video"],
                    ["fullScreen", "showBlocks", "codeView"],
                    ],
                }}
                setContents={content}
                onChange={handleContentChange}
                />
            </div>
            <h1 className="text-2xl font-bold mb-2">채용 정보</h1>
            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">채용 학력*</label>
                <SelectButton
                    List={EduList}
                    selected={selectedEdu}
                    onToggle={(id) => handleEduToggle(id)}
                />
                <label className="block text-sm font-medium text-gray-700 mb-2">채용 경력*</label>
                <SelectButton
                    List={CareerList}
                    selected={selectedCareer}
                    onToggle={(id) => handleCareerToggle(id)}
                />
                <label className="block text-sm font-medium text-gray-700 mb-2">채용 근무형태*</label>
                <SelectButton
                    List={HiringTypeList}
                    selected={selectedHiringType}
                    onToggle={(id) => handleHiringTypeToggle(id)}
                />
                <label className="block text-sm font-medium text-gray-700 mb-2">근무요일*</label>
                <SelectButton
                    List={workDayList}
                    selected={selectedWorkDay}
                    onToggle={(id) => handleWorkDayToggle(id)}
                />
                <label className="block text-sm font-medium text-gray-700 mb-2">근무시간*</label>
                <select className="border rounded px-2 py-1 mr-2" value={workStartTime.hour} onChange={handleWorkStartTimeChange}>
                        <option>시간</option>
                        {timeOptions.map(hour => (
                        <option key={hour} value={hour}>{hour}</option>
                    ))}
                </select>
                <select className="border rounded px-2 py-1 mr-2" value={workStartTime.minute} onChange={handleWorkStartTimeMiChange}>
                        <option>분</option>
                        {minuteOptions.map(minute => (
                            <option key={minute} value={minute}>{minute}</option>
                        ))};
                    </select>
                    ~
                    <select className="border rounded px-2 py-1 ml-2 mr-2" value={workEndTime.hour} onChange={handleWorkEndTimeChange}>
                        <option>시간</option>
                        {timeOptions.map(hour => (
                            <option key={hour} value={hour}>{hour}</option>
                        ))};
                    </select>
                    <select className="border rounded px-2 py-1" value={workEndTime.minute} onChange={handleWorkEndTimeMiChange}>
                        <option>분</option>
                        {minuteOptions.map(minute => (
                            <option key={minute} value={minute}>{minute}</option>
                        ))};
                    </select>
                <label className="block text-sm font-medium text-gray-700 mb-2">채용 지역*</label>
                <div className="border rounded p-4">
                    <div className="flex mb-4">
                        <div className="w-2/5 pr-2">
                            <div className="font-medium mb-2">시/도</div>
                            <table className="w-full">
                                <tbody className="">
                                    {LocationDoList && chunk(LocationDoList, 2).map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {row.map((location, colIndex) => (
                                                <td key={colIndex} className="p-1 border">
                                                    {selectedLocationDo.id === location.id ? <div className="w-full px-3 py-1 text-sm bg-blue-100 active:bg-blue-200">{location.ldName}</div> : <div onClick={()=>{setSelectedLocationDo(location)}} className="w-full px-3 py-1 text-sm hover:bg-blue-100 active:bg-blue-200">{location.ldName}</div>}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="w-3/5 pl-2">
                            <div className="font-medium mb-2">구/군</div>
                            <table className="w-full">
                                <tbody>
                                    {LocationSiList && chunk(showLocationSiList(), 3).map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {row.map((location, colIndex) => (
                                            <td key={colIndex} className="p-1"> 
                                                {(selectedLocation.some(selected => selected.lgIdx === location.id && selected.ldIdx === location.ldIdx) && location.id !== 0) ? 
                                                    <div onClick={() => handleLocationDeselect(location)} className="w-full px-3 py-1 text-sm bg-blue-100 text-center cursor-pointer">
                                                        {location.lgName}
                                                    </div> : 
                                                    <button onClick={() => handleLocationClick(location)} className="w-full px-3 py-1 text-sm border rounded hover:bg-blue-100 text-center">
                                                        {location.lgName}
                                                    </button>}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <div className="font-medium mb-2">선택된 지역</div>
                        <div className="flex flex-wrap gap-2">
                            {/* 여기에 선택된 지역들을 표시합니다 */}
                            {selectedLocation.map((location, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                                    {location.ldName} {location.lgName} 
                                    <button onClick={()=>{setSelectedLocation(selectedLocation.filter(selected => selected.lgIdx !== location.lgIdx))}} className="ml-1 text-blue-500 hover:text-blue-700">×</button>
                                </span>
                            ))}
                            {/* 추가 선택된 지역들... */}
                        </div>
                    </div>
                </div>
                <label className="block text-sm font-medium text-gray-700 mb-2">필요스킬*</label>
                <SelectButton
                    List={SkillList}
                    selected={selectedSkill}
                    onToggle={handleSkillToggle}
                />
                <label className="block text-sm font-medium text-gray-700 mb-2">채용 연봉*</label>
                <div className="flex items-center">
                    <input type="number" className="w-500 border rounded px-3 py-2 mr-3" value={salary} onChange={(e)=>setSalary(e.target.value)}/>
                    <span>만원</span>
                </div>
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
                    <input type="date" value={startDate} disabled={true} className="border rounded px-2 py-1" />
                    <span>~</span>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border rounded px-2 py-1" />
                </div>
            </div>
            
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">접수방법*</label>
                <SelectButton
                    List={applicationMethods}
                    selected={selectedMethods}
                    onToggle={handleMethodToggle}
                />
                {selectedMethods.includes('homepage') && (
                    <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">홈페이지 URL</label>
                        <input type="text" value={homepageUrl} onChange={(e) => setHomepageUrl(e.target.value)} className="w-[500px] border rounded px-3 py-2" />
                    </div>
                )}
                {(selectedMethods.includes('post') || selectedMethods.includes('visit')) && (
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
                        <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} className="w-[500px] border rounded px-3 py-2 mr-2" />
                        <button onClick={addressApi} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">주소검색</button>
                        <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">상세주소</label>
                        <input type="text" value={detailAddress} onChange={(e)=>setDetailAddress(e.target.value)} className="w-[500px] border rounded px-3 py-2" />
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
                {selectedMethods.includes('email') && (
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                        <input type="text" className="border rounded px-3 py-2 mr-2" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <span className="mr-2">@</span>
                        <input type="text" className="border rounded px-3 py-2 mr-2" value={emailDomain} onChange={(e)=>setEmailDomain(e.target.value)}/>
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
                    selectedMethods.includes('fax') && (
                        <div className="mt-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fax</label>
                            <input type="text" className=" border rounded px-3 py-2 mr-2" value={fax1} onChange={(e)=>setFax1(e.target.value)}/>
                            <span className="mr-2">-</span>
                            <input type="text" className=" border rounded px-3 py-2 mr-2" value={fax2} onChange={(e)=>setFax2(e.target.value)}/>
                            <span className="mr-2">-</span>
                            <input type="text" className=" border rounded px-3 py-2" value={fax3} onChange={(e)=>setFax3(e.target.value)}/>
                        </div>
                    )
                }
            </div>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">공고 이미지</label>
                <input type="file" className="border rounded px-3 py-2" onChange={(e)=>setImage(e.target.files[0])}/>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleSubmit}>작성완료</button>

            {/* 확인 팝업 */}
            {showConfirmPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">작성 완료</h2>
                        <p className="mb-4">정말로 채용공고를 수정하시겠습니까?</p>
                        <div className="flex justify-end">
                            <button className="bg-gray-300 text-black px-4 py-2 rounded mr-2" onClick={() => setShowConfirmPopup(false)}>취소</button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={confirmSubmit}>확인</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
