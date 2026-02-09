import { createContext, useContext , useEffect, useState } from "react";
import api from "../api/axios"

const AuthContext = createContext(null);

export const AuthProvider = ({children})=>{
    const [user , setUser]= useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchUser = async ()=>{
            try{
                const res = await api.get("users/current-user");
                setUser(res.data.data)
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser()
    }, []);

    const login = async (data)=>{
        const res = await api.post("/users/login", data);
        setUser(res.data.data.user);
    }

    const logout = async () => {
    await api.post("/users/logout");
    setUser(null);
  };

  return(
    <AuthContext.Provider value= {{user, login, logout ,loading}}>
        {children}
    </AuthContext.Provider>
  )

}

export const useAuth =() => useContext(AuthContext);

