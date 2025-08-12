function Header() {
  const date = new Date();
  const utcDate = date.toUTCString();

  return (
    <header className="container mx-auto px-4 pt-8 text-center">
      <h1 className="text-xl sm:text-2xl md:text-3xl">
        As of {utcDate} ...
      </h1>
    </header>
  );
}

export default Header;
