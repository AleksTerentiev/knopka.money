import React, { FC, ChangeEvent } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_ACCOUNT, GET_BALANCES } from 'queries'
import { GetAccount } from 'gql-types/GetAccount'
import { makeStyles, Theme, createStyles, Tabs, Tab } from '@material-ui/core'
import { useLocation, useHistory } from 'react-router-dom'

interface NavigationProps {
  vertical?: boolean
  color?: 'primary' | 'secondary'
}

export const Navigation: FC<NavigationProps> = ({ vertical, color = 'primary' }) => {
  const c = useStyles({ vertical, color })
  const { data: accountData } = useQuery<GetAccount>(GET_ACCOUNT)
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
      variant={vertical ? 'standard' : 'scrollable'}
      scrollButtons='on'
      classes={{ scrollButtons: c.scrollButtons }}
      orientation={vertical ? 'vertical' : 'horizontal'}
    >
      <Tab label='Инвестиции' value='/investments' className={c.tab} />
      {accountData && <Tab label='Пополнить' value='/refill' className={c.tab} />}
      <Tab label={'Рефералы'} value='/affiliate' className={c.tab} />
      {accountData && <Tab label='Вывод' value='/withdrawal' className={c.tab} />}
    </Tabs>
  )
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: ({ color }: any) => ({
      color:
        color === 'primary' ? theme.palette.primary.main : theme.palette.text.primary,
    }),
    tab: ({ vertical }: any) => ({
      '&:first-of-type': {
        paddingLeft: 0,
      },
      '&:last-of-type': {
        paddingRight: theme.spacing(vertical ? 0 : 3),
      },
    }),
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
          background: 'linear-gradient(to right, rgba(255,255,255,0), #fff)',
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
