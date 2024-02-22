import React, { useState } from 'react';

// Composant MovieCard
const MovieCard = ({ movie }) => (
  <div>
    <h3>{movie.title}</h3>
    <p>{movie.description}</p>
    <img src={movie.posterURL} alt={movie.title} />
    <p>Note: {movie.note}</p>
  </div>
);

// Composant MovieList
const MovieList = ({ movies }) => (
  <div>
    {movies.map((movie) => (
      <MovieCard key={movie.title} movie={movie} />
    ))}
  </div>
);

// Composant Filtre
const Filtre = ({ onFilter }) => {
  const [titre, setTitre] = useState('');
  const [taux, setTaux] = useState('');

  const handleFilter = () => {
    onFilter({ titre, taux });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Titre du film"
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
      />
      <input
        type="number"
        placeholder="Note du film"
        value={taux}
        onChange={(e) => setTaux(e.target.value)}
      />
      <button onClick={handleFilter}>Filtrer</button>
    </div>
  );
};

const AddMovieForm = ({ onAdd }) => {
  const [newMovie, setNewMovie] = useState({ title: '', description: '', posterURL: '', note: 0 });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleAddMovie = () => {
    onAdd(newMovie);
    setNewMovie({ title: '', description: '', posterURL: '', note: 0 }); // Clear the form after adding
  };

  return (
    <div>
      <h2>Ajouter un nouveau film</h2>
      <label>Titre:
        <input type="text" name="title" value={newMovie.title} onChange={handleInputChange} />
      </label>
      <label>Description:
        <input type="text" name="description" value={newMovie.description} onChange={handleInputChange} />
      </label>
      <label>URL de l'affiche:
        <input type="text" name="posterURL" value={newMovie.posterURL} onChange={handleInputChange} />
      </label>
      <label>Note:
        <input type="number" name="note" value={newMovie.note} onChange={handleInputChange} />
      </label>
      <button onClick={handleAddMovie}>Ajouter</button>
    </div>
  );
};

// App Component
const App = () => {
  const [films, setFilms] = useState([]);
  const [filteredFilms, setFilteredFilms] = useState([]);

  const addFilm = (newFilm) => {
    setFilms([...films, newFilm]);
    setFilteredFilms([...films, newFilm]); // Update filteredFilms as well
  };

  const filterFilms = ({ titre, taux }) => {
    const filtered = films.filter(
      (film) =>
        film.title.toLowerCase().includes(titre.toLowerCase()) &&
        film.note >= parseInt(taux)
    );
    setFilteredFilms(filtered);
  };

  return (
    <div>
      <Filtre onFilter={filterFilms} />
      <MovieList movies={filteredFilms.length > 0 ? filteredFilms : films} />
      <AddMovieForm onAdd={addFilm} />
    </div>
  );
};

export default App;