// import React, { useContext } from 'react'
// import { useParams } from 'react-router-dom';
// import { magzineContext } from '../Context/Context';


// function MovieDetails() {
//     const {id} = useParams();
//     const {data} = useContext( magzineContext);
// console.log("type",typeof(id))
//     const movie = data.find(p => p.id === Number(id))

//     console.log('details',movie.name)
//   return (
//     <div>
//       <h1>welcome to movie</h1>
//       <img src={movie.image.original} alt={movie.name} />
//       <p>{movie.name}</p>
//     </div>
//   )
// }

// export default MovieDetails


import React, { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { magzineContext } from '../Context/Context';

function MovieDetails() {
    const { id } = useParams();
    const { data } = useContext(magzineContext);
    const navigate = useNavigate();

    // Find the movie and handle type conversion
    const movie = data.find(p => p.id === Number(id));

    // Guard Clause: Prevents crash while data is fetching
    if (!movie) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white p-4 md:p-10">
            {/* Navigation Header */}
            <button 
                onClick={() => navigate(-1)} 
                className="mb-6 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-2"
            >
                ← Back to Browse
            </button>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                
                {/* Left Column: High Quality Poster */}
                <div className="space-y-4">
                    <img 
                        src={movie.image?.original || movie.image?.medium} 
                        alt={movie.name} 
                        className="w-full rounded-2xl shadow-2xl border border-gray-800"
                    />
                    
                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-2 text-center text-sm">
                        <div className="bg-gray-900 p-3 rounded-xl border border-gray-800">
                            <p className="text-gray-400">Rating</p>
                            <p className="text-xl font-bold text-yellow-500">⭐ {movie.rating?.average || 'N/A'}</p>
                        </div>
                        <div className="bg-gray-900 p-3 rounded-xl border border-gray-800">
                            <p className="text-gray-400">Status</p>
                            <p className="text-xl font-bold text-green-500">{movie.status}</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Detailed Info */}
                <div className="md:col-span-2 space-y-6">
                    <header>
                        <h1 className="text-4xl md:text-6xl font-black mb-2 leading-tight">{movie.name}</h1>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {movie.genres.map((g, i) => (
                                <span key={i} className="px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {g}
                                </span>
                            ))}
                        </div>
                    </header>

                    {/* Summary Section */}
                    <section>
                        <h3 className="text-xl font-semibold mb-2 text-gray-300">Overview</h3>
                        <div 
                            className="text-gray-400 leading-relaxed text-lg"
                            dangerouslySetInnerHTML={{ __html: movie.summary }} 
                        />
                    </section>

                    {/* Deep Data Table */}
                    <section className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                        <h3 className="text-lg font-bold mb-4 border-b border-gray-800 pb-2">Technical Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                            <DetailRow label="Language" value={movie.language} />
                            <DetailRow label="Type" value={movie.type} />
                            <DetailRow label="Runtime" value={`${movie.runtime || '??'} mins`} />
                            <DetailRow label="Premiered" value={movie.premiered} />
                            <DetailRow label="Network" value={movie.network?.name || movie.webChannel?.name || 'N/A'} />
                            <DetailRow label="Schedule" value={`${movie.schedule?.days[0]} at ${movie.schedule?.time}`} />
                        </div>
                    </section>

                    {/* External Link */}
                    {movie.officialSite && (
                        <a 
                            href={movie.officialSite} 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-transform active:scale-95"
                        >
                            Visit Official Site
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}

// Helper component for the table rows
function DetailRow({ label, value }) {
    return (
        <div className="flex justify-between border-b border-gray-800/50 pb-1">
            <span className="text-gray-500 font-medium">{label}</span>
            <span className="text-gray-200">{value}</span>
        </div>
    )
}

export default MovieDetails