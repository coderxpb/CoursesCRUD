import { Card, IconButton, Stack, Typography } from '@mui/material'
import { ReactElement, useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import {useNavigate} from 'react-router-dom'
import { IStudent } from '../interfaces/IStudent'

interface IProps {
  children: string | ReactElement | ReactElement[]
  student: boolean
  onDeleteClicked(id: any): void
  id: any
  studentData?: IStudent
}

//custom cards with delete button. also supports on click(optional)
export const CustomCard = (props: IProps) => {
  const navigate = useNavigate();
  const { student, studentData, onDeleteClicked, children, id } = props

  return (
    <Card>
      <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
        {children}
        <IconButton onClick={(e)=>onDeleteClicked(id)}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Card>
  )
}
