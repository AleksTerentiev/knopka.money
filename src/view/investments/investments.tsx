import React, { FC, useMemo } from 'react';
import { RouteComponentProps } from '@reach/router';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import { InvestmentsData, GET_INVESTMENTS } from 'store/investments';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { CreateInvestment } from 'view/investments/create-investment';
import { Investment } from 'view/investments/investment';
import { orderBy } from 'lodash';

export const Investments: FC<RouteComponentProps> = () => {
  const c = useStyles({});
  const { data } = useQuery<InvestmentsData>(GET_INVESTMENTS);

  const sortedInvestments = useMemo(() => {
    return data ? orderBy(data.investments, ['createdAt'], ['desc']) : [];
  }, [data]);

  return (
    <Box py={2}>
      <Container>
        <CreateInvestment />
        {sortedInvestments.length > 0 && (
          <Box mt={4}>
            <Typography variant="h5" style={{ marginBottom: 14 }}>
              Мои депозиты
            </Typography>
            {sortedInvestments.map(investment => (
              <Box className={c.investment} key={investment.id}>
                <Investment investment={investment} />
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    investment: {
      marginBottom: theme.spacing(2),
    },
  })
);
