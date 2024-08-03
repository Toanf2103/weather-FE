import { Button, CardWeather, Input } from '@/components/ui'
import Alert from '@/components/ui/Alert'
import { useLoading } from '@/contexts/loading'
import { cn } from '@/lib/utils'
import weatherService from '@/services/site/weatherService'
import { TRecommendCities } from '@/types/site/recommendCity'
import { TWeatherData } from '@/types/site/weather'
import { useRef, useState } from 'react'

export const Home = () => {
  const { showLoading, hideLoading } = useLoading()
  const [isOpenSearchResult, setIsOpenSearchResult] = useState(false)
  const [textSearch, setTextSearch] = useState('')
  const [recommendCities, setRecommendCities] = useState<TRecommendCities[]>([])
  const [weather, setWeather] = useState<TWeatherData>()
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  const handSearchCities = () => {
    weatherService
      .findCities(textSearch)
      .then(data => {
        setRecommendCities(data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {})
  }

  const fetchWeatherCurrent = () => {
    showLoading()
    weatherService
      .current(textSearch)
      .then(data => {
        setWeather(data)
      })
      .catch(err => {
        console.log(err)
        Alert.alert('No data', 'Could not find the city', 'error')
      })
      .finally(() => {
        hideLoading()
      })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      <div className="p-5 col-span-1 flex flex-col gap-y-4">
        <h2 className="text-xl font-semibold text-black">Enter a City Name</h2>
        <div className="relative">
          <Input
            onFocus={() => setIsOpenSearchResult(true)}
            onBlur={() => setTimeout(() => setIsOpenSearchResult(false), 200)}
            placeholder="E.g, New York, London, Tokyo"
            className="text-black h-full"
            value={textSearch}
            onChange={e => {
              setTextSearch(e.target.value)
              if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current)
              }
              debounceTimeout.current = setTimeout(() => {
                handSearchCities()
              }, 300)
            }}
          />

          <div
            className={cn(
              'absolute bottom-[-2] end-0 text-black bg-white shadow-lg w-full rounded-md mt-1 overflow-hidden transition duration-100 ',
              isOpenSearchResult ? 'h-fit opacity-1' : 'h-0 opacity-0',
            )}
          >
            {recommendCities.map(recommend => (
              <div
                key={recommend.id}
                onClick={() => setTextSearch(recommend.name)}
                className="cursor-pointer px-3 py-2 hover:bg-gray-300 transition duration-200"
              >
                <p>{`${recommend.name}, ${recommend.country}`}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Button className="w-full bg-blue-500 hover:bg-blue-600" onClick={fetchWeatherCurrent}>
            Search
          </Button>
        </div>
        <div className="flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
          <p className="mx-4 mb-0 text-center text-black">Or</p>
        </div>
        <div>
          <Button className="w-full bg-[#6C757D] hover:bg-neutral-500">Use Current Location</Button>
        </div>
      </div>
      <div className="p-5 md:col-span-2 col-span-1 flex flex-col gap-4">
        <div className="bg-blue-500 p-5 rounded-md flex justify-between items-center">
          <div>
            <h1 className="font-bold text-2xl mb-2">{weather?.location?.name}</h1>
            <p className="text-2x mb-1">Temperature: {weather?.current?.temp_c} C</p>
            <p className="text-2x mb-1">Wind: {weather?.current?.wind_mph} M/S</p>
            <p className="text-2x mb-1">Humidity: {weather?.current?.humidity}%</p>
          </div>
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
