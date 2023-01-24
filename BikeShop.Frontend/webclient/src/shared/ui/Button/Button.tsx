import Button from '@mui/material/Button'
import { IButton } from './IButton'

const ButtonUI = ({text}: IButton) => {
  return (
    <Button
      variant='contained'
      sx={{
        padding: '16px 60px',
        borderRadius: '10px'
      }}
    >
      {text}
    </Button>
  )
}

export default ButtonUI