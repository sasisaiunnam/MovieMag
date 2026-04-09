// // import React from 'react'
// // import useFetchedData from '../FetchedData/FetchedData'
// // import { useContext } from 'react'
// // import { magzineContext } from '../Context/Context'

// // function Home() {

// //     const { data, genres } = useContext(magzineContext)

// //     return (
// //         <div>
// //             <section>
            
// //                 {genres && genres.map((genreName) => (
// //                     <div key={genreName}>
// //                         <h2>{genreName}</h2>
// //                         <div>
// //                             {data
// //                                 .filter((movie) => movie.genres.includes(genreName))
// //                                 .slice(0, 10)
// //                                 .map((movie) => (
// //                                     <div key={movie.id}>
// //                                         <img
// //                                             src={movie.image?.medium}
// //                                             alt={movie.name}
// //                                             width="150"
// //                                         />
// //                                         <p>{movie.name}</p>
// //                                     </div>
// //                                 ))}
// //                         </div>
// //                     </div>
// //                 ))}
// //             </section>
// //         </div>
// //     )
// // }

// // export default Home

// import React, { useContext } from 'react'
// import { magzineContext } from '../Context/Context'
// import './Home.css' 
// import { Link, NavLink } from 'react-router-dom'

// function Home() {
//   const { data, genres} = useContext(magzineContext)


//   return (
//     <div className="home-container">
//      {genres && genres.map((genreName) => (
//         <section key={genreName} className="genre-section">
//             <Link to={`/genre/${genreName}`}>
//           <h2 className="genre-title">{genreName}</h2>
//           </Link>
          
//           <div className="movie-row">
//             {data
//               .filter((movie) => movie.genres.includes(genreName))
//               .slice(0, 10) 
//               .map((movie) => (
//                 <NavLink to={`/movie/${movie.id}`} key={movie.id}>
//                 <div  className="movie-card border-2 border-green-500 rounded-lg">
//                   {console.log("sting",typeof(movie.id))}
//                   <img 
//                     className="movie-poster"
//                     src={movie.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image'} 
//                     alt={movie.name} 
//                   />
//                   <p className="movie-name">{movie.name}</p>
                 
//                 </div>
//                  </NavLink>
//               ))}
//           </div>
//         </section>
//       ))}
//     </div>
//   )
// }

// export default Home


import React, { useContext } from 'react'
import { magzineContext } from '../Context/Context'
import './Home.css' 
import { Link, NavLink } from 'react-router-dom'

// function Home() {
//   const { data, genres } = useContext(magzineContext)

//   return (
//     <div className="home-container bg-slate-950 min-h-screen text-white p-4">
//       {data.length === 0 ? (
//         <div className="flex flex-col items-center justify-center py-20">
//             <h2 className="text-2xl font-bold text-gray-500">No movies found...</h2>
//         </div>
//       ) : (
//         genres && genres.map((genreName) => {
//           const genreMovies = data.filter((movie) => movie.genres.includes(genreName));

//           if (genreMovies.length === 0) return null;

//           return (
//             <section key={genreName} className="genre-section mb-10">
//               <Link to={`/genre/${genreName}`}>
//                 <h2 className="genre-title text-2xl font-black mb-4 hover:text-blue-500 transition-colors uppercase">
//                   {genreName} <span className="text-sm text-gray-600">→</span>
//                 </h2>
//               </Link>
              
//               <div className="movie-row flex overflow-x-auto gap-4 pb-4 no-scrollbar">
//                 {genreMovies
//                   .slice(0, 10) 
//                   .map((movie) => (
//                     <Link to={`/movie/${movie.id}`} key={movie.id} className="flex-none w-40 md:w-48">
//                       <div className="movie-card group border-2 border-green-500 rounded-lg overflow-hidden transition-all duration-300 hover:border-blue-500">
//                         <div className="aspect-[2/3] overflow-hidden">
//                             <img 
//                                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                                 src={movie.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image'} 
//                                 alt={movie.name} 
//                             />
//                         </div>
//                         <p className="movie-name p-2 text-sm font-bold truncate group-hover:text-blue-400">
//                             {movie.name}
//                         </p>
//                       </div>
//                     </Link>
//                   ))}
//               </div>
//             </section>
//           );
//         })
//       )}
//     </div>
//   )
// }

function Home() {
  const { data, genres } = useContext(magzineContext);

  return (
    <div className="home-container bg-slate-950 text-white">
      {genres && genres.map((genreName, index) => {
        const genreMovies = data.filter((movie) => movie.genres.includes(genreName));
        if (genreMovies.length === 0) return null;

        return (
          <React.Fragment key={genreName}>
            {/* 1. The Regular Genre Section */}
            <section className="genre-section p-6">
              <Link to={`/genre/${genreName}`}>
                <h2 className="genre-title text-2xl font-black uppercase mb-4">
                  {genreName}
                </h2>
              </Link>
              <div className="movie-row flex overflow-x-auto gap-4 no-scrollbar">
                {genreMovies.slice(0, 10).map((movie) => (
                  <NavLink to={`/movie/${movie.id}`} key={movie.id} className="flex-none w-40">
                    <div className="movie-card border-2 border-slate-800 rounded-lg overflow-hidden">
                      <img src={movie.image?.medium} alt={movie.name} />
                      <p className="p-2 text-xs font-bold truncate">{movie.name}</p>
                    </div>
                  </NavLink>
                ))}
              </div>
            </section>

            {/* 2. The AD Logic: Insert an ad after every 2nd genre */}
            {(index + 1) % 3 === 0 && (
              <div className="ad-container mx-6 my-4 p-8 bg-gradient-to-r from-blue-900 to-slate-800 rounded-xl border border-blue-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold bg-blue-500 px-2 py-0.5 rounded mr-2">SPONSORED</span>
                  <h3 className="text-xl font-bold mt-2">Get 50% off MovieMag Pro</h3>
                  <p className="text-slate-400 text-sm">Ad-free streaming and 4K downloads.</p>
                </div>
                <button className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-300">
                  Upgrade Now
                </button>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}


export default Home