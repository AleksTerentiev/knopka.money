import React, { useMemo } from 'react'
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  Typography,
  Divider,
} from '@material-ui/core'
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
    <Box className={c.root}>
      <Box>
        <Typography variant='h2' gutterBottom>
          Инвестиции
        </Typography>

        <Box className={c.createInvestment}>
          <CreateInvestment secondary />
        </Box>
      </Box>

      <Box mt={1}>
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
                <Box className={c.investment} key={investment.id}>
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
    root: {
      [theme.breakpoints.up('lg')]: {
        display: 'grid',
        gridTemplateColumns: 'minmax(auto, 540px) minmax(auto, 448px)',
        gridGap: '9vw',
      },
      [theme.breakpoints.up('xl')]: {
        gridGap: theme.spacing(16),
      },
    },
    createInvestment: {
      maxWidth: 544,
      borderRadius: theme.shape.borderRadius * 2.5,
      marginBottom: theme.spacing(5),
      '@media(min-width:360px)': {
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(3),
      },
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
        marginBottom: theme.spacing(8),
      },
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(6),
        marginBottom: theme.spacing(12),
        borderWidth: 2,
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
    investment: {
      marginBottom: theme.spacing(2),
    },
  })
)
