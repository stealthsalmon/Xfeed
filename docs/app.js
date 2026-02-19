const feeds = {
  Feed1: "https://rss.app/feeds/v1.1/JM6P6Jn44YAYJ3Xv.json",
  Feed2: "https://rss.app/feeds/v1.1/h98rJD7GkZkhpjgQ.json",
};

async function loadFeed(containerId, url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const list = document.querySelector(`#${containerId} .feed`);
    list.innerHTML = "";

    const items = Array.isArray(data.items) ? data.items.slice(0, 10) : [];

    if (items.length === 0) {
      list.innerHTML = "<li>No posts found.</li>";
      return;
    }

    items.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `
        <a href="${item.url}" target="_blank" rel="noopener">
          ${item.title || item.contentSnippet || "No title"}
          <span class="time">
            ${item.pubDate ? new Date(item.pubDate).toLocaleString() : ""}
          </span>
        </a>
      `;
      list.appendChild(li);
    });

  } catch (error) {
    const list = document.querySelector(`#${containerId} .feed`);
    list.innerHTML = "<li>Error loading feed.</li>";
    console.error("Feed error:", error);
  }
}

Object.entries(feeds).forEach(([id, url]) => loadFeed(id, url));
