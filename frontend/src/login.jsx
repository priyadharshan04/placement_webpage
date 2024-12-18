import UserLogin from "./components/login.component.jsx";

function Login(){
    const style={
        body: {
          
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
         
          }
        
    }
    return(
        <div style={style.body}>
     

        <UserLogin/>
        </div>
        
    )
}

export default Login;