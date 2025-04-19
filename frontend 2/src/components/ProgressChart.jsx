export default function ProgressChart() {
  const chartData = [{ height: 50 }, { height: 65 }, { height: 80 }, { height: 95 }, { height: 70 }]

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-end h-32">
        {chartData.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-1 flex-1">
            <div
              className="w-full bg-purple-200 rounded-t-md"
              style={{
                height: `${item.height}%`,
                background: `linear-gradient(to top, #A855F7 ${item.height - 20}%, #E9D5FF ${item.height - 20}%)`,
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  )
}
