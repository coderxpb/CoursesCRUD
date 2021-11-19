import { getRequest } from '../utils/httpHandlers';
import { useEffect, useState } from 'react';
import { StudentCard } from '../components/CustomCard';
import { IStudent } from '../interfaces/IStudent';
import { deleteRequest } from '../utils/httpHandlers';
import { Container, Pagination, Stack, Typography } from '@mui/material';
import React from 'react';
import { useCourse } from '../contexts/courseContext';

export const StudentsList = () => {
  const { courses } = useCourse();
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState(10);
  const [loadStudents, setLoadStudents] = useState(true);
  const [studentList, setStudentList] = useState<Record<string, IStudent>>();
  const [studentListKeys, setStudentListKeys] = useState<string[]>();

  const studentCardClicked = () => console.log('clicked');

  const changePage = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    setLoadStudents(true);
  };

  //delete a student and refetch list
  const deleteClicked = (e: React.SyntheticEvent,id: string) => {
    e.preventDefault();
    deleteRequest('/students', { id }).then(data => {
      setLoadStudents(true);
    });
  };

  //fetch students list data to be displayed in current page
  useEffect(() => {
    if (loadStudents) {
      (async () => {
        const data = await getRequest('/students/list', {
          size: pageSize,
          page: currentPage,
        });
        setStudentListKeys(Object.getOwnPropertyNames(data.studentList));
        setStudentList(data.studentList);
        setPageCount(data.pageCount);
        setLoadStudents(false);
      })();
    }
  }, [loadStudents]);

  return (
    <Container maxWidth={'sm'}>
      <Stack spacing={3} sx={{ maxWidth: 600 }}>
        {studentListKeys && studentList && !loadStudents
          ? studentListKeys.map(key => (
              <StudentCard
                key={key}
                studentData={studentList[key]}
                onDeleteClicked={deleteClicked}>
                <Typography sx={{ fontSize: 20 }}>{studentList[key].name}</Typography>
              </StudentCard>
            ))
          : ''}
      </Stack>
      {!loadStudents && (
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={changePage}
          sx={{ display: 'flex', justifyContent: 'center', paddingTop: 2, maxWidth: 600 }}
        />
      )}
    </Container>
  );
};
