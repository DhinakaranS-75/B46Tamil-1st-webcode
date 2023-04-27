const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`https://api.nationalize.io/?name=${nameInput.value}`);
    const data = await response.json();

    if (data.country && data.country.length > 0) {
      const topCountries = data.country.slice(0, 2);
      const probability = topCountries[0].probability;

      let resultHtml = `
        <h2>Results for ${nameInput.value}</h2>
        <p>Top 2 countries:</p>
        <ul>
          <li>${topCountries[0].country_id} - ${topCountries[0].probability.toFixed(2)}</li>
          <li>${topCountries[1].country_id} - ${topCountries[1].probability.toFixed(2)}</li>
        </ul>
        <p>Probability: ${probability.toFixed(2)}</p>
      `;

      resultDiv.innerHTML = resultHtml;
    } else {
      resultDiv.innerHTML = `<p>No results found for ${nameInput.value}</p>`;
    }
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = `<p>An error occurred. Please try again later.</p>`;
  }
});

function highlightText(text, query) {
  return text.replace(new RegExp(`(${query})`, 'gi'), '<mark>$1</mark>');
}

nameInput.addEventListener('input', (e) => {
  const query = e.target.value.trim();
  const resultHtml = resultDiv.innerHTML;

  if (query.length > 0) {
    const highlightedHtml = highlightText(resultHtml, query);
    resultDiv.innerHTML = highlightedHtml;
  } else {
    resultDiv.innerHTML = resultHtml.replace(/<\/?mark>/g, '');
  }
});
