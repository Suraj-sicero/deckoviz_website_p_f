import React from 'react';

export default function Leaderboard() {
  // Sample leaderboard data
  const leaderboardData = [
    {
      rank: 1,
      name: "Nishant @212",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      country: "USA",
      countryFlag: "https://flagcdn.com/w40/us.png",
      referrals: "*987 Invite & Ignite",
      artworkSold: 85,
      highestSingleSale: "$25,000",
      mostExpensiveArtwork: "$75,000",
      engagementPoints: "*999999",
      medal: "🥇",
    },
    {
      rank: 2,
      name: "Sophia@56",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      country: "UK",
      countryFlag: "https://flagcdn.com/w40/gb.png",
      referrals: "*987 Invite & Ignite",
      artworkSold: 65,
      highestSingleSale: "$18,000",
      mostExpensiveArtwork: "$75,000",
      engagementPoints: "*999999",
      medal: "🥈",
    },
    {
      rank: 3,
      name: "Rudra jinx@65",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      country: "India",
      countryFlag: "https://flagcdn.com/w40/in.png",
      referrals: "*987 Invite & Ignite",
      artworkSold: 46,
      highestSingleSale: "$15,000",
      mostExpensiveArtwork: "$75,000",
      engagementPoints: "*123456",
      medal: "🥉",
    },
    {
      rank: 5,
      name: "TridentS@12",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      country: "India",
      countryFlag: "https://flagcdn.com/w40/in.png",
      referrals: "*987 Invite & Ignite",
      artworkSold: 25,
      highestSingleSale: "$10,000",
      mostExpensiveArtwork: "$60,000",
      engagementPoints: "*123456",
      medal: "⭐",
    },
    {
      rank: 6,
      name: "Jolene@25",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      country: "UK",
      countryFlag: "https://flagcdn.com/w40/gb.png",
      referrals: "*987 Invite & Ignite",
      artworkSold: 25,
      highestSingleSale: "$5,000",
      mostExpensiveArtwork: "$60,000",
      engagementPoints: "*123456",
      medal: "⭐",
    },
    {
      rank: 7,
      name: "Arya#12@",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      country: "South Korea",
      countryFlag: "https://flagcdn.com/w40/kr.png",
      referrals: "*987 Invite & Ignite",
      artworkSold: 36,
      highestSingleSale: "$5,000",
      mostExpensiveArtwork: "$60,000",
      engagementPoints: "*123456",
      medal: "⭐",
    },
    {
      rank: 8,
      name: "Elvinbond*@1",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      country: "UK",
      countryFlag: "https://flagcdn.com/w40/gb.png",
      referrals: "*987 Invite & Ignite",
      artworkSold: 56,
      highestSingleSale: "$2500",
      mostExpensiveArtwork: "$40,000",
      engagementPoints: "*7891011",
      medal: "⭐",
    },
    {
      rank: 9,
      name: "Huzaifa @22",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      country: "USA",
      countryFlag: "https://flagcdn.com/w40/us.png",
      referrals: "*987 Invite & Ignite",
      artworkSold: 78,
      highestSingleSale: "2500",
      mostExpensiveArtwork: "$40,000",
      engagementPoints: "*7891011",
      medal: "⭐",
    },
    {
      rank: 10,
      name: "NishR644",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      country: "South Korea",
      countryFlag: "https://flagcdn.com/w40/kr.png",
      referrals: "*987 Invite & Ignite",
      artworkSold: 65,
      highestSingleSale: "$2500",
      mostExpensiveArtwork: "$25,000",
      engagementPoints: "*7891011",
      medal: "⭐",
    },
    {
      rank: 11,
      name: "Sophia@12",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      country: "UK",
      countryFlag: "https://flagcdn.com/w40/gb.png",
      referrals: "*987 Invite & Ignite",
      artworkSold: 45,
      highestSingleSale: "$1000",
      mostExpensiveArtwork: "$25,000",
      engagementPoints: "*7891011",
      medal: "⭐",
    },
    {
      rank: 12,
      name: "Rudra jinx@65",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      country: "India",
      countryFlag: "https://flagcdn.com/w40/in.png",
      referrals: "*987 Invite & Ignite",
      artworkSold: 25,
      highestSingleSale: "$1000",
      mostExpensiveArtwork: "$25,000",
      engagementPoints: "*12131415",
      medal: "⭐",
    },
    {
      rank: 13,
      name: "NishR644",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      country: "UK",
      countryFlag: "https://flagcdn.com/w40/gb.png",
      referrals: "*987 Invite & Ignite",
      artworkSold: 14,
      highestSingleSale: "$1000",
      mostExpensiveArtwork: "$20,000",
      engagementPoints: "*12131415",
      medal: "⭐",
    },
    {
      rank: 14,
      name: "Huzaifa @22",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      country: "USA",
      countryFlag: "https://flagcdn.com/w40/us.png",
      referrals: "*987 Invite & Ignite",
      artworkSold: 45,
      highestSingleSale: "$1000",
      mostExpensiveArtwork: "$20,000",
      engagementPoints: "*12131415",
      medal: "⭐",
    },
    {
      rank: 15,
      name: "Arya#12@",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      country: "South Korea",
      countryFlag: "https://flagcdn.com/w40/kr.png",
      referrals: "*987 Tack w... *987 Invite...",
      artworkSold: 65,
      highestSingleSale: "$1500",
      mostExpensiveArtwork: "$20,000",
      engagementPoints: "*12131415",
      medal: "⭐",
    },
    {
      rank: 16,
      name: "Elvinbond*@1",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      country: "UK",
      countryFlag: "https://flagcdn.com/w40/gb.png",
      referrals: "*987 Invite & Ignite",
      artworkSold: 1,
      highestSingleSale: "$1500",
      mostExpensiveArtwork: "$12,500",
      engagementPoints: "*12131415",
      medal: "⭐",
    },
    {
      rank: 17,
      name: "Huzaifa @22",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      country: "USA",
      countryFlag: "https://flagcdn.com/w40/us.png",
      referrals: "*987 Invite & Ignite",
      artworkSold: 25,
      highestSingleSale: "$1500",
      mostExpensiveArtwork: "$12,500",
      engagementPoints: "*17181920",
      medal: "⭐",
    },
    {
      rank: 18,
      name: "Jolene#*@2",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      country: "UK",
      countryFlag: "https://flagcdn.com/w40/gb.png",
      referrals: "*987 Invite & Ignite",
      artworkSold: 65,
      highestSingleSale: "$1500",
      mostExpensiveArtwork: "$12,500",
      engagementPoints: "*17181920",
      medal: "⭐",
    },
    {
      rank: 19,
      name: "Arya#12@",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      country: "India",
      countryFlag: "https://flagcdn.com/w40/in.png",
      referrals: "*987 Invite & Ignite",
      artworkSold: 18,
      highestSingleSale: "$250",
      mostExpensiveArtwork: "$12,500",
      engagementPoints: "*17181920",
      medal: "⭐",
    },
    {
      rank: 20,
      name: "Elvintug14",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      country: "South Korea",
      countryFlag: "https://flagcdn.com/w40/kr.png",
      referrals: "*987 Invite & Ignite",
      artworkSold: 20,
      highestSingleSale: "$250",
      mostExpensiveArtwork: "$9,999",
      engagementPoints: "*17181920",
      medal: "⭐",
    },
    {
      rank: 21,
      name: "TridentS@12",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      country: "India",
      countryFlag: "https://flagcdn.com/w40/in.png",
      referrals: "*987 Invite & Ignite",
      artworkSold: 65,
      highestSingleSale: "$250",
      mostExpensiveArtwork: "$9,999",
      engagementPoints: "*17181920",
      medal: "⭐",
    },
  ].map((item) => {
    if (item.country === "Middesk") {
      return { ...item, country: "UK", countryFlag: "https://flagcdn.com/w40/gb.png" }
    }
    return item
  })

  const getArtworkSoldColor = (value: number): string => {
    if (value >= 70) return "text-red-500"
    if (value >= 60) return "text-orange-500"
    if (value >= 50) return "text-purple-500"
    if (value >= 40) return "text-violet-500"
    if (value >= 30) return "text-blue-500"
    if (value >= 20) return "text-indigo-500"
    return "text-green-500"
  }

  const getHighestSaleColor = (saleValue: string): string => {
    const numValue = Number.parseInt(saleValue.replace(/[$,]/g, ""))
    if (numValue >= 20000) return "text-blue-600"
    if (numValue >= 15000) return "text-pink-600"
    if (numValue >= 10000) return "text-orange-500"
    if (numValue >= 5000) return "text-yellow-600"
    if (numValue >= 2500) return "text-blue-500"
    return "text-red-500"
  }

  return (
    <div className="relative min-h-screen bg-white">
      {/* Top Badge */}
      <div className="flex justify-center pt-28 pb-2 mb-4">
        <div className="bg-blue-600 text-white px-4 py-1 rounded-lg text-sm font-medium shadow-lg">
          DECKOVIZ LEADERBOARD
        </div>
      </div>

      {/* Main Heading */}
      <div className="text-center mb-16 pt-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">Deckoviz <span className="bg-gradient-to-r from-blue-500 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
              Leaderboard
            </span></h1>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Because beauty should be celebrated. And so should <br />you.
        </p>
        <p className="text-base text-gray-600 mb-6 max-w-3xl mx-auto">
          The Deckoviz Leaderboard is a joyful, playful way to celebrate our most
          <br />
          passionate, engaged, and inspiring community members around the world.
        </p>
        <p className="text-base text-gray-600 mb-12 max-w-4xl mx-auto">
          Think of it as a friendly competition meets art gallery hall-of-fame. A live table
          <br />
          showcasing the top 250 Deckoviz contributors, collectors, sharers, and art
          <br />
          lovers — the ones who make this whole ecosystem come alive.
        </p>
      </div>

      {/* Profile Avatars with Spiral Gradient Background */}
      <div className="relative flex justify-center items-center mb-16">
        
        {/* Spiral Gradient Background */}
<div
  className="absolute inset-0 -translate-y-12"
  style={{
    background:
      "conic-gradient(from 45deg at 50% 50%, rgba(0, 255, 255, 0.4) 0deg, rgba(0, 204, 204, 0.15) 90deg, rgba(0, 255, 255, 0.5) 180deg, rgba(0, 204, 204, 0.15) 270deg, rgba(0, 255, 255, 0.3) 360deg)",
    borderRadius: "50%",
    filter: "blur(60px)",
    width: "160%",
    height: "400px",
    left: "-60%",
    top: "-120%",
    zIndex: 1,
    opacity: 0.8,
  }}
/>


        <div className="relative z-10 flex items-center">
          <div className="flex -space-x-2">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
              alt="User 1"
              className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="User 2"
              className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face"
              alt="User 3"
              className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
              alt="User 4"
              className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
            />
            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold border-2 border-white shadow-lg">
              +10
            </div>
          </div>
          <div className="ml-6 text-left">
            <div className="text-lg font-semibold text-gray-900">250 Deckoviz contributors,</div>
            <div className="text-lg font-semibold text-gray-900">collectors, sharers, and art lovers</div>
          </div>
        </div>
      </div>

     
      {/* Leaderboard Container - Positioned to overlap gradient */}
      <div className="relative z-20 max-w-6xl mx-auto px-4" style={{ marginTop: "8rem" }}>
        {/* Browser Mockup Container */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
          {/* Browser Header */}
          <div className="bg-gray-100 px-6 py-4 flex items-center justify-between">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>

            {/* URL bar with lock icon */}
            <div className="flex items-center bg-gray-300 px-4 py-2 rounded-lg">
              <svg className="w-4 h-4 text-gray-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm text-gray-700 font-medium">Deckoviz.Com</span>
            </div>

            <div></div>
          </div>

          {/* Leaderboard Content */}
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Global Leaderboard Categories</h2>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-300 bg-gray-50">
                    <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 border-r border-gray-200">
                      Rank
                    </th>
                    <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 border-r border-gray-200">
                      User Name
                    </th>
                    <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 border-r border-gray-200">
                      Country
                    </th>
                    <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 border-r border-gray-200">
                      Referrals
                    </th>
                    <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 border-r border-gray-200">
                      Artwork Sold
                    </th>
                    <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 border-r border-gray-200">
                      Highest Single Sale
                    </th>
                    <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700 border-r border-gray-200">
                      Most Expensive Artwork Bought
                    </th>
                    <th className="text-left py-3 px-3 text-xs font-semibold text-gray-700">Engagement Points</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((user, index) => {
                    return (
                      <tr
                        key={index}
                        className={`border-b border-gray-200 hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                      >
                        <td className="py-3 px-3 border-r border-gray-200">
                          <div className="flex items-center space-x-2">
                            <span className="text-base">{user.medal}</span>
                            <span className="font-semibold text-gray-900 text-sm">#{user.rank}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 border-r border-gray-200">
                          <div className="flex items-center space-x-2">
                            <img
                              src={user.avatar || "/placeholder.svg"}
                              alt={user.name}
                              className="w-7 h-7 rounded-full"
                            />
                            <span className="font-medium text-gray-900 text-sm">{user.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 border-r border-gray-200">
                          <div className="flex items-center space-x-2">
                            <img
                              src={user.countryFlag || "/placeholder.svg"}
                              alt={`${user.country} flag`}
                              className="w-5 h-3 object-cover rounded-sm flex-shrink-0"
                            />
                            <span className="text-gray-700 text-sm whitespace-nowrap">{user.country}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 border-r border-gray-200">
                          <span className="text-gray-700 text-xs">{user.referrals}</span>
                        </td>
                        <td className="py-3 px-3 border-r border-gray-200">
                          <div className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                            <span className={`font-semibold text-sm ${getArtworkSoldColor(user.artworkSold)}`}>
                              {user.artworkSold}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-3 border-r border-gray-200">
                          <span className={`font-bold text-sm ${getHighestSaleColor(user.highestSingleSale)}`}>
                            {user.highestSingleSale}
                          </span>
                        </td>
                        <td className="py-3 px-3 border-r border-gray-200">
                          <span className="text-gray-700 text-sm">{user.mostExpensiveArtwork}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-gray-600 text-xs">{user.engagementPoints}</span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600">
                1-20 of 250 Row/Page:
                <select className="ml-2 border border-gray-300 rounded px-2 py-1">
                  <option>7/12</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                {[1, 2, 3, 4, 5, 6, 16].map((page, index) => (
                  <button
                    key={index}
                    className={`px-3 py-1 rounded ${page === 2 ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100"}`}
                  >
                    {page}
                  </button>
                ))}
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7m-8-14l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    {/* Referral Champions Section */}
<div className="min-h-screen bg-white py-16 px-4 mt-20 relative">
 {/* Light pink gradient splash background */}
 <div 
   className="absolute top-0 left-0 w-full h-80 opacity-80"
   style={{
     background: "linear-gradient(135deg, rgba(255, 240, 245, 0.8) 0%, rgba(255, 228, 240, 0.6) 30%, rgba(255, 218, 235, 0.4) 60%, rgba(255, 255, 255, 0.1) 100%)",
     pointerEvents: "none"
   }}
 />
 <div className="max-w-7xl mx-auto relative z-10">
   {/* Header Section */}
   <div className="text-center mb-16">
     <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
       Referral Champions
     </h1>
     <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
       These are the beautiful souls spreading the Deckoviz love far and wide. Every referral helps grow our global creative family — and we're rewarding you in magical ways.
     </p>
   </div>

   {/* Cards Grid */}
   <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
     
     {/* Top 5 Referrers Card */}
     <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
       <div className="text-center mb-6">
         <p className="text-sm text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>FOR</p>
         <h3 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Top 5 Referrers</h3>
         <p className="text-sm text-gray-600" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>All-expenses-paid creative vacation</p>
       </div>
       
       {/* Image Grid */}
       <div className="grid grid-cols-3 gap-2 rounded-2xl overflow-hidden">
         <img src="https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Mountain landscape" className="w-full h-24 object-cover" />
         <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=120&h=120&fit=crop" 
              alt="Beach resort" className="w-full h-24 object-cover" />
         <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=120&h=120&fit=crop" 
              alt="City skyline" className="w-full h-24 object-cover" />
         <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Desert landscape" className="w-full h-24 object-cover" />
         <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&h=120&fit=crop" 
              alt="Forest view" className="w-full h-24 object-cover" />
         <img src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=120&h=120&fit=crop" 
              alt="Tropical paradise" className="w-full h-24 object-cover" />
       </div>
     </div>

     {/* Top 100 Referrers Card */}
     <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
       <div className="text-center mb-6">
         <p className="text-sm text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>FOR</p>
         <h3 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Top 100 Referrers</h3>
         <p className="text-sm text-gray-600" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Exclusive Deckoviz Experience Vouchers</p>
       </div>
       
       {/* Browser Mockup */}
       <div className="bg-gray-100 rounded-2xl overflow-hidden">
         {/* Browser Header */}
         <div className="bg-gray-200 px-4 py-3 flex items-center space-x-2">
           <div className="flex space-x-1">
             <div className="w-3 h-3 rounded-full bg-red-400"></div>
             <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
             <div className="w-3 h-3 rounded-full bg-green-400"></div>
           </div>
           <div className="flex-1 text-center">
             <span className="text-xs text-gray-600" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>On Progress 🔥</span>
           </div>
         </div>
         
         {/* Browser Content */}
         <div className="p-6 bg-white min-h-32">
           <div className="flex items-center justify-between mb-4">
             <div className="flex items-center space-x-2">
               <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                 <span className="text-white text-xs font-bold">D</span>
               </div>
               <span className="text-sm font-medium" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Deckoviz</span>
             </div>
             <div className="w-6 h-6 bg-orange-400 rounded-full"></div>
           </div>
           
           <div className="space-y-2">
             <div className="h-2 bg-gray-200 rounded w-3/4"></div>
             <div className="h-2 bg-gray-200 rounded w-1/2"></div>
           </div>
           
           <div className="mt-4 flex space-x-2">
             <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=40&h=40&fit=crop" 
                  alt="Art 1" className="w-8 h-8 rounded object-cover" />
             <img src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=40&h=40&fit=crop" 
                  alt="Art 2" className="w-8 h-8 rounded object-cover" />
             <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
               <span className="text-white text-xs">+</span>
             </div>
           </div>
         </div>
       </div>
     </div>

     {/* Top 250 Referrers Card */}
     <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
       <div className="text-center mb-6">
         <p className="text-sm text-gray-500 uppercase tracking-wider mb-2" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>FOR</p>
         <h3 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Top 250 Referrers</h3>
         <p className="text-sm text-gray-600" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Art unlocks, private collection perks, and surprises</p>
       </div>
       
       {/* Dashboard Mockup */}
       <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-6">
         <div className="bg-white rounded-xl p-4 shadow-sm">
           <div className="flex items-center justify-between mb-4">
             <div className="flex items-center space-x-2">
               <div className="w-6 h-6 bg-orange-400 rounded-full"></div>
               <span className="text-sm font-medium" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Collection</span>
             </div>
             <span className="text-xs text-gray-500" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>24</span>
           </div>
           
           <div className="grid grid-cols-2 gap-2 mb-4">
             <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=80&h=80&fit=crop" 
                  alt="Artwork 1" className="w-full h-16 rounded-lg object-cover" />
             <img src="https://images.unsplash.com/photo-1549490349-8643362247b5?w=80&h=80&fit=crop" 
                  alt="Artwork 2" className="w-full h-16 rounded-lg object-cover" />
           </div>
           
           <div className="flex items-center justify-between">
             <div className="flex -space-x-2">
               <div className="w-6 h-6 bg-red-400 rounded-full border-2 border-white"></div>
               <div className="w-6 h-6 bg-blue-400 rounded-full border-2 border-white"></div>
               <div className="w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
             </div>
             <div className="text-right">
               <div className="w-8 h-1 bg-orange-300 rounded mb-1"></div>
               <div className="w-6 h-1 bg-orange-300 rounded"></div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 </div>
</div>










    </div>
  )
}