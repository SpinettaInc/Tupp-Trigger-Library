document.addEventListener('alpine:init', () => {
    Alpine.data('tuppTrigger', (chatflowID, sourceSelector = null, targetSelector = null, targetAction = 'replace', debounceDelay = 500) => {
        return {
            // Reactive property for input values
            value: '',

            // Initialize the component
            init() {
                this.setupEventListeners();
            },

            // Setup event listeners based on the element type
            setupEventListeners() {
                // Watch for changes in the value and process the event with a debounce
                this.$watch('value', Alpine.debounce(() => {
                    this.processEvent();
                }, debounceDelay));
            },

            // Process the event, make an API call
            async processEvent() {
                const value = this.getValue(sourceSelector);
                const response = await this.queryAPI({ question: value }, chatflowID);
                if (response) {
                    this.applyResponse(targetSelector, response, targetAction);
                }
            },

            // Retrieve the value from the specified source element or the element itself
            getValue(selector) {
                return selector ? document.querySelector(selector).value : this.value;
            },

            // Perform the API call
            async queryAPI(data, chatflowURL) {
                try {
                    const response = await fetch(apiBaseURL + chatflowURL, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data)
                    });
                    return await this.handleResponse(response);
                } catch (error) {
                    console.error('API call failed:', error);
                }
            },

            // Handle the API response
            async handleResponse(response) {
                if (response.ok) {
                    const responseData = await response.json();
                    return responseData.text ? responseData.text : responseData;
                } else {
                    console.error(`Error ${response.status}: ${response.statusText}`);
                }
            },

            // Apply the API response to the target elements
            applyResponse(selector, response, action) {
                const targetElement = document.querySelector(selector);
                if (!targetElement) return;
                const content = typeof response === 'object' ? JSON.stringify(response) : response;
                switch (action) {
                    case 'append': targetElement.innerHTML += content; break;
                    case 'prepend': targetElement.innerHTML = content + targetElement.innerHTML; break;
                    case 'replace': targetElement.innerHTML = content; break;
                }
            }
        };
    });
});
