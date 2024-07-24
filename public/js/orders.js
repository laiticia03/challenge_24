document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/orders', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(data => {
        const orderList = document.getElementById('order-list');
        data.forEach(order => {
            const li = document.createElement('li');
            li.textContent = `Order ${order._id} - ${order.orderDate}`;
            orderList.appendChild(li);
        });
    })
    .catch(err => console.error('Error fetching orders:', err));
});