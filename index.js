let themeButtons = document.querySelectorAll(".modal__button-theme");
let playerButtons = document.querySelectorAll(".modal__button-player");
let gridButtons = document.querySelectorAll(".modal__button-grid");


// changes background color styling for start game buttons
function handleClicks(buttonGroup) {
    for (var i = 0; i < buttonGroup.length; i++) {
        buttonGroup[i].addEventListener("click", function() {

        // sets background color for clicked button and adds 'selected' class 
        this.style.backgroundColor = 'var(--clr-blue-700)';
        this.classList.add('selected');

        // sets background color for clicked button's siblings and removes 'selected' class
        let siblings = getSiblings(this);
        for (let sibling of siblings) {
            sibling.style.backgroundColor = 'var(--clr-blue-400)';
            sibling.classList.remove('selected');
        }
        });
    }
}

function startGameSetup(buttons) {
    for (var i = 0; i < buttonGroup.length; i++) {
        buttonGroup[i].addEventListener("click", function() {

        // sets background color for clicked button and adds 'selected' class 
        this.style.backgroundColor = 'var(--clr-blue-700)';
        this.classList.add('selected');

        // sets background color for clicked button's siblings and removes 'selected' class
        let siblings = getSiblings(this);
        for (let sibling of siblings) {
            sibling.style.backgroundColor = 'var(--clr-blue-400)';
            sibling.classList.remove('selected');
        }
        });
    }
}
  
// gets siblings of given element
function getSiblings(element) {
let siblings = [];
let sibling = element.parentNode.firstChild;
while (sibling) {
    if (sibling.nodeType === 1 && sibling !== element) {
    siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
}
return siblings;
}
  
handleClicks(themeButtons);
handleClicks(playerButtons);
handleClicks(gridButtons);
  
  

