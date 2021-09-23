import layout from '../styles/Home.module.css'

const SearchBar = () => (
    <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden"></span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Cari pengguna"
            name="s"
            className="search"
        />
        <button type="submit" className={layout.btn2}>
        Cari</button>
    </form>
);

export default SearchBar;