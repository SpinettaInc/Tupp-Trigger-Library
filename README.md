# Tupp Trigger Library

Tupp Trigger is a versatile JavaScript library designed to enhance the interactivity of web forms. It facilitates easy integration of HTML form elements with API calls and enables dynamic manipulation of other page elements based on API responses.

## Features

- **Broad Event Handling**: Supports `input`, `select`, `textarea`, and `button` elements, including inputs of type `submit`.
- **Debounce Control**: Debounce mechanism for `input` and `textarea` to optimize API calls.
- **Simplified API Integration**: Configurable API endpoint through data attributes.
- **Dynamic Element Manipulation**: Modify content and style of targeted elements in response to API calls.
- **Flexible Data Source**: Extracts data from specified source elements, or from the triggering element itself.
- **Customizable Debounce Delay**: Option to set a custom debounce delay on elements.

## Installation

### Via CDN

Include the Tupp Trigger library in your HTML file using jsDelivr:

```html
<script src="https://cdn.jsdelivr.net/gh/SpinettaInc/Tupp-Trigger-Library/tupp-trigger.min.js"></script>
```

### Manual Download

1. Download `tupp-trigger.min.js` from the GitHub repository.
2. Include the script in your HTML file:

```html
<script src="path/to/tupp-trigger.min.js"></script>
```

## Usage

### HTML Setup

Add the class `tupp-trigger` to your form elements. Configure the library using the following data attributes:

- `data-tupp-chatflow-id`: The UUID of your API endpoint.
- `data-tupp-source-id`: (Optional) The ID of the source element to extract data from.
- `data-tupp-source-class`: (Optional) The class of source elements to extract data from.
- `data-tupp-target-id`: (Optional) The ID of the target element for dynamic manipulation.
- `data-tupp-target-class`: (Optional) The class of target elements for dynamic manipulation.
- `data-tupp-target-action`: (Optional) Action to perform on the target element (`append`, `prepend`, `replace`).
- `data-tupp-target-style`: (Optional) Inline style to apply to the target element.
- `data-tupp-debounce-delay`: (Optional) Custom debounce delay in milliseconds for `input` and `textarea` elements.

Examples:

Standard input example:

```html
<input type="text" class="tupp-trigger" data-tupp-chatflow-id="your-uuid" data-tupp-target-id="result" data-tupp-target-action="replace">
<div id="result">Original Text</div>
```

Submit button example, using another element as a source:

```html
<input type="text" id="search_input">
<input type="submit" value="Search" class="tupp-trigger" data-tupp-chatflow-id="your-uuid" data-tupp-source-id="search_input" data-tupp-target-id="result" data-tupp-target-action="replace">
<div id="result">Original Text</div>
```

### JavaScript Initialization

Initialize the library when the document is ready:

```javascript
document.addEventListener('DOMContentLoaded', function() {
    TuppTrigger.init();
});
```

## Contributing

Contributions to the Tupp Trigger library are welcome.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.