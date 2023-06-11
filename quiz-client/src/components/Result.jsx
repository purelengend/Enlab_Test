import { useEffect, useState } from 'react'
import useStateContext from '../hooks/useStateContext'
import { ENDPOINTS, createAPIEndpoint } from '../api'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { getFormatedTime } from '../helper'
import congrate from '../assets/congrate.png'
import { useNavigate } from 'react-router-dom'

export default function Result() {
  const { context, setContext } = useStateContext()
  const [score, setScore] = useState(0)
  const [, setAnswers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const ids = context.selectedOptions.map((x) => x.questionId)
    createAPIEndpoint(ENDPOINTS.getAnswers)
      .post(ids)
      .then((res) => {
        const questionAnswers = context.selectedOptions.map((x) => {
          return {
            ...x,
            ...res.data.find((y) => y.questionId === x.questionId),
          }
        })

        setAnswers(questionAnswers)
        calculateScore(questionAnswers)
      })
      .catch((err) => console.log(err))
  }, [])

  const calculateScore = (inputAnswers) => {
    let tempScore = inputAnswers.reduce((acc, curr) => {
      return curr.answer === curr.selected ? acc + 1 : acc
    }, 0)

    setScore(tempScore)
  }

  const restart = () => {
    setContext({
      timeTaken: 0,
      selectedOptions: [],
    })
    navigate('/')
  }
  return (
    <>
      <Card
        sx={{
          mt: 5,
          background: '#1d1b1b',
          display: 'flex',
          width: '100%',
          maxWidth: 640,
          mx: 'auto',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CardContent sx={{ flex: '1 0 auto', textAlign: 'center' }}>
            <Typography variant='h4'>Congratulations!</Typography>
            <Typography variant='h6'> YOUR SCORE </Typography>
            <Typography variant='h5' sx={{ fontWeight: 600 }}>
              <Typography variant='span'>{score}/5</Typography>
            </Typography>
            <Typography variant='h6'>
              Took {getFormatedTime(context.timeTaken)}
            </Typography>
            <Button
              variant='outlined'
              sx={{ mx: 1, mt: 1 }}
              size='small'
              onClick={restart}
            >
              Re-try
            </Button>
          </CardContent>
        </Box>
        <CardMedia component='img' sx={{ width: 220 }} image={congrate} />
      </Card>
    </>
  )
}
