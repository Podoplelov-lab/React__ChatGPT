import { createFileRoute, redirect } from '@tanstack/react-router'
import Login from '../components/Login/Login'

export const Route = createFileRoute('/login')({
    loader: () => {
        const formData = localStorage.getItem("auth")
        if (formData) {
            throw redirect({
                to: '/',
            })
        }
    },
    component: Login,
})
