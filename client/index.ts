export const fetchHelper = async (
  url: string,
  options?: Partial<RequestInit>
) => {
  try {
    const request = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });
    if (request.ok) {
      return await request.json();
    }
    throw new Error("Error on response");
  } catch (err) {
    return Promise.reject(new Error("Error while fetching data"));
  }
};
