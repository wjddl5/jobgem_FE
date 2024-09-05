'use client';
import React, { useEffect, useState } from 'react';
import styles from '/public/css/category.css';
import { Button, Checkbox, Divider, Table, TableCell, TableHead, TableRow } from '@mui/material';
import Tec_category from '@/components/category/Tec_category';
import Car_category from '@/components/category/Car_category';
import Loc_category from '@/components/category/Loc_category';
import Etc_category from '@/components/category/Etc_category';

// (관리자) 카테고리 관리
export default function page() {
	const [component, setComponent] = useState(null);

	const resComponent = () => {
		switch (component) {
			case 'tec':
				return <Tec_category />;
			case 'car':
				return <Car_category />;
			case 'loc':
				return <Loc_category />;
			case 'etc':
				return <Etc_category />;
		}
	};

	return (
		<>
			<Table>
				<TableHead>
					<TableRow hover>
						<TableCell onClick={() => setComponent('tec')}>기술</TableCell>
					</TableRow>
					<TableRow hover>
						<TableCell onClick={() => setComponent('car')}>경력</TableCell>
					</TableRow>
					<TableRow hover>
						<TableCell onClick={() => setComponent('loc')}>지역</TableCell>
					</TableRow>
					<TableRow hover>
						<TableCell onClick={() => setComponent('etc')}>기타</TableCell>
					</TableRow>
				</TableHead>
			</Table>
			<Divider />
			<Divider />
			<Divider />
			<Divider />
			{resComponent()}
		</>
	);
}
