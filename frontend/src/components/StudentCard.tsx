import { Card, CardContent, IconButton, Stack } from '@mui/material';
import React, { ReactElement } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IStudent } from '../interfaces/IStudent';
import { usePage } from '../contexts/pageContext';

interface IStudentCard {
  children: string | ReactElement | ReactElement[];
  onDeleteClicked(e: React.SyntheticEvent, _id: any): void;
  studentData: IStudent;
}

export const StudentCard = (props: IStudentCard) => {
  const { setCurrentPage, setStudentProfile } = usePage();
  const { studentData, onDeleteClicked, children } = props;


  //on card click change page to student profile page with studentData
  const onCardClick = () => {
    setStudentProfile(studentData);
    setCurrentPage('profile');
  };

  return (
    <Card sx={{maxWidth: 600, '&:hover': { backgroundColor: 'rgba(0,0,255,0.1)', cursor: 'pointer'} }}>
      <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
        <CardContent
          sx={{width: '100%' }}
          onClick={onCardClick}>
          {children}
        </CardContent>
        <IconButton
          disableRipple
          sx={{ background: 'rgba(255,0,0,0.5)', borderRadius: 0, '&:hover': { backgroundColor: 'rgba(255,0,0,0.7)'} }}
          onClick={e => onDeleteClicked(e, studentData._id)}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Card>
  );
};
