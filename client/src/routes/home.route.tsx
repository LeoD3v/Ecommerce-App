import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/home')({
  component: () => <div>Hello /home!</div>
})