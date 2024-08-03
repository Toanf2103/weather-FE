import { Outlet } from 'react-router-dom'
import Header from '@/components/Partials/Site/Header'

const MainLayout = () => {
  return (
    <div className="wrapper bg-gray-200 text-slate-200">
      <Header />
      <main className="pt-10 min-h-screen duration-200 bg-[#E3F2FD]">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
