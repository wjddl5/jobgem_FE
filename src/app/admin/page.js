'use client'
import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Home() {
  // Area Chart Data
  const areaChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: "Earnings",
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "rgba(78, 115, 223, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(78, 115, 223, 1)",
      pointBorderColor: "rgba(78, 115, 223, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000],
    }],
  };

  const areaChartOptions = {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      x: {
        time: {
          unit: 'date'
        },
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      },
      y: {
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return '$' + value;
          }
        },
        grid: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      },
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: "rgb(255,255,255)",
        bodyColor: "#858796",
        titleMarginBottom: 10,
        titleColor: '#6e707e',
        titleFontSize: 14,
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        intersect: false,
        mode: 'index',
        caretPadding: 10,
        callbacks: {
          label: function(context) {
            var label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += '$' + context.parsed.y;
            }
            return label;
          }
        }
      }
    }
  };

  // Pie Chart Data
  const pieChartData = {
    labels: ["Direct", "Referral", "Social"],
    datasets: [{
      data: [55, 30, 15],
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  };

  const pieChartOptions = {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutout: '80%',
  };

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">대시보드</h1>
          <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow">
            <i className="fas fa-download fa-sm mr-2"></i> Generate Report
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="flex-grow">
                <div className="text-sm font-bold text-blue-500 uppercase mb-1">
                  Earnings (Monthly)
                </div>
                <div className="text-2xl font-bold text-gray-800">$40,000</div>
              </div>
              <div className="flex-shrink-0">
                <i className="fas fa-calendar fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="flex-grow">
                <div className="text-sm font-bold text-green-500 uppercase mb-1">
                  Earnings (Annual)
                </div>
                <div className="text-2xl font-bold text-gray-800">$215,000</div>
              </div>
              <div className="flex-shrink-0">
                <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-cyan-500">
            <div className="flex items-center">
              <div className="flex-grow">
                <div className="text-sm font-bold text-cyan-500 uppercase mb-1">Tasks</div>
                <div className="flex items-center">
                  <div className="text-2xl font-bold text-gray-800 mr-3">50%</div>
                  <div className="w-full">
                    <div className="h-2 bg-cyan-500 rounded-full">
                      <div className="h-2 bg-cyan-200 rounded-full" style={{ width: "50%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <div className="flex-grow">
                <div className="text-sm font-bold text-yellow-500 uppercase mb-1">
                  Pending Requests
                </div>
                <div className="text-2xl font-bold text-gray-800">18</div>
              </div>
              <div className="flex-shrink-0">
                <i className="fas fa-comments fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-4 border-b flex items-center justify-between">
              <h6 className="text-lg font-bold text-blue-500">Earnings Overview</h6>
              <div className="relative">
                <button
                  id="dropdownMenuLink"
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-ellipsis-v fa-sm"></i>
                </button>
                <div
                  className="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                  aria-labelledby="dropdownMenuLink"
                >
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Action
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Another action
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Something else here
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="relative h-80">
                <Line data={areaChartData} options={areaChartOptions} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md">
            <div className="p-4 border-b flex items-center justify-between">
              <h6 className="text-lg font-bold text-blue-500">Revenue Sources</h6>
              <div className="relative">
                <button
                  id="dropdownMenuLink"
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-ellipsis-v fa-sm"></i>
                </button>
                <div
                  className="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                  aria-labelledby="dropdownMenuLink"
                >
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Action
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Another action
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Something else here
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="relative h-64">
                <Pie data={pieChartData} options={pieChartOptions} />
              </div>
              <div className="mt-4 text-center text-sm">
                <span className="mr-2">
                  <i className="fas fa-circle text-blue-500"></i> Direct
                </span>
                <span className="mr-2">
                  <i className="fas fa-circle text-green-500"></i> Social
                </span>
                <span className="mr-2">
                  <i className="fas fa-circle text-cyan-500"></i> Referral
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-4 border-b">
              <h6 className="text-lg font-bold text-blue-500">Projects</h6>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-gray-800">Server Migration</span>
                  <span className="text-sm font-bold text-gray-800">20%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-red-500 rounded-full" style={{ width: "20%" }}></div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-gray-800">Sales Tracking</span>
                  <span className="text-sm font-bold text-gray-800">40%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-yellow-500 rounded-full" style={{ width: "40%" }}></div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-gray-800">Customer Database</span>
                  <span className="text-sm font-bold text-gray-800">60%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-gray-800">Payout Details</span>
                  <span className="text-sm font-bold text-gray-800">80%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-cyan-500 rounded-full" style={{ width: "80%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-gray-800">Account Setup</span>
                  <span className="text-sm font-bold text-gray-800">Complete!</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: "100%" }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500 text-white rounded-lg shadow-md p-4">
              Primary
              <div className="text-white-50 text-sm">#4e73df</div>
            </div>
            <div className="bg-green-500 text-white rounded-lg shadow-md p-4">
              Success
              <div className="text-white-50 text-sm">#1cc88a</div>
            </div>
            <div className="bg-cyan-500 text-white rounded-lg shadow-md p-4">
              Info
              <div className="text-white-50 text-sm">#36b9cc</div>
            </div>
            <div className="bg-yellow-500 text-white rounded-lg shadow-md p-4">
              Warning
              <div className="text-white-50 text-sm">#f6c23e</div>
            </div>
            <div className="bg-red-500 text-white rounded-lg shadow-md p-4">
              Danger
              <div className="text-white-50 text-sm">#e74a3b</div>
            </div>
            <div className="bg-gray-500 text-white rounded-lg shadow-md p-4">
              Secondary
              <div className="text-white-50 text-sm">#858796</div>
            </div>
            <div className="bg-white text-black rounded-lg shadow-md p-4">
              Light
              <div className="text-black-50 text-sm">#f8f9fc</div>
            </div>
            <div className="bg-gray-800 text-white rounded-lg shadow-md p-4">
              Dark
              <div className="text-white-50 text-sm">#5a5c69</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-4 border-b">
              <h6 className="text-lg font-bold text-blue-500">Illustrations</h6>
            </div>
            <div className="p-4">
              <div className="text-center">
                <img
                  className="mx-auto px-3 px-sm-4 mt-3 mb-4"
                  style={{ width: "25rem" }}
                  src="img/undraw_posting_photo.svg"
                  alt="..."
                />
              </div>
              <p>
                Add some quality, svg illustrations to your project courtesy of{" "}
                <a
                  target="_blank"
                  rel="nofollow"
                  href="https://undraw.co/"
                  className="text-blue-500 hover:underline"
                >
                  unDraw
                </a>
                , a constantly updated collection of beautiful svg images that you can use
                completely free and without attribution!
              </p>
              <a
                target="_blank"
                rel="nofollow"
                href="https://undraw.co/"
                className="text-blue-500 hover:underline"
              >
                Browse Illustrations on unDraw &rarr;
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md">
            <div className="p-4 border-b">
              <h6 className="text-lg font-bold text-blue-500">Development Approach</h6>
            </div>
            <div className="p-4">
              <p>
                SB Admin 2 makes extensive use of Bootstrap 4 utility classes in order to reduce
                CSS bloat and poor page performance. Custom CSS classes are used to create
                custom components and custom utility classes.
              </p>
              <p className="mb-0">
                Before working with this theme, you should become familiar with the
                Bootstrap framework, especially the utility classes.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
