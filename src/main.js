//Asynchronusly fetches data from api
const getData = async () => {
    try {
        const response = await fetch('https://randomuser.me/api/?results=20'); // Fetch data for 10 users
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

//Updates DOM elements, gets data as a parameter and displayes it in the browser
const updateDOM = (data) => {
    const mainElement = document.querySelector('.main');

    //iterates through fethed data
    data.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'card';
        mainElement.appendChild(userCard);

        //user image
        const image = document.createElement('img');
        const imgUrl = user.picture.large;
        const imgAlt = `${user.name.first} ${user.name.last} photo`;
        image.src = imgUrl;
        image.alt = imgAlt;
        userCard.appendChild(image);

        //unordered list to display user's data
        const unorderedList = document.createElement('ul');
        userCard.appendChild(unorderedList);

        //list item to display user's name
        const nameItem = document.createElement('li');
        unorderedList.appendChild(nameItem);
        nameItem.textContent = `Firstname: ${user.name.first}`;

        //list item to display user's lastname
        const lastnameItem = document.createElement('li');
        unorderedList.appendChild(lastnameItem);
        lastnameItem.textContent = `Lastname: ${user.name.last}`;

        //list item to display user's gender
        const genderItem = document.createElement('li');
        unorderedList.appendChild(genderItem);
        genderItem.textContent = `Gender: ${user.gender}`;

        //list item to display user's email
        const emailItem = document.createElement('li');
        unorderedList.appendChild(emailItem);
        emailItem.textContent = `Email: ${user.email}`;

        //list item to display user's phone number
        const phonItem = document.createElement('li');
        unorderedList.appendChild(phonItem);
        phonItem.textContent = `Phone number: ${user.cell}`;

        //list item to display user's username used to log in
        const usernameItem = document.createElement('li');
        unorderedList.appendChild(usernameItem);
        usernameItem.textContent = `Username: ${user.login.username}`;

        //list item to display the date user signed in 
        const regDateItem = document.createElement('li');
        unorderedList.appendChild(regDateItem);
        regDateItem.textContent = `Signed in at: ${user.registered.date}`;
    });
}


//Gets array from promise and send this array to updateDOM function as an argument
const fetchData = async () => {
    try {
        const userData = await getData();
        return updateDOM(userData);
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

fetchData();
