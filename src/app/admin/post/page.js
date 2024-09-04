'use client'
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faComments } from '@fortawesome/free-solid-svg-icons'
import { IconButton, Badge, TextField } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import EditIcon from '@mui/icons-material/Edit';
export default function Page() {
    const projects = [
        {
            id: 1,
            title: "소프트웨어 개발",
            client: "Goodness Restaurant",
            budget: "$1,000",
            status: "진행 중",
            statusColor: "success",
            dueDate: "2023년 12월 31일",
            description: "새로운 제품 라인을 위한 마케팅 전략 개발",
            members: ["user1.jpg", "user2.jpg", "user3.jpg"],
            comments: 5,
            progress: 67
        },
        {
            id: 2,
            title: "소프트웨어 개발",
            client: "Goodness Restaurant",
            budget: "$1,000",
            status: "진행 중",
            statusColor: "success",
            dueDate: "2023년 12월 31일",
            description: "새로운 제품 라인을 위한 마케팅 전략 개발",
            members: ["user1.jpg", "user2.jpg", "user3.jpg"],
            comments: 5,
            progress: 67
        },
        {
            id: 3,
            title: "웹 디자인",
            client: "Goodness Restaurant",
            budget: "$1,000",
            status: "진행 중",
            statusColor: "success",
            dueDate: "2023년 12월 31일",
            description: "새로운 제품 라인을 위한 마케팅 전략 개발",
            members: ["user1.jpg", "user2.jpg", "user3.jpg"],
            comments: 5,
            progress: 67
        },
        {
            id: 4,
            title: "모바일 앱 개발",
            client: "Goodness Restaurant",
            budget: "$1,000",
            status: "진행 중",
            statusColor: "success",
            dueDate: "2023년 12월 31일",
            description: "새로운 제품 라인을 위한 마케팅 전략 개발",
            members: ["user1.jpg", "user2.jpg", "user3.jpg"],
            comments: 5,
            progress: 67
        },
        {
            id: 5,
            title: "데이터 분석",
            client: "Goodness Restaurant",
            budget: "$1,000",
            status: "진행 중",
            statusColor: "success",
            dueDate: "2023년 12월 31일",
            description: "새로운 제품 라인을 위한 마케팅 전략 개발",
            members: ["user1.jpg", "user2.jpg", "user3.jpg"],
            comments: 5,
            progress: 67
        },
        {
            id: 6,
            title: "데이터 분석",
            client: "Goodness Restaurant",
            budget: "$1,000",
            status: "진행 중",
            statusColor: "success",
            dueDate: "2023년 12월 31일",
            description: "새로운 제품 라인을 위한 마케팅 전략 개발",
            members: ["user1.jpg", "user2.jpg", "user3.jpg"],
            comments: 5,
            progress: 67
        },
        // 더 많은 프로젝트 데이터를 추가할 수 있습니다.
    ]
    const [search, setSearch] = useState('');

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    return (
        <div className="container mt-5">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 className="mb-4">공고 관리</h2>
                <TextField
                    label="검색"
                    variant="outlined"
                    size="small"
                    value={search}
                    onChange={handleSearchChange}
                    sx={{ width: '25ch', mb: 3 }}
                />
            </div>
            <div className="row">
                {projects.map(project => (
                    <div key={project.id} className="col-md-6 col-lg-4 mb-4">
                        <div className="card shadow h-100">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="card-title">{project.title}</h5>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <Badge badgeContent={0} color="error">
                                            <IconButton color="error">
                                                <RemoveCircleIcon />
                                            </IconButton>
                                        </Badge>
                                        <IconButton color="primary">
                                            <EditIcon />
                                        </IconButton>
                                    </div>
                                </div>
                                <p className="card-text"><strong>Client:</strong> {project.client}</p>
                                <p className="card-text"><strong>Budget:</strong> {project.budget}</p>
                                <p className="card-text">{project.description}</p>
                                <p className="text-muted">마감일: {project.dueDate}</p>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {project.members.map((member, index) => (
                                            <img key={index} src={member} alt="Member" className="rounded-circle me-1" style={{ width: "30px", height: "30px" }} />
                                        ))}
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon={faComments} className="me-1" />
                                        <span>{project.comments}</span>
                                    </div>
                                </div>
                                <div className="progress">
                                    <div className="progress-bar bg-info" role="progressbar" style={{ width: `${project.progress}%` }} aria-valuenow={project.progress} aria-valuemin="0" aria-valuemax="100">{project.progress}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4">

            </div>
        </div >
    )
}
