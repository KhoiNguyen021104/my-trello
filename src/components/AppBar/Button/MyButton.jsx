import { Button } from '@mui/material'

function MyButton({ text, variant, bgcolor, bgcolorHover, icon='', onClick }) {
  return (
    <Button
      variant={variant}
      startIcon={icon}
      onClick={onClick}
      sx={{
        padding: '6px 12px',
        bgcolor: `${bgcolor}`,
        '&:hover': {
          bgcolor:`${bgcolorHover}`
        }
      }}>
      {text}
    </Button>
  )
}

export default MyButton
