import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import './CategoryPage.css';

const CATEGORY_NAMES = {
  'baby-milk': 'Baby Milk',
  'diaper': 'Diaper',
  'stroller': 'Stroller'
};

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ brand: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!CATEGORY_NAMES[category]) {
      navigate('/');
      return;
    }

    const q = query(
      collection(db, 'products'),
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [category, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/login');
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'products'), {
        category,
        brand: formData.brand.trim(),
        description: formData.description.trim(),
        userId: currentUser.uid,
        userEmail: currentUser.email,
        userName: currentUser.displayName || currentUser.email,
        createdAt: serverTimestamp()
      });
      setFormData({ brand: '', description: '' });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="category-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="category-container">
      <div className="category-header">
        <h1>{CATEGORY_NAMES[category]} Recommendations</h1>
        {currentUser && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="add-button"
          >
            {showAddForm ? 'Cancel' : '+ Add Recommendation'}
          </button>
        )}
      </div>

      {!currentUser && (
        <div className="info-banner">
          <p>👀 You're viewing as a guest. <a href="/login">Sign in</a> to add your own recommendations!</p>
        </div>
      )}

      {showAddForm && currentUser && (
        <form onSubmit={handleSubmit} className="add-form">
          <div className="form-group">
            <label htmlFor="brand">Brand *</label>
            <input
              type="text"
              id="brand"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              placeholder="Enter brand name"
              required
              maxLength={100}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Why do you recommend this? *</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Share your experience and why you recommend this product..."
              required
              rows={5}
              maxLength={1000}
            />
          </div>
          <button type="submit" disabled={submitting} className="submit-button">
            {submitting ? 'Adding...' : 'Add Recommendation'}
          </button>
        </form>
      )}

      {products.length === 0 ? (
        <div className="empty-state">
          <p>No recommendations yet for this category.</p>
          {currentUser && (
            <p>Be the first to share your recommendation!</p>
          )}
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-brand">{product.brand}</div>
              <div className="product-description">{product.description}</div>
              <div className="product-meta">
                <span className="product-user">👤 {product.userName}</span>
                {product.createdAt && (
                  <span className="product-date">
                    {product.createdAt?.toDate ? 
                      product.createdAt.toDate().toLocaleDateString() : 
                      new Date(product.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;

