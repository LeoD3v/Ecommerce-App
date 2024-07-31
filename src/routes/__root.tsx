import React from "react";
import { createRootRoute,Outlet } from "@tanstack/react-router";
import Navigation from "../components/navigation";
// import '../index.css'
export const Route = createRootRoute({
    component: RootComponent
})

function RootComponent(){
    return (<>
    <div className="bg-blue">

           <Navigation/>
    </div>
            <hr/>
            <main>
                <Outlet/>
            </main>
    
    </>)
}