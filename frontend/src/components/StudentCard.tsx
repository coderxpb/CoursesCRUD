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
    <Card sx={{ background: 'lavender', maxWidth: 600 }}>
      <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
        <CardContent
          sx={{ background: 'powderblue', width: '100%' }}
          onClick={onCardClick}>
          {children}
        </CardContent>
        <IconButton
          disableRipple
          sx={{ '&:hover': { backgroundColor: 'transparent' } }}
          onClick={e => onDeleteClicked(e, studentData._id)}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Card>
  );
};
