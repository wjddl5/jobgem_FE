'use client';
import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { alpha } from '@mui/material/styles';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TablePagination,
	Toolbar,
	Typography,
	Checkbox,
	IconButton,
	Tooltip,
	Button,
	Fab,
	Fade,
	TextField,
} from '@mui/material';
import { Delete as DeleteIcon, AddRounded as AddRoundedIcon, Add as AddIcon } from '@mui/icons-material';

// 고용형태 카테고리 관리 컴포넌트
export default function page() {
	//초기화
	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [rows, setRows] = useState([]);
	const [visibleRows, setVisibleRows] = useState([]);
	const [addClick, setAddClick] = useState(false);
	const [editRow, setEditRow] = useState('');
	const [itemName, setItemName] = useState('');
	const [editItemName, setEditItemName] = useState('');

	const headCells = [
		{
			id: 'number',
			label: 'number',
		},
		{
			id: 'name',
			label: 'name',
		},
	];

	//=================
	//데이터

	useEffect(() => {
		getData();
	}, []);

	function getData() {
		axios.get('/api/category/hir').then((res) => {
			setRows(res.data);
		});
	}
	const a = useMemo(() => rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [rows, page, rowsPerPage]);

	useEffect(() => {
		setVisibleRows(a);
	}, [a]);

	//=================
	//체크박스
	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelected = rows.map((n) => n.id);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, id) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}
		setSelected(newSelected);
	};

	//=================
	//페이징

	function isSelected(id) {
		return selected.indexOf(id) !== -1;
	}

	function handleChangePage(event, newPage) {
		setPage(newPage);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	}

	//=================
	//함수

	// 삭제
	function removeItem(chkList) {
		const chkAraay = Array.from(chkList);
		if (confirm('체크한 항목을 삭제하시겠습니까?')) {
			console.log(chkAraay);
			axios
				.delete('/api/category/hir', {
					params: {
						chkList: chkAraay,
					},
				})
				.then((res) => {
					if (res.data == true) alert('삭제 완료 되었습니다.');
					else alert('오류가 발생했습니다.\n 다시 시도해주세요.');
					setSelected([]);
					getData();
				});
		}
	}

	// 수정
	function editClick(id) {
		setEditRow(id);
	}

	function changeEditItemName(event) {
		var n = event.target.value;
		if (n.length > 30) {
			alert('최대 30글자까지 입력할 수 있습니다.');
			event.target.value = n.substring(0, 29);
		} else {
			setEditItemName(n);
		}
	}

	function editItem(id) {
		if (editItemName.trim().length < 1) {
			alert('카테고리명을 입력하세요.');
		} else if (editItemName.length > 30) {
			alert('최대 30글자까지 입력할 수 있습니다.');
		} else {
			axios
				.put(`/api/category/hir/${id}`, null, {
					params: {
						editItemName: editItemName.trim(),
					},
				})
				.then((res) => {
					if (res.data) {
						alert('수정완료');
						setSelected([]);
						setEditItemName('');
						setEditRow('');
						getData();
					} else if (res.data == false) {
						alert('중복된 이름이 존재합니다.');
						document.getElementById('editField').focus();
					} else {
						alert('오류가 발생했습니다.\n 다시 시도해주세요.');
					}
				});
		}
	}

	// 추가
	function addItem(addClick) {
		switch (addClick) {
			case true:
				setAddClick(false);
				break;
			case false:
				setAddClick(true);
				break;
		}
	}

	function changeItemName(event) {
		var n = event.target.value;
		if (n.length > 30) {
			alert('최대 30글자까지 입력할 수 있습니다.');
			event.target.value = n.substring(0, 29);
		} else {
			setItemName(n);
		}
	}

	function saveItem() {
		if (itemName.trim().length < 1) {
			alert('카테고리명을 입력하세요.');
		} else if (itemName.length > 100) {
			alert('최대 30글자까지 입력할 수 있습니다.');
		} else {
			axios
				.post('/api/category/hir', null, {
					params: {
						itemName: itemName.trim(),
					},
				})
				.then((res) => {
					if (res.data) {
						alert('저장성공');
						setItemName('');
						document.getElementById('itemNameField').value = '';
						setEditRow('');
						axios.get('/api/category/hir').then((res) => {
							setRows(res.data);
							const totalItems = res.data.length;
							const lastPage = Math.ceil(totalItems / rowsPerPage) - 1;
							setPage(lastPage);
						});
					} else if (res.data == false) {
						alert('중복된 이름이 존재합니다.');
						document.getElementById('itemNameField').focus();
					} else {
						alert('오류가 발생했습니다.\n 다시 시도해주세요.');
					}
				});
		}
	}
	//=================

	//툴바

	function EnhancedTableToolbar(props) {
		const { numSelected } = props;
		return (
			<Toolbar
				sx={[
					{
						pl: { sm: 2 },
						pr: { xs: 1, sm: 1 },
					},
					numSelected > 0 && {
						bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
					},
				]}
			>
				{numSelected > 0 ? (
					<Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
						{numSelected} selected
					</Typography>
				) : (
					<Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
						Hire Kind
					</Typography>
				)}

				{numSelected > 0 ? (
					<Tooltip title='Delete'>
						<IconButton
							onClick={() => {
								removeItem(selected);
							}}
						>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				) : (
					''
				)}
			</Toolbar>
		);
	}

	EnhancedTableToolbar.propTypes = {
		numSelected: PropTypes.number.isRequired,
	};

	//=================
	//테이블 헤더
	EnhancedTableHead.propTypes = {
		numSelected: PropTypes.number.isRequired,
		onSelectAllClick: PropTypes.func.isRequired,
		rowCount: PropTypes.number.isRequired,
	};

	function EnhancedTableHead(props) {
		const { onSelectAllClick, numSelected, rowCount } = props;

		return (
			<TableHead>
				<TableRow>
					<TableCell padding='checkbox'>
						<Checkbox
							color='primary'
							indeterminate={numSelected > 0 && numSelected < rowCount}
							checked={rowCount > 0 && numSelected === rowCount}
							onChange={onSelectAllClick}
							inputProps={{
								'aria-label': 'select all desserts',
							}}
						/>
					</TableCell>
					{headCells.map((headCell) => (
						<TableCell key={headCell.id} align={'left'} padding={'normal'} style={{ fontWeight: 'bold' }}>
							{headCell.label}
						</TableCell>
					))}
				</TableRow>
			</TableHead>
		);
	}

	//=================
	//페이지
	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2 }}>
				<EnhancedTableToolbar numSelected={selected.length} />
				<TableContainer>
					<Table sx={{ minWidth: '100%' }} aria-labelledby='tableTitle' size={'medium'}>
						<EnhancedTableHead numSelected={selected.length} onSelectAllClick={handleSelectAllClick} rowCount={rows.length} />
						<TableBody>
							{visibleRows.map((row, index) => {
								const isItemSelected = isSelected(row.id);
								const labelId = `enhanced-table-checkbox-${index}`;

								return (
									<TableRow
										hover
										style={{ height: '80px' }}
										role='checkbox'
										aria-checked={isItemSelected}
										tabIndex={-1}
										key={row.id}
										selected={isItemSelected}
										sx={{ cursor: 'pointer' }}
										onClick={() => {
											editClick(row.id);
											addItem(true);
										}}
									>
										<TableCell padding='checkbox'>
											<Checkbox
												onClick={(event) => handleClick(event, row.id)}
												color='primary'
												checked={isItemSelected}
												inputProps={{
													'aria-labelledby': labelId,
												}}
											/>
										</TableCell>
										<TableCell component='th' id={labelId} scope='row' padding='12px' sx={{ minWidth: '50px' }}>
											{row.id}
										</TableCell>
										{editRow != row.id ? (
											<TableCell component='th' scope='row' padding='12px' sx={{ minWidth: '200px' }}>
												{row.hkName}
											</TableCell>
										) : (
											<TableCell component='th' scope='row' padding='12px' sx={{ minWidth: '200px' }}>
												<TextField id='editField' style={{ width: '300px' }} onChange={changeEditItemName} defaultValue={row.hkName} />
												<Button
													variant='text'
													size='small'
													style={{ margin: '13px 0 0 7px' }}
													onClick={() => {
														editItem(row.id);
													}}
												>
													저장
												</Button>
											</TableCell>
										)}
									</TableRow>
								);
							})}
							<TableRow style={{ height: '90px' }}>
								<TableCell colSpan={2} style={{ padding: '12px' }}>
									<Fab
										color='primary'
										size='small'
										aria-label='add'
										onClick={() => {
											addItem(addClick);
											setEditRow('');
										}}
									>
										{addClick ? <RemoveOutlinedIcon /> : <AddIcon />}
									</Fab>
								</TableCell>
								<TableCell>
									<Fade in={addClick}>
										<div>
											<TextField id='itemNameField' onChange={changeItemName} style={{ width: '300px' }} type='' />
											<Button
												variant='outlined'
												size='small'
												style={{ marginLeft: '7px', height: '56px' }}
												onClick={() => {
													saveItem();
												}}
											>
												저장
											</Button>
										</div>
									</Fade>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 50]}
					component='div'
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	);
}
