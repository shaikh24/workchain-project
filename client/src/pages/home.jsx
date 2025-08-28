import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all gigs from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/gigs")
      .then((res) => res.json())
      .then((data) => {
        setGigs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching gigs:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading gigs...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Hero Section */}
      <div className="text-center py-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow">
        <h1 className="text-3xl font-bold mb-3">
          Find the Best Freelancers for Your Projects
        </h1>
        <p className="mb-6">
          WorkChain – A decentralized marketplace for gigs & projects.
        </p>
        <Link
          to="/jobs"
          className="px-6 py-3 bg-white text-indigo-700 rounded-lg font-semibold shadow hover:bg-gray-100 transition"
        >
          Explore Jobs
        </Link>
      </div>

      {/* Gigs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gigs.map((gig) => (
          <div
            key={gig._id}
            className="bg-white border rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            {/* Image Slider */}
            <div className="flex overflow-x-scroll snap-x w-full h-48">
              {gig.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={gig.title}
                  className="w-full h-48 object-cover flex-shrink-0 snap-center"
                />
              ))}
            </div>

            {/* Gig Info */}
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-3">
                <img
                  src={gig.seller.profilePic}
                  alt={gig.seller.name}
                  className="w-10 h-10 rounded-full border"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{gig.seller.name}</h3>
                  <p className="text-sm text-gray-500">{gig.category}</p>
                </div>
              </div>
              <h4 className="font-bold text-gray-900">{gig.title}</h4>
              <p className="text-gray-600">
                ⭐ {gig.rating} ({gig.seller.reviews.length} reviews)
              </p>
              <p className="text-sm text-gray-500">
                📂 {gig.projects} Projects Done
              </p>
              <p className="font-bold text-indigo-600">{gig.price}</p>
              <Link
                to={`/gig/${gig._id}`}
                className="mt-2 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                View Gig
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
