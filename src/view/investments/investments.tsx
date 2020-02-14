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
      <Box mb={4}>
        <Typography variant='h2'>
          Инвестиции
        </Typography>
      </Box>

      <CreateInvestment />
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
    investment: {
      marginBottom: theme.spacing(2),
    },
  })
)
