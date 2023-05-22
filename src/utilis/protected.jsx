import Cookies from "js-cookie";
import 'react'
import { Navigate, Outlet } from "react-router-dom";

// export const RequireLoginAdmin = () => {
//     const token = Cookies.get("admin_jwt");
    
//     return(
        
    
//         token ? <Outlet/> : <Navigate to="/" />

//     )
// };

export  function AuthorizeAdmin({children}){
    const token = Cookies.get("admin_jwt");

    if(!token) return <Navigate to={'/'}/>

    return children
}

export  function ProtectAdmin({children}){
    const token = Cookies.get("admin_jwt");


    if(token) return <Navigate to={'/admin_home'}/>

    return children;

}