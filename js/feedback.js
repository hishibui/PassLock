document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedbackForm');
    const submitButton = feedbackForm.querySelector('button[type="submit"]');
    let notification;

    // Create and append notification element
    function createNotification() {
        notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span id="notificationText">Feedback sent successfully!</span>
            </div>
        `;
        document.body.appendChild(notification);
    }
    createNotification();

    // Show notification with custom message
    function showNotification(message, isSuccess = true) {
        const notificationText = document.getElementById('notificationText');
        const icon = notification.querySelector('svg');
        
        notificationText.textContent = message;
        icon.style.stroke = isSuccess ? '#22c55e' : '#ef4444';
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Handle form submission
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Disable submit button and show loading state
        submitButton.disabled = true;
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            feedbackType: document.getElementById('feedback-type').value,
            message: document.getElementById('message').value
        };

        // Send email using EmailJS
        emailjs.send(
            'service_bq6wwvp',  // Your service ID
            'template_c43wtyg', // Your template ID
            {
                from_name: formData.name,
                from_email: formData.email,
                feedback_type: formData.feedbackType,
                message: formData.message
            }
        ).then(
            function(response) {
                showNotification('Feedback sent successfully!');
                feedbackForm.reset();
            },
            function(error) {
                console.log('Error:', error);  // Add this for debugging
                showNotification('Failed to send feedback. Please try again.', false);
            }
        ).finally(() => {
            // Re-enable submit button and restore text
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        });
    });
}); 