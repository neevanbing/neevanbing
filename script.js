const apiKey = "YOUR_API_KEY"; // Replace with your API key
const cseId = "YOUR_CSE_ID"; // Replace with your CSE ID

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const resultsDiv = document.getElementById("results");

searchBtn.addEventListener("click", () => {
    const query = searchInput.value;
    if (!query) return;

    resultsDiv.innerHTML = "Loading...";

    fetch(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cseId}&q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            resultsDiv.innerHTML = "";
            if (data.items) {
                data.items.forEach(item => {
                    const div = document.createElement("div");
                    div.innerHTML = `<a href="${item.link}" target="_blank">${item.title}</a><p>${item.snippet}</p>`;
                    resultsDiv.appendChild(div);
                });
            } else {
                resultsDiv.innerHTML = "No results found";
            }
        })
        .catch(err => {
            console.error(err);
            resultsDiv.innerHTML = "Error fetching results";
        });
});
