import React, { FC } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { AccountData, GET_ACCOUNT } from 'store/account';
import { useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Template: FC<Props> = ({ ...otherProps }) => {
  const c = useStyles({});
  const { t } = useTranslation();
  const { data } = useQuery<AccountData>(GET_ACCOUNT);

  return <Box {...otherProps}></Box>;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);
