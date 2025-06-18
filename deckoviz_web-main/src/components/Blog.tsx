import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const articles = [
	{
		id: 1,
		category: 'Mysteries & Legends',
		title: 'The Rosetta Arts: Decoding Ancient Myth & Moor',
		author: 'Dr. Anika Dimitrov',
		avatar: '/images/ce180280-1968-4689-a35b-5389f623db51.png',
   	 image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		date: 'March 16, 2025',
		readTime: '5 min read',
		featured: true,
	},
	{
		id: 2,
		category: 'Mysteries & Legends',
		title: 'How 3D Painting is Preserving Ancient Artifacts',
		author: 'Dr. Anika Dimitrov',
		avatar: '/images/1375b92c-bc7e-4fb2-8afb-703876367e84.png',
		image: '/images/5c874e33-e35b-4777-a210-349524e8805f.png',
		date: 'March 16, 2025',
		readTime: '5 min read',
	},
	{
		id: 3,
		category: 'Preservation & Restoration',
		title: 'How 3D Painting is Preserving Ancient Artifacts',
		author: 'Dr. Anika Dimitrov',
		avatar: '/images/1375b92c-bc7e-4fb2-8afb-703876367e84.png',
		image: '/images/7a28f801-99b6-48fe-96e4-6fc89897b910.png',
		date: 'March 16, 2025',
		readTime: '5 min read',
	},
	{
		id: 4,
		category: 'Ancient Civilizations',
		title: 'How 3D Painting is Preserving Ancient Artifacts',
		author: 'Dr. Anika Dimitrov',
		avatar: '/images/1375b92c-bc7e-4fb2-8afb-703876367e84.png',
		image: '/images/ade66c2d-3cbd-4005-ba1e-f044a7fd040f.png',
		date: 'March 16, 2025',
		readTime: '5 min read',
	},
	// ...repeat for grid
];

const moreArticles = [
	{
		id: 1,
		section: 'Blog Section',
		title: 'Connect and collaborate efficiently with Deckoviz',
		desc: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam...',
		date: '4 Mar, 2022',
		tag: 'Product',
		image: '/images/Gemini_Generated_Image_3gz8p03gz8p03gz8.jpeg',
	},
	{
		id: 2,
		section: 'Project Management',
		title: 'Explore new worldclass workflow: introducing Polka...',
		desc: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam...',
		date: '4 Mar, 2022',
		tag: 'Product',
		image: '/images/Gemini_Generated_Image_3gz8p13gz8p13gz8.jpeg',
	},
	{
		id: 3,
		section: 'Design & Process',
		title: 'App components: An efficient way to build more focus...',
		desc: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam...',
		date: '22 Feb, 2022',
		tag: 'Features',
		image: '/images/Gemini_Generated_Image_3gz8p23gz8p23gz8.jpeg',
	},
	{
		id: 4,
		section: 'Customer Stories',
		title: 'How Jenny from Vimeo handles big task management for...',
		desc: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam...',
		date: '16 Jan, 2022',
		tag: 'Customer Stories',
		image: '/images/Gemini_Generated_Image_3gz8p33gz8p33gz8.jpeg',
		avatar: '/images/ce3552c2-18fd-471f-90ef-1edb442673ab.png',
		quote: true,
	},
];

