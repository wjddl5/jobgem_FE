'use client'

import SelectButton from '@/components/selector/SelectButton';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';
import SunEditor from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css';
import SunEditorCore from "suneditor/src/lib/core";
import { getToken } from '@/app/util/token/token';
export default function PostingForm({ params }) {
    const kakaoRestKey = process.env.NEXT_PUBLIC_KAKOMAP_API_REST_KEY
    const kakaoJavascriptKey = process.env.NEXT_PUBLIC_KAKOMAP_API_JAVASCRIPT_KEY
    const isEditMode = params.mode === 'edit';
    const [login, setLogin] = useState(null); // 초기값을 null로 설정
    useKakaoLoader({
        appkey: kakaoJavascriptKey,
        libraries: ["services","clusterer"]
    })
    const router = useRouter();
    const [selectedPeriod, setSelectedPeriod] = useState(1);
    let today = new Date();

    const [selectedMethods, setSelectedMethods] = useState([]);

    const applicationMethods = [
        { id: 'jobgem', name: '잡잼지원' },
        { id: 'post', name: '우편' },
        { id: 'visit', name: '방문' },
        { id: 'email', name: 'e-메일' },
        { id: 'fax', name: 'Fax' },
    ];

    const makeBase64ImageToFile = (base64Image) => {
        const mimeType = base64Image.split(";")[0].split(":")[1];
        const extension = mimeType.split("/")[1];
        const byteString = atob(base64Image.split(",")[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
          uint8Array[i] = byteString.charCodeAt(i);
        }
      
        const blob = new Blob([arrayBuffer], { type: mimeType });
        const fileName = `${uuidv4()}.${extension}`;
        const file = new File([blob], fileName, { type: mimeType });
      
        return { file, fileName };
    };

    const processEditorContent = () => {
        let processedContent = content;
        const base64ImageRegex = /<img src="(data:image\/[^;]+;base64[^"]+)"/g;
        let match;
        while ((match = base64ImageRegex.exec(content)) !== null) {
            const base64Image = match[1];
            const { file, fileName } = makeBase64ImageToFile(base64Image);
            let formData = new FormData();
            formData.append('file', file);
            
            axios.post('/api/files/upload', formData)
            .then(response => {
                console.log("이미지처리", response);
            })
            .catch(error => {
                console.error('Error submitting form:', error);
            });
            processedContent = processedContent.replace(base64Image, process.env.NEXT_PUBLIC_BACKEND_URL + fileName);
        }
        return processedContent;
    };

    const handleMethodToggle = (methodId) => {
        setSelectedMethods(prevMethods =>
            prevMethods.includes(methodId)
                ? prevMethods.filter(id => id !== methodId)
                : [...prevMethods, methodId]
        );
    };

    const [selectedWorkDay, setSelectedWorkDay] = useState([]);
    const workDayList = [{id:1,name:'월'},{id:2,name:'화'},{id:3,name:'수'},{id:4,name:'목'},{id:5,name:'금'},{id:6,name:'토'},{id:7,name:'일'}];
    const handleWorkDayToggle = (workDayId) => {
        setSelectedWorkDay(prevWorkDay =>
            prevWorkDay.includes(workDayId)
                ? prevWorkDay.filter(id => id !== workDayId)
                : [...prevWorkDay, workDayId]
        );
    };

    const [location, setLocation] = useState({
        lat: 33.450701,
        lng: 126.570667
    });
    const [center, setCenter] = useState({
        lat: 33.450701,
        lng: 126.570667
    });

    const [EduList, setEduList] = useState([]);
    const [CareerList, setCareerList] = useState([]);
    const [LocationDoList, setLocationDoList] = useState([]);
    const [LocationSiList, setLocationSiList] = useState([]);
    const [SkillList, setSkillList] = useState([]);
    const [HiringTypeList, setHiringTypeList] = useState([]);
    
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [selectedEdu, setSelectedEdu] = useState([]);
    const [selectedCareer, setSelectedCareer] = useState([]);
    const [selectedHiringType, setSelectedHiringType] = useState([]);
    const [salary, setSalary] = useState(0);
    const [selectedLocationDo, setSelectedLocationDo] = useState({id: 0, ldName: ''});
    const [selectedLocation, setSelectedLocation] = useState([]);
    const [startDate, setStartDate] = useState(''); 
    const [endDate, setEndDate] = useState('');
    const [selectedSkill, setSelectedSkill] = useState([]);
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [email, setEmail] = useState('');
    const [emailDomain, setEmailDomain] = useState('');
    const [fax1, setFax1] = useState('');
    const [fax2, setFax2] = useState('');
    const [fax3, setFax3] = useState('');
    const [workStartTime, setWorkStartTime] = useState({hour:0,minute:0});
    const [workEndTime, setWorkEndTime] = useState({hour:0,minute:0});
    const timeOptions = Array.from({length: 24}, (_, i) => i + 1);
    const minuteOptions = ['00', '10', '20', '30', '40', '50'];
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [initialDataLoaded, setInitialDataLoaded] = useState(true);

    useEffect(() => {
        init();
        if (isEditMode) {
            initData();
        } else {
            initPeriod();
        }
        getToken().then((res) => {
            setLogin(res.IDX); // login 값 설정
            console.log(res);
        });
    }, []);

    useEffect(() => {
        if(location.lat !== 33.450701 && location.lng !== 126.570667) {
            mapApi();
        }
    }, [location]);

    useEffect(() => {
        if(address !== '' && initialDataLoaded) {
            setInitialDataLoaded(false);
            addressApi();
        }
    }, [address, initialDataLoaded]);

    function init() {
        axios.get('/api/posts/set')
        .then(response => {
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
        axios.get(`/api/posts/${params.poIdx}`)
        .then(response => {
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
            if(response.data.poEmail){
                setEmail(response.data.poEmail.split('@')[0]);
                setEmailDomain(response.data.poEmail.split('@')[1]);
            }
            
            if (response.data.poFax) {
                const faxParts = response.data.poFax.split('-');
                setFax1(faxParts[0] || '');
                setFax2(faxParts[1] || '');
                setFax3(faxParts[2] || '');
            }
            if (response.data.poAddr) {
                setAddress(response.data.poAddr);
            }
        })
        .catch(error => {
            console.error('Error fetching post:', error);
        });
    }

    function initPeriod() {
        setStartDate(today.toISOString().split('T')[0]);
        const newDate = new Date(today);
        newDate.setMonth(newDate.getMonth() + 2);
        setEndDate(newDate.toISOString().split('T')[0]);
    }

    const addressApi = () => {
        axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
            params: {
                query: `${address}`,
                page: 1,
                size: 1
            },
            headers: {
                Authorization: `KakaoAK ${kakaoRestKey}`
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

    const handlePeriodClick = (index) => {
        const newDate = new Date(today);
        newDate.setMonth(newDate.getMonth() + index + 1);
        setStartDate(today.toISOString().split('T')[0]);
        setEndDate(newDate.toISOString().split('T')[0]);
        setSelectedPeriod(index);
    };
    
    const handleEduToggle = (eduId) => {
        setSelectedEdu(prevEdu =>
            prevEdu.includes(eduId)
                ? prevEdu.filter(id => id !== eduId)
                : [...prevEdu, eduId]
        );
    };

    const handleCareerToggle = (careerId) => {
        setSelectedCareer(prevCareer =>
            prevCareer.includes(careerId)
                ? prevCareer.filter(id => id !== careerId)
                : [...prevCareer, careerId]
        );
    };

    const handleHiringTypeToggle = (hiringTypeId) => {
        setSelectedHiringType(prevHiringType =>
            prevHiringType.includes(hiringTypeId)
                ? prevHiringType.filter(id => id !== hiringTypeId)
                : [...prevHiringType, hiringTypeId]
        );
    };

    const handleSkillToggle = (skillId) => {
        setSelectedSkill(prevSkills =>
            prevSkills.includes(skillId)
                ? prevSkills.filter(id => id !== skillId)
                : [...prevSkills, skillId]
        );
    };

    const handleLocationClick = (location) => {
        const newLocation = {
            lgName: location.lgName,
            lgIdx: location.id,
            ldName: selectedLocationDo.ldName,
            ldIdx: selectedLocationDo.id
        }
        if(location.id === 0) {
            setSelectedLocation([...selectedLocation.filter(selected => selected.ldIdx !== selectedLocationDo.id), newLocation]);
        } else {
            setSelectedLocation([...selectedLocation.filter(selected => selected.lgIdx !== 0 || selected.ldIdx !== location.ldIdx), newLocation]);
        }   
    };

    const handleContentChange = (content) => {
        setContent(content);
    };

    const handleEmailDomainChange = (e) => {
        if(e.target.value === '직접입력') {
            setEmailDomain('');
        } else {
            setEmailDomain(e.target.value);
        }
    };

    function handleWorkStartTimeChange(e) {
        setWorkStartTime({hour:e.target.value, minute:workStartTime.minute});
    }
    function handleWorkStartTimeMiChange(e) {
        setWorkStartTime({hour:workStartTime.hour, minute:e.target.value});
    }
    function handleWorkEndTimeChange(e) {
        setWorkEndTime({hour:e.target.value, minute:workEndTime.minute});
    }
    function handleWorkEndTimeMiChange(e) {
        setWorkEndTime({hour:workEndTime.hour, minute:e.target.value});
    }

    const mapApi = async () => {
        try {
            const response = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json`, {
                params: {
                    x: location.lng,
                    y: location.lat,
                    input_coord: 'WGS84'
                },
                headers: {
                    Authorization: `KakaoAK ${kakaoRestKey}`
                }
            });
            setAddress(response.data.documents[0].address.address_name);
        } catch (error) {
            console.error('Error fetching address:', error);
        }
    };

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
            ar = [{lgName:'전체',id:0}, ...LocationSiList.filter(location => location.ldIdx === selectedLocationDo.id)];
        }
        return ar;
    }

    function handleSubmit() {
        const blankPattern = /^\s+|\s+$/g;

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
        if(workStartTime.hour==0&&workStartTime.minute==0){
            alert("근무시간을 선택해 주세요");
            return;
        }
        if(workEndTime.hour==0&&workEndTime.minute==0){
            alert("근무시간을 선택해 주세요");
            return;
        }
        if(selectedSkill.length === 0) {
            alert('필요스킬을 선택해주세요');
            return;
        }
        if(salary === 0) {
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
        if(selectedMethods.includes('email')) {
            if(email.replace(blankPattern, '').length === 0 || emailDomain.replace(blankPattern, '').length === 0 || email.search("/\W|\s/g") !== -1 || emailDomain.search("/\W|\s/g") !== -1) {
                alert('유효한 이메일을 입력해주세요');
                return;
            }
        }
        if(selectedMethods.includes('fax')) {
            if(fax1.replace(blankPattern, '').length === 0 || fax2.replace(blankPattern, '').length === 0 || fax3.replace(blankPattern, '').length === 0) {
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
        subType =  selectedMethods.map(method => method).join(',');
        for(let i = 0; i < selectedLocation.length; i++) {
            if(selectedLocation[i].lgIdx !== 0) {
                location.push({
                    id: selectedLocation[i].lgIdx,
                    lgName: selectedLocation[i].lgName,
                    ldIdx: selectedLocation[i].ldIdx
                });
            } else {
                location = location.concat(LocationSiList.filter(location => location.ldIdx === selectedLocation[i].ldIdx));
            }
        }
        const processedContent = processEditorContent();
        let data = {
            id: isEditMode ? params.poIdx : undefined,
            coIdx: login,
            poTitle: title,
            poContent: processedContent,
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
        }
        if(endDate !== '') {
            data.poDeadline = endDate;
        }
        if(selectedMethods.includes('email')) {
            data.email = email+'@'+emailDomain;
        }
        if(selectedMethods.includes('fax')) {
            data.fax=fax1+"-"+fax2+"-"+fax3;
        }
        if(selectedMethods.includes('post') || selectedMethods.includes('visit')) {
            data.addr = address
        }
        axios.post(`/api/posts`, data)
        .then(response => {
            console.log(response);
            setShowConfirmPopup(false);
            router.push('/company/posting');
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            setShowConfirmPopup(false);
        });
    }

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white  rounded-lg">
            <h1 className="text-2xl font-bold mb-2">{isEditMode ? '채용공고 수정' : '채용공고 작성'}</h1>
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
                        ))}
                    </select>
                    ~
                    <select className="border rounded px-2 py-1 ml-2 mr-2" value={workEndTime.hour} onChange={handleWorkEndTimeChange}>
                        <option>시간</option>
                        {timeOptions.map(hour => (
                            <option key={hour} value={hour}>{hour}</option>
                        ))}
                    </select>
                    <select className="border rounded px-2 py-1" value={workEndTime.minute} onChange={handleWorkEndTimeMiChange}>
                        <option>분</option>
                        {minuteOptions.map(minute => (
                            <option key={minute} value={minute}>{minute}</option>
                        ))}
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
                            {selectedLocation.map((location, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                                    {location.ldName} {location.lgName} 
                                    <button onClick={()=>{setSelectedLocation(selectedLocation.filter(selected => selected.lgIdx !== location.lgIdx))}} className="ml-1 text-blue-500 hover:text-blue-700">×</button>
                                </span>
                            ))}
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
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border rounded px-2 py-1" />
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
                {(selectedMethods.includes('post') || selectedMethods.includes('visit')) && (
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
                        <input 
                            type="text" 
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)}  
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addressApi();
                                }
                            }}
                            className="w-[500px] border rounded px-3 py-2 mr-2" 
                        />
                        <button onClick={addressApi} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">주소검색</button>
                        <label className="block text-sm font-medium text-gray-700 mb-1 mt-2">상세주소</label>
                        <input type="text" value={detailAddress} onChange={(e)=>setDetailAddress(e.target.value)} className="w-[500px] border rounded px-3 py-2" />
                        <Map id="map" center={center} 
                                className="w-[500px] h-[400px] mr-3 mt-6 z-10" level={3}
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
                        </select>
                    </div>
                )}
                {selectedMethods.includes('fax') && (
                    <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fax</label>
                        <input type="text" className="border rounded px-3 py-2 mr-2" value={fax1} onChange={(e)=>setFax1(e.target.value)}/>
                        <span className="mr-2">-</span>
                        <input type="text" className="border rounded px-3 py-2 mr-2" value={fax2} onChange={(e)=>setFax2(e.target.value)}/>
                        <span className="mr-2">-</span>
                        <input type="text" className="border rounded px-3 py-2" value={fax3} onChange={(e)=>setFax3(e.target.value)}/>
                    </div>
                )}
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleSubmit}>
                {isEditMode ? '수정완료' : '작성완료'}
            </button>

            {showConfirmPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">{isEditMode ? '수정 완료' : '작성 완료'}</h2>
                        <p className="mb-4">정말로 채용공고를 {isEditMode ? '수정' : '작성'}하시겠습니까?</p>
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