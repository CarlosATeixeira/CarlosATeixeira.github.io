let images = [];
let div = document.createElement('div');
let img_element = document.createElement('img');
div.className = 'portfolio_img_focus_frame';
div.appendChild(img_element);
document.body.appendChild(div);

export default function Enable_Img_Focus() {
    images = document.querySelectorAll(".portfolio_img");

    images.forEach(img => {
        img.addEventListener("click", (event) => {
            event.stopPropagation();  // Prevent click from propagating to the document
            div.style.visibility = 'visible';
            let src = img.src;
            let lastDotIndex = src.lastIndexOf('.');
            let base = src.substring(0, lastDotIndex);
            let extension = src.substring(lastDotIndex);
            img_element.src = ``; // Prevent last image to wrongly showing in screen before current img is loaded
            img_element.src = `${base}_hq${extension}`;
            console.log(img.src);
            document.body.style.overflow = 'hidden';
        });
    });
}

document.addEventListener('click', function(event) {
    if (div.style.visibility === 'visible' && !img_element.contains(event.target)) {
        console.log('Clicked outside!');
        div.style.visibility = 'hidden';
        document.body.style.overflow = ''; // Reset body overflow
    }
});

document.querySelector('.portfolio_page > .portfolio_img_focus_frame > img').addEventListener('load', function() {
    var aspectRatio = this.naturalWidth / this.naturalHeight;
    var parentWidth = this.parentNode.clientWidth;
    var parentHeight = this.parentNode.clientHeight;
    var parentAspectRatio = parentWidth / parentHeight;

    if (aspectRatio > parentAspectRatio) {
        // Image is wider than parent
        this.style.width = '80%';
        this.style.height = 'auto';
    } else {
        // Image is taller than parent
        this.style.width = 'auto';
        this.style.maxHeight = '80%';
    }
});