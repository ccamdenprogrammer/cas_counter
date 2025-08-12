function Footer() {
  return (
    <footer className="footer py-10 text-center">
      <div className="text-sm md:text-base">
         Live Data sourced from{' '}
        <a
          href="https://data.techforpalestine.org/"
          className="text-gray-400 underline hover:text-gray-400"
        >
          techforpalestine.org
        </a>
      </div>

      {/* discreet favicon attribution */}
      <div className="mt-2 text-xs text-gray-500 opacity-70">
        <a
          href="https://www.flaticon.com/free-icons/palestine"
          title="palestine icons"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:no-underline"
        >
          Palestine icons created by Freepik - Flaticon
          
        </a>
      </div>
    </footer>
  );
}

export default Footer;
