import {createContext, useState} from 'react'

export const FirebaseContext = createContext(null)

export const AuthContext = createContext(null)


export default function Context({children}){
    const [user,setUser] = useState(null);
    const [sample,setSample] = useState(null)

    return(
        <AuthContext.Provider value={{user,setUser,sample,setSample}}>
            {children}
        </AuthContext.Provider>
    )
}