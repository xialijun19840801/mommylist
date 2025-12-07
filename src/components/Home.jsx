import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const categories = [
    {
      id: 'baby-milk',
      name: 'Baby Milk',
      icon: '🍼',
      description: 'Share your favorite baby milk brands and why you love them'
    },
    {
      id: 'diaper',
      name: 'Diaper',
      icon: '👶',
      description: 'Recommend the best diapers for comfort and reliability'
    },
    {
      id: 'stroller',
      name: 'Stroller',
      icon: '🚶',
      description: 'Help other moms find the perfect stroller for their needs'
    }
  ];

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Mommy's List</h1>
        <p className="hero-subtitle">
          Discover and share the best products for your little ones. 
          Get recommendations from real moms who've tried them.
        </p>
      </div>

      <div className="categories-section">
        <h2>Browse by Category</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="category-card"
            >
              <div className="category-icon">{category.icon}</div>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="features-section">
        <h2>How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">👀</div>
            <h3>Browse</h3>
            <p>View recommendations from other moms, no login required</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>Sign In</h3>
            <p>Use Google or Facebook to create your account</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Share</h3>
            <p>Add your own recommendations to help other moms</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

