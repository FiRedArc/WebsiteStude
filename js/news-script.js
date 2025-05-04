document.addEventListener('DOMContentLoaded', async function() {
    let allNews = [];
    let currentNewsId = null;

    // Получаем ID новости из URL (если есть)
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get('id');

    try {
        // Загрузка новостей из JSON
        const response = await fetch('data/news.json');
        allNews = await response.json();
        
        // Сортировка по дате (новые сначала)
        allNews.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Если указан ID новости - показываем её, иначе первую из списка
        const newsToShow = newsId 
            ? allNews.find(item => item.id == newsId) 
            : allNews[0];
        
        if (newsToShow) {
            currentNewsId = newsToShow.id;
            displayMainNews(newsToShow);
        }
        
        // Отображаем список новостей
        displayNewsList(allNews);
        
        // Инициализация сортировки
        initSortControls();
        
    } catch (error) {
        console.error('Ошибка загрузки новостей:', error);
        document.querySelector('.news-content').innerHTML = 
            '<p>Не удалось загрузить новости. Пожалуйста, попробуйте позже.</p>';
    }

    function displayMainNews(news) {
        document.querySelector('.news-date').textContent = formatDate(news.date);
        document.querySelector('.news-title').textContent = news.title;
        document.querySelector('.news-image').src = news.image;
        document.querySelector('.news-image').alt = news.title;
        
        // Загрузка контента из HTML-файла
        fetch(`news-articles/${news.file}`)
            .then(response => {
                if (!response.ok) throw new Error('Не удалось загрузить новость');
                return response.text();
            })
            .then(html => {
                document.querySelector('.news-content').innerHTML = html;
            })
            .catch(error => {
                console.error(error);
                document.querySelector('.news-content').innerHTML = 
                    '<p>Не удалось загрузить содержимое новости.</p>';
            });
    }

    function displayNewsList(news) {
        const newsList = document.querySelector('.news-list');
        newsList.innerHTML = '';
        
        news.forEach(item => {
            if (item.id !== currentNewsId) {
                const newsItem = document.createElement('a');
                newsItem.href = `news.html?id=${item.id}`;
                newsItem.className = 'news-item';
                newsItem.innerHTML = `
                    <div class="news-item-date">${formatDate(item.date)}</div>
                    <h3 class="news-item-title">${item.title}</h3>
                    <p class="news-item-excerpt">${item.excerpt}</p>
                `;
                newsList.appendChild(newsItem);
            }
        });
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    function initSortControls() {
        const sortButtons = document.querySelectorAll('.sort-btn');
        
        sortButtons.forEach(button => {
            button.addEventListener('click', function() {
                sortButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const sortedNews = [...allNews];
                if (this.dataset.sort === 'newest') {
                    sortedNews.sort((a, b) => new Date(b.date) - new Date(a.date));
                } else {
                    sortedNews.sort((a, b) => new Date(a.date) - new Date(b.date));
                }
                
                displayNewsList(sortedNews);
            });
        });
    }
});
    