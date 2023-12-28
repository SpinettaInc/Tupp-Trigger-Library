(function(global, document) {
    'use strict';

    const apiBaseURL = "https://tupp.io/api/v1/prediction/";

    /**
     * Handles events for elements with class 'tupp-trigger'.
     * @param {Event} event The event object.
     */
    function handleEvent(event) {
        const element = event.target;
        const value = element.value;
        const chatflowID = element.getAttribute('data-tupp-chatflow-id');
        const targetID = element.getAttribute('data-tupp-target-id');
        const targetClass = element.getAttribute('data-tupp-target-class');
        const targetAction = element.getAttribute('data-tupp-target-action');
        const targetStyle = element.getAttribute('data-tupp-target-style');

        if (chatflowID) {
            query({ question: value }, apiBaseURL + chatflowID)
                .then(response => {
                    applyResponseToTarget(response, targetID, targetClass, targetAction, targetStyle);
                })
                .catch(error => console.error('API call failed:', error));
        }
    }

    /**
     * Applies the response to the targeted HTML element.
     * @param {Object} response The response from the API.
     * @param {string} targetID The ID of the target element.
     * @param {string} targetClass The class of the target elements.
     * @param {string} targetAction The action to perform (append, prepend, replace).
     * @param {string} targetStyle The inline style to apply to the target element.
     */
    function applyResponseToTarget(response, targetID, targetClass, targetAction, targetStyle) {
        const targetElements = getTargetElements(targetID, targetClass);
        targetElements.forEach(element => {
            applyStyleToElement(element, targetStyle);
            updateElementContent(element, response, targetAction);
        });
    }

    /**
     * Retrieves the target elements based on ID or class.
     * @param {string} targetID The ID of the target element.
     * @param {string} targetClass The class of the target elements.
     * @returns {Array} Array of target elements.
     */
    function getTargetElements(targetID, targetClass) {
        if (targetID) {
            const element = document.getElementById(targetID);
            return element ? [element] : [];
        } else if (targetClass) {
            return Array.from(document.getElementsByClassName(targetClass));
        }
        return [];
    }

    /**
     * Applies inline style to an element.
     * @param {HTMLElement} element The element to style.
     * @param {string} style The inline style to apply.
     */
    function applyStyleToElement(element, style) {
        if (style && element) {
            element.style.cssText += style;
        }
    }

    /**
     * Updates the content of an element based on the action.
     * @param {HTMLElement} element The element to update.
     * @param {Object} response The response data.
     * @param {string} action The action to perform (append, prepend, replace).
     */
    function updateElementContent(element, response, action) {
        const content = typeof response === 'object' ? JSON.stringify(response) : response;
        switch (action) {
            case 'append':
                element.innerHTML += content;
                break;
            case 'prepend':
                element.innerHTML = content + element.innerHTML;
                break;
            case 'replace':
                element.innerHTML = content;
                break;
        }
    }

    /**
     * Makes an API call.
     * @param {Object} data The data to send in the API request.
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

            switch (response.status) {
                case 200: // OK
                    const responseData = await response.json();
                    return responseData.text ? responseData.text : responseData;
                case 400: // Bad Request
                    console.error('Error 400: Bad request');
                    break;
                case 401: // Unauthorized
                    console.error('Error 401: Unauthorized');
                    break;
                case 403: // Forbidden
                    console.error('Error 403: Forbidden');
                    break;
                case 404: // Not Found
                    console.error('Error 404: Not found');
                    break;
                case 500: // Internal Server Error
                    console.error('Error 500: Internal Server Error');
                    break;
                default:
                    console.error('Error:', response.status);
            }
        } catch (error) {
            console.error('API call failed:', error);
        }
    }

    // Expose the library to the global object
    global.TuppTrigger = {
        init: initializeLibrary
    };

    /**
     * Initializes the Tupp Trigger library.
     */
    function initializeLibrary() {
        const elements = document.querySelectorAll('.tupp-trigger');
        elements.forEach(element => {
            const eventType = element.tagName === 'INPUT' ? 'input' : 'change';
            element.addEventListener(eventType, handleEvent);
        });
    }

}(window, document));

// Usage: TuppTrigger.init();
