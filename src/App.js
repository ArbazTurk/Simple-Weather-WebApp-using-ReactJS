import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [wDetails, setWDetails] = useState();
  const [loading, setLoading] = useState(false);
  let getData = (event) => {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`
    )
      .then((res) => res.json())
      .then((finalRes) => {
        console.log(finalRes);
        if (finalRes.cod == "404") {
          setWDetails();
        } else {
          setWDetails(finalRes);
        }
        setLoading(false);
      });
    event.preventDefault();
    setCity("");
  };
  return (
    <div className="App h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <h1 className="text-4xl font-bold text-white mb-8">Simple Weather App</h1>
      <form
        onSubmit={getData}
        className="input-container flex items-center justify-center mb-4"
      >
        <label htmlFor="city" className="text-white mr-4">
          Enter City:
        </label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          id="city"
          placeholder="City Name"
          className="px-4 py-2 rounded-md bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button className="px-6 py-2 ml-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600">
          Submit
        </button>
      </form>
      <div className="weather-info p-6 bg-white bg-opacity-75 rounded-md shadow-lg relative">
        <img
          src="https://i.stack.imgur.com/kOnzy.gif"
          width={50}
          className={` absolute left-[38%] top-3 ${loading ? "" : "hidden"}`}
        />
        {wDetails ? (
          <>
            <div className="city-name text-2xl font-semibold mb-4">
              {wDetails.name}
            </div>
            <div className="temperature text-lg mb-2">
              Temperature: {wDetails.main.temp}°C
            </div>
            <div className="weather-description text-lg mb-2">
              {wDetails.weather[0].description}
            </div>
            <img
              src={`https://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`}
              className="w-24 h-24 mx-auto"
            />
          </>
        ) : (
          "No Data Found"
        )}
      </div>
    </div>
  );
}

export default App;
