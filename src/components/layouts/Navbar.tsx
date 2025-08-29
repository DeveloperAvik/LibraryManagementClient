import React from 'react'
import { NavLink } from 'react-router-dom'

const linkCls = (isActive: boolean) =>
    `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-200'}`

export default function Navbar() {
    return (
        <nav className="border-b bg-white">
            <div className="container mx-auto px-4 h-14 flex items-center justify-between">
                <div className="font-semibold text-lg">📚 Minimal Library</div>
                <div className="flex gap-2">
                    <NavLink to="/books" className={({ isActive }) => linkCls(isActive)}>All Books</NavLink>
                    <NavLink to="/create-book" className={({ isActive }) => linkCls(isActive)}>Add Book</NavLink>
                    <NavLink to="/borrow-summary" className={({ isActive }) => linkCls(isActive)}>Borrow Summary</NavLink>
                </div>
            </div>
        </nav>
    )
}
