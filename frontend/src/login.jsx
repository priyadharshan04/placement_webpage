import UserLogin from "./components/login.component.jsx";

function Login(){
    const style={
        body: {
          
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
           
         
          }
        
    }
    return(
        <div style={style.body}>
     

        <UserLogin/>
        </div>
        
    )
}

export default Login;