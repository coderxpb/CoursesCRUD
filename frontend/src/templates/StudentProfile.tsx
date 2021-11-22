import { Button, IconButton, Stack, Typography } from '@mui/material';
import { usePage } from '../contexts/pageContext';
import { CourseRenderer } from '../utils/CourseRenderer';
import React, { useEffect, useState } from 'react';
import { deleteRequest, getRequest, putRequest } from '../utils/httpHandlers';
import { ArrowBack } from '@mui/icons-material';
import { UpdateCourseDialog } from '../components/UpdateCourseDialog';

export const StudentProfile = () => {
  const { studentProfile, setCurrentPage } = usePage();
  const [coursesTaken, setCoursesTaken] = useState<string[]>();
  const [loadCoursesTaken, setLoadCoursesTaken] = useState(true);
  const [chosenCourses, setChosenCourses] = useState<string[]>();
  const [courseDialog, setCourseDialog] = useState(false);

  const openDialog = () => setCourseDialog(true);
  const closeDialog = () => setCourseDialog(false);

  const addToChosenCourse = (courseID: string) =>
    setChosenCourses(prev => (prev ? [...prev, courseID] : [courseID]));

  const removeFromChosenCourse = (courseID: string) =>
    setChosenCourses(prev => (prev ? prev.filter(c => c != courseID) : []));

  //delete request to remove course (on delete clicked) from a student
  const removeCourseFromStudent = (courseID: string) => {
    deleteRequest('/students/courses', {
      studentID: studentProfile._id,
      courseID,
    }).then(data => {
      setLoadCoursesTaken(true);
    });
  };

  //put request to modify courses chosen by the student
  const updateCourse = () => {
    putRequest('/students/courses', {
      id: studentProfile._id,
      coursesTaken: chosenCourses,
    }).then(() => {
      setLoadCoursesTaken(true);
    });
  };

  //load courses taken by the student
  useEffect(() => {
    if (loadCoursesTaken) {
      (async () => {
        getRequest('/students/courses', {
          id: studentProfile._id,
        }).then(data => {
          console.log(data);
          setCoursesTaken(data);
          setChosenCourses(data);
          setLoadCoursesTaken(false);
        });
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
      <UpdateCourseDialog
        initialCourses={chosenCourses}
        addToChosenCourses={addToChosenCourse}
        removeFromChosenCourses={removeFromChosenCourse}
        updateCourses={updateCourse}
        closeDialog={closeDialog}
        open={courseDialog}
      />
    </>
  );
};
