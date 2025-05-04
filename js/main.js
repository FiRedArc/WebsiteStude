document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Загрузка новостей
        const response = await fetch('data/news.json');
        if (!response.ok) throw new Error('Ошибка загрузки новостей');
        
        const allNews = await response.json();
        
        // Сортируем по дате (новые сначала)
        const sortedNews = allNews.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Показываем последние 3 новости
        displayNews(sortedNews.slice(0, 3));
        
    } catch (error) {
        console.error('Ошибка:', error);
        document.getElementById('news-container').innerHTML = `
            <div class="error-message">
                Не удалось загрузить новости. Пожалуйста, попробуйте позже.
            </div>
        `;
    }

    function displayNews(newsItems) {
        const container = document.getElementById('news-container');
        container.innerHTML = '';
        
        newsItems.forEach(news => {
            const newsCard = document.createElement('a');
            newsCard.href = `news.html?id=${news.id}`;
            newsCard.className = 'news-card';
            newsCard.innerHTML = `
                <img src="${news.image}" alt="${news.title}" class="news-card-image">
                <div class="news-card-content">
                    <div class="news-card-date">${formatDate(news.date)}</div>
                    <h3 class="news-card-title">${news.title}</h3>
                    <p class="news-card-excerpt">${news.excerpt}</p>
                </div>
            `;
            container.appendChild(newsCard);
        });
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    }
});
setInterval(async () => {
    try {
        const response = await fetch('data/news.json?t=' + Date.now());
        const freshNews = await response.json();
        const currentCount = document.querySelectorAll('.news-card').length;
        
        // Если появились новые новости
        if (freshNews.length > currentCount) {
            displayNews(freshNews.slice(0, 3));
        }
    } catch (e) {
        console.log('Ошибка при проверке обновлений:', e);
    }
}, 300000); // 5 минут = 300000 мс

document.getElementById('news-container').innerHTML = `
    <div class="loader">Загрузка новостей...</div>
`;