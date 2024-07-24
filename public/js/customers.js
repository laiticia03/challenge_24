document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/customers', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(data => {
        const customerList = document.getElementById('customer-list');
        data.forEach(customer => {
            const li = document.createElement('li');
            li.textContent = `${customer.name} - ${customer.contactInformation}`;
            customerList.appendChild(li);
        });
    })
    .catch(err => console.error('Error fetching customers:', err));
});