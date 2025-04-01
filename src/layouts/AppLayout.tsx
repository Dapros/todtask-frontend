import { Outlet } from 'react-router-dom'
import Logo from '../components/Logo'


export default function AppLayout() {
  return (
    <>
      <header className='bg-teal-800 py-5'>
        <div className='max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
          <div className='w-52'>
            <Logo />
          </div>
        </div>


      </header>

      <main className='max-w-screen-2xl mx-auto mt-10 p-5'>
        <Outlet /> 
      </main>

      <footer className='py-5'>
        <p className='text-center'>
          Todos los derechos reservados {new Date().getFullYear()}
        </p>
      </footer>
    </>
  )
}
