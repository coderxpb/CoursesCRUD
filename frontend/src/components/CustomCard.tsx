import { Card, IconButton, Stack, Typography } from '@mui/material'
import { ReactElement, useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'


interface IProps {
  children: string | ReactElement | ReactElement[]
  onCardClicked?(): void
  onDeleteClicked(id: any): void
  id: any
}

//custom cards with delete button. also supports on click(optional)
export const CustomCard = (props: IProps) => {
  const { onCardClicked, onDeleteClicked, children, id } = props

  return (
    <Card onClick={onCardClicked}>
      <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
        {children}
        <IconButton onClick={(e)=>onDeleteClicked(id)}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Card>
  )
}
