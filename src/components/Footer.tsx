export default function Footer() {
    return (
      <footer id="contact" className="mt-16">
        <div className="container justify-center items-center w-full flex py-10 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-black/10 bg-gradient-to-br from-pink-200/50 to-pink-200/40 backdrop-blur rounded-3xl">
          <div>
            <div className="font-script justify-center items-center flex text-3xl">Le Chandelier</div>
            <p className="mt-2 text-sm justify-center items-center flex text-white/60">Open Mon–Sat · 6:30pm–11pm</p>
          </div>
          <nav className="flex gap-6 justify-center items-center text-sm">
            <a href="#menu" className="hover:underline underline-offset-4">Menu</a>
            <a href="#drinks" className="hover:underline underline-offset-4">Drinks</a>
            <a href="#team" className="hover:underline underline-offset-4">Team</a>
            <a href="#events" className="hover:underline underline-offset-4">Events</a>
          </nav>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-full border border-black/10 px-4 py-2 text-sm bg-white/10"
            />
            <button className="pill bg-black/20!">Subscribe</button>
          </form>
        </div>
        <div className="container justify-center items-center w-full flex py-8 text-xs text-white">By <a href="https://www.ocreamer.studio" target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4 px-2 font-poppins font-semibold">OCREAMER STUDIO</a> © {new Date().getFullYear()} Le Chandelier</div>
      </footer>
    );
  }