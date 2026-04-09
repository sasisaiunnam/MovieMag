// import React, { useEffect, useState } from 'react'
// import { useContext } from 'react'
// import {magzineContext} from '../Context/Context'
// import { NavLink } from 'react-router-dom'



// function Header() {
//     const {genres} = useContext(magzineContext)

//     console.log("genre",genres)
//   return (
//     <div>
//           <nav >
//             <ul>
//                 <li>Home</li>
//                 <li>
//                     <select>
//                         <option value="">Select Genre</option>
//                         {genres && genres.map((item, index) => (
//                             <option key={index} value={item.toLowerCase()}>
//                                 {item}
//                             </option>
//                         ))}

//                     </select>
//                 </li>
//             </ul>
//         </nav>
//     </div>
//   )
// }

// export default Header


import React, { useContext } from 'react'
import { magzineContext } from '../Context/Context'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'

function Header() {
    const { genres, setSearchQuery, searchQuery } = useContext(magzineContext)
    const navigate = useNavigate();
    const location = useLocation(); // Hook for the current URL path

    const handleGenreChange = (e) => {
        const selectedGenre = e.target.value;
        if (selectedGenre) {
            navigate(`/genre/${selectedGenre}`);
        }
    }

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        
        // Use the location hook instead of window.location
        if (value.length > 0 && location.pathname !== '/') {
            navigate('/');
        }
    }

    return (
        <header className="bg-gray-900 text-white p-4 sticky top-0 z-50 shadow-md">
            <nav className="flex justify-between items-center max-w-6xl mx-auto gap-4">
                
                {/* Logo */}
                <div 
                    className="text-2xl font-black tracking-tighter cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    MOVIE<span className="text-blue-500">MAG</span>
                </div>

                <div className="flex items-center gap-6 flex-1 justify-end">
                    <ul className="flex gap-6 items-center font-medium">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) => isActive ? "text-blue-500" : "hover:text-blue-400 transition-colors"}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <select
                                onChange={handleGenreChange}
                                className="bg-gray-800 text-sm text-white border border-gray-700 rounded-lg px-3 py-1.5 outline-none cursor-pointer focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Genres</option>
                                {genres && genres.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </li>
                    </ul>

                    {/* Search Input Container */}
                    <div className="relative w-full max-w-xs">
                        <input 
                            type="text"
                            placeholder="Search title or genre..."
                            value={searchQuery}
                            onChange={handleSearch}
                            className="w-full px-4 py-1.5 rounded-full bg-slate-800 text-white border border-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                        />
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header