const apiUrl = atob(CONFIG.API_KEY_ENCODED);
    console.log("apiUrl", apiUrl);

    const tableBody = document.getElementById("ratesTable");
    const updatedText = document.getElementById("updated");

    async function fetchRates() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const rates = data.rates;

        // Clear table
        tableBody.innerHTML = "";

        // 1.First, handle INR and highlight it
        if (rates.INR) {
          const row = document.createElement("tr");
          row.classList.add("highlight");
          row.innerHTML = `<td>INR</td><td>${rates.INR}</td>`;
          tableBody.appendChild(row);
          delete rates.INR; // remove from remaining
        }

        // 2. Then sort remaining symbols alphabetically
        Object.keys(rates)
          .sort()
          .forEach(symbol => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${symbol}</td><td>${rates[symbol]}</td>`;
            tableBody.appendChild(row);
          });

        // 3. Update timestamp
        updatedText.innerText =
          `Last updated: ${new Date().toLocaleTimeString()} Refreshes every 1 minute`;

      } catch (error) {
        tableBody.innerHTML =
          `<tr><td colspan="2">Error loading data</td></tr>`;
        updatedText.innerText = "Failed to fetch data";
        console.error(error);
      }
    }

    // Initial load
    fetchRates();

    // Refresh every 1 minute
    setInterval(fetchRates, 60000);