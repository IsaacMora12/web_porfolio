const draggableWindow = document.getElementById('draggable');
const maximizeBtn = document.getElementById('maximizeBtn');
const content = draggableWindow.querySelector('.window-content');

function toggleSize() {
    if (isFullSize) {
        draggableWindow.style.width = '50%';
        draggableWindow.style.height = '50%';
        draggableWindow.style.top = '25%';
        draggableWindow.style.left = '25%';
    } else {
        draggableWindow.style.width = '100%';
        draggableWindow.style.height = '100%';
        draggableWindow.style.top = '0';
        draggableWindow.style.left = '0';
    }
    isFullSize = !isFullSize;
}

maximizeBtn.addEventListener('click', toggleSize);