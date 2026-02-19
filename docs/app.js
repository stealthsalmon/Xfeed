const feeds = {
  BearPigManDog: "https://rsshub.app/twitter/user/BearPigManDog",
  IncomeSharks: "https://rsshub.app/twitter/user/IncomeSharks"
};

const RSS_TO_JSON = "https://api.rss2json.com/v1/api.json?rss_url=";

async function loadFeed(user, url) {
  try {
    const response = await fetch(RSS_TO_JSON + encodeURIComponent(url));
    const data = await response.json();

    const list = document.querySelector(`#${user} .feed`);
    list.innerHTML = "";

    if (!data.items || data.items.length === 0) {
      list.innerHTML = "<li>No posts found.</li>";
      return;
    }

    data.items.slice(0, 10).forEach(item => {
      const li = document.createElement("li");

      li.innerHTML = `
        <a href="${item.link}" target="_blank" rel="noopener">
          ${item.title}
          <span class="time">
            ${new Date(item.pubDate).toLocaleString()}
          </span>
        </a>
      `;

      list.appendChild(li);
    });

  } catch (err) {
    const list = document.querySelector(`#${user} .feed`);
    list.innerHTML = "<li>Error loading feed.</li>";
    console.error(err);
  }
}

Object.entries(feeds).forEach(([user, url]) => {
  loadFeed(user, url);
});
