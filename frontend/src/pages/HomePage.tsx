import { Box, Stack, Typography } from '@mui/material'
import { CustomCard } from '../components/CustomCard'
import { StudentsList } from '../templates/StudentsList'

export const HomePage = () => {
  return (
    <Stack>
      <Typography>Hey</Typography>
      <StudentsList/>
    </Stack>
  )
}
