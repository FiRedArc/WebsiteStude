document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointment-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем данные формы
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            doctor: document.getElementById('doctor').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value
        };
        
        // Валидация
        if (!formData.name || !formData.phone || !formData.doctor || !formData.date || !formData.time) {
            alert('Пожалуйста, заполните все поля');
            return;
        }
        
        // Сохраняем данные (в реальном проекте здесь будет отправка на сервер)
        localStorage.setItem('lastAppointment', JSON.stringify(formData));
        
        // Перенаправляем на страницу подтверждения
        const queryString = new URLSearchParams(formData).toString();
        window.location.href = `confirmation.html?${queryString}`;
    });
    
    // Устанавливаем минимальную дату (сегодня)
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
});
function validatePhone(phone) {
    return /^[\d\+]{10,15}$/.test(phone.replace(/\D/g, ''));
}
localStorage.setItem('lastAppointment', JSON.stringify(formData));