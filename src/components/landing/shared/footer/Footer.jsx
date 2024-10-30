function Footer() {
  function handleDisplayCurrentYear() {
    return new Date().getFullYear();
  }

  return (
    <footer className="flex min-h-24 justify-center items-center bg-slate-800 text-xl font-medium md:min-h-36">
      <div>Fishing App &copy; {handleDisplayCurrentYear()}</div>
    </footer>
  );
}

export default Footer;
