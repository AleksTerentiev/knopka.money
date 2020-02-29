import React, { ChangeEvent } from 'react'
import { makeStyles, Theme, createStyles, Tabs, Tab } from '@material-ui/core'
import { useLocation, useHistory } from 'react-router-dom'

export const Navigation = () => {
  const c = useStyles({})
  const location = useLocation()
  const history = useHistory()

  function handleChange(e: ChangeEvent<{}>, route: string) {
    history.push(route)
  }

  return (
    <Tabs
      className={c.root}
      value={'/' + location.pathname.split('/')[1]}
      onChange={handleChange}
      TabIndicatorProps={{ hidden: true }}
      variant='scrollable'
      scrollButtons='on'
      classes={{ scrollButtons: c.scrollButtons }}
    >
      <Tab label='Инвестиции' value='/investments' className={c.tab} />
      <Tab label='Пополнить' value='/refill' className={c.tab} />
      <Tab label='Рефералы' value='/affiliate' className={c.tab} />
      <Tab label='Вывод' value='/withdrawal' className={c.tab} />
    </Tabs>
  )
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    tab: {
      [theme.breakpoints.down('xs')]: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
      },
      '&:last-of-type': {
        paddingRight: theme.spacing(3),
      },
    },
    scrollButtons: {
      width: '1.6rem',
      color: theme.palette.primary.light,
      '&:first-of-type': {
        display: 'none',
      },
      '&:last-of-type': {
        left: theme.spacing(0.5),
        position: 'relative',
        '&:before': {
          content: '""',
          background: 'linear-gradient(to right, rgba(0,0,0,0), rgba(255,255,255,1))',
          position: 'absolute',
          width: 20,
          right: 30,
          top: 0,
          bottom: 0,
        },
      },
    },
  })
)
