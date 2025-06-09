import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
} from "react-native";

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
}

const API_KEY = "Your_API_Key_Here"; // Replace with your OpenWeatherMap API key
// You can get a free API key from https://openweathermap.org/api

export default function WeatherScreen() {
  const [city, setCity] = useState("Cebu City");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = useCallback(async () => {
    if (!city) return;
    setLoading(true);
    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      console.error(error);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, [city]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <Text style={styles.title}>🌤️ Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter city name'
        value={city}
        onChangeText={setCity}
        onSubmitEditing={fetchWeather}
      />
      <Button title='Get Weather' onPress={fetchWeather} />

      {loading ? (
        <ActivityIndicator size='large' style={{ marginTop: 20 }} />
      ) : weather ? (
        <View style={styles.info}>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.temp}>{weather.main.temp}°C</Text>
          <Text style={styles.desc}>{weather.weather[0].description}</Text>
        </View>
      ) : (
        <Text style={{ marginTop: 20 }}>No weather data found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f7fa",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 18,
  },
  info: {
    alignItems: "center",
    marginTop: 20,
  },
  city: {
    fontSize: 28,
    fontWeight: "bold",
  },
  temp: {
    fontSize: 48,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 24,
    textTransform: "capitalize",
  },
});
