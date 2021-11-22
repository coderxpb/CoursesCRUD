import { getRequest } from '../utils/httpHandlers';
import { useEffect, useRef, useState } from 'react';
import { StudentCard } from '../components/StudentCard';
import { IStudent } from '../interfaces/IStudent';
import { deleteRequest } from '../utils/httpHandlers';
import { Container, Pagination, Stack, Typography } from '@mui/material';
import React from 'react';
import { useCourse } from '../contexts/courseContext';

export const StudentsList = () => {
  const { courses } = useCourse();
  const [pageCount, setPageCount] = useState<number>(1);
  const [currentPageNo, setCurrentPageNo] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loadStudents, setLoadStudents] = useState(true);
  const [studentsList, setStudentsList] = useState<IStudent[]>();

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
          page: currentPageNo
        }).then(data => {
          //setStudentListKeys(Object.getOwnPropertyNames(data.studentList));
          console.log(data);
          setStudentsList(data.studentsList);
          setPageCount(data.pageCount);
          if (currentPageNo > data.pageCount) {
            setCurrentPageNo(data.pageCount);
            setLoadStudents(true);
          } else setLoadStudents(false);
        });
      })();
    }
  }, [loadStudents]);

  return (
    <Container maxWidth={'sm'}>
      <Stack spacing={3} sx={{ maxWidth: 600 }}>
        {studentsList &&
          studentsList.map(student => (
            <StudentCard
              key={student._id}
              studentData={student}
              onDeleteClicked={deleteClicked}>
              <Typography sx={{ fontSize: 20 }}>{student.name}</Typography>
            </StudentCard>
          ))}
      </Stack>

      {pageCount && (
        <Pagination
          count={pageCount}
          page={currentPageNo}
          onChange={changePage}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 2,
            maxWidth: 600,
          }}
        />
      )}
    </Container>
  );
};
