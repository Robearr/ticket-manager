import { CSSProperties, useContext } from "react";
import { useParams } from "react-router";
import { LoadingContext } from "../providers/LoadingProvider";

interface SiteViewProps {}

interface SiteViewParams {
  siteName: string
}

export const SiteView: React.FC<SiteViewProps> = ({}) => {
  const { setLoading } = useContext(LoadingContext);
  const { siteName } = useParams<SiteViewParams>();

  const siteMap: Record<string, string> = {
    arpy: 'http://arpy.dbx.hu/',
    youtrack: 'https://youtrack.dbx.hu/',
    redmine: 'https://redmine.dbx.hu/'
  };

  return (
    <div>
      <iframe src={siteMap[siteName]} style={frameStyle} onLoad={() => setLoading(false)}></iframe>
    </div>
  );
};

const frameStyle: CSSProperties = {
  position: 'absolute',
  width: '90%',
  height: '90%',
  margin: 0,
  padding: 0,
  overflow: 'hidden'
}
