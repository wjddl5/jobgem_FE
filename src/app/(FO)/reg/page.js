'use client'
import Image from 'next/image';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import CompanyReg from './company/form';
import PersonalReg from './personal/form';

export default function Signup() {
  const [activeTab, setActiveTab] = useState('personal');
  const models = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: "firstError",
    shouldFocusError: true,
    shouldUnregister: true,
  });

  return (

    <FormProvider {...models}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl ">
          <Image src="/img/logo.png" alt="logo" width={200} height={200} className="mx-auto" />
          <div className="flex mb-6">
            <button
              className={`flex-1 py-2 ${activeTab === 'personal' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
              onClick={() => { setActiveTab('personal'); models.clearErrors(); }}
            >
              개인회원
            </button>
            <button
              className={`flex-1 py-2 ${activeTab === 'company' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
              onClick={() => { setActiveTab('company'); models.clearErrors(); }}
            >
              기업회원
            </button>
          </div>
          <Toaster position="bottom-right"/>
          {activeTab === 'personal' && <PersonalReg />}
          {activeTab === 'company' && <CompanyReg />}
        </div>
      </div>
    </FormProvider >
  );
}