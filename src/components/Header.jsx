import { useContext, useEffect, } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "./UserContext"

function Header() {
  const {setUserInfo,userInfo}=useContext(UserContext)
  useEffect(()=>{
    fetch('https://drab-hen-slippers.cyclic.app/profile',{
      credentials:'include'
    }).then(response=>{
      response.json().then(userInfo=>{
        setUserInfo(userInfo)
      })
    })
  },[])

  function logout(){
    fetch('https://backend-blog-jwod.onrender.com/logout',{
      credentials:'include',method:"POST"
    })
    setUserInfo(null)
  }
  const username=userInfo?.username
  return (
    <>
        <header className="flex justify-between items-center mb-[50px] mt-[20px] ">
            <Link to={'/'} className="font-bold text-[1.5rem] no-underline hover:text-blue-500 hover:animate-pulse transition-colors duration-300" >
            InkWell
            </Link>
            <nav className="flex gap-[15px]">
                {username&&(
                  <>
                    <Link className="text-black hover:underline hover:text-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition-colors duration-300" to={'/create'}>Create New Post</Link>
                    <Link className="text-black hover:underline hover:text-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition-colors duration-300" onClick={logout}>Logout</Link>
                  </>
                )}
                {!username && (
                  <>
                    <Link className="text-black hover:underline hover:text-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition-colors duration-300" to={'/login'}>Login</Link>
                    <Link className="text-black hover:underline hover:text-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition-colors duration-300" to={'/register'}>Register</Link>
                  </>
                )}
            </nav>
        </header>
    </>
  )
}

export default Header
