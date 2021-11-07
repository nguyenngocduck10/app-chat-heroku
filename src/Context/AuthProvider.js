import React, { useEffect, createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase/config";
import { Spin } from "antd";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubcribe = auth.onAuthStateChanged(user => {
            console.log('user', user)
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({ displayName, email, uid, photoURL });
                setIsLoading(false);
                history.push(["/", "/chat"].includes(window.location.pathname) ? window.location.pathname : "/");
                return;
            }// reset user info
            setUser({});
            setIsLoading(false);
            history.push('/login');
            // window.location.href = "/login";
        });
        //clean function
        return () => {
            unsubcribe();
        }
    }, [history]);

    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ? <Spin style={{ position: 'fixed', inset: 0 }} /> : children}
        </AuthContext.Provider>
    )
}