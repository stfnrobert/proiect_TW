document.getElementById('appointment-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        service: document.getElementById('service').value,
    };

    console.log('Form Data:', formData);

    try {
        const response = await fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Your appointment has been booked successfully!');
            document.getElementById('appointment-form').reset();
        } else {
            const error = await response.text();
            alert(`Failed to book appointment: ${error}`);
        }
    } catch (err) {
        alert(`An error occurred: ${err.message}`);
    }
});
