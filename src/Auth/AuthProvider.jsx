
import { createContext, useEffect, useState } from "react";
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../Firebase/firebase.config";

export const AuthContext = createContext(null) ;

const AuthProvider = ({children}) => {

    const [user , setUser] = useState(null) ;
    const [loading , setLoading] = useState(true) ;

    const createUser = (email , pass) => {
        setLoading(true) ;
        return createUserWithEmailAndPassword(auth , email , pass) ;
    }

    const setProfile = (name , photo) => {
        setLoading(true) ;
        return updateProfile(auth.currentUser , {
            displayName : name ,
            photoURL : photo ,
        })
    }

    const signIn = (email , pass) => {
        setLoading(true) ;
        return signInWithEmailAndPassword(auth , email , pass) ;
    }

    const googleLogin = () => {
        setLoading(true) ;
        const googleProvider = new GoogleAuthProvider() ;
        return signInWithPopup(auth , googleProvider) ;
    }
    
    const githubLogin = () => {
        setLoading(true) ;
        const gitHubProvider = new GithubAuthProvider() ;
        return signInWithPopup(auth , gitHubProvider) ;
    }
    
    const logOut = () => {
        setLoading(true) ;
        return signOut(auth) ;
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth , (currentUser) => {
            setLoading(false) ;
            setUser(currentUser) ;
        })
        return unSubscribe ;
    } , [])

    const authInfo = {
        user ,
        logOut,
        signIn ,
        loading ,
        setProfile,
        createUser ,
        githubLogin ,
        googleLogin ,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
