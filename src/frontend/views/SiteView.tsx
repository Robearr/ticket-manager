import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useRef } from "react";
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
  const frameRef = useRef<HTMLIFrameElement>(null);

  const siteMap: Record<string, string> = {
    arpy: 'http://arpy.dbx.hu/',
    youtrack: 'https://youtrack.dbx.hu/',
    redmine: 'https://redmine.dbx.hu/'
  };

  useEffect(() => {
    window.addEventListener('message', (evt: MessageEvent) => {
      if (evt.data && typeof evt.data === 'string') {
        if (siteName === 'youtrack') {
          const parsedMessage: Ticket = JSON.parse(evt.data);
          // @ts-ignore
          window.electron.notificationApi.saveTicket(parsedMessage);
        } else if (siteName === 'arpy') {
          // @ts-ignore
          frameRef.current?.contentWindow?.postMessage(window.electron.notificationApi.getWork(JSON.parse(evt.data).date), '*');
        }
      }
    });
  }, [siteName]);

  return (
    <Box sx={{width: '100vw', height: '97vh', pr: 2}} style={isLoading ? { display: 'flex', justifyContent: 'center', alignItems: 'center' } : {}}>
      <iframe
        src={siteMap[siteName]}
        onLoad={() => setLoading(false)}
        ref={frameRef}
        style={{ width: '100%', height: '100%', display: isLoading ? 'none' : 'block' }}
      />
      {isLoading ?
        <CircularProgress /> :
        null
      }
    </Box>
  );
};

