import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { LoadingProvider } from './providers/LoadingProvider';
import { SidebarView } from './views/SidebarView';
import { SiteView } from './views/SiteView';

function App() {
  return (
    <HashRouter>
      <LoadingProvider>
        <SidebarView />
        <Switch>
          <Route path='/site/:siteName' component={SiteView} />
          <Route exact path='/'>
            <Redirect to='/site/arpy' />
          </Route>
        </Switch>
      </LoadingProvider>
    </HashRouter>
  );
}

export default App;
