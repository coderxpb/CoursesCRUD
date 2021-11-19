
import { StudentsList } from '../templates/StudentsList'
import { Container } from '@mui/material'

export const HomePage = () => {
  return (
    <Container sx={{paddingTop: 5}}>
      <StudentsList/>
    </Container>
  )
}
