import React, { useMemo } from 'react'
import { makeStyles, Theme, createStyles, Box, Typography } from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'
import { CreateInvestment } from 'view/investments/create-investment'
import { Investment } from 'view/investments/investment'
import { orderBy } from 'lodash'
import { GET_INVESTMENTS } from 'queries'
import { GetInvestments } from 'gql-types/GetInvestments'

export const Investments = () => {
  const c = useStyles({})
  const { data } = useQuery<GetInvestments>(GET_INVESTMENTS)

  const sortedInvestments = useMemo(() => {
    return data ? orderBy(data.investments, ['createdAt'], ['desc']) : []
  }, [data])

  return (
    <Box>
      <Typography className={c.header} variant='h2'>
        Инвестиции
      </Typography>

      <Box className={c.createInvestment}>
        <CreateInvestment secondary />
      </Box>

      {sortedInvestments.length > 0 && (
        <Box mt={4}>
          <Typography variant='h5' style={{ marginBottom: 14 }}>
            Мои депозиты
          </Typography>
          {sortedInvestments.map(investment => (
            <Box className={c.investment} key={investment.id}>
              <Investment {...investment} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        marginBottom: theme.spacing(3),
      },
      [theme.breakpoints.up('md')]: {
        marginBottom: theme.spacing(4),
      },
    },
    createInvestment: {
      maxWidth: 544,
      borderRadius: theme.shape.borderRadius * 2.5,
      ['@media(min-width:360px)']: {
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(3),
      },
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6),
        borderWidth: 2,
      },
    },
    investment: {
      marginBottom: theme.spacing(2),
    },
  })
)
