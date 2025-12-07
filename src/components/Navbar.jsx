import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          👶 Mommy's List
        </Link>
        <div className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/category/baby-milk" className="nav-link">Baby Milk</Link>
          <Link to="/category/diaper" className="nav-link">Diaper</Link>
          <Link to="/category/stroller" className="nav-link">Stroller</Link>
          {currentUser ? (
            <>
              <span className="nav-user">👤 {currentUser.displayName || currentUser.email}</span>
              <button onClick={handleSignOut} className="nav-button">
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

