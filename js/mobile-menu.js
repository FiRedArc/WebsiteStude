document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav');
    const body = document.body;
    
    // Создаем оверлей
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
    
    // Клик по бургеру
    burger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('no-scroll');
    });
    
    // Клик по оверлею
    overlay.addEventListener('click', function() {
        burger.classList.remove('active');
        nav.classList.remove('active');
        this.classList.remove('active');
        body.classList.remove('no-scroll');
    });
    
    // Клик по пунктам меню
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                burger.classList.remove('active');
                nav.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('no-scroll');
            }
        });
    });
});