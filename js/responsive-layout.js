/**
 * Responsive Layout v1.0.0
 * This is the JS file for the 'Responsive Layout' project.
 *
 * @author      Christopher Viray
 * @copyright   (c) 2018 Christopher Viray
 * @license     MIT
 * @version     1.0.0
 */

// function to make API call to add item into bag
const addItem = (event) => {
    const button = event.currentTarget;
    const cid = button.dataset.cid;

    // update UI
    updateButton(button, true);
    hideTooltip();

    // setup options to pass into API call
    const passCORS = "https://cors-anywhere.herokuapp.com/"; // I use this URL to pass the issues with CORS
    const url = passCORS + "https://www.beautylish.com/rest/interview-variant"; // API url
    const data = { 'cid': cid };
    const opts = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    };

    // make API call
    fetch(url, opts)
        .then((response) => response.json())
        .then((data) => {
            updateButton(button, false); // reset button
            if (data) {
                showTooltip(button, data); // display tooltip
            }
        })
        .catch((error) => {
            updateButton(button, false); // reset button
            console.log(error);
        });
};

// function to show and display the tooltip
const showTooltip = (button, data) => {
    const positions = button.getBoundingClientRect();
    const top = positions.top + window.scrollY + 5;
    const left = positions.left + window.scrollX + 155;
    const tooltip = document.getElementsByClassName('tooltip')[0];

    // update CSS positions
    tooltip.classList.remove('hidden');
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;

    // update tooltip info
    const { cid, name } = data;
    tooltip.querySelector('.tooltip-product-variant').textContent = name;
    tooltip.querySelector('.view-bag').dataset.cid = cid;
};

// function to hide the tooltip
const hideTooltip = () => {
    const elem = document.getElementsByClassName('tooltip')[0];
    if (!elem.classList.contains('hidden')) {
        elem.classList.add('hidden');
    }
};

// function to update the text on the button element
const updateButton = (button, toggle) => {
    if (button) { // defensive check
        const text = (toggle) ? "Adding...." : 'Add to Bag';
        button.textContent = text;

        // update active class
        if (toggle) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    }
};

// function to initialize setup
const init = () => {
    let buttons = document.getElementsByClassName('add-bag');

    // add button events
    for (let button of buttons) {
        button.addEventListener('click', addItem, false);
    }

    // add window event to hide the tooltip when the window/browser resizes
    window.addEventListener('resize', hideTooltip);

    // test for touch events support (mobile) and if supported, add 'touch' class to the HTML tag.
    if ("ontouchstart" in document.documentElement) {
        document.documentElement.classList.add('touch');
    }
};

// initialize setup
init();
