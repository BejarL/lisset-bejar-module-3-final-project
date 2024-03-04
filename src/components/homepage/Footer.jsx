function Footer() {
  return (
    <footer className="bg-cyan-950 shadow-md text-white p-5">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold">GROVARDSPHERE</div>
        <nav className="flex gap-3">
          <a href="/news" className="hover:bg-green-700 px-3 py-2 rounded">
            News
          </a>
          <a href="/about" className="hover:bg-green-700 px-3 py-2 rounded">
            About
          </a>
          <a href="/contact" className="hover:bg-green-700 px-3 py-2 rounded">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
