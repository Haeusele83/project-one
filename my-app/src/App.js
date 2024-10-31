import React, { useEffect, useState } from 'react';

const api = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetch(`${api}/categories`)
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error("Fetch error:", error));
  }, []);

  const filteredCategories = categories
    .filter(category =>
      category.CategoryName?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.CategoryName?.localeCompare(b.CategoryName);
      return b.CategoryName?.localeCompare(a.CategoryName);
    });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      <input
        type="text"
        placeholder="Search categories..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      <button
        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
      >
        Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
      </button>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Category Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map(category => (
            <tr key={category.CategoryID} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{category.CategoryName}</td>
              <td className="py-2 px-4 border-b">{category.Description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryList;
