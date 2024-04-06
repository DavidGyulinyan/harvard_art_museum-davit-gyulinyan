const usersCount = Math.floor(Math.random() * 11) + 20;

// Asynchronously fetches data from API
const getData = async () => {
    try {
        const response = await fetch(`https://randomuser.me/api/?results=${usersCount}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Updates DOM elements, gets data as a parameter, and displays it in the browser
const updateDOM = (data) => {
    let favorites = [];
    let favoritesIds = new Set(); // Set to store unique user IDs

    const mainElement = document.querySelector('.section');

    const usersCountElement = document.querySelector('.users-count');
    usersCountElement.textContent = `Displayed ${data.length} users`;

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

        const image = document.createElement('img');
        userCard.appendChild(image);
        image.className = 'user-image';
        const imgUrl = user.picture.large;
        const imgAlt = `${user.name.first} ${user.name.last} photo`;
        image.src = imgUrl;
        image.alt = imgAlt;

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

        const arrowDownPath = './assets/arrow-down.svg';
        const arrowUpPath = './assets/arrow-up.svg';

        const arrow = document.createElement('img');
        arrowWrapper.appendChild(arrow);
        arrow.src = arrowDownPath;
        arrow.alt = 'arrow';
        arrow.className = 'arrow';

        const unorderedList = document.createElement('ul');
        userCard.appendChild(unorderedList);
        unorderedList.className = 'unorderedList';

        const dobItem = document.createElement('li');
        unorderedList.appendChild(dobItem);
        dobItem.textContent = `Age: ${user.dob.age}`;

        const genderItem = document.createElement('li');
        unorderedList.appendChild(genderItem);
        genderItem.textContent = `Gender: ${user.gender}`;

        const emailItem = document.createElement('li');
        unorderedList.appendChild(emailItem);
        emailItem.textContent = `Email: ${user.email}`;

        const phonItem = document.createElement('li');
        unorderedList.appendChild(phonItem);
        phonItem.textContent = `Phone number: ${user.cell}`;

        const usernameItem = document.createElement('li');
        unorderedList.appendChild(usernameItem);
        usernameItem.textContent = `Username: ${user.login.username}`;

        const regDateItem = document.createElement('li');
        unorderedList.appendChild(regDateItem);
        regDateItem.textContent = `Signed in at: ${user.registered.date}`;

        arrowWrapper.addEventListener('click', () => {
            unorderedList.classList.toggle("listIsOpen");
            unorderedList.classList.contains("listIsOpen")
                ? arrow.src = arrowUpPath
                : arrow.src = arrowDownPath;
        });

        addToFavBtn.addEventListener('click', () => {
            if (!favoritesIds.has(user.login.uuid)) {
                favorites.push(user);
                favoritesIds.add(user.login.uuid);
                const favoritesWrapper = document.querySelector('.favorites');
                const favoritesCard = document.createElement('div');
                favoritesWrapper.appendChild(favoritesCard);
                favoritesCard.className = 'favorites-card';
                const buttonsWrapper = document.createElement('div');
                favoritesCard.appendChild(buttonsWrapper);
                buttonsWrapper.className = 'delete-button-wrapper';
                const deleteBtn = document.createElement('button');
                buttonsWrapper.appendChild(deleteBtn);
                deleteBtn.className = 'delete-button'
                deleteBtn.textContent = "delete";
                const favItemImg = document.createElement('img');
                favoritesCard.appendChild(favItemImg);
                favItemImg.src = imgUrl;
                favItemImg.alt = imgAlt;
                const fullname = document.createElement('h4');
                favoritesCard.appendChild(fullname);
                fullname.className = 'fullname'
                fullname.textContent = `${user.name.first} ${user.name.last}`;
                deleteBtn.addEventListener('click', () => {
                    favorites = favorites.filter(item => item.login.uuid !== user.login.uuid);
                    favoritesIds.delete(user.login.uuid);
                    favoritesWrapper.removeChild(favoritesCard);
                })
            } else {
                console.log("User is already in favorites!");
            }
        });
    });
}

const fetchData = async () => {
    try {
        const userData = await getData();
        return updateDOM(userData);
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

fetchData();
