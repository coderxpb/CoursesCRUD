import { Button, Card, CardContent, IconButton, Stack, Typography } from '@mui/material'
import React, { ReactElement } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IStudent } from '../interfaces/IStudent';
import { usePage } from '../contexts/pageContext';

interface ICustomCard {
  children?: string | ReactElement | ReactElement[];
  onDeleteClicked(e: React.SyntheticEvent, id: any): void;
}

interface IStudentCard extends ICustomCard {
  studentData: IStudent;
}

interface ISubjectCard extends ICustomCard {
  name: string;
  id: number | string;
}

//custom student card
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
          onClick={e => onDeleteClicked(e, studentData.id)}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Card>
  );
};

//custom subject card
export const SubjectCard = (props: ISubjectCard) => {
  const { onDeleteClicked, name, id } = props;
  return (
    <Card sx={{ background: 'lavender', maxWidth: 350 }}>
      <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
        <CardContent sx={{ background: 'powderblue', width: '100%' }}>
          {name}
        </CardContent>
        <IconButton
          disableRipple
          sx={{ '&:hover': { backgroundColor: 'transparent' } }}
          onClick={e => onDeleteClicked(e, id)}>
          <DeleteIcon />
        </IconButton>
      </Stack>

    </Card>
  );
};
