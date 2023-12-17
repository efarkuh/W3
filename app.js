let fullImgBox = document.getElementById("fullImgBox");
let fullImg = document.getElementById("fullImg");
const declineButton = document.getElementById("decline");
const acceptButton = document.getElementById("accept");


let currentImageIndex = 0;

function openFullImg(pic){
    fullImgBox.style.display = "flex";
    fullImg.src = pic;
    currentImageIndex = imageUrls.indexOf(pic);
    // Find the description for the current image and update it
    const imageDescription = imageInfo.find(img => img.src === pic).description;
    document.getElementById('imageDescription').textContent = imageDescription;
}


function closeFullImg(){
    fullImgBox.style.display = "none";

}


// Cookies banner
const cookiesAccepted = document.cookie.includes("cookiesAccepted");   
if (!cookiesAccepted) {
    cookieNotice.style.display = "block";
} else {
    cookieNotice.style.display = "none";
}

acceptButton.addEventListener("click", () => {
    cookieNotice.style.display = "none";
    document.cookie = "cookiesAccepted=true";
    console.log("Accepted!");
  });

declineButton.addEventListener("click", () => {
    cookieNotice.style.display = "none";
    document.cookie = "cookiesAccepted=false";
    console.log("Declined!");
  });


// Add buttons to go to next or previous photo
const imageUrls = Array.from(document.querySelectorAll('.photo img')).map(img => img.src);
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
    fullImg.src = imageUrls[currentImageIndex];
}
function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + imageUrls.length) % imageUrls.length;
    fullImg.src = imageUrls[currentImageIndex];
}



// Include arrow navegation and escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        showNextImage();
    } else if (event.key === 'ArrowLeft') {
        showPreviousImage();
    } else if (event.key === 'Escape') {
        closeFullImg();
    } else if (event.key === 'Enter') {
        const focusedImageSrc = galleryImages[currentFocusIndex].src;
        openFullImg(focusedImageSrc);
    }
});

// Modified showNextImage function
function showNextImage() {
    const nextIndex = (currentImageIndex + 1) % imageInfo.length;
    updateImageAndDescription(nextIndex);
}

// Modified showPreviousImage function
function showPreviousImage() {
    const prevIndex = (currentImageIndex - 1 + imageInfo.length) % imageInfo.length;
    updateImageAndDescription(prevIndex);
}

// function showNextImage() {
//     currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
//     fullImg.src = imageUrls[currentImageIndex];
// }

// function showPreviousImage() {
//     currentImageIndex = (currentImageIndex - 1 + imageUrls.length) % imageUrls.length;
//     fullImg.src = imageUrls[currentImageIndex];
// }

function closeFullImg(){
    fullImgBox.style.display = "none";
}

// sellecting photos on the image gallery
let currentFocusIndex = 0;
const galleryImages = Array.from(document.querySelectorAll('.photo img'));

// Function to update focus
function updateFocus(newIndex) {
    galleryImages[currentFocusIndex].classList.remove('focused');
    currentFocusIndex = newIndex;
    galleryImages[currentFocusIndex].classList.add('focused');
}

// Initialize the first image as focused
updateFocus(0);

// Event listener for keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') {
        const nextIndex = (currentFocusIndex + 1) % galleryImages.length;
        updateFocus(nextIndex);
    } else if (event.key === 'ArrowLeft') {
        const prevIndex = (currentFocusIndex - 1 + galleryImages.length) % galleryImages.length;
        updateFocus(prevIndex);
    }
});

// Add click event to images to set focus
galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        updateFocus(index);
    });
});

// Photo Description
const imageInfo = [
    { src: 'https://source.unsplash.com/SYx3UCHZJlo', description: "Don't forget your sunglasses" },
    { src: 'https://source.unsplash.com/okVXy9tG3KY', description: "Waves" },
    { src: 'https://source.unsplash.com/wtBex4wQw60', description: "Dream car" },
    { src: "https://source.unsplash.com/7XAM0J3dNQM", description: "Way to heaven" },
    { src: 'https://source.unsplash.com/m82uh_vamhg', description: "The pink flamingo" },
    { src: 'https://source.unsplash.com/KMn4VEeEPR8', description: "Sunset" },
    { src: 'https://source.unsplash.com/koy6FlCCy5s', description: "The flowers" },
    { src: 'https://source.unsplash.com/TLD6iCOlyb0', description: "Do you want an Icecream?" },
    { src: 'https://source.unsplash.com/3bh3elC0D7M', description: "Few umbrellas" },
];

// New function to update image and description
function updateImageAndDescription(index) {
    currentImageIndex = index;
    const imageData = imageInfo[currentImageIndex];
    fullImg.src = imageData.src;
    document.getElementById('imageDescription').textContent = imageData.description;
}