import React from 'react';
import { Card, CardContent, IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface ISubjectCard {
  name: string;
  _id: string;
  onDeleteClicked(e: React.SyntheticEvent, _id: any): void;
}

export const SubjectCard = (props: ISubjectCard) => {
  const { onDeleteClicked, name, _id } = props;
  return (
    <Card sx={{ background: 'lavender', maxWidth: 350 }}>
      <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
        <CardContent sx={{ background: 'powderblue', width: '100%' }}>
          {name}
        </CardContent>
        <IconButton
          disableRipple
          sx={{ '&:hover': { backgroundColor: 'transparent' } }}
          onClick={e => onDeleteClicked(e, _id)}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Card>
  );
};
