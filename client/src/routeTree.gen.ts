/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SignupRouteImport } from './routes/signup.route'
import { Route as LogoutRouteImport } from './routes/logout.route'
import { Route as LoginRouteImport } from './routes/login.route'
import { Route as DashboardRouteImport } from './routes/dashboard.route'
import { Route as IndexRouteImport } from './routes/index.route'

// Create/Update Routes

const SignupRouteRoute = SignupRouteImport.update({
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any)

const LogoutRouteRoute = LogoutRouteImport.update({
  path: '/logout',
  getParentRoute: () => rootRoute,
} as any)

const LoginRouteRoute = LoginRouteImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const DashboardRouteRoute = DashboardRouteImport.update({
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const IndexRouteRoute = IndexRouteImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardRouteImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginRouteImport
      parentRoute: typeof rootRoute
    }
    '/logout': {
      id: '/logout'
      path: '/logout'
      fullPath: '/logout'
      preLoaderRoute: typeof LogoutRouteImport
      parentRoute: typeof rootRoute
    }
    '/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupRouteImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRouteRoute,
  DashboardRouteRoute,
  LoginRouteRoute,
  LogoutRouteRoute,
  SignupRouteRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/dashboard",
        "/login",
        "/logout",
        "/signup"
      ]
    },
    "/": {
      "filePath": "index.route.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.route.tsx"
    },
    "/login": {
      "filePath": "login.route.tsx"
    },
    "/logout": {
      "filePath": "logout.route.tsx"
    },
    "/signup": {
      "filePath": "signup.route.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
