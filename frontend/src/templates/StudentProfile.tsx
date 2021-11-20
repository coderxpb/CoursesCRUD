import { Button, IconButton, Stack, Typography } from '@mui/material';
import { usePage } from '../contexts/pageContext';
import { CourseRenderer } from '../utils/CourseRenderer';
import React, { useEffect, useState } from 'react';
import { deleteRequest, getRequest, putRequest } from '../utils/httpHandlers';
import { ArrowBack } from '@mui/icons-material';
import _ from 'lodash';
import { UpdateCourseDialog } from '../components/UpdateCourseDialog'

export const StudentProfile = () => {
  const { studentProfile, setCurrentPage } = usePage();
  const [coursesTaken, setCoursesTaken] = useState<number[]>();
  const [loadCoursesTaken, setLoadCoursesTaken] = useState(true);
  const [chosenCourses, setChosenCourses] = useState<number[]>();
  const [courseDialog, setCourseDialog] = useState(false);

  const openDialog = () => setCourseDialog(true);
  const closeDialog = () => setCourseDialog(false);

  const removeCourseFromStudent = (courseID: string | number) => {
    deleteRequest('/students/courses', {
      studentID: studentProfile.id,
      courseID,
    }).then(data => {
      setLoadCoursesTaken(true);
    });
  };

  const addToChosenCourse = (courseID: number) =>
    setChosenCourses(prev => (prev ? [...prev, courseID] : [courseID]));

  const removeFromChosenCourse = (courseID: number) =>
    setChosenCourses(prev => (prev ? prev.filter(c => c != courseID) : []));

  const updateCourse = () => {
    putRequest('/students/courses', {
      id: studentProfile.id,
      coursesTaken: chosenCourses,
    }).then(() => {
      setLoadCoursesTaken(true);
    });
  };

  //load courses taken by the student
  useEffect(() => {
    if (loadCoursesTaken) {
      (async () => {
        const data = await getRequest('/students/courses', {
          id: studentProfile.id,
        })
        console.log(data);
        setCoursesTaken(data);
        setChosenCourses(data);
        setLoadCoursesTaken(false);
      })();
    }
  }, [loadCoursesTaken]);

  return (
    <>
      <IconButton onClick={() => setCurrentPage('list')}>
        <ArrowBack />
      </IconButton>
      {studentProfile && coursesTaken ? (
        <Stack spacing={2}>
          <Typography sx={{ fontSize: 24 }}>{studentProfile.name}</Typography>
          {coursesTaken.map(course => (
            <CourseRenderer
              courseID={course}
              removeCourse={removeCourseFromStudent}
            />
          ))}
        </Stack>
      ) : (
        ''
      )}
      <Button onClick={openDialog}>Update Courses</Button>
      <UpdateCourseDialog initialCourse={chosenCourses} addCourse={addToChosenCourse} removeCourse={removeFromChosenCourse} updateCourses={updateCourse} closeDialog={closeDialog} open={courseDialog}/>
    </>
  );
};
