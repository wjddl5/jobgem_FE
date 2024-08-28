import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';

// 기타 카테고리 관리 컴포넌트
export default function Etc_category() {
	return (
		<Table>
			<TableBody>
				<TableRow>
					<TableCell>재택근무</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>유연근무제</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
}
