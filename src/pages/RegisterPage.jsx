import { useState } from 'react';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function register() {
        const response=await fetch("https://backend-blog-jwod.onrender.com/register", {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
        });
        if(response.status==200){
            alert("Registration Successful")
        }else{
            alert("Registration Failed")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        register(); 
    };

    return (
        <>
            <form className='max-w-[350px] mx-auto my-0 box-border' onSubmit={handleSubmit}>
                <h1 className='mb-[20px] text-center'>REGISTER PAGE</h1>
                <input className='block mb-[10px] w-full py-[5px] px-[7px] bg-[#fff] border-[#ddd] rounded-[5px] active:border-b-1'
                    type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
                <input className='block mb-[10px] w-full py-[5px] px-[7px] bg-[#fff] border-[#ddd] rounded-[5px]'
                    type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button className="py-2 w-full border duration-300 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-md transition-colors hover:animate-pulse">
                Register</button>
            </form>
        </>
    )
}

export default RegisterPage;
