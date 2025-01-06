import Header from "../components/header.jsx"
import HomeCSS from"./home.module.css"
function Home(){
    return(
        <>
        <Header/>
        <div className={HomeCSS["Home-body"]}>
            <div ></div>

        </div>



        </>
    )
}
export default Home