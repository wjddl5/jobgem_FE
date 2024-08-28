import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';

// 기술 카테고리 관리 컴포넌트
export default function Loc_category() {
	return (
		<Table>
			<TableBody>
				<TableRow>
					<TableCell>전체</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>서울</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>경기</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
}
