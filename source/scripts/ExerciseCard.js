// ExerciseCard.js

// Custom HTML Element Exercise Card
class ExerciseCard extends HTMLElement {
    constructor() {
        super();

        // create shadow dom
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `<link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />`;
        // mainContainer is the always visible section of exercise-card
        const mainContainer = document.createElement('div');
        mainContainer.setAttribute('class', 'mainContainer');
        // header is the always visible section of exercise-card
        const header = document.createElement('span');
        header.setAttribute('class', 'exerciseHeader');
        // header is the collapsible section of exercise-card
        const content = document.createElement('div');
        content.setAttribute('class', 'exerciseContent');
        // import ExerciseCardStyle.css to shadow dom
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'source/style/ExerciseCardStyle.css');

        // Attach Elements to Shadow Dom
        shadow.appendChild(mainContainer);
        mainContainer.appendChild(header);
        mainContainer.appendChild(content);
        shadow.appendChild(linkElem);
    }

    /**
     * @param {object} data: data holding the exercise information
     * @param header: header information
     * @param content: content information
     * This changes the formating on the page when a button is used.
     */
    activateEditFunction(data, header, content) {
        // header expand and collapse event listener, on click
        const expandButton = header.querySelector('.expand-arrow');
        expandButton.addEventListener('click', function () {
            if (content.style.display === 'flex') {
                content.style.display = 'none';
                expandButton.textContent = 'expand_more';
            } else {
                content.style.display = 'flex';
                expandButton.textContent = 'expand_less';
            }
        });

        // edit button event listener, change document ui on click
        const editButton = content.querySelector('.edit-button');
        editButton.addEventListener('click', function () {
            let toShow = content.getElementsByClassName('schedule-edit');
            let toShow2 = header.getElementsByClassName('schedule-edit');
            let toHide = content.getElementsByClassName('schedule-show');
            let toHide2 = header.getElementsByClassName('schedule-show');
            for (var i = 0; i < toShow.length; i++) {
                toShow[i].style.display = 'inline-block';
            }
            for (var i = 0; i < toShow2.length; i++) {
                toShow2[i].style.display = 'inline-block';
            }
            for (var i = 0; i < toHide.length; i++) {
                toHide[i].style.display = 'none';
            }
            for (var i = 0; i < toHide2.length; i++) {
                toHide2[i].style.display = 'none';
            }
        });

        // submit button event listener, save to local storage on click
        const submitButton = content.querySelector('.submit-button');
        submitButton.addEventListener('click', function () {
            //TODO
            //save to local storage

            // scraping information off the document on submittal
            data = {
                duration:
                    content.getElementsByClassName('duration-input')[0].value,
                calories:
                    content.getElementsByClassName('calories-input')[0].value,
                stat1: content.getElementsByClassName('stat1-input')[0].value,
                stat2: content.getElementsByClassName('stat2-input')[0].value,
                notes: content.getElementsByClassName('notes-input')[0].value,
                type: header.getElementsByClassName('type-input')[0].value,
                date: header.getElementsByClassName('date-input')[0].value,
            };

            content.getElementsByClassName('duration-show')[0].innerText =
                data.duration;
            content.getElementsByClassName('calories-show')[0].innerText =
                data.calories;
            content.getElementsByClassName('stat1-show')[0].innerText =
                data.stat1;
            content.getElementsByClassName('stat2-show')[0].innerText =
                data.stat2;
            content.getElementsByClassName('notes-show')[0].innerText =
                data.notes;
            header.getElementsByClassName('type-show')[0].innerText = data.type;
            header.getElementsByClassName('date-show')[0].innerText = data.date;

            let toShow = content.getElementsByClassName('schedule-show');
            let toShow2 = header.getElementsByClassName('schedule-show');
            let toHide = content.getElementsByClassName('schedule-edit');
            let toHide2 = header.getElementsByClassName('schedule-edit');
            for (var i = 0; i < toShow.length; i++) {
                toShow[i].style.display = 'inline-block';
            }
            for (var i = 0; i < toShow2.length; i++) {
                toShow2[i].style.display = 'inline-block';
            }
            for (var i = 0; i < toHide.length; i++) {
                toHide[i].style.display = 'none';
            }
            for (var i = 0; i < toHide2.length; i++) {
                toHide2[i].style.display = 'none';
            }
        });

        // cancel button event listener, reset to original values
        const cancelButton = content.querySelector('.cancel-button');
        cancelButton.addEventListener('click', function () {
            content.getElementsByClassName('duration-input')[0].value =
                data.duration;
            content.getElementsByClassName('calories-input')[0].value =
                data.calories;
            content.getElementsByClassName('stat1-input')[0].value = data.stat1;
            content.getElementsByClassName('stat2-input')[0].value = data.stat2;
            content.getElementsByClassName('notes-input')[0].value = data.notes;
            header.getElementsByClassName('type-input')[0].value = data.type;
            header.getElementsByClassName('date-input')[0].value = data.date;

            let toShow = content.getElementsByClassName('schedule-show');
            let toShow2 = header.getElementsByClassName('schedule-show');
            let toHide = content.getElementsByClassName('schedule-edit');
            let toHide2 = header.getElementsByClassName('schedule-edit');
            for (var i = 0; i < toShow.length; i++) {
                toShow[i].style.display = 'inline-block';
            }
            for (var i = 0; i < toShow2.length; i++) {
                toShow2[i].style.display = 'inline-block';
            }
            for (var i = 0; i < toHide.length; i++) {
                toHide[i].style.display = 'none';
            }
            for (var i = 0; i < toHide2.length; i++) {
                toHide2[i].style.display = 'none';
            }
        });
    }

    /**
     * @param {Object} data
     * Setter function for exercise-data element
     *
     *  data = {
     *   completed: "boolean",
     *   type: "string",
     *   date: "string",
     *   duration: "number",
     *   calories: "number",
     *   stat1: "number",
     *   stat2: "number",
     *   notes: "string",
     * };
     */
    set data(data) {
        // Returns if data is a falsy value
        if (!data) return;

        // set inner html for initial state (not edit) of the element
        let header = this.shadowRoot.querySelector('.exerciseHeader');
        let content = this.shadowRoot.querySelector('.exerciseContent');
        header.innerHTML =
            `
        <input type="checkbox" class="completedBox" ` +
            (JSON.parse(data.completed) ? 'checked' : '') +
            `>
        <span class="schedule-show exerciseName type-show">` +
            capitalizeFirstLetter(data.type) +
            `</span> 
        <select style="display: none" class="schedule-edit type-input" value="` +
            capitalizeFirstLetter(data.type) +
            `">
            <option value="running">running</option>
            <option value="running">cycling</option>
        </select>
        <span class="schedule-show exerciseDate date-show">` +
            data.date +
            `</span> <input style="display: none" class="schedule-edit date-input" type="date" value="` +
            data.date +
            `"/>
        <span class="material-icons expand-arrow">expand_more</span>
    `;

        content.innerHTML =
            `
        <div class="stats">
            <div>Duration: <span class="schedule-show duration-show">` +
            data.duration +
            `</span> <input style="display:none;" class="schedule-edit duration-input" type="number" value="` +
            data.duration +
            `"/></div>
            <div>Calories: <span class="schedule-show calories-show">` +
            data.calories +
            `</span> <input style="display:none;" class="schedule-edit calories-input" type="number" value="` +
            data.calories +
            `"/></div>
            <div>Stats1: <span class="schedule-show stat1-show">` +
            data.stat1 +
            `</span> <input style="display:none;" class="schedule-edit stat1-input" type="number" value="` +
            data.stat1 +
            `"/></div>
            <div>Stats2: <span class="schedule-show stat2-show">` +
            data.stat2 +
            `</span> <input style="display:none;" class="schedule-edit stat2-input" type="number" value="` +
            data.stat2 +
            `"/></div>
        </div>
        <div class="span">
            <p class="schedule-show notes-show">` +
            data.notes +
            `</p>
            <textarea class="schedule-edit notes-input" style="display:none">` +
            data.notes +
            ` </textarea>
            <div>
                <button class='schedule-show edit-button'>Edit</button>
                <button class='schedule-edit submit-button' style='display: none'>Submit</button>
                <button class='schedule-edit cancel-button' style='display: none'>Cancel</button>
            </div>
        </div>
    `;
        this.activateEditFunction(data, header, content);
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Define custom HTML keyword
customElements.define('exercise-card', ExerciseCard);
