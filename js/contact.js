const inquiryForm = document.getElementById("inquiry-form");

const inquiryName = document.getElementById("inquiry-name");
const inquiryEmail = document.getElementById("inquiry-email");
const inquirySubject = document.getElementById("inquiry-subject");
const inquiryMessage = document.getElementById("inquiry-message");

function showError(field, message) {
    const errorElement = document.getElementById(field.id + "-error");
    errorElement.textContent = message;
}

function clearErrors() {
    const errorElements = document.querySelectorAll(
        "#inquiry-form .error-message"
    );

    errorElements.forEach(function (element) {
        element.textContent = "";
    });
}

inquiryForm.addEventListener("submit", function (event) {
    clearErrors();

    let isValid = true;

    // Validate name
    if (inquiryName.value.trim() === "") {
        showError(inquiryName, "Please enter your name.");
        isValid = false;
    }

    // Validate email
    const emailValue = inquiryEmail.value.trim();

    if (emailValue === "") {
        showError(inquiryEmail, "Please enter your email address.");
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        showError(inquiryEmail, "Please enter a valid email address.");
        isValid = false;
    }

    // Validate subject
    if (inquirySubject.value.trim() === "") {
        showError(inquirySubject, "Please enter a subject.");
        isValid = false;
    }

    // Validate message
    if (inquiryMessage.value.trim() === "") {
        showError(inquiryMessage, "Please enter your message.");
        isValid = false;
    }

    // Prevent submission if validation fails
    if (!isValid) {
        event.preventDefault();
    }
});

// Clear an individual field's error message
function clearFieldError(field) {
    const errorElement = document.getElementById(
        field.id + "-error"
    );

    errorElement.textContent = "";
}

// Clear errors when the user edits a field
inquiryName.addEventListener("input", function () {
    clearFieldError(inquiryName);
});

inquiryEmail.addEventListener("input", function () {
    clearFieldError(inquiryEmail);
});

inquirySubject.addEventListener("input", function () {
    clearFieldError(inquirySubject);
});

inquiryMessage.addEventListener("input", function () {
    clearFieldError(inquiryMessage);
});



const draftStorageKey = "northStarInquiryDraft";

// Save the form data
function saveInquiryDraft() {
    const draft = {
        name: inquiryName.value,
        email: inquiryEmail.value,
        subject: inquirySubject.value,
        message: inquiryMessage.value
    };

    localStorage.setItem(
        draftStorageKey,
        JSON.stringify(draft)
    );
}

// Restore the saved form data
function loadInquiryDraft() {
    const savedDraft = localStorage.getItem(draftStorageKey);

    if (savedDraft) {
        const draft = JSON.parse(savedDraft);

        inquiryName.value = draft.name || "";
        inquiryEmail.value = draft.email || "";
        inquirySubject.value = draft.subject || "";
        inquiryMessage.value = draft.message || "";
    }
}

// Save the draft whenever a field changes
[
    inquiryName,
    inquiryEmail,
    inquirySubject,
    inquiryMessage
].forEach(function (field) {
    field.addEventListener("input", saveInquiryDraft);
});

// Restore saved data when the page loads
loadInquiryDraft();
