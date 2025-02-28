import { CardWeatherProps } from '@/types'
import { appConfig } from '@/config/app'

const CardWeather = (props: CardWeatherProps) => {
  const {
    className = '',
    date = '',
    humidity = 0,
    temp = 0,
    wind = 0,
    icon = appConfig.imgDefault,
  } = props
  return (
    <div className={`bg-[#6C757D] rounded-md p-4 flex flex-col gap-2 ${className}`}>
      <p className="font-bold">({date})</p>
      <div>
        <img className="size-12" src={icon} alt="rain" />
      </div>
      <p className="text-2x mb-1">Temp: {temp} C</p>
      <p className="text-2x mb-1">Wind: {wind} M/S</p>
      <p className="text-2x mb-1">Humidity: {humidity}%</p>
    </div>
  )
}

export default CardWeather
