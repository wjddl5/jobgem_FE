'use client'
import { Button, Card, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import SelectInput from '@mui/material/Select/SelectInput';
import { useEffect, useState } from 'react'; // useEffect 추가
import axios from 'axios'; // axios import 추가
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

export default function AdminDashboard() {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        BarElement,
        Tooltip,
        Legend,
        ArcElement
    );
    const api_url = "/api/admin/posts";
    const [post, setPost] = useState([]);
    const [date, setDate] = useState([]);
    const [type, setType] = useState([]);
    const [location, setLocation] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(api_url);
                setPost(response.data.content);
                setDate(response.data.content.map(item => ({ poDate: item.poDate })));
                setType(response.data.content.map(item => ({ type: item.poSubType })));
                setLocation(response.data.content.map(item => ({ location: item.poAddr })));
            } catch (error) {
                console.error('데이터 가져오기 오류:', error);
            }
        };
        fetchData();
        getFilteredPosts("week");
    }, []);

    const getWeeklyData = () => {
        const weeklyCount = [0, 0, 0, 0, 0, 0, 0];
        date.forEach(item => {
            const date = new Date(item.poDate);
            const dayOfWeek = date.getDay();
            weeklyCount[dayOfWeek]++;
        });
        return weeklyCount;
    };

    const getMonthlyData = () => {
        const monthlyCount = Array(12).fill(0);
        date.forEach(item => {
            const date = new Date(item.poDate);
            const month = date.getMonth();
            monthlyCount[month]++;
        });
        return monthlyCount;
    };

    const getYearlyData = () => {
        const yearlyCount = {};
        date.forEach(item => {
            const year = new Date(item.poDate).getFullYear();
            yearlyCount[year] = (yearlyCount[year] || 0) + 1;
        });
        return Object.values(yearlyCount);
    };

    const getIndustryData = () => {
        const industryCount = {};
        type.forEach(item => {
            const industry = item.type;
            industryCount[industry] = (industryCount[industry] || 0) + 1;
        });
        return Object.values(industryCount);
    };

    const getLocationData = () => {
        const locationCount = {};
        location.forEach(item => {
            const location = item.location;
            locationCount[location] = (locationCount[location] || 0) + 1;
        });
        return Object.values(locationCount);
    };

    const weeklyData = {
        labels: ['일', '월', '화', '수', '목', '금', '토'],
        datasets: [{
            data: getWeeklyData(),
            backgroundColor: '#8884d8'
        }]
    };

    const monthlyData = {
        labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        datasets: [{
            data: getMonthlyData(),
            backgroundColor: '#8884d8'
        }]
    };

    const yearlyData = {
        labels: Object.keys(date.reduce((acc, item) => {
            const year = new Date(item.poDate).getFullYear();
            acc[year] = true;
            return acc;
        }, {})),
        datasets: [{
            data: getYearlyData(),
            backgroundColor: '#8884d8'
        }]
    };

    const industryData = {
        labels: Object.keys(type.reduce((acc, item) => {
            const industry = item.type;
            acc[industry] = true;
            return acc;
        }, {})),
        datasets: [{
            data: getIndustryData(),
            backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
        }]
    };

    const locationData = {
        labels: Object.keys(location.reduce((acc, item) => {
            const location = item.location;
            acc[location] = true;
            return acc;
        }, {})),
        datasets: [{
            data: getLocationData(),
            backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
            datalabels: {
                color: '#ffffff', // 라벨 색상
                anchor: 'end', // 라벨 위치
                align: 'top', // 라벨 정렬
            }
        }
    };

    const handlePeriodChange = (e) => {
        getFilteredPosts(e.target.value);
    };

    function getFilteredPosts(date) {
        const period = date === 'week' ? 7 : date === 'month' ? 30 : 365;
        const startDate = new Date();
        const endDate = new Date();
        startDate.setDate(endDate.getDate() - period);
        const filteredPosts = post.filter(post => {
            const postDate = new Date(post.poDate);
            return postDate >= startDate && postDate <= endDate;
        });
        setFilteredPosts(filteredPosts);
    }

    return (
        <Paper className="container mx-auto p-4 space-y-6 ">
            <h1 className="text-3xl font-bold mb-6">공고통계 </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="flex flex-col justify-between">
                    <Typography variant="h5">주간 공고 수</Typography>
                    <Typography variant="body2">일별 등록된 공고 수</Typography>
                    <CardContent>
                        <Bar data={weeklyData} options={options} />
                    </CardContent>
                    <Typography variant="h5">월간 공고 수</Typography>
                    <Typography variant="body2">월별 등록된 공고 수</Typography>
                    <CardContent>
                        <Bar data={monthlyData} options={options} />
                    </CardContent>
                    <Typography variant="h5">연간 공고 수</Typography>
                    <Typography variant="body2">연별 등록된 공고 수</Typography>
                    <CardContent>
                        <Line data={yearlyData} options={options} />
                    </CardContent>
                </Card>

                <Card>
                    <Typography variant="h5">업종별 분류</Typography>
                    <Typography variant="body2">업종별 공고 분포</Typography>
                    <CardContent>
                        <Pie data={industryData} options={options} />
                    </CardContent>
                    <Typography variant="h5">지역별 분류</Typography>
                    <Typography variant="body2">지역별 공고 분포</Typography>
                    <CardContent>
                        <Pie data={locationData} options={options} />
                    </CardContent>

                </Card>
            </div>

            <Card>
                <div className="flex justify-between items-center">
                    <Typography variant="h5">최근 공고 목록</Typography>
                    <div className="flex items-center space-x-2 p-3">
                        <FormControl size="small" sx={{ width: '15ch' }}>
                            <InputLabel id="week">기간</InputLabel>
                            <Select
                                labelId="period-select-label"
                                id="period-select"
                                label="기간"
                                defaultValue="week"
                                onChange={handlePeriodChange}
                            >
                                <MenuItem value="week">최근 1주일</MenuItem>
                                <MenuItem value="month">최근 1개월</MenuItem>
                                <MenuItem value="year">최근 1년</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>제목</TableCell>
                                <TableCell>회사</TableCell>
                                <TableCell>등록일</TableCell>
                                <TableCell>마감일</TableCell>
                                <TableCell>급여</TableCell>
                                <TableCell>업종</TableCell>
                                <TableCell>지역</TableCell>
                                <TableCell>이메일</TableCell>
                                <TableCell>팩스</TableCell>
                                <TableCell>출근 시간</TableCell>
                                <TableCell>퇴근 시간</TableCell>
                                <TableCell>상태</TableCell>
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredPosts.map((post, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{post.poTitle}</TableCell>
                                    <TableCell>{post.company.coName}</TableCell>
                                    <TableCell>{post.poDate}</TableCell>
                                    <TableCell>{post.poDeadline}</TableCell>
                                    <TableCell>{post.poSal}</TableCell>
                                    <TableCell>{post.poSubType}</TableCell>
                                    <TableCell>{post.poAddr}</TableCell>
                                    <TableCell>{post.poEmail}</TableCell>
                                    <TableCell>{post.poFax}</TableCell>
                                    <TableCell>{post.wsStartTime}</TableCell>
                                    <TableCell>{post.wsEndTime}</TableCell>
                                    <TableCell>{post.poState === 0 ? '모집중' : post.poState === 1 ? '모집완료' : '종료'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </Paper>
    )
}
