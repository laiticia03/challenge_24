document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/menuItems', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(data => {
        const menuItemList = document.getElementById('menu-item-list');
        data.forEach(menuItem => {
            const li = document.createElement('li');
            li.textContent = `${menuItem.name} - ${menuItem.price} USD`;
            menuItemList.appendChild(li);
        });
    })
    .catch(err => console.error('Error fetching menu items:', err));
});