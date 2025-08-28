import { Link } from "react-router-dom";
import { useState } from "react";

export default function GigCard({ gig }) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % gig.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + gig.images.length) % gig.images.length);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="relative">
        <img src={gig.images[currentImage]} alt={gig.title} className="w-full h-48 object-cover" />
        <button onClick={prevImage} className="absolute left-2 top-1/2 bg-gray-800 text-white px-2 rounded-full">◀</button>
        <button onClick={nextImage} className="absolute right-2 top-1/2 bg-gray-800 text-white px-2 rounded-full">▶</button>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold">{gig.title}</h2>
        <p className="text-sm text-gray-600">{gig.category}</p>
        <p className="text-sm mt-2">{gig.description}</p>
        <p className="mt-2 font-semibold text-indigo-600">{gig.price}</p>
        <p className="text-sm text-gray-500">⭐ {gig.rating} | {gig.projects} projects done</p>
        <Link to={`/job/${gig.id}`} className="mt-3 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg">View Details</Link>
      </div>
    </div>
  );
}
