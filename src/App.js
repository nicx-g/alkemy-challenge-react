import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Login from "./components/Login/Login";
import Home from './components/Home/Home';
import AuthUserProvider from "./context/authUser";
import HeroesProvider from './context/heroes';
import SearchingCharacters from "./components/SearchingCharacters/SearchingCharacters";
import CharacterPreview from './components/CharacterPreview/CharacterPreview';

function App() {
    return (
        <AuthUserProvider>
            <HeroesProvider>
                <Router>
                    <Switch>
                        <Redirect exact to="/home" from="/" />
                        <Route path="/login" component={Login} />
                        <Route path="/home" component={Home}/>
                        <Route path={`/search/:heroesNames`} component={SearchingCharacters}/>
                        <Route path={`/character/:characterId`} component={CharacterPreview}/>
                    </Switch>
                </Router>
            </HeroesProvider>
        </AuthUserProvider>
    );
}

export default App;
