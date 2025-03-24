import { createFileRoute, redirect } from '@tanstack/react-router'
import App from '../App'

export const Route = createFileRoute('/')({
    loader: () => {
        const formData = localStorage.getItem("auth")
        if (!formData) {
            throw redirect({
                to: '/login',
            })
        }
    },
    component: App,
})
