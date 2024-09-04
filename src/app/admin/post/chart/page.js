'use client'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Page() {
    const barData = {
        labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [
            {
                label: 'Deposit',
                backgroundColor: '#4e73df',
                borderColor: '#4e73df',
                data: [400, 300, 200, 500, 400, 300, 200],
            },
            {
                label: 'Withdraw',
                backgroundColor: '#36b9cc',
                borderColor: '#36b9cc',
                data: [200, 100, 300, 200, 300, 400, 500],
            },
        ],
    };

    const pieData = {
        labels: ['Investment', 'Bill Expenses', 'Entertainment', 'Others'],
        datasets: [
            {
                data: [25, 25, 30, 20],
                backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e'],
                hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf', '#f4b619'],
                hoverBorderColor: 'rgba(234, 236, 244, 1)',
            },
        ],
    };

    return (
        <div className="container mx-auto mt-5" style={{width: '100vh', height: '100vh' }}>
            <h2 className="text-2xl font-bold mb-4">공고 통계</h2>
            <div className="flex flex-wrap gap-4">
                <div className="w-full lg:w-2/3">
                    <div className="bg-white shadow rounded-lg p-4">
                        <h5 className="text-xl font-semibold mb-4">공고 통계</h5>
                        <div className="flex flex-wrap gap-4">무소음적축 조아요
                            <div className="w-full md:w-1/2">
                                <div className="bg-blue-500 text-white shadow rounded-lg p-4">
                                    통계 내용
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="bg-gray-100 text-gray-800 shadow rounded-lg p-4">
                                    통계 내용
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/3">
                    <div className="bg-white shadow rounded-lg p-4">
                        <h5 className="text-xl font-semibold mb-4 flex justify-between items-center">
                            최근 공고
                            <a href="#" className="text-blue-500">See All</a>
                        </h5>
                        <ul className="list-none">
                            <li className="flex items-center mb-3">
                                <img src="icon1.png" alt="icon" className="w-10 h-10 mr-3" />
                                <div>
                                    <h6 className="text-lg font-semibold">Deposit from my Card</h6>
                                    <p className="text-sm text-gray-600">25 January 2021 - <span className="text-red-500">-$500</span></p>
                                </div>
                            </li>
                            <li className="flex items-center mb-3">
                                <img src="icon2.png" alt="icon" className="w-10 h-10 mr-3" />
                                <div>
                                    <h6 className="text-lg font-semibold">Deposit Paypal</h6>
                                    <p className="text-sm text-gray-600">25 January 2021 - <span className="text-green-500">+$500</span></p>
                                </div>
                            </li>
                            <li className="flex items-center mb-3">
                                <img src="icon3.png" alt="icon" className="w-10 h-10 mr-3" />
                                <div>
                                    <h6 className="text-lg font-semibold">Jemil Wilson</h6>
                                    <p className="text-sm text-gray-600">25 January 2021 - <span className="text-green-500">+$500</span></p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
                <div className="w-full lg:w-1/2">
                    <div className="bg-white shadow rounded-lg p-4">
                        <h5 className="text-xl font-semibold mb-4">주간 공고 수</h5>
                        <div className="chart-area">
                            <Bar data={barData} />
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    <div className="bg-white shadow rounded-lg p-4">
                        <h5 className="text-xl font-semibold mb-4">업종 별 분류</h5>
                        <div className="chart-pie">
                            <Pie data={pieData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
