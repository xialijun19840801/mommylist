# Mommy's List

A web application for organizing and sharing product recommendations for moms. Browse recommendations for baby milk, diapers, and strollers, and share your own favorites!

## Features

- 🔍 **Browse Products**: View product recommendations without logging in
- 🔐 **Authentication**: Sign in with Google or Facebook using Firebase Authentication
- 💬 **Share Recommendations**: Logged-in users can add their favorite products with descriptions
- 📱 **Responsive Design**: Beautiful, modern UI that works on all devices
- 🗄️ **Firestore Database**: All product data is stored in Cloud Firestore

## Categories

- 🍼 **Baby Milk**: Share your favorite baby milk brands
- 👶 **Diaper**: Recommend the best diapers
- 🚶 **Stroller**: Help other moms find the perfect stroller

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- A Firebase project with Authentication and Firestore enabled

### Firebase Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable **Google** sign-in provider
   - Enable **Facebook** sign-in provider
   - For Facebook, you'll need a Facebook App ID (create one at [Facebook Developers](https://developers.facebook.com/))
3. Enable Firestore:
   - Go to Firestore Database
   - Create database in test mode (or set up security rules as needed)
4. Get your Firebase configuration:
   - Go to Project Settings > General
   - Scroll down to "Your apps" and add a web app if you haven't already
   - Copy the Firebase configuration object

### Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Open `src/firebase/config.js`
   - Replace the placeholder values with your actual Firebase config:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## Firestore Database Structure

The app uses the following Firestore collection structure:

### Collection: `products`

Each document contains:
- `category`: string (one of: "baby-milk", "diaper", "stroller")
- `brand`: string (product brand name)
- `description`: string (why the user recommends this product)
- `userId`: string (Firebase user ID)
- `userEmail`: string (user's email)
- `userName`: string (user's display name or email)
- `createdAt`: timestamp (when the product was added)

### Firestore Security Rules

For development, you can use test mode. For production, set up proper security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      // Anyone can read products
      allow read: if true;
      
      // Only authenticated users can create products
      allow create: if request.auth != null;
      
      // Users can only update/delete their own products
      allow update, delete: if request.auth != null && 
                             request.auth.uid == resource.data.userId;
    }
  }
}
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **Firebase Authentication** - User authentication
- **Cloud Firestore** - Database
- **CSS3** - Styling

## License

This project is open source and available under the MIT License.
