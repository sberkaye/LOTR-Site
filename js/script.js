export const API_KEY = "S5wdSqI-MUgvjqewuJzi";
export const API_URL = `https://the-one-api.dev/v2/`;

export const getData = async (dataType) => {
  try {
    const APIResponse = await fetch(`${API_URL}/${dataType}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    return APIResponse.json();
  } catch (err) {
    console.log("err :>> ", err);
  }
};
