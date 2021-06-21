import {createContext, useState} from 'react';

export const AuthUserContext = createContext();

const StoreProvider = ({children}) => {
const [loginToken, setLoginToken] = useState(localStorage.getItem('loginToken'))
    return(
        <AuthUserContext.Provider value={{
            loginToken,
            setLoginToken
        }}>
            {children}
        </AuthUserContext.Provider>
    )    
};

export default StoreProvider;