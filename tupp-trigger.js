(function(global, document) {
    'use strict';

    // Base URL for API calls
    const apiBaseURL = "https://tupp.io/api/v1/prediction/";
    // Object to store debounce timeouts for each element
    let debounceTimeouts = {};

    /**
     * Event handler for all 'tupp-trigger' elements.
     * Debounces input events, handles immediate processing for buttons and submit inputs.
     * @param {Event} event The DOM event object.
     */
    function handleEvent(event) {
        const element = event.target;
        // Determine if the event should be processed immediately
        const isImmediate = element.tagName === 'BUTTON' || (element.tagName === 'INPUT' && element.type === 'submit');
        // Get debounce delay, default to 500ms if not set
        const debounceDelay = isImmediate ? 0 : element.getAttribute('data-tupp-debounce-delay') || 500;

        // Clear existing timeout and set a new one
        clearTimeout(debounceTimeouts[element.name]);
        debounceTimeouts[element.name] = setTimeout(() => processEvent(element), debounceDelay);
    }

    /**
     * Processes the event, makes an API call.
     * @param {HTMLElement} element The element that triggered the event.
     */
    function processEvent(element) {
        const chatflowID = element.getAttribute('data-tupp-chatflow-id');
        if (!chatflowID) return;

        const value = getValue(element);
        query({ question: value }, apiBaseURL + chatflowID)
            .then(response => applyResponse(element, response))
            .catch(error => console.error('API call failed:', error));
    }

    /**
     * Retrieves the value from the specified source element or the element itself.
     * @param {HTMLElement} element The element to extract the value from.
     * @returns {string|null} The retrieved value.
     */
    function getValue(element) {
        const sourceID = element.getAttribute('data-tupp-source-id');
        const sourceClass = element.getAttribute('data-tupp-source-class');
        const sourceElement = sourceID ? document.getElementById(sourceID) :
                             sourceClass ? document.querySelector('.' + sourceClass) : element;
        return sourceElement ? sourceElement.value : null;
    }

    /**
     * Applies the response from the API to the specified target elements.
     * @param {HTMLElement} element The element that initiated the API call.
     * @param {Object} response The response from the API.
     */
    function applyResponse(element, response) {
        const targetDetails = {
            id: element.getAttribute('data-tupp-target-id'),
            class: element.getAttribute('data-tupp-target-class'),
            action: element.getAttribute('data-tupp-target-action'),
            style: element.getAttribute('data-tupp-target-style')
        };

        getTargets(targetDetails.id, targetDetails.class).forEach(target => {
            applyStyle(target, targetDetails.style);
            updateContent(target, response, targetDetails.action);
        });
    }

    /**
     * Retrieves target elements based on provided ID or class name.
     * @param {string} id The ID of the target element.
     * @param {string} className The class name of the target elements.
     * @returns {HTMLElement[]} An array of target elements.
     */
    function getTargets(id, className) {
        return id ? [document.getElementById(id)] :
               className ? Array.from(document.getElementsByClassName(className)) : [];
    }

    /**
     * Applies specified inline style to an element.
     * @param {HTMLElement} element The element to apply styles to.
     * @param {string} style The CSS style string to apply.
     */
    function applyStyle(element, style) {
        if (style && element) element.style.cssText += style;
    }

    /**
     * Updates the content of an element based on a specified action.
     * @param {HTMLElement} element The element to update.
     * @param {Object|string} response The response data to use for updating.
     * @param {string} action The action type (append, prepend, replace).
     */
    function updateContent(element, response, action) {
        const content = typeof response === 'object' ? JSON.stringify(response) : response;
        switch (action) {
            case 'append': element.innerHTML += content; break;
            case 'prepend': element.innerHTML = content + element.innerHTML; break;
            case 'replace': element.innerHTML = content; break;
        }
    }

    /**
     * Performs an API call.
     * @param {Object} data The payload for the API request.
     * @param {string} chatflowURL The URL for the API endpoint.
     * @returns {Promise<Object>} A promise with the API response.
     */
    async function query(data, chatflowURL) {
        try {
            const response = await fetch(chatflowURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            return await handleResponse(response);
        } catch (error) {
            console.error('API call failed:', error);
        }
    }

    /**
     * Handles the API response, checking the HTTP status code.
     * @param {Response} response The response object from the fetch call.
     * @returns {Promise<Object>} A promise with the processed response object.
     */
    async function handleResponse(response) {
        if (response.ok) {
            const responseData = await response.json();
            return responseData.text ? responseData.text : responseData;
        } else {
            console.error(`Error ${response.status}: ${response.statusText}`);
        }
    }

    /**
     * Initializes the Tupp Trigger library by attaching event listeners to all '.tupp-trigger' elements.
     */
    function initialize() {
        document.querySelectorAll('.tupp-trigger').forEach(element => {
            element.addEventListener(getEventType(element), handleEvent);
        });
    }

    /**
     * Determines the appropriate event type for a given element.
     * @param {HTMLElement} element The element to determine the event type for.
     * @returns {string} The event type (click, change, or input).
     */
    function getEventType(element) {
        return element.tagName === 'SELECT' ? 'change' :
               element.tagName === 'BUTTON' || (element.tagName === 'INPUT' && element.type === 'submit') ? 'click' : 'input';
    }

    // Expose the library to the global object
    global.TuppTrigger = { init: initialize };

}(window, document));

// Usage: TuppTrigger.init();
