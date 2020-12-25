import React from 'react'
import { useInvestments } from 'gql'
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  Card,
  Typography,
  Divider,
} from '@material-ui/core'
import { CreateInvestment } from 'components/investments/create-investment'
import { Investment } from 'components/investments/investment'
import { useGlobalStyles } from 'styles'

export const InvestmentsPage = () => {
  const { investments, refetch: refetchInvestments } = useInvestments()

  const gc = useGlobalStyles({})
  const c = useStyles()

  return (
    <Box className={gc.page}>
      <Box>
        <Typography variant='h2' gutterBottom>
          Инвестиции
        </Typography>

        <Card className={c.createInvestment}>
          <CreateInvestment secondary />
        </Card>
      </Box>

      <Box>
        <Typography variant='h3' gutterBottom={investments.length > 0}>
          <Box display='flex' alignItems='center' justifyContent='space-between'>
            <span>Депозиты</span>
            <span className={c.investmentsCount}>{investments.length || ''}</span>
          </Box>
        </Typography>
        {investments.length > 0 ? (
          <Box mt={1}>
            <Divider className={c.divider} />
            <Box className={c.investments}>
              {investments.map(investment => (
                <Box key={investment.id}>
                  <Investment {...investment} onTimerEnds={() => refetchInvestments()} />
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
