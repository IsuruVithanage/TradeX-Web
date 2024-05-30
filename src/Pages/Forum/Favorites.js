// // src/Components/Favorites/Favorites.js

// import React, { useState, createContext, useContext } from "react";

// const FavoritesContext = createContext();

// export const FavoritesProvider = ({ children }) => {
//   const [favorites, setFavorites] = useState([]);

//   const addFavorite = (favorite) => {
//     setFavorites((prevFavorites) => {
//       if (!prevFavorites.find((fav) => fav.id === favorite.id)) {
//         return [...prevFavorites, favorite];
//       }
//       return prevFavorites;
//     });
//   };

//   const removeFavorite = (favoriteId) => {
//     setFavorites((prevFavorites) =>
//       prevFavorites.filter((fav) => fav.id !== favoriteId)
//     );
//   };

//   return (
//     <FavoritesContext.Provider
//       value={{ favorites, addFavorite, removeFavorite }}
//     >
//       {children}
//     </FavoritesContext.Provider>
//   );
// };

// export const useFavorites = () => useContext(FavoritesContext);

// const Favorites = () => {
//   const { favorites } = useFavorites();

//   return (
//     <div>
//       {favorites.map((fav) => (
//         <p key={fav.id} className="sub-title">
//           {fav.title}
//         </p>
//       ))}
//     </div>
//   );
// };

// export default Favorites;
