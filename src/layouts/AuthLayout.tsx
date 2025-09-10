import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
export default function AuthLayout() {
    return (
        <div className="max-w-xs mx-auto min-h-screen flex flex-col justify-center items-center">
           <main className='w-full space-y-10'>
                <Outlet />
           </main>

            <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
        </div>
    )
}