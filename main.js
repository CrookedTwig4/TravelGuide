function authenticate(username, password) {
    // Retrieve the JSON string from the GitHub secret
    const jsonString = process.env.LOGIN_CREDENTIALS; // Replace with your GitHub secret variable

    // Parse the JSON string into a JavaScript array
    const usernamesPasswordsArray = JSON.parse(jsonString);

    // Check if the input matches any entry in the array
    const matchFound = usernamesPasswordsArray.some(entry => entry.username === username && entry.password === password);

    if (matchFound) {
        return true;
    } else {
        return false;
    }
}
