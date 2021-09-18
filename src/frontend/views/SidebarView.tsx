import { CSSProperties, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoadingContext } from "../providers/LoadingProvider";

interface SidebarViewProps {}

export const SidebarView: React.FC<SidebarViewProps> = () => {
  const { setLoading } = useContext(LoadingContext);
  const sites: string[] = ['arpy', 'youtrack', 'redmine'];

  return (
    <div style={styles.menuStyle}>
      {sites.map(
        (siteName) => <Link
          to={`/site/${siteName}`}
          onClick={() => setLoading(true)}
          key={`siteName-${siteName}`}
          >
            {siteName}
          </Link>
      )}
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  menuStyle: {
    display: 'flex',
    flexDirection: 'column'
  }
};