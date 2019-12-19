import React, { FC } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { AccountData, GET_ACCOUNT } from 'store/account';
import { useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';

export interface TmpltProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Tmplt: FC<TmpltProps> = ({ ...props }) => {
  const c = useStyles({});
  const { t } = useTranslation();
  const { data } = useQuery<AccountData>(GET_ACCOUNT);

  return <Box {...props}></Box>;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);
