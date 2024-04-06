const usersCount = (Math.floor(Math.random() * 11) + 20);
//Asynchronusly fetches data from api
const getData = async () => {
    try {
        const response = await fetch(`https://randomuser.me/api/?results=${usersCount}`); // Fetching data from 5 to 20 users
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

//Updates DOM elements, gets data as a parameter and displayes it in the browser
const updateDOM = (data) => {
    let favorites = [];
    const mainElement = document.querySelector('.section');

    //element where displayed the count of generated users
    const usersCountElement = document.querySelector('.users-count');
    usersCountElement.textContent = `Displayed ${data.length} users`;

    //iterates through fethed data
    data.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'card';
        mainElement.appendChild(userCard);

        const buttonsWrapper = document.createElement('div');
        userCard.appendChild(buttonsWrapper);
        buttonsWrapper.className = 'buttons-wrapper';

        const addToFavBtn = document.createElement('button');
        buttonsWrapper.appendChild(addToFavBtn);
        addToFavBtn.className = 'add-button';
        addToFavBtn.textContent = "Add to favorites";

        //user image
        const image = document.createElement('img');
        userCard.appendChild(image);
        image.className = 'user-image';
        const imgUrl = user.picture.large;
        const imgAlt = `${user.name.first} ${user.name.last} photo`;
        image.src = imgUrl;
        image.alt = imgAlt;

        //h3 element to display user's fullname
        const fullname = document.createElement('h2');
        userCard.appendChild(fullname);
        fullname.className = 'fullname'
        fullname.textContent = `${user.name.first} ${user.name.last}`;


        const arrowWrapper = document.createElement('div');
        userCard.appendChild(arrowWrapper);
        arrowWrapper.className = 'arrow-wrapper';

        const details = document.createElement('h4');
        arrowWrapper.appendChild(details);
        details.textContent = "Details";

        //arrows image's paths
        const arrowDownPath = './assets/arrow-down.svg';
        const arrowUpPath = './assets/arrow-up.svg';

        //displayed arrow
        const arrow = document.createElement('img');
        arrowWrapper.appendChild(arrow);
        arrow.src = arrowDownPath;
        arrow.alt = 'arrow';
        arrow.className = 'arrow';

        //unordered list to display user's data
        const unorderedList = document.createElement('ul');
        userCard.appendChild(unorderedList);
        unorderedList.className = 'unorderedList';

        //list item to display the user's age 
        const dobItem = document.createElement('li');
        unorderedList.appendChild(dobItem);
        dobItem.textContent = `Age: ${user.dob.age}`;

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

        //shows more details when cklicking on an arrow
        arrowWrapper.addEventListener('click', () => {
            unorderedList.classList.toggle("listIsOpen");

            //if ditails opened arrow up showes, if not arrow down showes
            unorderedList.classList.contains("listIsOpen")
                ? arrow.src = arrowUpPath
                : arrow.src = arrowDownPath;
        });

        //add to favorites button
        addToFavBtn.addEventListener('click', () => {
            favorites.push(user);

            const favoritesWrapper = document.querySelector('.favorites');

            const favoritesCard = document.createElement('div');
            favoritesWrapper.appendChild(favoritesCard)
            favoritesCard.className = 'favorites-card';

            const buttonsWrapper = document.createElement('div');
            favoritesCard.appendChild(buttonsWrapper);
            buttonsWrapper.className = 'delete-button-wrapper';
    
            const deleteBtn = document.createElement('button');
            buttonsWrapper.appendChild(deleteBtn);
            deleteBtn.className = 'delete-button'
            deleteBtn.textContent = "delete";

            //user image
            const favItemImg = document.createElement('img');
            favoritesCard.appendChild(favItemImg);
            const imgUrl = user.picture.large;
            const imgAlt = `${user.name.first} ${user.name.last} photo`;
            favItemImg.src = imgUrl;
            favItemImg.alt = imgAlt;

            //h3 element to display user's fullname
            const fullname = document.createElement('h4');
            favoritesCard.appendChild(fullname);
            fullname.className = 'fullname'
            fullname.textContent = `${user.name.first} ${user.name.last}`;

            //deleting the user from favorites
            deleteBtn.addEventListener('click', () => {
                favorites = favorites.filter(item => item.login.uuid !== user.login.uuid);
                favoritesWrapper.removeChild(favoritesCard);
            })
        })
    })
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
