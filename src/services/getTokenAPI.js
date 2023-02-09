const GET_TOKEN = 'https://opentdb.com/api_token.php?command=request';

const getToken = async () => {
  const response = await fetch(GET_TOKEN);
  const data = await response.json();

  return data.token;
};

export default getToken;
