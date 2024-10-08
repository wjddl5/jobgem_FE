'use client';
import React, { useState } from 'react';
import '@/app/style/css/category.css';
import { Button, Divider, Tab, Tabs, Box } from '@mui/material';
import Ski_category from '@/components/category/Ski_category';
import Car_category from '@/components/category/Car_category';
import Loc_category from '@/components/category/Loc_category';
import Hir_category from '@/components/category/Hir_category';
import Edu_category from '@/components/category/Edu_category';

// (관리자) 카테고리 관리
export default function CategoryPage() {
	const [selectedTab, setSelectedTab] = useState(0);

	const handleTabChange = (event, newValue) => {
		setSelectedTab(newValue);
	};

	const renderCategoryComponent = () => {
		switch (selectedTab) {
			case 0:
				return <Ski_category />;
			case 1:
				return <Car_category />;
			case 2:
				return <Edu_category />;
			case 3:
				return <Loc_category />;
			case 4:
				return <Hir_category />;
			default:
				return null;
		}
	};

	return (
		<>
			<Tabs value={selectedTab} onChange={handleTabChange} indicatorColor='primary' textColor='primary' centered>
				<Tab label='기술' />
				<Tab label='경력' />
				<Tab label='학력' />
				<Tab label='지역' />
				<Tab label='고용형태' />
			</Tabs>
			<Divider />
			<Box padding={3}>{renderCategoryComponent()}</Box>
		</>
	);
}
