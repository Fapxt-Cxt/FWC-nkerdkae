const balloon=document.getElementById("bllon");
const colors = ['red', 'green', 'blue'];
let colorIn = 0;
let size = 200;

balloon.addEventListener('click', () => {
    size += 10;
    if (size > 420) {
        size = 200;
        colorIn = 0;
    } else {
        colorIn = (colorIn + 1) % colors.length;
    }

    updateBalloon();
});

balloon.addEventListener('mouseleave', () => {
    if (size > 200) {
        size -= 5;
        if (size < 200) {
            size = 200;
        }
        colorIn = (colorIn - 1 + colors.length) % colors.length;
    }

    updateBalloon();
});

function updateBalloon() {
    balloon.style.width = size + 'px';
    balloon.style.height = size + 'px';
    balloon.style.backgroundColor = colors[colorIn];
}