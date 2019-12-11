import React, { FC } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { AccountData, GET_ACCOUNT } from 'store/account';
import { useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Drawer from '@material-ui/core/Drawer';
import { Navigation } from './navigation';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { LogoutLink } from 'view/auth/logout-link';
import MuiLink from '@material-ui/core/Link';
import { Link } from '@reach/router';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const BurgerMenu: FC<Props> = ({ ...otherProps }) => {
  const c = useStyles({});
  const { t } = useTranslation();
  const { data } = useQuery<AccountData>(GET_ACCOUNT);
  const [isOpen, setIsOpen] = React.useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <Box {...otherProps}>
      <IconButton edge="end" color="inherit" aria-label="menu" onClick={open}>
        <FontAwesomeIcon icon={faBars} size="xs" />
      </IconButton>

      <Drawer anchor="right" open={isOpen} onClose={close} classes={{ paper: c.menu }}>
        <Box p={1.5} pb={2.5}>
          {data ? (
            <Box className={c.account}>
              <Avatar src={data.account.picture} className={c.avatar} />
              <Box ml={2}>
                <Typography variant="h6">{data.account.displayName}</Typography>
                <Box ml={-1}>
                  <LogoutLink size="small" onClick={close} />
                </Box>
              </Box>
            </Box>
          ) : (
            <MuiLink component={Link} to="/auth" onClick={close}>
              {t('Login')}
            </MuiLink>
          )}
        </Box>

        <Divider />
        <Box my={2}>
          <Navigation vertical onNavigate={close} />
        </Box>
      </Drawer>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menu: {
      padding: theme.spacing(2),
      minWidth: '240px',
    },
    account: {
      display: 'flex',
      alignItems: 'center',
    },
    avatar: {
      width: 50,
      height: 50,
    },
    logoutLinkLabel: {
      border: '1px solid #ddd',
    },
  })
);
