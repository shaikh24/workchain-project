import { useState } from "react";
import { Search, Star } from "lucide-react";

export default function Gigs() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Dummy gigs data
  const gigs = [
    {
      id: 1,
      title: "Logo Design for your Business",
      category: "Graphics",
      price: "30 PI/hr",
      rating: 4.8,
      projects: 95,
      seller: "Alice Brown",
      image: "https://source.unsplash.com/400x250/?logo,design",
    },
    {
      id: 2,
      title: "Full-stack MERN Website",
      category: "Development",
      price: "80 PI/hr",
      rating: 5.0,
      projects: 75,
      seller: "Mark Johnson",
      image: "https://source.unsplash.com/400x250/?coding,developer",
    },
    {
      id: 3,
      title: "Content Writing & Blogs",
      category: "Writing",
      price: "20 PI/hr",
      rating: 4.7,
      projects: 60,
      seller: "Sophia Lee",
      image: "https://source.unsplash.com/400x250/?writing,content",
    },
    {
      id: 4,
      title: "Social Media Marketing",
      category: "Marketing",
      price: "40 PI/hr",
      rating: 4.9,
      projects: 110,
      seller: "David Wilson",
      image: "https://source.unsplash.com/400x250/?marketing,social",
    },
  ];

  // Filter gigs
  const filteredGigs = gigs.filter(
    (gig) =>
      (category === "All" || gig.category === category) &&
      gig.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Explore Gigs</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 space-y-4 sm:space-y-0">
        {/* Search */}
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-1/2">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search gigs..."
            className="flex-1 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Categories */}
        <select
          className="border border-gray-300 rounded-lg px-4 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>Graphics</option>
          <option>Development</option>
          <option>Writing</option>
          <option>Marketing</option>
        </select>
      </div>

      {/* Gigs Listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredGigs.map((gig) => (
          <div
            key={gig.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
          >
            {/* Image */}
            <img
              src={gig.image}
              alt={gig.title}
              className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-4">
              <h2 className="text-lg font-semibold">{gig.title}</h2>
              <p className="text-sm text-gray-500">{gig.category}</p>

              <div className="flex items-center mt-2 space-x-3">
                <span className="flex items-center text-yellow-500">
                  <Star className="w-4 h-4 mr-1" /> {gig.rating}
                </span>
                <span className="text-gray-600">{gig.projects} projects</span>
              </div>

              <p className="mt-2 text-indigo-600 font-semibold">{gig.price}</p>
              <p className="text-sm text-gray-600">By {gig.seller}</p>

              {/* Button */}
              <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
