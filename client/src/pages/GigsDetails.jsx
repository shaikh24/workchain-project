import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star } from "lucide-react";

export default function GigDetails() {
  const { id } = useParams();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch gig by ID
  useEffect(() => {
    fetch(`http://localhost:5000/api/gigs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setGig(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching gig:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center">Loading gig details...</p>;
  if (!gig) return <p className="text-center">Gig not found</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back link */}
      <Link to="/" className="text-indigo-600 hover:underline mb-4 inline-block">
        ← Back to Gigs
      </Link>

      {/* Gig Title */}
      <h1 className="text-3xl font-bold mb-4">{gig.title}</h1>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {gig.images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt="Gig sample"
            className="rounded-lg shadow-md object-cover w-full h-56"
          />
        ))}
      </div>

      {/* Seller Info */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={gig.seller.profilePic}
          alt={gig.seller.name}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <p className="font-semibold">{gig.seller.name}</p>
          <p className="text-gray-600">{gig.projects} projects completed</p>
          <p className="flex items-center text-yellow-500">
            <Star className="w-4 h-4 mr-1" /> {gig.rating} rating
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-6">{gig.description}</p>

      {/* Price + Order */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-2xl font-semibold text-indigo-600">{gig.price}</p>
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
          Order Now
        </button>
      </div>

      {/* Reviews */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Client Reviews</h2>
        <div className="space-y-4">
          {gig.seller.reviews.map((review, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg p-4"
            >
              <p className="font-semibold">{review.user}</p>
              <p className="text-gray-700">{review.text}</p>
              <p className="text-yellow-500">⭐ {review.rating}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
