import React from 'react';
import { Card, CardContent, IconButton, Stack, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

interface ICourseCard {
  name: string;
  _id: string;
  onDeleteClicked(e: React.SyntheticEvent, _id: any): void;
}

export const CourseCard = (props: ICourseCard) => {
  const { onDeleteClicked, name, _id } = props;
  return (
    <Card sx={{maxWidth: 320, '&:hover': { backgroundColor: 'rgba(0,0,255,0.1)', cursor: 'pointer'} }}>
      <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
        <CardContent sx={{ width: '100%' }}>
          <Typography sx={{ fontSize: 18, fontFamily: 'Outfit', fontWeight: 600, }}>{name}</Typography>
        </CardContent>
        <IconButton
          disableRipple
          sx={{ background: 'rgba(255,0,0,0.5)', borderRadius: 0, '&:hover': { backgroundColor: 'rgba(255,0,0,0.7)' } }}
          onClick={e => onDeleteClicked(e, _id)}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Card>
  );
};
