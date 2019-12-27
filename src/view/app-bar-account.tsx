import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
// import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import { LogoutLink } from 'view/account/logout-link';

export const AppBarAccount: React.FC<{ displayName: string }> = ({ displayName }) => {
  const c = useStyles({});
  // const { t } = useTranslation();

  const [popoverAnchorEl, setPopoverAnchorEl] = React.useState<null | HTMLElement>(null);
  const popoverIsOpen = Boolean(popoverAnchorEl);
  function handleAccountPopupOpen(event: React.MouseEvent<HTMLElement>) {
    setPopoverAnchorEl(event.currentTarget);
  }
  function handlePopupClose() {
    setPopoverAnchorEl(null);
  }

  return (
    <>
      <Button
        className={c.root}
        variant="text"
        color="inherit"
        aria-controls="account-popup"
        aria-haspopup="true"
        onClick={handleAccountPopupOpen}
      >
        <span role="img" aria-label="Account" className={c.icon}>
          👤
        </span>
        {/* <FontAwesomeIcon icon={faUser} className={c.icon} /> */}
        {displayName}
      </Button>
      <Popover
        id="account-popup"
        anchorEl={popoverAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        keepMounted
        open={popoverIsOpen}
        onClose={handlePopupClose}
      >
        <LogoutLink onClick={handlePopupClose} />
      </Popover>
    </>
  );
};

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    icon: {
      fontSize: '0.9rem',
      marginRight: 6,
      color: '#737373',
    },
  })
);
