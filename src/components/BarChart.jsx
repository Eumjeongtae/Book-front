import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const BarChart = ({ list, type }) => {
    let [nameList, setNameList] = useState(
        list.map((v) => (v.book_name.length > 8 ? v.book_name.slice(0, 8) +'...' : v.book_name))
    );
    let [likeCount, setLikeCount] = useState(list.map((v) => v.like_count));
    let [rentCount, setRentCount] = useState(list.map((v) => v.rent_count));

    const data = {
        labels: nameList,
        datasets: [
            {
                label: `# of ${type}`,
                data: type === 'like' ? likeCount : rentCount,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
            x: {
                ticks: {
                    maxRotation: 50, // 이 부분을 조정하여 레이블의 기울기를 제어
                    autoSkip: true
                }
            }
        },
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;
