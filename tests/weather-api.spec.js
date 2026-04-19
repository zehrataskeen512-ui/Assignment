const { test, expect } = require('@playwright/test');
require('dotenv').config();

test.describe('Scenario 3: OpenWeather API Validation', () => {
  const API_KEY = process.env.OPENWEATHER_API_KEY;
  const CITY = 'Islamabad';
  const COUNTRY = 'PK';

  test('Verify temperature of Islamabad and response status code', async ({ request }) => {
    console.log('\n🌤️ Testing OpenWeather API for Islamabad...');
    
    // Check if API key is missing or still has the placeholder text
    if (!API_KEY || API_KEY === 'your_api_key_here') {
      console.log('⚠️ Please add your OpenWeather API key to .env file');
      console.log('Get free key from: https://openweathermap.org/api');
      test.skip();
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY}&appid=${API_KEY}&units=metric`;
    
    const response = await request.get(url);
    expect(response.status()).toBe(200);
    console.log('✅ API Response Status: 200 OK');
    
    const responseBody = await response.json();
    const temperature = responseBody.main.temp;
    const cityName = responseBody.name;
    const feelsLike = responseBody.main.feels_like;
    const humidity = responseBody.main.humidity;
    const description = responseBody.weather[0].description;
    
    expect(cityName).toBe(CITY);
    expect(temperature).toBeGreaterThan(-50);
    expect(temperature).toBeLessThan(60);
    
    console.log(`\n📊 Weather in ${cityName}:`);
    console.log(`🌡️ Temperature: ${temperature}°C`);
    console.log(`🤔 Feels like: ${feelsLike}°C`);
    console.log(`💧 Humidity: ${humidity}%`);
    console.log(`☁️ Conditions: ${description}`);
    
    console.log('\n✅ TEST PASSED: API validation successful!');
  });
});