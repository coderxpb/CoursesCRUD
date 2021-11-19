import { Card, IconButton, Stack, Typography } from '@mui/material'
import { ReactElement, useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'


interface IProps {
  children: string | ReactElement | ReactElement[]
  onCardClicked?(): void
  onDeleteClicked(): void
}

//custom cards with delete button. also supports on click(optional)
export const CustomCard = (props: IProps) => {
  const { onCardClicked, onDeleteClicked, children } = props

  return (
    <Card onClick={onCardClicked}>
      <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
        {children}
        <IconButton onClick={onDeleteClicked}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Card>
  )
}
