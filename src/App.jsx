import { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate, useParams, useSearchParams } from "react-router-dom";
import BookCard from "./components/BookCard.jsx";
import Layout from "./components/Layout.jsx";
import { books } from "./data/books.js";
import "./App.css";

function HomePage({ favorites, onToggleFavorite }) {
  const featuredBooks = books.slice(0, 3);

  return (
    <main>
      <section className="hero">
        <div className="hero__inner">
          <div className="hero__copy">
            <p className="eyebrow"><span className="eyebrow__dot" /> BIBLIOTECA TA, ÎNTR-UN SINGUR LOC</p>
            <h1>Fiecare carte<br />deschide <span>o lume.</span></h1>
            <p className="hero__description">
              Găsește următoarea poveste care te ține treaz până târziu. Răsfoiește,
              descoperă și adună cărțile care îți vorbesc.
            </p>
            <div className="hero__actions">
              <Link className="button button--dark" to="/carti">Explorează biblioteca <span aria-hidden="true">↗</span></Link>
              <Link className="button button--text" to="/despre">Despre proiect <span aria-hidden="true">→</span></Link>
            </div>
            <div className="hero__stats">
              <div><strong>{books.length}</strong><span>cărți de descoperit</span></div>
              <span className="hero__stats-divider" />
              <div><strong>∞</strong><span>povești de explorat</span></div>
            </div>
          </div>
          <div className="hero-art" aria-label="Cărți ilustrate" role="img">
            <div className="hero-art__sun" />
            <div className="hero-art__spark hero-art__spark--one">✳</div>
            <div className="hero-art__spark hero-art__spark--two">✳</div>
            <div className="hero-art__book hero-art__book--back">
              <span>1984</span><small>GEORGE ORWELL</small>
            </div>
            <div className="hero-art__book hero-art__book--front">
              <span className="hero-art__star">✦</span><strong>Micul<br />prinț</strong><small>ANTOINE DE SAINT-EXUPÉRY</small>
            </div>
            <div className="hero-art__caption">Povestea ta următoare<br /><span>te așteaptă pe raft.</span></div>
            <div className="hero-art__ground" />
          </div>
        </div>
      </section>

      <section className="section section--featured">
        <div className="content-wrap">
          <div className="section-heading">
            <div><p className="eyebrow">ALESE CU GRIJĂ</p><h2>Un loc bun de început<span>.</span></h2></div>
            <Link className="section-heading__link" to="/carti">Toate cărțile <span aria-hidden="true">→</span></Link>
          </div>
          <div className="book-grid book-grid--featured">
            {featuredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                isFavorite={favorites.includes(book.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="quote-strip">
        <span className="quote-strip__mark" aria-hidden="true">“</span>
        <blockquote>O cameră fără cărți e ca un corp fără suflet.</blockquote>
        <cite>— Cicero</cite>
      </section>
    </main>
  );
}

function BooksPage({ favorites, onToggleFavorite }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const normalizedQuery = query.trim().toLocaleLowerCase("ro");
  const filteredBooks = books.filter((book) =>
    [book.title, book.author, book.genre].some((value) =>
      value.toLocaleLowerCase("ro").includes(normalizedQuery),
    ),
  );

  function updateQuery(event) {
    const nextParams = new URLSearchParams(searchParams);
    if (event.target.value) nextParams.set("q", event.target.value);
    else nextParams.delete("q");
    setSearchParams(nextParams, { replace: true });
  }

  return (
    <main className="page-main">
      <div className="content-wrap">
        <div className="page-intro">
          <p className="eyebrow">RĂSFOIEȘTE COLECȚIA</p>
          <h1>Biblioteca <span>noastră.</span></h1>
          <p>Povești, idei și lumi noi — găsește ce ți se potrivește.</p>
        </div>
        <div className="catalog-toolbar">
          <span>{filteredBooks.length} {filteredBooks.length === 1 ? "carte" : "cărți"}</span>
          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={query}
              onChange={updateQuery}
              placeholder="Caută titlu, autor sau gen..."
              aria-label="Caută după titlu, autor sau gen"
            />
          </label>
        </div>
        {filteredBooks.length > 0 ? (
          <div className="book-grid">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                isFavorite={favorites.includes(book.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span aria-hidden="true">⌕</span>
            <h2>N-am găsit cartea căutată.</h2>
            <p>Încearcă un alt titlu, autor sau gen.</p>
            <button className="button button--dark" type="button" onClick={() => setSearchParams({})}>Șterge căutarea</button>
          </div>
        )}
      </div>
    </main>
  );
}

function BookDetailsPage({ favorites, onToggleFavorite }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find((item) => item.id === id);

  if (!book) return <NotFoundPage />;

  const isFavorite = favorites.includes(book.id);

  return (
    <main className="page-main">
      <div className="content-wrap">
        <button className="back-link" type="button" onClick={() => navigate(-1)}>
          <span aria-hidden="true">←</span> Înapoi
        </button>
        <article className="book-detail">
          <div className="book-detail__cover book-cover" style={{ "--cover-color": book.color }}>
            <span className="book-cover__ornament" aria-hidden="true">{book.cover}</span>
            <span className="book-cover__genre">{book.genre}</span>
          </div>
          <div className="book-detail__content">
            <p className="eyebrow">DETALIILE CĂRȚII</p>
            <p className="book-detail__genre">{book.genre} <span>·</span> {book.year}</p>
            <h1>{book.title}</h1>
            <p className="book-detail__author">de {book.author}</p>
            <p className="book-detail__rating"><span>★ {book.rating}</span> <span>·</span> {book.pages} pagini</p>
            <p className="book-detail__description">{book.description}</p>
            <button
              className={`button ${isFavorite ? "button--saved" : "button--dark"}`}
              type="button"
              onClick={() => onToggleFavorite(book.id)}
            >
              {isFavorite ? "♥  Adăugată la favorite" : "♡  Adaugă la favorite"}
            </button>
            <Link className="book-detail__browse" to="/carti">Continuă să răsfoiești <span aria-hidden="true">→</span></Link>
          </div>
        </article>
      </div>
    </main>
  );
}

function FavoritesPage({ favorites, onToggleFavorite }) {
  const favoriteBooks = books.filter((book) => favorites.includes(book.id));

  return (
    <main className="page-main">
      <div className="content-wrap">
        <div className="page-intro">
          <p className="eyebrow">COLECȚIA TA PERSONALĂ</p>
          <h1>Cărți <span>favorite.</span></h1>
          <p>Toate poveștile pe care vrei să le păstrezi aproape.</p>
        </div>
        {favoriteBooks.length > 0 ? (
          <div className="book-grid">
            {favoriteBooks.map((book) => (
              <BookCard key={book.id} book={book} isFavorite onToggleFavorite={onToggleFavorite} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span aria-hidden="true">♡</span>
            <h2>Raftul tău e încă gol.</h2>
            <p>Apasă inimioara de pe o carte ca s-o adaugi aici.</p>
            <Link className="button button--dark" to="/carti">Descoperă cărțile <span aria-hidden="true">→</span></Link>
          </div>
        )}
      </div>
    </main>
  );
}

function AboutPage() {
  return (
    <main className="page-main">
      <article className="content-wrap about-page">
        <p className="eyebrow">DESPRE PROIECT</p>
        <h1>Un exercițiu mic,<br /><span>o mulțime de rute.</span></h1>
        <p>Raftul este un catalog demo construit pentru a exersa navigarea între pagini într-o aplicație React.</p>
        <div className="about-topics">
          <div><span>01</span><h2>Rute imbricate</h2><p>Un layout comun păstrează navigarea și subsolul vizibile pe toate paginile.</p></div>
          <div><span>02</span><h2>Rute dinamice</h2><p>Fiecare carte are propria adresă, de forma <code>/carti/micul-print</code>.</p></div>
          <div><span>03</span><h2>URL-uri utile</h2><p>Căutarea este salvată în query string — de exemplu <code>/carti?q=ficțiune</code>.</p></div>
        </div>
        <Link className="button button--dark" to="/carti">Explorează catalogul <span aria-hidden="true">→</span></Link>
      </article>
    </main>
  );
}

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="page-main">
      <section className="empty-state not-found">
        <span className="not-found__number">404</span>
        <p className="eyebrow">PAGINĂ NEGĂSITĂ</p>
        <h1>Se pare că ai<br />ajuns între rafturi.</h1>
        <p>Adresa aceasta nu duce la nicio carte sau pagină.</p>
        <div className="not-found__actions">
          <button className="button button--dark" type="button" onClick={() => navigate(-1)}>Înapoi</button>
          <Link className="button button--outline" to="/">Mergi la pagina principală</Link>
        </div>
      </section>
    </main>
  );
}

function readSavedFavorites() {
  try {
    const saved = JSON.parse(window.localStorage.getItem("raftul-favorite") ?? "[]");
    return Array.isArray(saved) ? saved.filter((id) => books.some((book) => book.id === id)) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [favorites, setFavorites] = useState(readSavedFavorites);

  useEffect(() => {
    window.localStorage.setItem("raftul-favorite", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id) ? current.filter((favoriteId) => favoriteId !== id) : [...current, id],
    );
  }

  return (
    <Routes>
      <Route element={<Layout favoriteCount={favorites.length} />}>
        <Route index element={<HomePage favorites={favorites} onToggleFavorite={toggleFavorite} />} />
        <Route path="carti" element={<BooksPage favorites={favorites} onToggleFavorite={toggleFavorite} />} />
        <Route path="carti/:id" element={<BookDetailsPage favorites={favorites} onToggleFavorite={toggleFavorite} />} />
        <Route path="favorite" element={<FavoritesPage favorites={favorites} onToggleFavorite={toggleFavorite} />} />
        <Route path="despre" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
