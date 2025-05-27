const formSection = document.querySelector(".form-section");
const sectionTwo = document.querySelector(".section-two");

const form = document.querySelector("#form");
const uploadPane = document.querySelector("#upload-pane");
const label = document.querySelector("#label");
const uploadLabel = document.querySelector("#upload-label");
const uploadContent = document.querySelector("#upload-content");
const photoFrame = document.querySelector(".img-container");
const uploadIcon = document.querySelector("#upload-icon");
const uploadedImg = document.querySelector("#uploaded-img");
const btnContainer = document.querySelector(".btn-container");
const removeBtn = document.querySelector(".remove-btn");
const changeBtn = document.querySelector(".change-btn");
const dragText = document.querySelector(".drag-text");
const sizeGuiding = document.querySelector(".size-guiding");
const errorMessage = document.querySelector(".error-message");
const errorMessage2 = document.querySelector(".error-message2");
const errorWarning = document.querySelectorAll(".error-warning");
const fullName = document.querySelector("#full-name");
const email = document.querySelector("#email");
const githubUsername = document.querySelector("#github-username");
const btn = document.querySelector("#submit-btn");

//Ticket Section
const userName = document.querySelector(".userName");
const userEmail = document.querySelector(".userEmail");
const date = document.querySelector(".current");
const avatar = document.querySelector(".avatar");
const protoName = document.querySelector(".name");
const githubUserName = document.querySelector(".githubUserName");
const serialNumber = document.querySelector(".serial-number");



//File size limit (500 KB)
const CONFIG = {
    FILE_SIZE_LIMIT: 500 * 1024
};

//Function to check file size and preview image
function checkFileSize(file) {
  if (!file) {
    //Show error if no image is uploaded
    sizeGuiding.style.display = "none";
    errorMessage2.style.display = "flex";
    return;
  }  

  if (file.size > CONFIG.FILE_SIZE_LIMIT) {
    //Show error if image is larger than 500 KB
    sizeGuiding.style.display = "none";
    errorMessage.style.display = "flex";
    dragText.style.display = "none";
    btnContainer.style.display = "none";
    return;
  } else {
    errorMessage.style.display = "none";
    sizeGuiding.style.display = "flex";
  }

  // Preview the uploaded image
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
   uploadedImg.src = reader.result;
   avatar.src = reader.result;
   uploadedImg.style.display = "block";
   uploadIcon.style.display = "none";
   dragText.style.display = "none";
  };
}

//Handle drag and drop events
label.addEventListener("dragover", (e) => {
  e.preventDefault();
  label.classList.add("dragover");
});

label.addEventListener("dragLeave", (e) => {
  e.preventDefault();
  label.classList.remove("dragover");
});

label.addEventListener("drop", (e) => {
  e.preventDefault();
  label.classList.remove("dragover");
  const file = e.dataTransfer.files[0];
  checkFileSize(file);
});

//Handle file selection via upload input
uploadLabel.addEventListener("change", () => {
  const file = uploadLabel.files[0];
  checkFileSize(file);
  btnContainer.style.display = "block";
});

//Handle remove button functionality
removeBtn.addEventListener("click", () => {
  uploadedImg.style.display = "none";
  uploadIcon.style.display = "block";
  uploadedImg.src = "";
  btnContainer.style.display = "block";
  dragText.style.display = "none";
});

// Handle change button functionality
changeBtn.addEventListener("click", () => {
  uploadLabel.value = "";
  btnContainer.style.display = "none";
  dragText.style.display = "block";
  uploadLabel.click(); 
});

//function to show error
function showError(index, input) {
  errorWarning[index].style.display = "flex";
  fullName.style.border = "2px solid var(--Orange-500)";
  email.style.border = "2px solid var(--Orange-500)";
  githubUsername.style.border = "2px solid var(--Orange-500)";
}

//function to hide error 
function hideError(index, input) {
  errorWarning[index].style.display = "none";
  fullName.style.border = "2px solid var(--Neutral-700)";
  email.style.border = "2px solid var(--Neutral-700)";
  githubUsername.style.border = "2px solid var(--Neutral-700)";
}

// Validate the form on submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;

  // Validate Full Name
  if(fullName.value.trim() === "") {
    showError(0, fullName);
    isValid = false;
  } else {
    hideError(0, fullName);
  }

  // Validate Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    showError(1, email);
    isValid = false;
  } else {
    hideError(1, email);
  }

  //Validate Github Username 
  if (githubUsername.value.trim() === "") {
    showError(2, githubUsername);
    isValid = false;
  } else {
    hideError(2, githubUsername);
  }

 if (!uploadedImg.src || !uploadedImg.src.startsWith("data:image")) {
    errorMessage2.style.display = "flex";
    label.classList.add("shake");
    isValid = false;

    setTimeout(() => {
      label.classList.remove("shake");
    }, 400); 
 }

  // Switch sections if all fields are valid
  if (isValid) {
    formSection.style.display = "none";
    sectionTwo.style.display = "block";

    protoName.textContent = fullName.value.trim();
    userName.textContent = fullName.value.trim();
    userEmail.textContent = email.value.trim();
    githubUserName.textContent = githubUsername.value.trim();
  }
});

// Real-Time validation

// Full Name
fullName.addEventListener("input", () => {
  if(fullName.value.trim() !== "") {
    hideError(0, fullName);
    protoName.textContent = fullName.value.trim();
    userName.textContent = fullName.value.trim();
  }
});

// email
email.addEventListener("input", () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(emailRegex.test(email.value.trim())) {
    hideError(1, email);
    userEmail.textContent = email.value.trim();
  }
});

// Github Username
githubUsername.addEventListener("input", () => {
  if(githubUsername.value.trim() !== "") {
    hideError(2, githubUsername);
    githubUserName.textContent = githubUsername.value.trim();
  }
});

// Ticket number generator
serialNumber.textContent = "#" + Math.floor(Math.random() * 100000);

const currentDate = new Date();
const options = { month: 'short', day: 'numeric', year: 'numeric'};
date.textContent = currentDate.toLocaleDateString('en-US', options);