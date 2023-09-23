const URL ="https://api.openweathermap.org/data/2.5/weather?q=Warsaw&appid=912c622485ebcccfe6e75ebb3dc2de10";

export async function getWeather() {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("błąd", error);
    } finally {
      console.log("Operacja zakończona");
    }
  }

