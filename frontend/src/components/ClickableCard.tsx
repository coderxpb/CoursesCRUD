import {Card, Typography} from "@mui/material";
import {ReactElement} from "react";

interface IProps{
  onClick?(): void
  children: string | ReactElement | ReactElement[]
}

export const ClickableCard = (props: IProps) => {
  const {onClick, children} = props;
  return (
    <Card onClick={onClick}>
      {children}
    </Card>
  )
}
