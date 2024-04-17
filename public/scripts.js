const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = `
            <div class="col s4 center-align">
                <div class="card medium">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="${item.image}">
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">${item.title}<i class="material-icons right">more_vert</i></span>
                        <p><a href="#">${item.link}</a></p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">${item.title}<i class="material-icons right">close</i></span>
                        <p class="card-text grey-text text-darken-4">${item.description}</p>
                    </div>
                </div>
            </div>`;
        $("#card-section").append(itemToAppend);
    });
};

const getCars = () => {
    $.get('/api/cars', (response) => {
        if (response.statusCode == 200) {
            console.log(response);
            addCards(response.data);
        } else {
            console.log(response);
        }
    });
};

$(document).ready(function () {
    getCars();
});
const submitForm = () => {
    const formData = {
        title: $('#title').val(),
        image: $('#image').val(),
        link: $('#link').val(),
        description: $('#description').val()
    };

    $.ajax({
        url: '/api/cars',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: (result) => {
            console.log(result);
            // Optionally, you can update the UI or display a message to indicate success
            // For example:
            // alert('Car added successfully');
            // Reload the page to reflect the changes
            window.location.reload();
        },
        error: (xhr, status, error) => {
            console.error('Error adding car:', error);
            // Optionally, you can display an error message to the user
        }
    });
};
$(document).ready(function () {
    // Attach event listener to form submit button
    $('#submitForm').click(submitForm);
});

