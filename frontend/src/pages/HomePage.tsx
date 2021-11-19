import {Box, Stack, Typography} from "@mui/material";
import {ClickableCard} from "../components/ClickableCard";

export const HomePage = () => {

  return (
    <Stack>
      <Typography>Hey</Typography>
      <ClickableCard onClick={()=>console.log('clicked')}>Card 1</ClickableCard>
    </Stack>
  )
}