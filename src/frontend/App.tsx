import { Box } from '@mui/system';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { LoadingProvider } from './providers/LoadingProvider';
import { History } from './ui/History';
import { Sidebar } from './ui/Sidebar';
import { SiteView } from './views/SiteView';

function App() {
  return (
    <HashRouter>
      <LoadingProvider>
        <Box sx={{ display: 'flex' }}>
          <History />
          <Sidebar />
          <Switch>
            <Route path='/site/:siteName' component={SiteView} />
            <Route exact path='/'>
              <Redirect to='/site/arpy' />
            </Route>
          </Switch>
        </Box>
      </LoadingProvider>
    </HashRouter>
  );
}

export default App;
