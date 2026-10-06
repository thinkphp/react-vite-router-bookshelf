import { Link } from "react-router-dom";

export default function BookCard({ book, isFavorite, onToggleFavorite }) {
  return (
    <article className="book-card">
      <div className="book-cover" style={{ "--cover-color": book.color }}>
        <span className="book-cover__ornament" aria-hidden="true">
          {book.cover}
        </span>
        <button
          className={`favorite-button${isFavorite ? " favorite-button--active" : ""}`}
          type="button"
          aria-label={isFavorite ? `Elimină ${book.title} din favorite` : `Adaugă ${book.title} la favorite`}
          aria-pressed={isFavorite}
          onClick={() => onToggleFavorite(book.id)}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
        <span className="book-cover__genre">{book.genre}</span>
      </div>
      <div className="book-card__body">
        <div className="book-card__meta">
          <span>{book.year}</span>
          <span className="rating">★ {book.rating}</span>
        </div>
        <h3>
          <Link to={`/carti/${book.id}`}>{book.title}</Link>
        </h3>
        <p className="book-card__author">{book.author}</p>
        <Link className="book-card__link" to={`/carti/${book.id}`}>
          Descoperă cartea <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
