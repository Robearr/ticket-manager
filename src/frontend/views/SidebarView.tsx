import { Drawer, List, ListItem } from "@mui/material";
import { CSSProperties, useContext } from "react";
import { Link } from "react-router-dom";
import { SIDEBAR_WIDTH_PERCENTAGE } from "../constants";
import { LoadingContext } from "../providers/LoadingProvider";

interface SidebarViewProps {}

export const SidebarView: React.FC<SidebarViewProps> = () => {
  const { setLoading } = useContext(LoadingContext);
  const sites: Record<string, string> = {
    arpy: 'Arpy',
    youtrack: 'YouTrack',
    redmine: 'Redmine'
  };

  return (
    <Drawer
      anchor='left'
      open={true}
      variant="permanent"
      sx={{ width: `${SIDEBAR_WIDTH_PERCENTAGE}%` }}
    >
      <List sx={{ width: '100%' }}>
        {Object.keys(sites).map(
          (siteName) => (
            <ListItem key={`listItem-${siteName}`}>
              <Link
                to={`/site/${siteName}`}
                onClick={() => setLoading(true)}
                key={`siteName-${siteName}`}
                >
                  <img
                    src={`assets/images/${siteName}.png`}
                    title={sites[siteName]}
                    style={{ width: '5vw', height: '5vh' }}
                  />
                </Link>
            </ListItem>
          )
        )}
      </List>
    </Drawer>
  );
};

const styles: Record<string, CSSProperties> = {
  menuStyle: {
    display: 'flex',
    flexDirection: 'column'
  }
};