'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import axios from "axios";

export default function SystemAlert({ usIdx, alerts, newAlert, setNewAlert }) {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef(null);
    const buttonRef = useRef(null);

    const readAlert = () => {
        axios.put(`/api/alert/read?usIdx=${usIdx}`).then((res) => {
            setNewAlert(false);
        })
    }

    const togglePopover = () => {
        setIsOpen(!isOpen);
        if (newAlert) readAlert();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const formatTimeAgo = (dateString) => {
        const messageDate = new Date(dateString);
        const now = new Date();
        const diffMs = now - messageDate;
        const diffMinutes = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMinutes < 60) {
            if (diffMinutes === 0) {
                return `방금`;
            }
            return `${diffMinutes}분 전`;
        } else if (diffHours < 24) {
            return `${diffHours}시간 전`;
        } else if (diffDays < 2) {
            return `${diffDays}일 전`;
        } else {
            return messageDate.toLocaleDateString().replaceAll(". ", "-").slice(0, -1); // YYYY-MM-DD 형식
        }
    };

    return (
        <div className="relative">
            <button
                ref={buttonRef}
                onClick={togglePopover}
                className="p-2 text-gray-600 hover:text-blue-500 relative"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <FaBell className="h-6 w-6" />
                <span className="sr-only">알림 열기</span>
                {newAlert && (
                    <div className="absolute top-0 right-0 bg-blue-500 rounded-full w-2.5 h-2.5" /> // 새로운 알림 표시
                )}
            </button>
            {isOpen && (
                <div
                    ref={popoverRef}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10"
                    style={{ top: '100%' }}
                    role="dialog"
                    aria-label="알림"
                >
                    <div className="p-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold">알림</h3>
                    </div>
                    <ul className="divide-y divide-gray-200">
                        {alerts.map((alert, idx) => (
                            <li className="p-4 flex items-start space-x-4" key={idx}>
                                <div className="mt-1 bg-blue-500 rounded-full w-2 h-2 flex-shrink-0"></div>
                                <div>
                                    <p className="text-sm font-medium">{alert.alContent}</p>
                                    <p className="text-xs text-gray-500">{formatTimeAgo(alert.alDate)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
