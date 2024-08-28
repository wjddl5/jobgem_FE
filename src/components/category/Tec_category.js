import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';

// 기술 카테고리 관리 컴포넌트
export default function Tec_category() {
	return (
		<Table>
			<TableBody>
				<TableRow>
					<TableCell>자바</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>파이썬</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
}
