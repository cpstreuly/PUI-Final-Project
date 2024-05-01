const trinketContainers = document.querySelectorAll('.trinket');
let numberedElements = document.querySelectorAll('.trink-text');
const fixedInfoBox = document.getElementById('fixed-info-box');
let originalFixedInfoContent;

// functions for hover -> bold trinket name effect
function handleMouseEnterTrinket(index) {
    const trinketText = numberedElements[index].querySelector('p');
    trinketText.style.fontWeight = '500';
}
function handleMouseLeaveTrinket(index) {
    const trinketText = numberedElements[index].querySelector('p');
    trinketText.style.fontWeight = '250';
}

// handles trinket clicks
function handleTrinketClick(container, index) {
    const trinketText = numberedElements[index].querySelector('p');
    trinketText.style.fontWeight = '250';

    fixedInfoBox.classList.add('show');
    // grabbing the trinkets description (hidden on webpage)
    const trinketDescription = container.querySelector('.trinket-description');    

    const trinketInfo = trinketDescription.innerHTML;

    // access the current content within the fixed tab
    const fixedInfoBoxContent = fixedInfoBox.querySelector("#box-content");
    // if it has not been saved already, then save to be able to reset when user closes out
    if (!originalFixedInfoContent) {
        originalFixedInfoContent = fixedInfoBoxContent.innerHTML;
    }
    fixedInfoBoxContent.innerHTML = trinketInfo; // sets tab content to description
    
    const backdrop = document.querySelector('.backdrop'); // blur behind tab
    backdrop.style.display = "block";
    
    // makes arrow visible and adds listener
    const arrow = document.querySelector('.arrow');
    arrow.style.display = "block";
    arrow.addEventListener('click', handleArrowClick);   

    // find image and add animations? 
    const trinketImg = document.querySelector("#box-content .description-img");     
    
    trinketImg.addEventListener('mouseover', bounce);
}

// handle back arrow click event - pop up
function handleArrowClick() {
    fixedInfoBox.classList.remove('show');
    const backdrop = document.querySelector('.backdrop'); // blur behind tab
    backdrop.style.display = "none";
    const arrow = document.querySelector('.arrow');
    
    arrow.style.display = "none";
    const fixedInfoBoxContent = fixedInfoBox.querySelector("#box-content");
    fixedInfoBoxContent.innerHTML = originalFixedInfoContent;
    numberedElements = document.querySelectorAll('.trink-text');
}

// event listeners for each trinket container
trinketContainers.forEach((container, index) => {
    container.addEventListener('mouseenter', () => handleMouseEnterTrinket(index));
    container.addEventListener('mouseleave', () => handleMouseLeaveTrinket(index));
    container.addEventListener('click', () => handleTrinketClick(container, index));
});

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }

// ANIMATION //////////////////////
function bounce(event) {
    const image = this;
    // center coordinates of the image
    var rect = image.getBoundingClientRect();
    var centerX = rect.left + rect.width / 2;
    var centerY = rect.top + rect.height / 2;

    var mouseX = event.clientX;
    var mouseY = event.clientY;

    // calc angle between mouse cursor and  center of image
    var angle = Math.atan2(mouseY - centerY, mouseX - centerX);
    var pushDistance = 200;

    // new position of the image
    var newX = centerX + pushDistance * Math.cos(angle);
    var newY = centerY + pushDistance * Math.sin(angle);

    newX = Math.max(rect.width / 2, Math.min(window.innerWidth - rect.width / 2, newX));
    newY = Math.max(0, Math.min(window.innerHeight - rect.height, newY));

    anime({
      targets: image,
      translateX: newX - centerX,
      translateY: newY - centerY,
      easing: 'easeOutQuad'
    });
  }