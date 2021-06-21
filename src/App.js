import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Login from "./components/Login/Login";
import Home from './components/Home/Home';
import AuthUserProvider from "./context/authUser";

function App() {
    return (
        <AuthUserProvider>
            <Router>
                <Switch>
                    <Redirect exact to="/home" from="/" />
                    <Route path="/login" component={Login} />
                    <Route path="/home" component={Home}/>
                </Switch>
            </Router>
        </AuthUserProvider>
    );
}

export default App;
