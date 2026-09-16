$(document).ready(function() {
    const $balloon = $("#bllon");
    const colors = ['red', 'green', 'blue'];
    let colorIn = 0;
    let size = 200;

    function updateBalloon() {
        $balloon.css({
            'width': size + 'px',
            'height': size + 'px',
            'background-color':colors[colorIn]
        });
    }

    $balloon.click(function() {
        size += 10;
        if (size > 420) {
            size = 200;
            colorIn = 0;
        } else {
            colorIn = (colorIn + 1) % colors.length;
        }
        updateBalloon();
    });

    $balloon.mouseleave(function() {
        if (size > 200) {
            size -= 5;
            if (size < 200) {
                size = 200;
            }
            colorIn = (colorIn - 2 + colors.length) % colors.length;
        }
        updateBalloon();
    });
});