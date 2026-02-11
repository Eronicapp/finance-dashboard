const apiUrl = atob(CONFIG.API_KEY_ENCODED);
    console.log("apiUrl", apiUrl);

    const tableBody = document.getElementById("ratesTable");
    const updatedText = document.getElementById("updated");

    async function fetchRates() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const { INR, ...otherRates } = data.rates;

    // Build all rows in memory first
    let rowsHtml = "";

    // 1. Handle INR first
    if (INR) {
      rowsHtml += `<tr class="highlight"><td>INR</td><td>${INR}</td></tr>`;
    }

    // 2. Sort and add the rest
    Object.keys(otherRates)
      .sort()
      .forEach(symbol => {
        rowsHtml += `<tr><td>${symbol}</td><td>${otherRates[symbol]}</td></tr>`;
      });

    // 3. Update DOM once to prevent flickering
    tableBody.innerHTML = rowsHtml;
    updatedText.innerText = `Last updated: ${new Date().toLocaleTimeString()} (Refreshes every 1 min)`;

  } catch (error) {
    tableBody.innerHTML = `<tr><td colspan="2" style="color:red;">Error loading rates</td></tr>`;
    updatedText.innerText = "Connection failed.";
    console.error("Fetch error:", error);
  }
}

    // Initial load
    fetchRates();

    // Refresh every 1 minute
    setInterval(fetchRates, 60000);