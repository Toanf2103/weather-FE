import { Button, CardWeather, Input } from '@/components/ui'
import Alert from '@/components/ui/Alert'
import { appConfig } from '@/config/app'
import { useLoading } from '@/contexts/loading'
import { cn } from '@/lib/utils'
import ipService from '@/services/site/ipService'
import weatherService from '@/services/site/weatherService'
import { TRecommendCities } from '@/types/site/recommendCity'
import { TWeather, TWeatherData } from '@/types/site/weather'
import { useRef, useState } from 'react'

export const Home = () => {
  const { showLoading, hideLoading } = useLoading()
  const [isOpenSearchResult, setIsOpenSearchResult] = useState(false)
  const [textSearch, setTextSearch] = useState('')
  const [recommendCities, setRecommendCities] = useState<TRecommendCities[]>([])
  const [weather, setWeather] = useState<TWeatherData>()
  const [weatherForecasts, setWeatherForecasts] = useState<TWeather[]>([])
  const [paginate, setPaginate] = useState({ page: 1, perPage: 4 })
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
        setWeatherForecasts([])
        setWeather(data)
        fetchWeatherForecast()
      })
      .catch(err => {
        console.log(err)
        Alert.alert('No data', 'Could not find the city', 'error')
      })
      .finally(() => {
        hideLoading()
      })
  }

  const fetchWeatherForecast = (text?: string) => {
    showLoading()
    weatherService
      .forecast(text ?? textSearch, paginate)
      .then(data => {
        setPaginate({ ...paginate, page: paginate.page + 1 })
        setWeatherForecasts(prev => [...prev, ...data])
      })
      .catch(err => {
        console.log(err)
        Alert.alert('No data', 'Could not find the city', 'error')
      })
      .finally(() => {
        hideLoading()
      })
  }

  const fetchWeatherIp = (ipNetwork: string) => {
    showLoading()
    weatherService
      .currentByIpNetwork(ipNetwork)
      .then(data => {
        setWeatherForecasts([])
        setWeather(data)
        setTextSearch(data.location.name)
        fetchWeatherForecast(data.location.name)
      })
      .catch(err => {
        console.log(err)
        Alert.alert('No data', 'Could not find the city by your address network', 'error')
      })
      .finally(() => {
        hideLoading()
      })
  }

  const handFetchWeatherByIp = () => {
    showLoading()
    ipService
      .getIpNetwork()
      .then(data => {
        fetchWeatherIp(data.ipString)
      })
      .catch(err => {
        console.log(err)
        Alert.alert('Error', "Don't get your address currenrt", 'error')
      })
      .finally(() => {
        hideLoading()
      })
  }

  const handRegisterEmail = async () => {
    const email = await Alert.inputText(
      'Input your email address',
      'Please enter your email address',
    )
    if (!email || weather?.location?.name === undefined) {
      return
    }
    weatherService
      .registerNotification({ email: email, city: weather?.location?.name })
      .then(data => {
        console.log(data)
        Alert.alert(
          'Register success',
          'Register  daily weather forecast information success',
          'success',
        )
      })
      .catch(err => {
        console.log(err)
        Alert.alert(
          'Register failed',
          'Register  daily weather forecast information failed',
          'error',
        )
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
          <Button
            className="w-full bg-[#6C757D] hover:bg-neutral-500"
            onClick={handFetchWeatherByIp}
          >
            Use Current Location
          </Button>
        </div>
      </div>
      {weather && (
        <div className="p-5 md:col-span-2 col-span-1 flex flex-col gap-4">
          <div className="bg-blue-500 p-5 rounded-md flex justify-between items-center">
            <div>
              <h1 className="font-bold text-2xl mb-2">{weather?.location?.name}</h1>
              <p className="text-2x mb-1">Temperature: {weather?.current?.temp_c} C</p>
              <p className="text-2x mb-1">Wind: {weather?.current?.wind_mph} M/S</p>
              <p className="text-2x mb-1">Humidity: {weather?.current?.humidity}%</p>
            </div>
            <div>
              <img
                src={`${weather?.current?.condition.icon ?? appConfig.imgDefault}`}
                alt={weather?.current?.condition.text}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <h1 className="text-black text-2xl font-bold">4-Day Forecast</h1>
            <Button onClick={handRegisterEmail}>Get email notifications</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {weatherForecasts.map((weatherForecast, index) => (
              <CardWeather
                key={index}
                date={weatherForecast.date}
                wind={weatherForecast.wind_mph}
                temp={weatherForecast.temp_c}
                humidity={weatherForecast.humidity}
                icon={weatherForecast.condition.icon}
              />
            ))}
          </div>
          <div className="flex justify-center">
            <Button
              className="w-48 bg-stone-400 hover:bg-stone-500"
              onClick={() => fetchWeatherForecast()}
            >
              Load more
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
