(function(global, document) {
    'use strict';

    const apiBaseURL = "https://tupp.io/api/v1/prediction/";

    /**
     * Main event handler for elements with 'tupp-trigger' class.
     * @param {Event} event The DOM event triggered.
     */
    function handleEvent(event) {
        const element = event.target;
        const chatflowID = element.getAttribute('data-tupp-chatflow-id');
        const sourceID = element.getAttribute('data-tupp-source-id');
        const sourceClass = element.getAttribute('data-tupp-source-class');
        const targetID = element.getAttribute('data-tupp-target-id');
        const targetClass = element.getAttribute('data-tupp-target-class');
        const targetAction = element.getAttribute('data-tupp-target-action');
        const targetStyle = element.getAttribute('data-tupp-target-style');

        let value = sourceID || sourceClass ? getValueFromSource(sourceID, sourceClass) : element.value;

        if (chatflowID && value !== null) {
            query({ question: value }, apiBaseURL + chatflowID)
                .then(response => {
                    applyResponseToTarget(response, targetID, targetClass, targetAction, targetStyle);
                })
                .catch(error => console.error('API call failed:', error));
        }
    }

    /**
     * Retrieves the value from the source element defined by ID or class.
     * @param {string} sourceID The ID of the source element.
     * @param {string} sourceClass The class of the source elements.
     * @returns {string|null} The value from the source element or null if not found.
     */
    function getValueFromSource(sourceID, sourceClass) {
        const sourceElement = sourceID ? document.getElementById(sourceID) :
                             sourceClass ? document.querySelector('.' + sourceClass) : null;
        return sourceElement ? sourceElement.value : null;
    }

    /**
     * Applies the API response to the targeted HTML elements.
     * @param {Object} response The response object from the API.
     * @param {Object} targetDetails Object containing details of the target element.
     */
    function applyResponse(response, targetDetails) {
        const targets = getTargets(targetDetails.id, targetDetails.class);
        targets.forEach(target => {
            applyStyle(target, targetDetails.style);
            updateContent(target, response, targetDetails.action);
        });
    }

    /**
     * Retrieves the target elements based on ID or class.
     * @param {string} targetID The ID of the target element.
     * @param {string} targetClass The class of the target elements.
     * @returns {Array} Array of target elements.
     */
    function getTargets(targetID, targetClass) {
        return targetID ? [document.getElementById(targetID)] :
               targetClass ? Array.from(document.getElementsByClassName(targetClass)) : [];
    }

    /**
     * Applies inline style to an element.
     * @param {HTMLElement} element The element to style.
     * @param {string} style The inline style to apply.
     */
    function applyStyle(element, style) {
        if (style && element) {
            element.style.cssText += style;
        }
    }

    /**
     * Updates the content of an element based on the specified action.
     * @param {HTMLElement} element The element to update.
     * @param {Object} response The response data.
     * @param {string} action The action to perform (append, prepend, replace).
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
     * Performs the API call.
     * @param {Object} data The data to be sent in the API request.
     * @param {string} chatflowURL The full URL to the chatflow API endpoint.
     * @returns {Promise<Object>} The API response.
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
     * Handles the API response based on the HTTP status code.
     * @param {Response} response The response object from the API call.
     * @returns {Promise<Object>} The processed response object.
     */
    async function handleResponse(response) {
        switch (response.status) {
            case 200:
                const responseData = await response.json();
                return responseData.text ? responseData.text : responseData;
            case 400: case 401: case 403: case 404: case 500:
                console.error(`Error ${response.status}: ${response.statusText}`);
                break;
            default:
                console.error('Error:', response.status);
        }
    }

    /**
     * Initializes the Tupp Trigger library.
     * Adds event listeners to elements with the 'tupp-trigger' class based on their tag name.
     */
    function initialize() {
        document.querySelectorAll('.tupp-trigger').forEach(element => {
            let eventType;
            switch (element.tagName) {
                case 'INPUT':
                case 'TEXTAREA':
                    eventType = 'input';
                    break;
                case 'SELECT':
                    eventType = 'change';
                    break;
                default:
                    return; // Skip other elements
            }
            element.addEventListener(eventType, handleEvent);
        });
    }

    // Expose the library to the global object
    global.TuppTrigger = { init: initialize };

}(window, document));

// Usage: TuppTrigger.init();
