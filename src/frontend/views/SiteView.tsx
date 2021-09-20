import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { LoadingContext } from "../providers/LoadingProvider";
import { Ticket } from "../types/Ticket";

interface SiteViewProps {}

interface SiteViewParams {
  siteName: string
}

export const SiteView: React.FC<SiteViewProps> = ({}) => {
  const { isLoading, setLoading } = useContext(LoadingContext);
  const { siteName } = useParams<SiteViewParams>();

  const siteMap: Record<string, string> = {
    arpy: 'http://arpy.dbx.hu/',
    youtrack: 'https://youtrack.dbx.hu/',
    redmine: 'https://redmine.dbx.hu/'
  };

  useEffect(() => {
    window.addEventListener('message', (evt: MessageEvent) => {
      if (evt.data && typeof evt.data === 'string') {
        const parsedMessage: Ticket = JSON.parse(evt.data);

        // @ts-ignore
        window.electron.notificationApi.sendNotification({ ...parsedMessage, siteName });
        console.log('sent');
      }
    });
  }, []);

  return (
    <Box sx={{width: '100vw', height: '97vh', pr: 2}} style={isLoading ? { display: 'flex', justifyContent: 'center', alignItems: 'center' } : {}}>
      <iframe
        src={siteMap[siteName]}
        onLoad={() => setLoading(false)}
        style={{ width: '100%', height: '100%', display: isLoading ? 'none' : 'block' }}
      />
      {isLoading ?
        <CircularProgress /> :
        null
      }
    </Box>
  );
};

