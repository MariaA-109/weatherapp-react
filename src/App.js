import "./App.css";

import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import getFormattedWeatherData from "./services/WeatherService";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "berlin" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";
      toast.info("Fetching weather for " + message);

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );
        setWeather(data);
      });
    };
    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return " from-cyan-500 to-blue-900";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-500 to-blue-900";

    return "from-orange-100 to-orange-900";
  };

  return (
    <div
      className={`rounded-md mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-300 to-blue-1000 shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
        </>
      )}

      <ToastContainer autoClose={500} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;

//min. 1:19
//https://openweathermap.org/current
//<Forecast title="hourly forecast" items={weather.hourly} />
//<Forecast title="daily forecast" items={weather.daily} />
