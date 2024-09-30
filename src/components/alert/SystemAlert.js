'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';

export default function SystemAlert() {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef(null);
    const buttonRef = useRef(null);

    const togglePopover = () => setIsOpen(!isOpen);

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

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    return (
        <div className="relative">
            <button
                ref={buttonRef}
                onClick={togglePopover}
                onKeyDown={handleKeyDown}
                className="p-2 text-gray-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <FaBell className="h-6 w-6" />
                <span className="sr-only">알림 열기</span>
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
                        <li className="p-4 flex items-start space-x-4">
                            <div className="mt-1 bg-blue-500 rounded-full w-2 h-2 flex-shrink-0"></div>
                            <div>
                                <p className="text-sm font-medium">새로운 메시지가 도착했습니다.</p>
                                <p className="text-xs text-gray-500">방금 전</p>
                            </div>
                        </li>
                        <li className="p-4 flex items-start space-x-4">
                            <div className="mt-1 bg-blue-500 rounded-full w-2 h-2 flex-shrink-0"></div>
                            <div>
                                <p className="text-sm font-medium">시스템 업데이트가 완료되었습니다.</p>
                                <p className="text-xs text-gray-500">1시간 전</p>
                            </div>
                        </li>
                        <li className="p-4 flex items-start space-x-4">
                            <div className="mt-1 bg-gray-300 rounded-full w-2 h-2 flex-shrink-0"></div>
                            <div>
                                <p className="text-sm font-medium">주간 보고서가 준비되었습니다.</p>
                                <p className="text-xs text-gray-500">어제</p>
                            </div>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}