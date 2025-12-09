import { useEffect, useState } from "react";

function useCurrencyInfo(baseCurrency) {
  const [data, setData] = useState({});

  useEffect(() => {
    if (!baseCurrency) return;

    const code = baseCurrency.toLowerCase(); // usd, inr, eur...

    // Official URL format from the new API
    // https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json
    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${code}.json`;

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        // Response shape: { date: "...", usd: { inr: 83.1, eur: 0.9, ... } }
        console.log("API response for", code, res);
        setData(res[code] || {}); // store usd / inr / eur object
      })
      .catch((err) => {
        console.error("Error fetching currency data:", err);
        setData({});
      });
  }, [baseCurrency]);

  return data; // e.g. { inr: 83.1, eur: 0.9, ... }
}

export default useCurrencyInfo;
