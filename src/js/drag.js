const draggableWindow = document.getElementById('draggable');
const header = draggableWindow.querySelector('.window-header');
const minimizeBtn = document.getElementById('minimizeBtn');
const maximizeBtn = document.getElementById('maximizeBtn');
const closeBtn = document.getElementById('closeBtn');
const content = draggableWindow.querySelector('.window-content');
let isMinimized = false;
let originalHeight;

// Make the DIV element draggable:
dragElement(draggableWindow);

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// minimizeBtn.addEventListener('click', () => {
//     if (!isMinimized) {
//         originalHeight = draggableWindow.style.height;
//         draggableWindow.style.height = header.offsetHeight + 'px';
//         content.style.display = 'none';
//         isMinimized = true;
//     } else {
//         draggableWindow.style.height = originalHeight;
//         content.style.display = 'block';
//         isMinimized = false;
//     }
// });

// maximizeBtn.addEventListener('click', () => {
//     if (draggableWindow.style.width !== '100vw') {
//         draggableWindow.style.width = '100vw';
//         draggableWindow.style.height = '100vh';
//         draggableWindow.style.top = '0';
//         draggableWindow.style.left = '0';
//     } else {
//         draggableWindow.style.width = '';
//         draggableWindow.style.height = '';
//         draggableWindow.style.top = '';
//         draggableWindow.style.left = '';
//     }
// });

// closeBtn.addEventListener('click', () => {
//     draggableWindow.style.display = 'none';
// });

