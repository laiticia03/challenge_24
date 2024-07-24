document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/employees', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(response => response.json())
    .then(data => {
        const employeeList = document.getElementById('employee-list');
        data.forEach(employee => {
            const li = document.createElement('li');
            li.textContent = `${employee.name} - ${employee.position}`;
            employeeList.appendChild(li);
        });
    })
    .catch(err => console.error('Error fetching employees:', err));
});