import { Button, IconButton, Stack, Typography } from '@mui/material';
import { usePage } from '../contexts/pageContext';
import React, { useEffect, useState } from 'react';
import { deleteRequest, getRequest, putRequest } from '../utils/httpHandlers';
import { ArrowBack } from '@mui/icons-material';
import { UpdateCourseDialog } from '../components/UpdateCourseDialog';
import { CourseCard } from '../components/CourseCard';
import { ICourse } from '../interfaces/ICourse';

export const StudentProfile = () => {
  const { studentProfile, setCurrentPage } = usePage();
  const [coursesTaken, setCoursesTaken] = useState<ICourse[]>();
  const [loadCoursesTaken, setLoadCoursesTaken] = useState(true);
  const [chosenCourses, setChosenCourses] = useState<ICourse[]>();
  const [courseDialog, setCourseDialog] = useState(false);

  const openDialog = () => setCourseDialog(true);
  const closeDialog = () => setCourseDialog(false);

  const addToChosenCourse = (course: ICourse) =>
    setChosenCourses(prev => (prev ? [...prev, course] : [course]));

  const removeFromChosenCourse = (course: ICourse) =>
    setChosenCourses(prev =>
      prev ? prev.filter(c => c._id != course._id) : [],
    );

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
      _id: studentProfile._id,
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
          _id: studentProfile._id,
        }).then(data => {
          setCoursesTaken(data);
          setChosenCourses(data);
          setLoadCoursesTaken(false);
        });
      })();
    }
  }, [loadCoursesTaken]);

  return (
    <>
      {studentProfile && coursesTaken && (
        <Stack spacing={2} sx={{width: 340}}>
          <Stack direction={'row'} spacing={2}>
            <IconButton onClick={() => setCurrentPage('list')}>
              <ArrowBack />
            </IconButton>
            <Typography
              sx={{ fontSize: 32, fontFamily: 'Outfit', fontWeight: 600 }}>
              {studentProfile.name}
            </Typography>
          </Stack>

          {coursesTaken.map(course => (
            <CourseCard
              key={course._id}
              name={course.name}
              _id={course._id}
              onDeleteClicked={() => removeCourseFromStudent(course._id)}
            />
          ))}
          <Button
            onClick={openDialog}
            sx={{width: 180, alignSelf: 'end'}}>
            Update Courses
          </Button>
        </Stack>
      )}

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
