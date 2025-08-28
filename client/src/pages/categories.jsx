import { Briefcase, Code, PenTool, Monitor, Music, Camera, Globe } from "lucide-react";

const categories = [
  { id: 1, name: "Graphics & Design", icon: PenTool, gigs: 128 },
  { id: 2, name: "Web Development", icon: Code, gigs: 245 },
  { id: 3, name: "Digital Marketing", icon: Globe, gigs: 180 },
  { id: 4, name: "Video & Animation", icon: Camera, gigs: 96 },
  { id: 5, name: "Music & Audio", icon: Music, gigs: 75 },
  { id: 6, name: "IT & Software", icon: Monitor, gigs: 134 },
  { id: 7, name: "Business", icon: Briefcase, gigs: 90 },
];

export default function Categories() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
        Explore Categories
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Choose a category to find the best freelancers and gigs
      </p>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col items-center p-6 bg-white rounded-xl shadow hover:shadow-lg cursor-pointer transition"
          >
            {/* Icon */}
            <cat.icon className="w-10 h-10 text-indigo-600 mb-3" />
            
            {/* Name */}
            <h2 className="text-lg font-semibold text-gray-800">{cat.name}</h2>
            
            {/* Stats */}
            <p className="text-sm text-gray-500">{cat.gigs} gigs available</p>
          </div>
        ))}
      </div>
    </div>
  );
}
