'use client'
import { useState } from 'react';
import BusinessReg from './business/page';
import PersonalReg from './personal/page';

export default function Signup() {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 ${activeTab === 'personal' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            개인회원
          </button>
          <button
            className={`flex-1 py-2 ${activeTab === 'business' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
            onClick={() => setActiveTab('business')}
          >
            기업회원
          </button>
        </div>
        {activeTab === 'personal' && <PersonalReg />}
        {activeTab === 'business' && <BusinessReg />}
      </div>
    </div>
  );
}