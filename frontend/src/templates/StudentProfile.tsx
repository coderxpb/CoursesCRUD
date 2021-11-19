import { Button, Stack, Typography } from '@mui/material';
import { usePage } from '../contexts/pageContext';
import {CourseRenderer} from '../utils/CourseRenderer';

export const StudentProfile = () => {
  const { studentProfile, setCurrentPage } = usePage();
  //remove only the courses taken lel

  const removeCourseFromStudent = (id) => coursesTaken

  return (
    <>
      <Button onClick={() => setCurrentPage('list')}>Back</Button>
      {studentProfile && (
        <Stack>
          <Typography sx={{ fontSize: 24 }}>{studentProfile.name}</Typography>
          {studentProfile.coursesTaken.map(course => CourseRenderer(course))}
        </Stack>
      )}
    </>
  );
};
