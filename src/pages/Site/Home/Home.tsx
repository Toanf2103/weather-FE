import { Button, CardWeather, Input } from '@/components/ui'

export const Home = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      <div className="p-5 col-span-1 flex flex-col gap-y-4">
        <h2 className="text-xl font-semibold text-black">Enter a City Name</h2>
        <Input placeholder="E.g, New York, London, Tokyo" className="text-black" />
        <div>
          <Button className="w-full bg-blue-500 hover:bg-blue-600">Search</Button>
        </div>
        <div>
          <Button className="w-full bg-[#6C757D] hover:bg-neutral-500">Use Current Location</Button>
        </div>
      </div>
      <div className="p-5 md:col-span-2 col-span-1 flex flex-col gap-4">
        <div className="bg-blue-500 p-5 rounded-md flex justify-between items-center">
          <div>
            <h1 className="font-bold text-2xl mb-2">London</h1>
            <p className="text-2x mb-1">Temperature: 18.71 C</p>
            <p className="text-2x mb-1">Wind: 4.31 M/S</p>
            <p className="text-2x mb-1">Humidity: 76%</p>
          </div>
          <div>asd</div>
        </div>
        <h1 className="text-black text-2xl font-bold">4-Day Forecast</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <CardWeather date="2023-06-08" wind={0.73} temp={17.64} humidity={70} />
          <CardWeather date="2023-06-08" wind={0.73} temp={17.64} humidity={70} />
          <CardWeather date="2023-06-08" wind={0.72} temp={17.64} humidity={70} />
          <CardWeather date="2023-06-08" wind={0.75} temp={17.64} humidity={70} />
        </div>
        <div className="flex justify-center">
          <Button className="w-48 bg-stone-400 hover:bg-stone-500">Load more</Button>
        </div>
      </div>
    </div>
  )
}
