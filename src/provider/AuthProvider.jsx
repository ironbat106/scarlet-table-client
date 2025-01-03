import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // console.log(loading, user);

    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth, googleProvider);
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const updateUserProfile = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    };

    const authInfo = {
        user,
        setUser,
        createNewUser,
        logOut,
        userLogin,
        loading,
        updateUserProfile,
        googleSignIn,
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('state captured', currentUser?.email)
            if (currentUser?.email) {
                const user = { email: currentUser.email };

                axios.post('https://restuarant-server-theta.vercel.app/jwt', user, { withCredentials:true })
                .then(res => {
                    console.log('login token', res.data);
                    setLoading(false);
                })
            }
            else{
                axios.post('https://restuarant-server-theta.vercel.app/logout', {}, {
                    withCredentials: true
                })
                .then(res => {
                    console.log('logout token', res.data);
                    setLoading(false);
                })
            }

        });
        return () => {
            unsubscribe();
        };
    }, [])

    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;