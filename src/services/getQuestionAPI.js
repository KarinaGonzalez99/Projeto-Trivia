const GET_QUESTION = 'https://opentdb.com/api.php?amount=5&';

const getQuestion = async (token) => {
  const response = await fetch(`${GET_QUESTION}token=${token}`);
  const data = await response.json();
  return data;
};

export default getQuestion;
