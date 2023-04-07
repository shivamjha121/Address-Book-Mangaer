const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('nameInput');
const mobileInput = document.getElementById('mobileInput');
const contactList = document.getElementById('contactList');
const filterInput = document.getElementById('filterInput');

let contacts = [];

// Add Contact
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const mobile = mobileInput.value.trim();

    // Check for duplicate mobile number
    if (contacts.some(contact => contact.mobile === mobile)) {
        alert('Duplicate mobile number. Please enter a unique mobile number.');
        return;
    }

    if (!name || !mobile) {
        return;
    }

    const contact = {
        name: name,
        mobile: mobile
    }

    contacts.push(contact);
    nameInput.value = '';
    mobileInput.value = '';
    renderContactList();
});

// Render Contact List
function renderContactList() {
    contactList.innerHTML = '';


    // Sort contacts by name in ascending order
    contacts.sort((a, b) => a.name.localeCompare(b.name, 'en', {sensitivity: 'base'}));

    // Filter contacts by name or mobile number
    const filter = filterInput.value.trim().toLowerCase();
    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter) || contact.mobile.includes(filter)
    );

    filteredContacts.forEach((contact, index) => {
        const li = document.createElement('li');
        li.textContent = `Name: ${contact.name}, Mobile: ${contact.mobile}`;

        // Add Edit button for each contact
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            editContact(index);
        });
        li.appendChild(editButton);

        // Add Delete button for each contact
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteContact(index);
        });
        li.appendChild(deleteButton);

        contactList.appendChild(li);
    });
}

// Edit Contact
function editContact(index) {
    const contact = contacts[index];
    nameInput.value = contact.name;
    mobileInput.value = contact.mobile;

    // Remove the edited contact from the contacts array
    contacts.splice(index, 1);
    renderContactList();
}

// Delete Contact
function deleteContact(index) {
    contacts.splice(index, 1);
    renderContactList();
}

// Filter Contacts
filterInput.addEventListener('input', () => {
    renderContactList();
});
