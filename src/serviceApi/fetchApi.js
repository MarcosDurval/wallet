const fetchApi = async () => {
  const data = await fetch('https://economia.awesomeapi.com.br/json/all');
  const result = await data.json();
  return result;
};

export default fetchApi;
