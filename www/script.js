/* =========================================
   MK CONTACTS
========================================= */


/* =========================================
   DEFAULT CONTACTS
========================================= */

const defaultContacts = [

    {
        name: "👩 Sunita Sharma ❤️",
        number: "9876543210",
        favorite: true
    },

    {
        name: "👩 Pooja Kumari 🌸",
        number: "9876543211",
        favorite: true
    },

    {
        name: "Anita Devi 😊",
        number: "9876543212",
        favorite: false
    },

    {
        name: "Neha Sharma 💕",
        number: "9876543213",
        favorite: false
    }

];


/* =========================================
   LOAD CONTACTS
========================================= */

let contacts =
    JSON.parse(
        localStorage.getItem("mkContacts")
    ) || defaultContacts;


/* =========================================
   EDITING INDEX
========================================= */

let editingIndex = null;


/* =========================================
   HTML ELEMENTS
========================================= */

const contactList =
    document.getElementById("contactList");

const favoritesList =
    document.getElementById("favoritesList");

const searchInput =
    document.getElementById("searchInput");

const addBtn =
    document.getElementById("addBtn");

const addModal =
    document.getElementById("addModal");

const newName =
    document.getElementById("newName");

const newNumber =
    document.getElementById("newNumber");

const cancelBtn =
    document.getElementById("cancelBtn");

const saveBtn =
    document.getElementById("saveBtn");


/* =========================================
   SAVE CONTACTS
========================================= */

function saveContacts() {

    localStorage.setItem(
        "mkContacts",
        JSON.stringify(contacts)
    );

}


/* =========================================
   CLEAN NAME FOR SPEECH
========================================= */

function cleanNameForSpeech(name) {

    return name

        .replace(
            /[\u{1F000}-\u{1FAFF}]/gu,
            ""
        )

        .replace(
            /[\u{2600}-\u{27BF}]/gu,
            ""
        )

        .replace(
            /[\uFE0E\uFE0F]/g,
            ""
        )

        .replace(
            /\s+/g,
            " "
        )

        .trim();

}


/* =========================================
   SPEAK CONTACT NAME
========================================= */

function speakName(name) {

    const cleanName =
        cleanNameForSpeech(name);


    if (!cleanName) {
        return;
    }


    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(
            cleanName
        );


    speech.lang = "hi-IN";

    speech.rate = 0.9;

    speech.pitch = 1;

    speech.volume = 1;


    window.speechSynthesis.speak(
        speech
    );

}


/* =========================================
   CALL CONTACT
========================================= */

function callContact(number) {

    window.location.href =
        "tel:" + number;

}


/* =========================================
   DELETE CONTACT
========================================= */

function deleteContact(contact) {

    const index =
        contacts.indexOf(contact);


    if (index === -1) {
        return;
    }


    const confirmDelete =
        confirm(
            `Delete ${cleanNameForSpeech(contact.name)}?`
        );


    if (!confirmDelete) {
        return;
    }


    contacts.splice(index, 1);


    saveContacts();


    renderContacts();

}


/* =========================================
   OPEN EDIT MODAL
========================================= */

function editContact(contact) {

    editingIndex =
        contacts.indexOf(contact);


    if (editingIndex === -1) {
        return;
    }


    newName.value =
        contact.name;


    newNumber.value =
        contact.number;


    saveBtn.textContent =
        "Update";


    addModal.classList.remove(
        "hidden"
    );

}


/* =========================================
   CREATE NORMAL CONTACT
========================================= */

