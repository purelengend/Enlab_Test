// import useStateContext from '../hooks/useStateContext'

import { useEffect, useState } from 'react'
import { ENDPOINTS, createAPIEndpoint } from '../api'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
  List,
  ListItemButton,
  Typography,
} from '@mui/material'
import { getFormatedTime } from '../helper'
import useStateContext from '../hooks/useStateContext'
import { useNavigate } from 'react-router-dom'

export default function Quiz() {
  const [questions, setQuestions] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [timeTaken, setTimeTaken] = useState(0)
  const { context, setContext } = useStateContext()
  const navigate = useNavigate()
  let timer

  const startTime = () => {
    timer = setInterval(() => {
      setTimeTaken((prev) => prev + 1)
    }, [1000])
  }
  useEffect(() => {
    setContext({
      timeTaken: 0,
      selectedOptions: [],
    })
    createAPIEndpoint(ENDPOINTS.question)
      .fetch()
      .then((res) => {
        setQuestions(res.data)
        startTime()
      })
      .catch((err) => console.log(err))
    return () => {
      clearInterval(timer)
    }
  }, [])

  const updateAnswer = (questionId, optionIndex) => {
    const temp = [...context.selectedOptions]
    temp.push({
      questionId,
      selected: optionIndex,
    })

    if (questionIndex < 4) {
      setContext({ selectedOptions: [...temp] })
      setQuestionIndex(questionIndex + 1)
    } else {
      setContext({ selectedOptions: [...temp], timeTaken })
      navigate('/result')
    }
  }
  return questions.length != 0 ? (
    <Card
      sx={{
        background: '#1d1b1b',
        maxWidth: 640,
        mx: 'auto',
        mt: 5,
        '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' },
      }}
    >
      <CardHeader
        className='white-text'
        title={'Question ' + (questionIndex + 1) + ' of 5'}
        action={<Typography>{getFormatedTime(timeTaken)}</Typography>}
      />
      <Box>
        <LinearProgress
          variant='determinate'
          value={((questionIndex + 1) * 100) / 5}
        />
      </Box>
      <CardContent>
        <Typography variant='h6'>
          {questions[questionIndex].questionInWords}
        </Typography>
        <List>
          {questions[questionIndex].options.map((item, index) => (
            <ListItemButton
              key={index}
              disableRipple
              onClick={() =>
                updateAnswer(questions[questionIndex].questionId, index)
              }
            >
              <div className='white-text'>
                <b>{String.fromCharCode(65 + index) + '. '}</b> {item}
              </div>
            </ListItemButton>
          ))}
        </List>
      </CardContent>
    </Card>
  ) : null
}
