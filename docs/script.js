const feeds = [
    { url: 'data/feed1.json', container: 'feed1' },
    { url: 'data/feed2.json', container: 'feed2' }
];

feeds.forEach(feed => {
    fetch(feed.url)
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById(feed.container);
            const postsList = container.querySelector('.posts');

            // Use feed title if available
            const authorName = data.title || `Author ${feed.container.slice(-1)}`;
            container.querySelector('h2').textContent = authorName;

            // Top 5 posts
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
        .catch(err => console.error(`Error loading ${feed.url}:`, err));
});