function createContactElement(
    contact
) {

    const div =
        document.createElement("div");


    div.className =
        "contact";


    /* =====================================
       AVATAR
    ===================================== */

    const avatar =
        document.createElement("div");


    avatar.className =
        "avatar";


    avatar.textContent =
        "👤";


    /* =====================================
       INFO
    ===================================== */

    const info =
        document.createElement("div");


    info.className =
        "info";


    const name =
        document.createElement("div");


    name.className =
        "name";


    name.textContent =
        contact.name;


    const number =
        document.createElement("div");


    number.className =
        "number";


    number.textContent =
        contact.number;


    info.appendChild(name);

    info.appendChild(number);


    /* =====================================
       EDIT BUTTON
    ===================================== */

    const editBtn =
        document.createElement("button");


    editBtn.className =
        "editBtn";


    editBtn.textContent =
        "✏️";


    editBtn.title =
        "Edit contact";


    editBtn.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();

            editContact(contact);

        }
    );


    /* =====================================
       DELETE BUTTON
    ===================================== */

    const deleteBtn =
        document.createElement("button");


    deleteBtn.className =
        "deleteBtn";


    deleteBtn.textContent =
        "🗑️";


    deleteBtn.title =
        "Delete contact";


    deleteBtn.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();

            deleteContact(contact);

        }
    );


    /* =====================================
       CALL BUTTON
    ===================================== */

    const callIcon =
        document.createElement("div");


    callIcon.className =
        "callIcon";


    callIcon.textContent =
        "📞";


    callIcon.title =
        "Call";


    callIcon.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();

            callContact(
                contact.number
            );

        }
    );


    /* =====================================
       SPEAK NAME
    ===================================== */

    info.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();

            speakName(
                contact.name
            );

        }
    );


    /* =====================================
       ADD ELEMENTS
    ===================================== */

    div.appendChild(avatar);

    div.appendChild(info);

    div.appendChild(editBtn);

    div.appendChild(deleteBtn);

    div.appendChild(callIcon);


    return div;

}


/* =========================================
   CREATE FAVORITE CONTACT
========================================= */

function createFavoriteElement(
    contact
) {

    const div =
        document.createElement("div");


    div.className =
        "favorite";


    /* =====================================
       AVATAR
    ===================================== */

    const avatar =
        document.createElement("div");


    avatar.className =
        "avatar";


    avatar.textContent =
        "👤";


    /* =====================================
       NAME
    ===================================== */

    const name =
        document.createElement("div");


    name.className =
        "name";


    name.textContent =
        contact.name;


    name.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();

            speakName(
                contact.name
            );

        }
    );


    /* =====================================
       BUTTON CONTAINER
    ===================================== */

    const buttons =
        document.createElement("div");


    buttons.className =
        "favoriteButtons";


    /* =====================================
       EDIT
    ===================================== */

    const editBtn =
        document.createElement("button");


    editBtn.className =
        "favoriteEdit";


    editBtn.textContent =
        "✏️";


    editBtn.title =
        "Edit";


    editBtn.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();

            editContact(contact);

        }
    );


    /* =====================================
       DELETE
    ===================================== */

    const deleteBtn =
        document.createElement("button");


    deleteBtn.className =
        "favoriteDelete";


    deleteBtn.textContent =
        "🗑️";


    deleteBtn.title =
        "Delete";


    deleteBtn.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();

            deleteContact(contact);

        }
    );


    /* =====================================
       CALL
    ===================================== */

    const callBtn =
        document.createElement("button");


    callBtn.className =
        "favoriteCall";


    callBtn.textContent =
        "📞";


    callBtn.title =
        "Call";


    callBtn.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();

            callContact(
                contact.number
            );

        }
    );


    /* =====================================
       ADD BUTTONS
    ===================================== */

    buttons.appendChild(editBtn);

    buttons.appendChild(deleteBtn);

    buttons.appendChild(callBtn);


    /* =====================================
       ADD EVERYTHING
    ===================================== */

    div.appendChild(avatar);

    div.appendChild(name);

    div.appendChild(buttons);


    return div;

}


/* =========================================
   RENDER CONTACTS
========================================= */

