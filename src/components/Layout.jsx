import { Outlet } from "react-router-dom"
import Header from "./Header"

function Layout() {
  return (
    <main className="p-2.5 max-w-[600px] mx-auto text-xl">
        <Header/>
        <Outlet/>
    </main>
  )
}

export default Layout