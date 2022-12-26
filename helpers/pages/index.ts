export const fetcher = async (...args: any[]) => {
  // @ts-ignore
  const res = await fetch(...args);
  return await res.json();
};
