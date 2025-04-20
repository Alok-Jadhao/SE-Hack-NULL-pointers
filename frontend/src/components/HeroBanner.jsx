export default function HeroBanner() {
  return (
    <div className="mx-4 mb-8 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 p-8 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full">
        <div className="absolute top-4 right-4 text-white/20">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
        <div className="absolute top-12 right-12 text-white/20">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
        <div className="absolute bottom-4 right-20 text-white/20">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      </div>
      <div className="relative z-10">
        <div className="text-sm font-medium mb-2">ONLINE COURSE</div>
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          Sharpen Your Skills With
          <br />
          Professional Online Courses
        </h1>
        <button className="bg-black text-white rounded-full px-5 py-2 flex items-center gap-2 text-sm font-medium">
          Join Now
          <div className="bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-xs">$</div>
        </button>
      </div>
    </div>
  )
}
