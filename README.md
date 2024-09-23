# Every Food Facts - React.js Website Documentation
# Live link: [https://every-food-fact.netlify.app](https://every-food-fact.netlify.app)

## Table of Contents

1. [Introduction](#1-introduction)
2. [Technologies](#2-technologies)
3. [Project Structure](#3-project-structure)
4. [Features](#4-features)
5. [Detailed Feature Explanations](#5-detailed-feature-explanations)
6. [API Integration](#6-api-integration)
7. [State Management](#7-state-management)
8. [UI Design](#8-ui-design)
9. [Deployment](#9-deployment)

## 1. Introduction

Every Food Facts is a web application that provides users with detailed information about food products. It utilizes the OpenFoodFacts API to fetch and display product data, including nutritional information, ingredients, and more. The application aims to help users make informed decisions about the food they consume by providing easy access to comprehensive product information.

## 2. Technologies

### Front-end - React.js

### Styling - TailwindCSS

### API Integration - OpenFoodFacts API

### State Management
- React Hooks (useState, useEffect, useContext, useParams)
- Custom Hooks (useDebounce)
- React Context API (SearchContext, for global state management)

## 3. Project Structure

The project consists of two main pages:

1. Home Page
2. Product Details Page

### Reusable Components
- Loader
- Search Bar
- Card Component
- Navbar

### Other Components
- ProductList
- Search 
- CategoryFilter
- SortByName
- SortByNutritionalGrade

## 4. Features

### 4.1 Home Page
- Displays a list of products
- Search functionality (by name and barcode)
- Sorting and filtering options
- Load more functionality

### 4.2 Product Card
Displays key information:
- Product name
- Image
- Category
- Ingredients (if available)
- Nutrition Grade (A, B, C, D, E)

### 4.3 Search Functionality
Two search options are available:
1. Search by product name
2. Search by barcode

### 4.4 Category Filtering
Users can filter products by category using a dropdown menu.

### 4.5 Sorting
Products can be sorted by:
- Name (A-Z or Z-A)
- Nutritional grade (ascending or descending)

### 4.6 Product Details Page
Displays detailed information about a specific product, including:
- Nutritional grade
- Nutritional values per 100g
- Product labels (e.g., "No gluten," "No preservatives")

## 5. Detailed Feature Explanations

### 5.1 Searching

#### 5.1.1 Search by Name
- **Implementation**: Uses the `fetchDataOnNameSearch` function.
- **API Endpoint**: `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${debouncedSearch}&json=1&page=${page}`
- **Functionality**:
  - Takes the user's input from the search bar.
  - Uses a debounced version of the search term to optimize API calls.
  - Dynamically inserts the search term into the API URL.
  - Fetches results using a useEffect hook in the ProductList component.
  - Supports pagination with the `page` parameter for loading more results.

#### 5.1.2 Search by Barcode
- **Implementation**: Uses the `fetchDataOnCodeSearch` function.
- **API Endpoint**: `https://world.openfoodfacts.org/api/v0/product/${encodeURIComponent(code)}.json`
- **Functionality**:
  - Takes a numeric barcode input from the user.
  - Encodes the barcode to ensure proper URL formatting.
  - Fetches detailed information for a specific product.

### 5.2 Debouncing
- **Implementation**: Custom hook `useDebounce`
- **Purpose**: To optimize API calls and prevent overwhelming the server with too many requests.
- **Functionality**:
  - Introduces a 500ms delay after the last keystroke before making an API call.
  - Allows users to type their full search term without triggering multiple unnecessary API requests.
  - Applied to both name and barcode search functionalities.

### 5.3 Filtering

#### 5.3.1 Category Filtering
- **Implementation**: Uses the `fetchDataByCategory` function.
- **API Endpoints**:
  - For category list: `https://world.openfoodfacts.org/categories.json`
  - For products in a category: `https://world.openfoodfacts.org/category/${selectedCategory}.json&page=${page}`
- **Functionality**:
  - Fetches a list of available categories from the API.
  - Displays categories in a dropdown menu on the homepage.
  - When a category is selected, it fetches products specific to that category.
  - Supports pagination for loading more products within the selected category.

### 5.4 Sorting
- **Implementation**: Client-side sorting using JavaScript array methods.
- **Sorting Options**:
  1. By Name: A-Z or Z-A
  2. By Nutritional Grade: Ascending or Descending
- **Functionality**:
  - Takes two inputs:
    1. Type (sort by name or nutritional grade)
    2. Order (A-Z/Z-A for name, ascending/descending for grade)
  - Uses JavaScript's `array.sort()` method to sort the products array.
  - For reverse order, applies `array.reverse()` after sorting.
  - Sorting is performed on the client-side, meaning it doesn't require additional API calls.

### 5.5 Load More Functionality
- **Implementation**: Utilizes the `page` parameter in API calls.
- **Functionality**:
  - A "Load More" button is displayed at the bottom of the product list.
  - When clicked, it increments the `page` parameter.
  - Fetches the next set of 50 products from the API.
  - Appends new products to the existing list, creating a continuous scrolling effect.
  - Works across different features (search, category filtering) by including the `page` parameter in respective API calls.

### 5.6 Product Details Page
- **Implementation**: Uses React Router and the `useParams` hook.
- **Functionality**:
  - Extracts the product's barcode from the URL parameters.
  - Uses the barcode to fetch detailed product information from the API.
  - Displays comprehensive product details including:
    - Nutritional grade
    - Nutritional values per 100g
    - Product labels (e.g., "No gluten," "No preservatives")
  - Presents information in a user-friendly, visually appealing layout.

## 6. API Integration

### 6.1 Main API Endpoints
- Fetch all products: `https://world.openfoodfacts.org/category/-.json&page=${page}`
- Search products by name: `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${debouncedSearch}&json=1&page=${page}`
- Get product details by barcode: `https://world.openfoodfacts.org/api/v0/product/${encodeURIComponent(code)}.json`
- Fetch categories: `https://world.openfoodfacts.org/categories.json`
- Fetch products by category: `https://world.openfoodfacts.org/category/${selectedCategory}.json&page=${page}`

### 6.2 API Functions
- `fetchData`: Fetches initial product data
- `fetchDataOnNameSearch`: Searches products by name
- `fetchDataOnCodeSearch`: Searches products by barcode
- `fetchDataByCategory`: Fetches products by category

## 7. State Management

### 7.1 SearchContext
A custom React context for managing global state and functions related to search and data fetching.

### 7.2 Custom Hooks
- `useDebounce`: Implements debounce functionality for search inputs to optimize API calls.

## 8. UI Design

### 8.1 General Design Principles
- Dark theme for reduced eye strain
- Minimalistic and intuitive layout
- Consistent color scheme (dark backgrounds with blue accents)
- Responsive design for various screen sizes

### 8.2 Home Page Design
- Clear title and purpose
- Prominent search fields
- Card layout for product display
- Interactive elements (dropdowns and buttons) for sorting and filtering

### 8.3 Product Page Design
- Detailed nutritional information
- Clear presentation of product labels
- Consistent styling with the home page

## 9. Deployment
The Every Food Facts website is deployed and publicly accessible. Here are the key details:

- **Hosting Platform**: Netlify
- **Live Website URL**: [https://every-food-fact.netlify.app](https://every-food-fact.netlify.app)
