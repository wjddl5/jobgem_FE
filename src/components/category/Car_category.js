import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';

// 경력 카테고리 관리 컴포넌트
export default function Car_category() {
	return (
		<Table>
			<TableBody>
				<TableRow>
					<TableCell>전체</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>신입</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
}
