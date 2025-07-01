

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
        <p className="text-lg text-gray-900 mb-8 max-w-2xl mx-auto">
          Because beauty should be celebrated. And so should <br />you.
        </p>
        <p className="text-base font-medium text-gray-900 mb-6 max-w-3xl mx-auto">
          The Deckoviz Leaderboard is a joyful, playful way to celebrate our most
          <br />
          passionate, engaged, and inspiring community members around the world.
        </p>
        <p className="text-base font-medium text-gray-900 mb-12 max-w-4xl mx-auto">
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


{/* Collector Royalty & Engagement Legends Section */}
<div className="min-h-screen bg-white relative overflow-hidden py-16 px-4 mt-20">
 {/* Pink spiral gradient background */}
 <div 
   className="absolute inset-0" 
   style={{
     background: `conic-gradient(from 0deg at center, 
       rgba(236,72,153,0.25) 0%, 
       rgba(147,51,234,0.18) 90deg, 
       rgba(255,165,0,0.08) 180deg, 
       rgba(236,72,153,0.12) 270deg, 
       rgba(147,51,234,0.15) 360deg)`,
     borderRadius: "50%",
     filter: "blur(60px)",
     zIndex: 1,
   }}
 />
 
 {/* Subtle dot pattern overlay */}
 <div
   className="absolute inset-0 opacity-[0.06]"
   style={{
     backgroundImage: "radial-gradient(circle, #ec4899 1px, transparent 1px)",
     backgroundSize: "30px 30px",
   }}
 />
 
 <div className="relative z-10 max-w-7xl mx-auto">
   
   {/* Collector Royalty Section */}
   <div className="mb-24">
     <div className="text-left mb-12">
       <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
         Collector Royalty
       </h2>
       <p className="text-lg text-gray-700 max-w-2xl">
         Celebrating our biggest patrons and collectors who believe in the power of living art.
       </p>
     </div>

     {/* Collector Cards Grid */}
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       
       {/* Most Expensive Painting */}
       <div className="group relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-105 hover:-rotate-1 transition-all duration-500 cursor-pointer">
         <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-pink-50/30 to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
         
         <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-50">
           <svg width="65" height="65" viewBox="0 0 100 100" className="transform -rotate-12 group-hover:rotate-6 group-hover:scale-125 group-hover:-translate-y-2 transition-all duration-500 drop-shadow-xl">
             <defs>
               <linearGradient id="paintGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                 <stop offset="0%" stopColor="#f87171" />
                 <stop offset="50%" stopColor="#ef4444" />
                 <stop offset="100%" stopColor="#dc2626" />
               </linearGradient>
             </defs>
             <rect x="20" y="15" width="60" height="45" rx="3" fill="url(#paintGradient)" stroke="#b91c1c" strokeWidth="2"/>
             <rect x="15" y="20" width="70" height="50" rx="3" fill="none" stroke="#7f1d1d" strokeWidth="2"/>
             <circle cx="40" cy="35" r="8" fill="#fbbf24"/>
             <polygon points="60,30 70,25 75,35 65,40" fill="#34d399"/>
             <rect x="25" y="50" width="20" height="3" fill="#a78bfa"/>
           </svg>
         </div>
         
         <div className="flex flex-col items-center text-center relative z-10 pt-6">
           <h3 className="text-lg font-bold text-gray-900 mb-4 leading-tight group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-pink-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
             Most Expensive<br />Painting Bought
           </h3>
           <div className="mt-4">
             <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" 
                  alt="Top collector" className="w-10 h-10 rounded-full mx-auto mb-2 border-2 border-white shadow-lg" />
             <p className="text-sm text-gray-600 font-medium">Alexandra Chen</p>
             <p className="text-xs text-gray-500">$75,000 Purchase</p>
           </div>
         </div>
         
         <div className="absolute top-4 right-4 w-2 h-2 bg-red-300 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-pulse transition-all duration-700 z-30"></div>
       </div>

       {/* Top Art Spenders */}
       <div className="group relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-105 hover:-rotate-1 transition-all duration-500 cursor-pointer">
         <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 via-orange-50/30 to-pink-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
         
         <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-50">
           <svg width="65" height="65" viewBox="0 0 100 100" className="transform -rotate-12 group-hover:rotate-6 group-hover:scale-125 group-hover:-translate-y-2 transition-all duration-500 drop-shadow-xl">
             <defs>
               <linearGradient id="trophyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                 <stop offset="0%" stopColor="#fbbf24" />
                 <stop offset="50%" stopColor="#f59e0b" />
                 <stop offset="100%" stopColor="#d97706" />
               </linearGradient>
             </defs>
             <ellipse cx="50" cy="75" rx="25" ry="8" fill="#78716c"/>
             <rect x="42" y="60" width="16" height="15" fill="url(#trophyGradient)"/>
             <path d="M25,35 Q25,25 35,25 L65,25 Q75,25 75,35 L75,50 Q75,60 50,60 Q25,60 25,50 Z" fill="url(#trophyGradient)" stroke="#92400e" strokeWidth="2"/>
             <path d="M20,30 Q15,30 15,35 L15,45 Q15,50 20,50" fill="none" stroke="#92400e" strokeWidth="3"/>
             <path d="M80,30 Q85,30 85,35 L85,45 Q85,50 80,50" fill="none" stroke="#92400e" strokeWidth="3"/>
             <circle cx="50" cy="40" r="8" fill="#fef3c7"/>
           </svg>
         </div>
         
         <div className="flex flex-col items-center text-center relative z-10 pt-6">
           <h3 className="text-lg font-bold text-gray-900 mb-4 leading-tight group-hover:bg-gradient-to-r group-hover:from-yellow-600 group-hover:to-orange-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
             Top Art Spenders<br />of the Month
           </h3>
           <div className="mt-4">
             <img src="https://images.unsplash.com/photo-1669475535925-a011d7c31d45?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Top spender" className="w-10 h-10 rounded-full mx-auto mb-2 border-2 border-white shadow-lg" />
             <p className="text-sm text-gray-600 font-medium">Marcus Rodriguez</p>
             <p className="text-xs text-gray-500">$15,250 This Month</p>
           </div>
         </div>
         
         <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-pulse transition-all duration-700 z-30"></div>
       </div>

       {/* Most Artworks Collected */}
       <div className="group relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-105 hover:-rotate-1 transition-all duration-500 cursor-pointer">
         <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
         
         <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-50">
           <svg width="65" height="65" viewBox="0 0 100 100" className="transform -rotate-12 group-hover:rotate-6 group-hover:scale-125 group-hover:-translate-y-2 transition-all duration-500 drop-shadow-xl">
             <defs>
               <linearGradient id="thumbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                 <stop offset="0%" stopColor="#60a5fa" />
                 <stop offset="50%" stopColor="#3b82f6" />
                 <stop offset="100%" stopColor="#1d4ed8" />
               </linearGradient>
             </defs>
             <path d="M30,45 L30,75 Q30,80 35,80 L70,80 Q75,80 75,75 L75,50 Q75,45 70,45 L45,45 L45,35 Q45,25 40,25 Q35,25 35,30 L35,40 Q30,40 30,45 Z" fill="url(#thumbGradient)" stroke="#1e40af" strokeWidth="2"/>
             <ellipse cx="52" cy="62" rx="15" ry="12" fill="#dbeafe" opacity="0.6"/>
             <circle cx="45" cy="55" r="3" fill="#1e40af"/>
           </svg>
         </div>
         
         <div className="flex flex-col items-center text-center relative z-10 pt-6">
           <h3 className="text-lg font-bold text-gray-900 mb-4 leading-tight group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
             Most Artworks<br />Collected Overall
           </h3>
           <div className="mt-4">
             <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" 
                  alt="Top collector" className="w-10 h-10 rounded-full mx-auto mb-2 border-2 border-white shadow-lg" />
             <p className="text-sm text-gray-600 font-medium">Sofia Patel</p>
             <p className="text-xs text-gray-500">247 Artworks</p>
           </div>
         </div>
         
         <div className="absolute top-4 right-4 w-2 h-2 bg-blue-300 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-pulse transition-all duration-700 z-30"></div>
       </div>

       {/* Most Resales */}
       <div className="group relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-105 hover:-rotate-1 transition-all duration-500 cursor-pointer">
         <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 via-rose-50/30 to-red-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
         
         <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-50">
           <svg width="65" height="65" viewBox="0 0 100 100" className="transform -rotate-12 group-hover:rotate-6 group-hover:scale-125 group-hover:-translate-y-2 transition-all duration-500 drop-shadow-xl">
             <defs>
               <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                 <stop offset="0%" stopColor="#f472b6" />
                 <stop offset="50%" stopColor="#ec4899" />
                 <stop offset="100%" stopColor="#be185d" />
               </linearGradient>
             </defs>
             <path d="M50,75 C35,60 25,50 25,37 C25,25 35,20 50,30 C65,20 75,25 75,37 C75,50 65,60 50,75 Z" fill="url(#heartGradient)" stroke="#9d174d" strokeWidth="2"/>
             <ellipse cx="42" cy="40" rx="8" ry="6" fill="#fce7f3" opacity="0.7"/>
             <circle cx="45" cy="42" r="2" fill="#be185d"/>
           </svg>
         </div>
         
         <div className="flex flex-col items-center text-center relative z-10 pt-6">
           <h3 className="text-lg font-bold text-gray-900 mb-4 leading-tight group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-rose-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
             Most Resales<br />through Deckoviz<br />Marketplace
           </h3>
           <div className="mt-4">
             <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
                  alt="Top reseller" className="w-10 h-10 rounded-full mx-auto mb-2 border-2 border-white shadow-lg" />
             <p className="text-sm text-gray-600 font-medium">David Kim</p>
             <p className="text-xs text-gray-500">89 Successful Sales</p>
           </div>
         </div>
         
         <div className="absolute top-4 right-4 w-2 h-2 bg-pink-300 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-pulse transition-all duration-700 z-30"></div>
       </div>
     </div>
   </div>

   {/* Engagement Legends Section */}
   <div>
     <div className="text-left mb-12">
       <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
         Engagement Legends
       </h2>
       <p className="text-lg text-gray-700 max-w-3xl">
         These are the most engaged Deckoviz users — exploring, curating, creating, sharing, and loving their Deckoviz every day.
       </p>
     </div>

     {/* Engagement Cards Grid */}
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       
       {/* Most Days Logged */}
       <div className="group relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-105 hover:-rotate-1 transition-all duration-500 cursor-pointer">
         <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-emerald-50/30 to-teal-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
         
         <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-50">
           <img 
             src="/images/target.png"
             alt="Target Icon" 
             className="w-16 h-16 object-contain transform -rotate-12 group-hover:rotate-6 group-hover:scale-125 group-hover:-translate-y-2 transition-all duration-500 drop-shadow-xl filter group-hover:brightness-110"
           />
         </div>
         
         <div className="flex flex-col items-center text-center relative z-10 pt-6">
           <h3 className="text-lg font-bold text-gray-900 mb-4 leading-tight group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-emerald-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
             Most days logged in<br />and interacted
           </h3>
           <div className="mt-4">
             <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face" 
                  alt="Most active user" className="w-10 h-10 rounded-full mx-auto mb-2 border-2 border-white shadow-lg" />
             <p className="text-sm text-gray-600 font-medium">Emma Thompson</p>
             <p className="text-xs text-gray-500">365 Consecutive Days</p>
           </div>
         </div>
         
         <div className="absolute top-4 right-4 w-2 h-2 bg-green-300 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-pulse transition-all duration-700 z-30"></div>
       </div>

       {/* Most Artwork Transformations */}
       <div className="group relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-105 hover:-rotate-1 transition-all duration-500 cursor-pointer">
         <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-yellow-50/30 to-orange-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
         
         <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-50">
           <img 
             src="/images/bulb.png"
             alt="Bulb Icon" 
             className="w-16 h-16 object-contain transform -rotate-12 group-hover:rotate-6 group-hover:scale-125 group-hover:-translate-y-2 transition-all duration-500 drop-shadow-xl filter group-hover:brightness-110"
           />
         </div>
         
         <div className="flex flex-col items-center text-center relative z-10 pt-6">
           <h3 className="text-lg font-bold text-gray-900 mb-4 leading-tight group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:to-yellow-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
             Most artwork<br />transformations<br />created
           </h3>
           <div className="mt-4">
             <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face" 
                  alt="Top creator" className="w-10 h-10 rounded-full mx-auto mb-2 border-2 border-white shadow-lg" />
             <p className="text-sm text-gray-600 font-medium">Alex Rivera</p>
             <p className="text-xs text-gray-500">1,247 Transformations</p>
           </div>
         </div>
         
         <div className="absolute top-4 right-4 w-2 h-2 bg-amber-300 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-pulse transition-all duration-700 z-30"></div>
       </div>

       {/* Most User Uploads */}
       <div className="group relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-105 hover:-rotate-1 transition-all duration-500 cursor-pointer">
         <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 via-blue-50/30 to-indigo-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
         
         <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-50">
           <img 
             src="/images/camera.png"
             alt="Camera Icon" 
             className="w-16 h-16 object-contain transform -rotate-12 group-hover:rotate-6 group-hover:scale-125 group-hover:-translate-y-2 transition-all duration-500 drop-shadow-xl filter group-hover:brightness-110"
           />
         </div>
         
         <div className="flex flex-col items-center text-center relative z-10 pt-6">
           <h3 className="text-lg font-bold text-gray-900 mb-4 leading-tight group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
             Most user uploads<br />and gallery sets<br />curated
           </h3>
           <div className="mt-4">
             <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face" 
                  alt="Top curator" className="w-10 h-10 rounded-full mx-auto mb-2 border-2 border-white shadow-lg" />
             <p className="text-sm text-gray-600 font-medium">Maria Santos</p>
             <p className="text-xs text-gray-500">523 Gallery Sets</p>
           </div>
         </div>
         
         <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-300 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-pulse transition-all duration-700 z-30"></div>
       </div>

       {/* Most Shared via Social */}
       <div className="group relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-105 hover:-rotate-1 transition-all duration-500 cursor-pointer">
         <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-violet-50/30 to-indigo-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
         
         <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-50">
           <img 
             src="/images/trumpet.png"
             alt="Trumpet Icon" 
             className="w-16 h-16 object-contain transform -rotate-12 group-hover:rotate-6 group-hover:scale-125 group-hover:-translate-y-2 transition-all duration-500 drop-shadow-xl filter group-hover:brightness-110"
           />
         </div>
         
         <div className="flex flex-col items-center text-center relative z-10 pt-6">
           <h3 className="text-lg font-bold text-gray-900 mb-4 leading-tight group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-violet-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
             Most shared via<br />social
           </h3>
           <div className="mt-4">
             <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" 
                  alt="Top sharer" className="w-10 h-10 rounded-full mx-auto mb-2 border-2 border-white shadow-lg" />
             <p className="text-sm text-gray-600 font-medium">Jordan Lee</p>
             <p className="text-xs text-gray-500">892 Social Shares</p>
           </div>
         </div>
         
         <div className="absolute top-4 right-4 w-2 h-2 bg-purple-300 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-pulse transition-all duration-700 z-30"></div>
       </div>
     </div>
   </div>
 </div>
