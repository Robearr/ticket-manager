import { CSSProperties } from "@emotion/serialize";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { AppBar, Toolbar } from "@mui/material";
import { APPBAR_HEIGHT_PERCENTAGE, SIDEBAR_WIDTH_PERCENTAGE } from "../constants";
import { HistoryButton } from "./HistoryButton";

interface HistoryProps {}

export const History: React.FC<HistoryProps> = () => {
  return (
    <AppBar sx={styles.barStyle}>
      <Toolbar sx={styles.toolbarStyle}>
        <HistoryButton icon={faArrowLeft} direction='back' />
        <HistoryButton icon={faArrowRight} direction='forward' />
      </Toolbar>
    </AppBar>
  );
};

const styles: Record<string, CSSProperties> = {
  barStyle: {
    background: 'none',
    boxShadow: 'none',
    color: 'black',
    left: `${SIDEBAR_WIDTH_PERCENTAGE}%`,
    height: `${APPBAR_HEIGHT_PERCENTAGE}%`,
    zIndex: 0
  },
  toolbarStyle: {
    alignItems: 'flex-start',
    display: 'flex',
    paddingTop: '0.5%',
    zIndex: 0
  }
};