function renderContacts(
    filteredContacts = contacts
) {

    contactList.innerHTML = "";

    favoritesList.innerHTML = "";


    /* =====================================
       SORT A-Z
    ===================================== */

    const sortedContacts =
        [...filteredContacts].sort(
            function(a, b) {

                return cleanNameForSpeech(
                    a.name
                ).localeCompare(
                    cleanNameForSpeech(
                        b.name
                    )
                );

            }
        );


    /* =====================================
       FAVORITES
    ===================================== */

    const favorites =
        sortedContacts.filter(
            function(contact) {

                return contact.favorite;

            }
        );


    if (favorites.length === 0) {

        favoritesList.innerHTML =
            `<div class="empty">
                No favorite contacts
            </div>`;

    }

    else {

        favorites.forEach(
            function(contact) {

                const favoriteElement =
                    createFavoriteElement(
                        contact
                    );

                favoritesList.appendChild(
                    favoriteElement
                );

            }
        );

    }


    /* =====================================
       ALL CONTACTS
    ===================================== */

    if (sortedContacts.length === 0) {

        contactList.innerHTML =
            `<div class="empty">
                No contacts found
            </div>`;

    }

    else {

        sortedContacts.forEach(
            function(contact) {

                const contactElement =
                    createContactElement(
                        contact
                    );

                contactList.appendChild(
                    contactElement
                );

            }
        );

    }

}


/* =========================================
   SEARCH
========================================= */

searchInput.addEventListener(
    "input",
    function() {

        const searchText =
            searchInput.value
                .toLowerCase()
                .trim();


        if (!searchText) {

            renderContacts();

            return;

        }


        const filtered =
            contacts.filter(
                function(contact) {

                    return (

                        contact.name
                            .toLowerCase()
                            .includes(searchText)

                        ||

                        contact.number
                            .includes(searchText)

                    );

                }
            );


        renderContacts(
            filtered
        );

    }
);


/* =========================================
   OPEN ADD MODAL
========================================= */

addBtn.addEventListener(
    "click",
    function() {

        editingIndex = null;


        newName.value = "";

        newNumber.value = "";


        saveBtn.textContent =
            "Save";


        addModal.classList.remove(
            "hidden"
        );

    }
);


/* =========================================
   CANCEL MODAL
========================================= */

cancelBtn.addEventListener(
    "click",
    function() {

        addModal.classList.add(
            "hidden"
        );


        editingIndex = null;


        newName.value = "";

        newNumber.value = "";


        saveBtn.textContent =
            "Save";

    }
);


/* =========================================
   SAVE / UPDATE CONTACT
========================================= */

saveBtn.addEventListener(
    "click",
    function() {

        const name =
            newName.value.trim();


        const number =
            newNumber.value.trim();


        /* =================================
           VALIDATION
        ================================= */

        if (!name) {

            alert(
                "Please enter contact name"
            );

            return;

        }


        if (!number) {

            alert(
                "Please enter phone number"
            );

            return;

        }


        /* =================================
           UPDATE EXISTING CONTACT
        ================================= */

        if (editingIndex !== null) {

            contacts[editingIndex].name =
                name;


            contacts[editingIndex].number =
                number;


            alert(
                "Contact updated!"
            );

        }


        /* =================================
           ADD NEW CONTACT
        ================================= */

        else {

            contacts.push({

                name: name,

                number: number,

                favorite: false

            });


            alert(
                "Contact added!"
            );

        }


        /* =================================
           SAVE
        ================================= */

        saveContacts();


        /* =================================
           CLOSE MODAL
        ================================= */

        addModal.classList.add(
            "hidden"
        );


        editingIndex = null;


        newName.value = "";

        newNumber.value = "";


        saveBtn.textContent =
            "Save";


        /* =================================
           REFRESH
        ================================= */

        renderContacts();

    }
);


/* =========================================
   CLOSE MODAL WHEN CLICK OUTSIDE
========================================= */

addModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target === addModal
        ) {

            addModal.classList.add(
                "hidden"
            );


            editingIndex = null;

        }

    }
);


/* =========================================
   FIRST RENDER
========================================= */

renderContacts();
