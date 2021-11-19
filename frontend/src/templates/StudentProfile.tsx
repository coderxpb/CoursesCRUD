import { Button, Stack, Typography } from '@mui/material';
import { IStudent } from '../interfaces/IStudent';

export const StudentProfile = (props: IStudent) => {
  const { id, name, coursesTaken } = props;
  return (
    <>
      <Stack>
        <Typography sx={{ fontSize: 24 }}>{name}</Typography>
        {coursesTaken.map(course => courseRenderer(course))}
      </Stack>
    </>
  );
};
