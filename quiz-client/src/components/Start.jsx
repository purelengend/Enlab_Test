import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import useStateContext from '../hooks/useStateContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Start() {
  const { setContext, resetContext } = useStateContext()
  const navigate = useNavigate()

  useEffect(() => {
    resetContext()
  }, [])
  return (
    <Card sx={{ width: 400, background: '#1d1b1b' }}>
      <CardContent>
        <Box
          sx={{
            '& .MuiButtonBase-root': {
              outline: 'none',
            },
          }}
        >
          <Typography variant='h2' sx={{ m: 1 }}>
            QUIZ APP
          </Typography>
          <Button
            variant='outlined'
            size='large'
            color='success'
            sx={{ outline: 'none' }}
            onClick={() => {
              setContext({})
              navigate('/quiz')
            }}
          >
            Play
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
