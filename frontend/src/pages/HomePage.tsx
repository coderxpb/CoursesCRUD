import { StudentsList } from '../templates/StudentsList'
import { Container } from '@mui/material'
import { usePage } from '../contexts/pageContext'
import { StudentProfile } from '../templates/StudentProfile'

export const HomePage = () => {
  const {currentPage} = usePage()

  return (
    <Container maxWidth={'lg'} sx={{paddingTop: 5}}>
      {currentPage=='list' && <StudentsList/>}
      {currentPage=='profile'&& <StudentProfile />}
    </Container>
  )
}
