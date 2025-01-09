const Navbar = () => {
  return (
    <nav style={{
      backgroundColor: '#000',
      padding: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <a href="/" style={{
          color: '#fff',
          textDecoration: 'none',
          padding: '10px',
          fontSize: '18px'
        }}>
          My Blog
        </a>
      </div>
      <ul style={{
        display: 'flex',
        gap:"5em",
        listStyleType: 'none',
        margin: 0,
        padding: 0
      }}>
        <li>
          <a href="/" style={{
            color: '#fff',
            textDecoration: 'none',
            padding: '10px',
            fontSize: '16px'
          }}>
            Home
          </a>
        </li>
        <li>
          <a href="/about" style={{
            color: '#fff',
            textDecoration: 'none',
            padding: '10px',
            fontSize: '16px'
          }}>
            About
          </a>
        </li>
        <li>
          <a href="/contact" style={{
            color: '#fff',
            textDecoration: 'none',
            padding: '10px',
            fontSize: '16px'
          }}>
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
