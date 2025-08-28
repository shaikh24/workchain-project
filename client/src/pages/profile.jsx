import { useState } from "react";

export default function Profile() {
  // Dummy seller data (baad me backend sy fetch hoga)
  const [seller] = useState({
    name: "Ali Khan",
    title: "Full Stack Developer",
    description:
      "I am a passionate developer with 5+ years of experience building modern web applications using React, Node.js, and blockchain technologies.",
    rating: 4.9,
    reviews: 120,
    projectsDone: 85,
    hourlyRate: 2500, // in PKR
    dailyRate: 15000,
    earnings: 120000, // PKR
    category: "Software Development",
    skills: ["React", "Node.js", "MongoDB", "Blockchain", "TailwindCSS"],
    profilePic: "https://i.pravatar.cc/150?img=5",
    gigs: [
      {
        id: 1,
        title: "Build a professional website",
        images: [
          "https://source.unsplash.com/400x300/?website",
          "https://source.unsplash.com/400x300/?app",
          "https://source.unsplash.com/400x300/?dashboard",
        ],
        price: 15000,
        rating: 4.8,
        reviews: 45,
      },
      {
        id: 2,
        title: "Develop a blockchain dApp",
        images: [
          "https://source.unsplash.com/400x300/?blockchain",
          "https://source.unsplash.com/400x300/?crypto",
          "https://source.unsplash.com/400x300/?web3",
        ],
        price: 30000,
        rating: 5.0,
        reviews: 30,
      },
    ],
  });

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white p-6 rounded-xl shadow">
        <img
          src={seller.profilePic}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-indigo-600"
        />
        <div className="flex-1 space-y-2">
          <h2 className="text-2xl font-bold">{seller.name}</h2>
          <p className="text-indigo-600 font-medium">{seller.title}</p>
          <p className="text-gray-600">{seller.description}</p>
          <div className="flex items-center gap-4 text-gray-700 mt-2">
            <span>⭐ {seller.rating} ({seller.reviews} reviews)</span>
            <span>📂 {seller.projectsDone} Projects Done</span>
            <span>📌 {seller.category}</span>
          </div>
          <div className="flex gap-4 mt-3">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg">
              {seller.hourlyRate} PKR / hr
            </span>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg">
              {seller.dailyRate} PKR / day
            </span>
          </div>
        </div>
      </div>

      {/* Seller Earnings (sirf seller k liye) */}
      <div className="bg-green-50 border border-green-200 p-4 rounded-lg shadow text-green-700">
        💰 <strong>Total Earnings:</strong> {seller.earnings.toLocaleString()} PKR
      </div>

      {/* Skills */}
      <div className="bg-white p-6 rounded-xl shadow space-y-3">
        <h3 className="text-lg font-semibold">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {seller.skills.map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Gigs Section */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h3 className="text-lg font-semibold">My Gigs</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {seller.gigs.map((gig) => (
            <div
              key={gig.id}
              className="border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <div className="relative w-full h-48 overflow-x-scroll flex snap-x">
                {gig.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={gig.title}
                    className="w-full h-48 object-cover flex-shrink-0 snap-center"
                  />
                ))}
              </div>
              <div className="p-4 space-y-2">
                <h4 className="font-semibold text-gray-800">{gig.title}</h4>
                <p className="text-gray-600">
                  ⭐ {gig.rating} ({gig.reviews} reviews)
                </p>
                <p className="font-bold text-indigo-600">{gig.price} PKR</p>
                <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                  View Gig
                </button>
