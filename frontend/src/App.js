//material ui core components
import {CssBaseline} from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
//importing external files
import Home from './components/home';
import AccessPage from './components/user/customAppBar';
import Register from './components/log/signUp';
import ResetPasswordPage from './components/resetpasspage';

import { Route,Switch, BrowserRouter} from 'react-router-dom';

function App() {
  return(

  
  <div className="App"> 
     
      <BrowserRouter>
      <CssBaseline />
      <Switch>
         <Route path='/' exact render={()=> <Home/>}/>
         <Route path='/Register' exact render={()=> <Register/>}/>
         <Route path='/:role/:id' exact render={()=> <AccessPage/>}/>
         <Route path='/:role/reset-password/:token' exact render={()=> <ResetPasswordPage />} />
      </Switch>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
