import { RouteObject } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import DashboardPage from '../pages/Dashboard'
import SettingPage from '../pages/Setting'
import NotFoundPage from '../pages/Other/NotFoundPage'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: 'setting',
        element: <SettingPage />
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]
