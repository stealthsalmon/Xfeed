const feeds = [
    {
        url: 'https://rss.app/feeds/v1.1/h98rJD7GkZkhpjgQ.json',
        container: 'feed1'
    },
    {
        url: 'https://rss.app/feeds/v1.1/JM6P6Jn44YAYJ3Xv.json',
        container: 'feed2'
    }
];

feeds.forEach(feed => {
    fetch(feed.url)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById(feed.container);
            const postsList = container.querySelector('.posts');

            // Use feed title if available, otherwise fallback
            const authorName = data.title || `Author ${feed.container.slice(-1)}`;
            container.querySelector('h2').textContent = authorName;

            // Get top 5 posts
            const topPosts = data.items.slice(0, 5);

            topPosts.forEach(post => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = post.url;
                a.target = '_blank';
                a.textContent = post.title;
                li.appendChild(a);
                postsList.appendChild(li);
            });
        })
        .catch(err => {
            console.error(`Error fetching feed ${feed.url}:`, err);
        });
});
