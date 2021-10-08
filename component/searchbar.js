import layout from '../styles/Home.module.css'

    

export default function Searchbar(props) {

    const {searchName} = props;

    return (
        <>
            <form action="/" method="get">
                <label htmlFor="header-search">
                    <span className="visually-hidden"></span>
                </label>
                <input
                    type="text"
                    id="header-search"
                    placeholder={searchName}
                    name="s"
                    className="search"
                />
                <button type="submit" className={layout.btn2}>
                    Cari</button>
            </form>

        </>
    )
}