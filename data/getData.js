const getData = async () => {
  const res = await fetch('/api/getInitialData');
  if (!res.ok) {
    throw new Error('Network response not ok');
  }
  const data = await res.json();
  return data;
};

export default getData;