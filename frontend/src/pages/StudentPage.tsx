import { StudentsList } from '../templates/StudentsList';
import { Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const StudentPage = () => {
  const navigate = useNavigate();
  return (
    <Container sx={{ paddingTop: 5 }}>
      <Button onClick={e => navigate('/')}>Back</Button>
    </Container>
  );
};
