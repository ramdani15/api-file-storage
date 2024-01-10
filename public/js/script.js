document.addEventListener("DOMContentLoaded", function() {
    // Add event listener to the button
    var button = document.getElementById("swaggerButton");
    button.addEventListener("click", redirectToSwagger);
});

function redirectToSwagger() {
    // Dynamically get the base URL
    var baseUrl = window.location.protocol + '//' + window.location.host;

    // Replace 'YOUR_SWAGGER_DOCUMENTATION_PATH' with the path to your Swagger documentation.
    var swaggerPath = 'api/v1/swagger';

    // Combine base URL and Swagger path
    var swaggerUrl = baseUrl + '/' + swaggerPath;

    // Redirect to Swagger documentation
    window.location.href = swaggerUrl;
}