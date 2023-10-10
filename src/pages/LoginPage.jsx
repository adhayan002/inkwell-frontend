import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect,setRedirect]=useState(false)
  const {setUserInfo}=useContext(UserContext)
  async function login(ev) {
    ev.preventDefault();
    const response = await fetch('https://drab-hen-slippers.cyclic.app/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
    });
    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert('wrong credentials');
    }
  }
  if(redirect===true){
    return <Navigate to={'/'}/>
  }
  return (
    <>
        <form className='max-w-[400px] mx-auto my-0 box-border' onSubmit={login}>
            <h1 className='mb-[20px] text-center'>LOGIN PAGE</h1>
            <input className='block mb-[10px] w-full py-[5px] px-[7px] bg-[#fff] border-[#ddd] rounded-[5px] active:border-b-1'
              type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
            <input className='block mb-[10px] w-full py-[5px] px-[7px] bg-[#fff] border-[#ddd] rounded-[5px]'
              type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button className="py-2 w-full border duration-300 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-md transition-colors hover:animate-pulse">
            Login</button>
        </form>
    </>
  )
}

export default LoginPage
