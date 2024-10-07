import React from 'react';

const NavigationTabs = ({ scrollToSection, detailsRef, applicationRef, companyInfoRef, recommendedRef }) => {
  return (
    <ul className='flex border-t-2 border-black'>
      <li className='flex-grow'>
        <button 
          type='button' 
          className='w-full px-4 py-2 bg-white text-gray-700 hover:bg-gray-200 transition duration-300 border-r border-gray-300'
          onClick={() => scrollToSection(detailsRef)}
        >
          <span>상세요강</span>
        </button>
      </li>
      <li className='flex-grow'>
        <button
          type='button'
          className='w-full px-4 py-2 bg-gray-150 text-gray-700 hover:bg-gray-50 transition duration-300 border-r border-b border-gray-300 active:bg-white border-b-0'
          onClick={() => scrollToSection(applicationRef)}
        >
          <span>접수기간/방법</span>
        </button>
      </li>
      <li className='flex-grow'>
        <button
          type='button'
          className='w-full px-4 py-2 bg-gray-150 text-gray-700 hover:bg-gray-50 transition duration-300 border-r border-b border-gray-300 active:bg-white border-b-0'
          onClick={() => scrollToSection(companyInfoRef)}
        >
          <span>기업정보</span>
        </button>
      </li>
    </ul>
  );
};

export default NavigationTabs;