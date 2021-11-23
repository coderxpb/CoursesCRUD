import { getRequest } from '../utils/httpHandlers';
import { useEffect, useRef, useState } from 'react';
import { StudentCard } from '../components/StudentCard';
import { IStudent } from '../interfaces/IStudent';
import { deleteRequest } from '../utils/httpHandlers';
import {
  Container,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { usePage } from '../contexts/pageContext';

export const StudentsList = () => {
  const { currentPageNo, setCurrentPageNo, pageSize, setPageSize } = usePage();
  const [pageCount, setPageCount] = useState<number>(1);
  const [loadStudents, setLoadStudents] = useState(true);
  const [studentsList, setStudentsList] = useState<IStudent[]>();
  const [search, setSearch] = useState<String>('');

  const changePage = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPageNo(value);
    setLoadStudents(true);
  };

  //delete a student and refetch student list
  const deleteClicked = (e: React.SyntheticEvent, _id: string) => {
    e.preventDefault();
    deleteRequest('/students', { _id }).then(data => {
      setLoadStudents(true);
    });
  };

  //fetch students list data to be displayed in current page
  useEffect(() => {
    if (loadStudents) {
      (async () => {
        getRequest('/students/list', {
          size: pageSize,
          page: currentPageNo,
          search: search,
        }).then(data => {
          setStudentsList(data.studentsList);
          setPageCount(data.pageCount);
          if (currentPageNo > data.pageCount) {
            setCurrentPageNo(data.pageCount);
            setLoadStudents(true);
          } else setLoadStudents(false);
        });
      })();
    }
  }, [loadStudents, search]);

  const searchInputHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    e.preventDefault();
    setSearch(e.target.value);
    setLoadStudents(true);
    console.log(e.target.value);
  };

  const changePageSize = (e: SelectChangeEvent<number>) => {
    e.preventDefault();
    if (e.target.value != pageSize) {
      setPageSize(e.target.value as number);
      setLoadStudents(true);
    }
  };

  return (
    <Container maxWidth={'sm'}>
      <Stack
        direction={'row'}
        sx={{ justifyContent: 'space-between', maxWidth: 508 }}>
        <Input
          placeholder={'search'}
          onChange={searchInputHandler}
          sx={{ marginBottom: 2 }}
        />
        <FormControl sx={{ m: 1, minWidth: 40 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Show</InputLabel>
          <Select
            value={pageSize}
            onChange={changePageSize}
            autoWidth
            size={'small'}
            label="Show">
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={16}>16</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Stack spacing={3} sx={{ maxWidth: 500 }}>
        {studentsList &&
          studentsList.map(student => (
            <StudentCard
              key={student._id}
              studentData={student}
              onDeleteClicked={deleteClicked}>
              <Typography
                sx={{ fontSize: 20, fontFamily: 'Outfit', fontWeight: 600 }}>
                {student.name}
              </Typography>
              <Typography
                sx={{ fontSize: 13, fontFamily: 'Outfit', fontWeight: 200 }}>
                Courses taken: {student.coursesTaken.length}
              </Typography>
            </StudentCard>
          ))}
      </Stack>

      {studentsList && (
        <Pagination
          count={pageCount}
          page={currentPageNo}
          onChange={changePage}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 2,
            maxWidth: 500,
          }}
        />
      )}
    </Container>
  );
};
