import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ROUTES } from '@/config/routes'
import { Home } from '@/pages/Site/Home'

const MainLayout = lazy(() => import('@/components/Layouts/Site/MainLayout'))

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
    ],
  },
])

const Routes = () => {
  return <RouterProvider router={router} />
}

export default Routes