const Blog: React.FC = () => {
	const [email, setEmail] = useState('');
	return (
		<div className="bg-[#f7f7f8] min-h-screen pb-20">
			<div className="max-w-6xl mx-auto px-4 pt-10">
				{/* Header */}
				<div className="flex flex-col items-center mb-0">
					<span className="px-3 py-1 rounded-lg bg-[#a78bfa] text-xs font-medium text-white mb-4 mt-16">
						Blog Sections
					</span>
				</div>
				{/* Add breathing space between purple block and main heading */}
				<div className="flex flex-col items-center mb-10">
					<h1 className="text-4xl md:text-5xl font-bold text-center mb-6 mt-3">
						Blog And Articles
					</h1>
					<p className="text-gray-900  text-center mb-4">
						Amet minim mollit non deserunt ullamco est sit.
					</p>
				</div>
				{/* A-Z Filter */}
				<div className="flex flex-wrap gap-2 justify-center mb-8">
					<button className="px-5 py-1.5 rounded-3xl bg-[#6366f1] text-white text-xs font-semibold shadow-sm">
						A-Z
					</button>
					{[...'BCDEFGHIJKLMNOPQ'].map((l) => (
						<button
							key={l}

							className="px-5 py-1.5 rounded-3xl gap-3 bg-white text-gray-700 text-xs font-medium border border-gray-200 hover:bg-gray-100 transition"
						>
							{l}
						</button>
					))}
					<button className="px-4 py-1.5 rounded-full bg-white text-gray-700 text-xs font-medium border border-gray-200 hover:bg-gray-100 transition flex items-center">
						<span className="inline-block rotate-90 text-lg">›</span>
					</button>
				</div>
				{/* Section Tag */}
				<div className="mb-2">
					<span className="inline-block px-3 py-1 rounded-lg bg-white text-xs font-medium border border-gray-200 text-gray-700 mb-2">
						Our Product: Deckoviz
					</span>
				</div>
				{/* Latest Articles */}
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-2xl md:text-3xl font-bold">
						Latest Articles:
						<br />
						<span className="text-black">Uncover the best Artworks</span>
					</h2>
					<button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
						View All
					</button>
				</div>
				{/* Featured Article */}
				<div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
					<div className="flex-1 p-6 flex flex-col justify-between">
						<div className="flex items-center gap-2 mb-2">
							<img
								src={articles[0].avatar}
								alt={articles[0].author}
								className="w-8 h-8 rounded-full object-cover"
							/>
							<span className="text-xs text-gray-700 font-medium">
								{articles[0].author}
							</span>
						</div>
						<span className="text-xs text-blue-700 font-semibold mb-1">
							{articles[0].category}
						</span>
						<h3 className="text-xl font-bold mb-2 text-gray-900">
							{articles[0].title}
						</h3>
						<div className="flex items-center gap-4 mt-auto">
							<button className="px-4 py-1 bg-blue-600 text-white rounded-lg text-xs font-medium">
								Read more
							</button>
							<span className="text-xs text-gray-400">
								{articles[0].date}
							</span>
							<span className="text-xs text-gray-400">
								{articles[0].readTime}
							</span>
						</div>
					</div>
					<div className="md:w-1/2 h-56 md:h-auto flex items-center justify-center bg-gray-100">
						<img
							src={articles[0].image}
							alt={articles[0].title}
							className="object-cover w-full h-full"
						/>
					</div>
				</div>
				{/* Article Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
					{articles.slice(1, 7).map((a) => (
						<div
							key={a.id}
							className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
						>
							<div className="h-40 w-full bg-gray-100 flex items-center justify-center">
								<img
									src={a.image}
									alt={a.title}
									className="object-cover w-full h-full"
								/>
							</div>
							<div className="p-4 flex-1 flex flex-col">
								<span className="text-xs text-blue-700 font-semibold mb-1">
									{a.category}
								</span>
								<h4 className="font-bold text-base mb-1 text-gray-900">
									{a.title}
								</h4>
								<span className="text-xs text-gray-400 mb-2">
									Published on {a.date}
								</span>
								<div className="flex items-center justify-between mt-auto">
									<span className="text-xs text-gray-400">{a.readTime}</span>
								</div>
							</div>
						</div>
					))}
				</div>
				{/* More Articles For You */}
				<div className="flex items-center justify-between mb-4 mt-16">
					<h2 className="text-2xl md:text-3xl font-bold">
						More Articles For you
					</h2>
					<button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
						View All
					</button>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* Main large card */}
					<div className="md:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
						<div className="flex-1 p-6 flex flex-col justify-between">
							<span className="text-xs text-gray-400 mb-2 uppercase tracking-wide">
								{moreArticles[0].section}
							</span>
							<h3 className="text-xl font-bold mb-2 text-gray-900">
								{moreArticles[0].title}
							</h3>
							<p className="text-gray-500 text-sm mb-4">
								{moreArticles[0].desc}
							</p>
							<div className="flex items-center gap-4 mt-auto">
								<span className="text-xs text-gray-400">
									{moreArticles[0].date}
								</span>
								<span className="text-xs text-blue-700 font-semibold">
									{moreArticles[0].tag}
								</span>
							</div>
						</div>
						<div className="md:w-1/2 h-56 md:h-auto flex items-center justify-center bg-gray-100">
							<img
								src={moreArticles[0].image}
								alt={moreArticles[0].title}
								className="object-cover w-full h-full"
							/>
						</div>
					</div>
					{/* Newsletter Card */}
					<div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between">
						<span className="text-xs text-gray-400 mb-2 uppercase tracking-wide">
							NEWSLETTER
						</span>
						<h4 className="font-bold text-lg mb-2 text-gray-900">
							Subscribe to Deckoviz
						</h4>
						<p className="text-gray-500 text-sm mb-4">
							A simple short and brief information/description about this
							particular title goes in here.
						</p>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter your email"
							className="w-full px-4 py-2 mb-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<button className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium">
							Submit
						</button>
					</div>
				</div>
				{/* More small cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
					{moreArticles.slice(1).map((a) => (
						<div
							key={a.id}
							className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
						>
							<div className="h-40 w-full bg-gray-100 flex items-center justify-center">
								<img
									src={a.image}
									alt={a.title}
									className="object-cover w-full h-full"
								/>
							</div>
							<div className="p-4 flex-1 flex flex-col">
								<span className="text-xs text-gray-400 mb-1 uppercase tracking-wide">
									{a.section}
								</span>
								<h4 className="font-bold text-base mb-1 text-gray-900">
									{a.title}
								</h4>
								<p className="text-gray-500 text-sm mb-2">{a.desc}</p>
								<div className="flex items-center gap-2 mt-auto">
									{a.quote && a.avatar && (
										<img
											src={a.avatar}
											alt={a.title}
											className="w-8 h-8 rounded-full object-cover"
										/>
									)}
									{a.quote ? (
										<span className="italic text-xs text-gray-600">
											"{a.desc}"
										</span>
									) : (
										<span className="text-xs text-gray-400">
											{a.date}
										</span>
									)}
									<span className="text-xs text-blue-700 font-semibold ml-auto">
										{a.tag}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Blog;
