import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { useParams } from "react-router";
import { LoadingContext } from "../providers/LoadingProvider";

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

