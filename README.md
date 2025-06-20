# Ratings and Reviews Application

A modern web application for users to rate and review products, built with React, Node.js, Express, and PostgreSQL. The app allows users to submit ratings (1-5 stars), reviews, tags, and optional photo URLs for products, with features like tag filtering, most-used tags display, and a responsive, polished UI.

## Features

- **Product Reviews**: Users can submit a rating (1-5 stars), review text, tags, and an optional photo URL for each product.
- **Single Rating per User**: Prevents users from submitting multiple reviews for the same product.
- **Star Rating System**: Interactive star-based UI for selecting and displaying ratings.
- **Tag Filtering**: Filter reviews by clicking on tags, with an option to clear filters.
- **Most-Used Tags**: Displays the top 5 most frequently used tags across all reviews.
- **Photo Uploads**: Users can include image URLs in reviews, displayed in the UI.
- **Responsive Design**: Mobile-friendly layout with a modern, clean interface.
- **Input Validation**: Ensures valid ratings (1-5), required fields, and valid photo URLs.
- **RESTful API**: Backend provides endpoints for submitting reviews, fetching reviews, and retrieving top tags.

## Tech Stack

- **Frontend**: React, plain CSS
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Tools**: Postman (for API testing), Git (version control)

## Project Structure

```
ratings-reviews-app/
├── backend/
│   ├── src/
│   │   ├── config/db.js          # Database connection
│   │   ├── controllers/          # API controllers
│   │   ├── models/               # Database models
│   │   ├── routes/               # API routes
│   │   └── app.js                # Express server
│   ├── schema.sql                # Database schema
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/           # React components
│   │   ├── App.js                # Main React component
│   │   ├── App.css               # Main CSS styles
│   │   └── index.css             # Global styles
│   └── package.json
├── README.md
└── .gitignore
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- PostgreSQL (installed and running)
- Postman (optional, for API testing)

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a PostgreSQL database:
   ```bash
   psql -U postgres
   CREATE DATABASE reviews_db;
   \q
   ```
4. Update `backend/src/config/db.js` with your PostgreSQL credentials (replace `your_password`):
   ```javascript
   const pool = new Pool({
     user: 'postgres',
     host: 'localhost',
     database: 'reviews_db',
     password: 'your_password',
     port: 5432,
   });
   ```
5. Apply the database schema:
   ```bash
   psql -U postgres -d reviews_db -f schema.sql
   ```
6. Start the backend server:
   ```bash
   npm run dev
   ```
   The server runs on `http://localhost:3001`.

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```
   The app runs on `http://localhost:3000`.

### Testing APIs with Postman
- **Submit a Review**:
  - Method: POST
  - URL: `http://localhost:3001/api/reviews`
  - Body (JSON):
    ```json
    {
      "productId": 1,
      "userId": "user123",
      "rating": 4,
      "reviewText": "Great product!",
      "tags": ["reliable", "fast"],
      "photoUrl": "https://example.com/image.jpg"
    }
    ```
- **Get Reviews**:
  - Method: GET
  - URL: `http://localhost:3001/api/reviews/1`
- **Get Top Tags**:
  - Method: GET
  - URL: `http://localhost:3001/api/top-tags`
- **Filter Reviews by Tag**:
  - Method: GET
  - URL: `http://localhost:3001/api/reviews/1/tag/reliable`

## Usage
1. Open `http://localhost:3000` in your browser.
2. View the list of products (Laptop, Headphones, Smartphone).
3. For each product:
   - Submit a review using the star rating system, review text, tags, and optional photo URL.
   - Click tags to filter reviews or clear the filter.
4. View the "Most Used Tags" section to see popular tags and their counts.
5. The UI is responsive and works on mobile, tablet, and desktop devices.
