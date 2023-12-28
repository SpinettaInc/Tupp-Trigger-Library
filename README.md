# Tupp Trigger Library

Tupp Trigger is a lightweight JavaScript library for dynamically handling events on HTML form elements, such as `<input>` and `<select>`. It is designed to make API calls and manipulate other page elements based on the response. This library is especially useful for creating interactive and responsive web interfaces.

## Features

- Automatic event handling for input and select elements
- Easy API integration with custom endpoints
- Dynamic manipulation of page elements based on API responses
- Flexible and customizable through data attributes

## Installation

### Via CDN

Include the Tupp Trigger library in your HTML file using the jsDelivr CDN:

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

Add the class `tupp-trigger` to your form elements and use the following data attributes:

- `data-tupp-chatflow-id`: The UUID part of your API endpoint.
- `data-tupp-target-id`: (Optional) The ID of the target element to manipulate.
- `data-tupp-target-class`: (Optional) The class of target elements to manipulate.
- `data-tupp-target-action`: (Optional) Action to perform on the target element (`append`, `prepend`, `replace`).
- `data-tupp-target-style`: (Optional) Inline style to apply to the target element.

Example:

```html
<input type="text" class="tupp-trigger" data-tupp-chatflow-id="your-uuid" data-tupp-target-id="result" data-tupp-target-action="replace">
<div id="result"></div>
```

### JavaScript Initialization

Initialize the library when the document is ready:

```javascript
document.addEventListener('DOMContentLoaded', function() {
    TuppTrigger.init();
});
```

## API Reference

### `TuppTrigger.init()`

Initializes the library and attaches event listeners to elements with the `tupp-trigger` class.

## Contributing

Contributions to the Tupp Trigger library are welcome. Please submit pull requests to the GitHub repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
