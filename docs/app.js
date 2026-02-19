const feeds = {
  BearPigManDog: "https://rss.app/feeds/v1.1/JM6P6Jn44YAYJ3Xv.json",
  IncomeSharks: "https://rss.app/feeds/v1.1/h98rJD7GkZkhpjgQ.json",
};

// CORS-safe proxy
const PROXY = "https://api.allorigins.win/raw?url=";

async function loadFeed(containerId, feedUrl) {
  const list = document.querySelector(`#${containerId} .feed`);
  list.innerHTML = "<li>Loading…</li>";

  try {
    const response = await fetch(PROXY + encodeURIComponent(feedUrl));
    if (!response.ok) throw new Error("Network response not OK");

    const data = await response.json();

    const items = Array.isArray(data.items)
      ? data.items.slice(0, 10)
      : [];

    list.innerHTML = "";

    if (items.length === 0) {
      list.innerHTML = "<li>No posts found.</li>";
      return;
    }

    items.forEach(item => {
      const title =
        item.title ||
        item.content_text ||
        item.summary ||
        "Untitled post";

      const link = item.url || item.link || "#";

      const date =
        item.date_published ||
        item.pubDate ||
        item.published;

      const li = document.createElement("li");
      li.innerHTML = `
        <a href="${link}" target="_blank" rel="noopener">
          ${title}
          <span class="time">
            ${date ? new Date(date).toLocaleString() : ""}
          </span>
        </a>
      `;

      list.appendChild(li);
    });

  } catch (err) {
    console.error("Feed load error:", err);
    list.innerHTML = "<li>Error loading feed.</li>";
  }
}

Object.entries(feeds).forEach(([id, url]) =>
  loadFeed(id, url)
);
