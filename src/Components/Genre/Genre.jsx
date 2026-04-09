import React, { useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { magzineContext } from '../Context/Context'

function Genre() {
  const { genreName } = useParams() 
  const { data } = useContext(magzineContext)

  const filteredMovies = data.filter(movie => 
    movie.genres.includes(genreName)
  )

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      {/* Breadcrumb / Title */}
      <div className="mb-8">
        <p className="text-blue-500 text-sm font-bold uppercase tracking-widest mb-1">Browse Category</p>
        <h1 className="text-4xl font-black">{genreName} <span className="text-gray-500 text-2xl font-light">({filteredMovies.length})</span></h1>
      </div>
      
      {/* The Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {filteredMovies.map(movie => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="group">
            <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 transition-all duration-300 group-hover:scale-105 group-hover:border-blue-500 group-hover:shadow-blue-500/20">
              
              {/* Image with Overlay */}
              <div className="aspect-[2/3] overflow-hidden">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:rotate-1"
                  src={movie.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image'} 
                  alt={movie.name} 
                />
              </div>

              {/* Movie Info Area */}
              <div className="p-3 bg-gradient-to-t from-black to-gray-900">
                <p className="text-white text-sm font-bold truncate group-hover:text-blue-400 transition-colors">
                    {movie.name}
                </p>
                <div className="flex justify-between items-center mt-1">
                    <span className="text-[10px] text-gray-400 font-mono uppercase tracking-tighter">
                        {movie.language}
                    </span>
                    <span className="text-xs text-yellow-500 font-bold">
                        ⭐ {movie.rating?.average || 'N/A'}
                    </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredMovies.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-2xl text-gray-600 font-bold">No movies found in this category.</h2>
          <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">Return Home</Link>
        </div>
      )}
    </div>
  )
}

export default Genre