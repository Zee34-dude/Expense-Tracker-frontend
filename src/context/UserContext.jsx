
import { onAuthStateChanged } from 'firebase/auth'
import { createContext, useState, useEffect } from 'react'
import { auth } from '../config/firebase'


export const UserContext = createContext({
    user: null,
    setUser: () => { },
    authInitialized: false,
    setAuthInitialized: () => { }

})

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [authInitialized, setAuthInitialized] = useState(false)

    const UserContextValue = {
        user,
        setUser,
        authInitialized, setAuthInitialized
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {

                setUser(firebaseUser);


            } else {
                setUser(null);
            }
            setAuthInitialized(true)
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, [auth]);

    return (
        <UserContext.Provider value={UserContextValue}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider