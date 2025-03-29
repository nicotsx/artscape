import type { LucideIcon } from 'lucide-react';
import { Cloud, CloudDrizzle, CloudFog, CloudHail, CloudLightning, CloudRain, CloudSnow, CloudSun, Cloudy, Sun } from 'lucide-react';

export const weatherDescriptions: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snow fall',
  73: 'Moderate snow fall',
  75: 'Heavy snow fall',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};

export const getWeatherIcon = (code: number): LucideIcon => {
  if (code === 0) return Sun;
  if (code === 1) return CloudSun;
  if (code === 2) return CloudSun;
  if (code === 3) return Cloudy;
  if (code >= 45 && code <= 48) return CloudFog;
  if (code >= 51 && code <= 57) return CloudDrizzle;
  if (code >= 61 && code <= 67) return CloudRain;
  if (code >= 71 && code <= 77) return CloudSnow;
  if (code >= 80 && code <= 82) return CloudRain;
  if (code >= 85 && code <= 86) return CloudSnow;
  if (code === 95) return CloudLightning;
  if (code >= 96) return CloudHail;

  return Cloud;
};

export const getWeatherDescription = (code: number): string => {
  return weatherDescriptions[code] || 'Unknown weather';
};

