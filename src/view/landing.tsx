import React from 'react'
import { makeStyles, createStyles, Box } from '@material-ui/core'

export const Landing = () => {
  const c = useStyles({})

  return <Box className={c.root}></Box>
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    header: {},
  })
)
