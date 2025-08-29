import React from 'react'

export default function Footer() {
    return (
        <footer className="border-t mt-8 bg-white">
            <div className="container mx-auto px-4 py-4 text-sm text-gray-600 flex items-center justify-between">
                <span>© {new Date().getFullYear()} Minimal Library</span>
                <span>Developed By Avik</span>
            </div>
        </footer>
    )
}
