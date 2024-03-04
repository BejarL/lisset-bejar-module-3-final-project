import { Link } from "react-router-dom"

function Header() {
  return (
    <header className="bg-cyan-950 shadow-md text-white p-5"> 
      <nav className="container mx-auto flex justify-between items-center"> 
        <Link to="/"><div className="text-xl font-semibold">GROVARDSPHERE</div></Link>
        <div className="flex gap-4">
          <Link to="/allGames"className="hover:bg-green-700 px-3 py-2 rounded">All Games</Link>
          <Link to="/allTournaments" className="hover:bg-green-700 px-3 py-2 rounded">Tournaments</Link>
          <a href="/news" className="hover:bg-green-700 px-3 py-2 rounded">News</a>
          <a href="/about" className="hover:bg-green-700 px-3 py-2 rounded">About</a>
          <div className="flex items-center">
            <input
              type="search"
              placeholder="Search"
              aria-label="Search" 
              className="rounded px-3 py-1 mr-2"
            />
            <button className="bg-green-700 hover:bg-green-600 px-3 py-2 mr-3 rounded text-sm" aria-label="Profile">Profile</button>
            <button className="bg-green-700 hover:bg-green-600 px-3 py-2 rounded text-sm" aria-label="Log out">Log out</button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;