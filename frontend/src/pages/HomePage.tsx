import { StudentsList } from '../templates/StudentsList';
import { Container } from '@mui/material';
import { usePage } from '../contexts/pageContext';
import { StudentProfile } from '../templates/StudentProfile';

export const HomePage = () => {
  const { currentPageType } = usePage();

  return (
    <Container maxWidth={'lg'} sx={{ paddingTop: 5 }}>
      {currentPageType == 'list' && <StudentsList />}
      {currentPageType == 'profile' && <StudentProfile />}
    </Container>
  );
};
