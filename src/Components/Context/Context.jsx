import React, { useState, useEffect, createContext,useMemo } from 'react'
import useFetchedData from '../FetchedData/FetchedData'

export const magzineContext = createContext()

function Context({ children }) {
    const [genres, setGenres] = useState([]);
    const [searchQuery, setSearchQuery] = useState("")

    const { data: rawData } = useFetchedData('https://api.tvmaze.com/shows?page=0')

    useEffect(() => {
        if (rawData && rawData.length > 0) {
            const genresData = [...new Set(rawData.flatMap(s => s.genres))].sort()
            setGenres(genresData)
        }
    }, [rawData]) 
    
    // Calculate filtered results
   const filteredData = useMemo(() => {
    if (!rawData) return []; 
    if (!searchQuery) return rawData; 

    return  rawData.filter(movie => {
        const query = searchQuery.toLowerCase();
        const nameMatch = movie.name?.toLowerCase().includes(query);
        const genreMatch = movie.genres?.some(g => g.toLowerCase().includes(query));
        return nameMatch || genreMatch;
    });
}, [rawData, searchQuery]);

    return (
        /* We pass filteredData TO the key 'data'. 
           Now Home.jsx will automatically show search results! 
        */
        <magzineContext.Provider value={{ 
            data: filteredData || [], 
            genres, 
            setSearchQuery, 
            searchQuery 
        }}>
            {children}
        </magzineContext.Provider>
    )
}

export default Context