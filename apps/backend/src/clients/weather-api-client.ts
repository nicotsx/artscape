import { type } from 'arktype';

const weatherForecastSchema = type({
  daily: type({
    time: 'string[]',
    weathercode: 'number[]',
  }),
});

const geocodingResultSchema = type({
  results: type({
    id: 'number',
    name: 'string',
    latitude: 'number',
    longitude: 'number',
    country: 'string',
    admin1: 'string?',
  })
    .array()
    .optional(),
});

export class WeatherApiClient {
  private readonly baseGeocodingUrl = 'https://geocoding-api.open-meteo.com/v1/search';
  private readonly baseWeatherUrl = 'https://api.open-meteo.com/v1/forecast';

  /**
   * Converts a city name to latitude and longitude coordinates
   * @param city The name of the city to geocode
   * @returns The first matching location's coordinates or null if none found
   */
  async geocodeCity(city: string) {
    try {
      const response = await fetch(`${this.baseGeocodingUrl}?name=${encodeURIComponent(city)}&count=1`);

      if (!response.ok) {
        console.error(`Geocoding API error: ${response.status} ${response.statusText}`);
        return null;
      }

      const data = await response.json();

      const parsedResponse = geocodingResultSchema(data);

      if (parsedResponse instanceof type.errors) {
        console.error('Error parsing geocoding response:', parsedResponse.summary);
        return null;
      }

      if (!parsedResponse.results?.length) {
        return null;
      }

      // Use the first result as specified in the requirements
      const firstResult = parsedResponse.results[0];
      return {
        latitude: firstResult.latitude,
        longitude: firstResult.longitude,
      };
    } catch (error) {
      console.error('Error geocoding city:', error);
      return null;
    }
  }

  /**
   * Gets a 2-day weather forecast for specific coordinates
   * @param latitude Latitude coordinate
   * @param longitude Longitude coordinate
   * @returns Weather forecast data or null if request fails
   */
  async getWeatherForecast(latitude: number, longitude: number) {
    try {
      const url = `${this.baseWeatherUrl}?latitude=${latitude}&longitude=${longitude}&daily=weathercode&timezone=auto&forecast_days=2`;
      const response = await fetch(url);

      if (!response.ok) {
        console.error(`Weather API error: ${response.status} ${response.statusText}`);
        return null;
      }

      const data = await response.json();
      const parsedResponse = weatherForecastSchema(data);

      if (parsedResponse instanceof type.errors) {
        console.error('Error parsing weather response:', parsedResponse.summary);
        return null;
      }

      if (parsedResponse.daily.weathercode.length < 2) {
        return null;
      }

      return {
        today: parsedResponse.daily.weathercode[0],
        tomorrow: parsedResponse.daily.weathercode[1],
      };
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
      return null;
    }
  }
}

