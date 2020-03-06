import React, { useMemo } from 'react'
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  Card,
  Typography,
  Divider,
} from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'
import { CreateInvestment } from 'view/investments/create-investment'
import { Investment } from 'view/investments/investment'
import { orderBy } from 'lodash'
import { GET_INVESTMENTS } from 'queries'
import { GetInvestments } from 'gql-types/GetInvestments'
import { useGlobalStyles } from 'styles'
import clsx from 'clsx'

export const Investments = () => {
  const gc = useGlobalStyles({})
  const c = useStyles({})
  const { data } = useQuery<GetInvestments>(GET_INVESTMENTS)

  const sortedInvestments = useMemo(() => {
    return data ? orderBy(data.investments, ['createdAt'], ['desc']) : []
  }, [data])

  return (
    <Box className={gc.page}>
      <Box>
        <Typography variant='h2' gutterBottom>
          Инвестиции
        </Typography>

        <Card className={clsx(gc.card, c.createInvestment)}>
          <CreateInvestment secondary />
        </Card>
      </Box>

      <Box>
        <Typography variant='h3' gutterBottom={sortedInvestments.length > 0}>
          <Box display='flex' alignItems='center' justifyContent='space-between'>
            <span>Депозиты</span>
            <span className={c.investmentsCount}>{sortedInvestments.length || ''}</span>
          </Box>
        </Typography>
        {sortedInvestments.length > 0 ? (
          <Box mt={1}>
            <Divider className={c.divider} />
            <Box className={c.investments}>
              {sortedInvestments.map(investment => (
                <Box key={investment.id}>
                  <Investment {...investment} />
                </Box>
              ))}
            </Box>
          </Box>
        ) : (
          <Box fontWeight='fontWeightMedium' color='text.hint' mt={1}>
            <Typography>Депозитов не найдено</Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    createInvestment: {
      maxWidth: 544,
      '@media(max-width:359px)': {
        border: 'none',
        padding: 0,
        borderRadius: 0,
      },
    },
    divider: {
      display: 'none',
      [theme.breakpoints.up('lg')]: {
        marginBottom: theme.spacing(4),
        display: 'block',
      },
    },
    investments: {
      [theme.breakpoints.up('lg')]: {
        maxHeight: 620,
        overflowY: 'scroll',
      },
    },
    investmentsCount: {
      color: theme.palette.grey[500],
    },
  })
)
