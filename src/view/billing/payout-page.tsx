import React, { useState } from 'react'
import { usePayoutMethods } from 'gql'
import { GetPayoutMethods_payoutMethods } from 'gql/types/GetPayoutMethods'
import { createStyles, makeStyles, Theme, Box, Card, Typography } from '@material-ui/core'
import { useGlobalStyles } from 'styles'
import visaMastercardImg from 'img/billing/visa-mastercard.svg'
import qiwiImg from 'img/billing/qiwi.svg'
import yandexMoneyImg from 'img/billing/yandex-money.svg'
import { PayoutCreate } from './payout-create'
import { PayoutsList } from './payouts-list'
import { Modal } from 'view/modal'

export const PayoutPage = () => {
  const gc = useGlobalStyles({})
  const c = useStyles({})
  const { payoutMethods } = usePayoutMethods()
  const [method, setMethod] = useState<GetPayoutMethods_payoutMethods>()
  const [createModalOpen, setCreateModalOpen] = useState(false)

  const handleMethodClick = (method: GetPayoutMethods_payoutMethods) => {
    setMethod(method)
    setCreateModalOpen(true)
  }

  const handleCreateModalClose = () => {
    setMethod(undefined)
    setCreateModalOpen(false)
  }

  return (
    <Box className={gc.page}>
      <Box>
        <Typography variant='h2' gutterBottom>
          Вывести Деньги
        </Typography>
        <Box className={c.methods}>
          {payoutMethods.map(method => (
            <Card
              key={method.id}
              className={c.method}
              onClick={() => handleMethodClick(method)}
            >
              {method.id === 'VISA/MASTERCARD' ? (
                <img src={visaMastercardImg} alt={method.id} />
              ) : method.id === 'QIWI' ? (
                <img src={qiwiImg} alt={method.id} />
              ) : method.id === 'YANDEX.MONEY' ? (
                <img src={yandexMoneyImg} alt={method.id} />
              ) : (
                <Typography>{method.id}</Typography>
              )}
            </Card>
          ))}
        </Box>
      </Box>

      <PayoutsList />

      {method && (
        <Modal
          open={createModalOpen}
          onClose={handleCreateModalClose}
          header={<Box mr={10}>Вывод Средств</Box>}
        >
          <PayoutCreate method={method} />
        </Modal>
      )}
    </Box>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    methods: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridAutoRows: 98,
      gridGap: 16,
      [theme.breakpoints.between('sm', 'md')]: {
        gridTemplateColumns: '1fr 1fr 1fr',
      },
      [theme.breakpoints.up('md')]: {
        gridAutoRows: 160,
        gridGap: 32,
      },
    },
    method: {
      cursor: 'pointer',
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& > img': {
        maxWidth: '75%',
      },
    },
  })
)
