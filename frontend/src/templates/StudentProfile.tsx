import { Button, Stack, Typography } from '@mui/material';
import { usePage } from '../contexts/pageContext';
import { CourseRenderer } from '../utils/CourseRenderer';
import { useEffect, useState } from 'react';
import { deleteRequest, getRequest } from '../utils/httpHandlers';

export const StudentProfile = () => {
  const { studentProfile, setCurrentPage } = usePage();
  const [coursesTaken, setCoursesTaken] = useState<number[]|string[]>();
  const [loadCoursesTaken, setLoadCoursesTaken] = useState(true);
  const [availableCourses, setAvailableCourses] = useState();

  const removeCourseFromStudent = (courseID: string | number) => {
    deleteRequest('/students/courses', {
      studentID: studentProfile.id,
      courseID,
    }).then(data => {
      setLoadCoursesTaken(true);
    });
  };

  //load courses taken by the student
  useEffect(() => {
    if (loadCoursesTaken) {
      (async () => {
        const data = await getRequest('/students/courses', {
          id: studentProfile.id,
        });
        console.log(data)
        setCoursesTaken(data);
        setLoadCoursesTaken(false);
      })();
    }
  }, [loadCoursesTaken]);

  return (
    <>
      <Button onClick={() => setCurrentPage('list')}>Back</Button>
      {studentProfile && coursesTaken?
        <Stack>
          <Typography sx={{ fontSize: 24 }}>{studentProfile.name}</Typography>
          {coursesTaken.map(course => (
            <CourseRenderer
              courseID={course}
              removeCourse={removeCourseFromStudent}
            />
          ))}
        </Stack> : ''}

    </>
  );
};