</div>



{/* University Leaderboards Section */}
<div className="min-h-screen bg-white relative overflow-hidden py-16 px-4 mt-20">
 {/* Pink gradient splashes */}
 <div 
   className="absolute top-0 left-0 w-full h-full opacity-40"
   style={{
     background: "radial-gradient(ellipse 600px 400px at 20% 30%, rgba(255, 192, 203, 0.2) 0%, rgba(255, 192, 203, 0.1) 40%, transparent 70%)",
     pointerEvents: "none"
   }}
 />
 <div 
   className="absolute top-40 right-0 w-80 h-80 opacity-30"
   style={{
     background: "radial-gradient(circle, rgba(255, 182, 193, 0.25) 0%, rgba(255, 182, 193, 0.1) 50%, transparent 80%)",
     pointerEvents: "none"
   }}
 />
 <div 
   className="absolute bottom-20 left-1/3 w-60 h-60 opacity-20"
   style={{
     background: "radial-gradient(circle, rgba(255, 105, 180, 0.3) 0%, rgba(255, 105, 180, 0.1) 60%, transparent 90%)",
     pointerEvents: "none"
   }}
 />
 
 <div className="relative z-10 max-w-6xl mx-auto">
   
   {/* Header Section */}
   <div className="text-center mb-16">
     <div className="flex justify-center items-center mb-6">
       <span className="text-5xl mr-4">🎓</span>
       <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
         University Leaderboards
       </h2>
     </div>
     
     <p className="text-lg text-gray-700 mb-4 max-w-2xl mx-auto">
       For students, artists, and curators shaping the future:
     </p>
     <p className="text-lg text-gray-600 max-w-4xl mx-auto">
       Each university will have its own referral and engagement leaderboard — and the winning<br />
       campus will receive a Deckoviz Experience Day + Installation Showcase.
     </p>
   </div>

   {/* Want to climb the ranks section */}
   <div className="text-left mb-12">
     <div className="flex items-center mb-6">
       <span className="text-2xl mr-3">💌</span>
       <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
         Want to climb the ranks?
       </h3>
     </div>
     
     <p className="text-lg text-gray-700 mb-8">
       You can rise in the leaderboard by:
     </p>
   </div>

   {/* Action Cards Grid */}
   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
     
     {/* Inviting Friends Card */}
     <div className="group relative bg-white rounded-3xl p-8 border border-gray-200 cursor-pointer hover:shadow-lg hover:border-pink-300 transition-all duration-300">
       <div className="absolute inset-0 bg-gradient-to-br from-pink-50/0 to-red-50/0 group-hover:from-pink-50/60 group-hover:to-red-50/40 rounded-3xl transition-all duration-300"></div>
       
       <div className="relative z-10 text-center">
         <div className="mx-auto mb-6">
           <div className="w-20 h-20 mx-auto bg-gradient-to-br from-pink-100 to-red-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-pink-600">
               <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
               <circle cx="18" cy="8" r="3" fill="#f59e0b"/>
             </svg>
           </div>
         </div>
         
         <h4 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-pink-700 transition-colors duration-300">
           Inviting friends (they get a<br />reward too!)
         </h4>
       </div>
     </div>

     {/* Selling Art Card */}
     <div className="group relative bg-white rounded-3xl p-8 border border-gray-200 cursor-pointer hover:shadow-lg hover:border-gray-300 transition-all duration-300">
       <div className="absolute inset-0 bg-gradient-to-br from-gray-50/0 to-slate-50/0 group-hover:from-gray-50/60 group-hover:to-slate-50/40 rounded-3xl transition-all duration-300"></div>
       
       <div className="relative z-10 text-center">
         <div className="mx-auto mb-6">
           <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gray-100 to-slate-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-gray-700">
               <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
               <circle cx="12" cy="8" r="2" fill="#3b82f6"/>
             </svg>
           </div>
         </div>
         
         <h4 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors duration-300">
           Selling your art in our marketplace
         </h4>
       </div>
     </div>

     {/* Curating Content Card */}
     <div className="group relative bg-white rounded-3xl p-8 border border-gray-200 cursor-pointer hover:shadow-lg hover:border-emerald-300 transition-all duration-300">
       <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 to-green-50/0 group-hover:from-emerald-50/60 group-hover:to-green-50/40 rounded-3xl transition-all duration-300"></div>
       
       <div className="relative z-10 text-center">
         <div className="mx-auto mb-6">
           <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-100 to-green-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-emerald-700">
               <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" fill="currentColor"/>
               <circle cx="10" cy="13" r="1" fill="#f59e0b"/>
             </svg>
           </div>
         </div>
         
         <h4 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors duration-300">
           Curating and transforming content
         </h4>
       </div>
     </div>
   </div>

   {/* Second Row */}
   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
     
     {/* Interacting Card */}
     <div className="group relative bg-white rounded-3xl p-8 border border-gray-200 cursor-pointer hover:shadow-lg hover:border-orange-300 transition-all duration-300">
       <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 to-amber-50/0 group-hover:from-orange-50/60 group-hover:to-amber-50/40 rounded-3xl transition-all duration-300"></div>
       
       <div className="relative z-10 text-center">
         <div className="mx-auto mb-6">
           <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-100 to-amber-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-orange-700">
               <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
             </svg>
           </div>
         </div>
         
         <h4 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-orange-700 transition-colors duration-300">
           Interacting with your Deckoviz regularly
         </h4>
       </div>
     </div>

     {/* Sharing Card */}
     <div className="group relative bg-white rounded-3xl p-8 border border-gray-200 cursor-pointer hover:shadow-lg hover:border-purple-300 transition-all duration-300">
       <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 to-violet-50/0 group-hover:from-purple-50/60 group-hover:to-violet-50/40 rounded-3xl transition-all duration-300"></div>
       
       <div className="relative z-10 text-center">
         <div className="mx-auto mb-6">
           <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-100 to-violet-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-purple-700">
               <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.50-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" fill="currentColor"/>
             </svg>
           </div>
         </div>
         
         <h4 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors duration-300">
           Sharing your space, your story,<br />and your beauty
         </h4>
       </div>
     </div>
   </div>

   {/* Bottom Text */}
   <div className="text-left">
     <p className="text-lg text-gray-900 font-medium">
       Check your personal stats in the app — and see how you stack up<br />
       against the world's most vivid souls.
     </p>
   </div>
 </div>
</div>



    </div>
  )
}