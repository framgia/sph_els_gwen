import React, { ReactNode } from 'react';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import AccountCardGroup from './components/AccountCardGroup';
import Nav from './components/Nav';

class App extends React.Component {
    state = {
        isUserAuthenticated: false
    };

  render() {
    return (      
        <Router>
          <Routes>
            <Route
              path='/*'
              element={
                this.state.isUserAuthenticated ? (
                  <Nav />
                ) : (
                  <AccountCardGroup isLogin={true} />
                )
              }
            />
            <Route
              path='/register'
              element={<AccountCardGroup isLogin={false} />}
            />
          </Routes>
        </Router>
    );
   
  };
}

export default App;
