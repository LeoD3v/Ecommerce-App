import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/login')({
  component: LoginPage
})

export default function LoginPage(){
  return(
  <div>
    <h1 className='bg-red'>Hello /longin!</h1>

  </div>)
}