# Tupp Trigger Library with Alpine.js

Tupp Trigger, now integrated with Alpine.js, enhances the interactivity of web elements by seamlessly integrating HTML elements with Tupp.io API calls. This integration leverages the reactive and declarative nature of Alpine.js, simplifying the implementation and extending the functionality of the library.

## Pre-requisites

- An active account on [Tupp.io](https://tupp.io). You need this to create your chatflows with custom logic and obtain the UUID for the library.
- Alpine.js included in your project. Tupp Trigger now depends on Alpine.js for its reactive capabilities.

## Features

- **Reactive Event Handling**: Leverages Alpine.js for handling events on `input`, `select`, `textarea`, and `button` elements, including inputs of type `submit`.
- **Debounce Control**: Built-in debounce mechanism for optimized API calls.
- **Alpine.js Integration**: Utilizes Alpine.js's reactivity and simplicity for a more intuitive and powerful implementation.
- **Dynamic Element Manipulation**: Modify content and style of targeted elements in response to API calls.
- **Flexible and Declarative Configuration**: Easily configure API endpoints and behaviors directly in your HTML using Alpine.js syntax.

## Installation

### Via CDN

Include Alpine.js and the Tupp Trigger library in your HTML file:

```html
<script src="//unpkg.com/alpinejs" defer></script>
<script src="https://cdn.jsdelivr.net/gh/SpinettaInc/Tupp-Trigger-Library@main/Alpine/tupp-trigger-alpine.min.js" defer></script>
```

### Manual Download

1. Download `tupp-trigger.min.js` from the GitHub repository.
2. Include Alpine.js and Tupp Trigger script in your HTML file:

```html
<script src="path/to/alpinejs.js" defer></script>
<script src="path/to/tupp-trigger-alpine.min.js" defer></script>
```

## Usage

### HTML Setup

Configure the Tupp Trigger with Alpine.js directives in your HTML elements:

```html
<div 
    x-data="tuppTrigger('your-chatflow-uuid', '#sourceInput', '#targetDiv')" 
    x-init="init()"
>
    <input x-model="value" type="text" id="sourceInput"/>
    <button x-on:click="processEvent()">Submit</button>
    <div id="targetDiv">Original Text</div>
</div>
```

### JavaScript Initialization

No additional JavaScript initialization is required. Alpine.js handles the initialization and reactivity.

## Contributing

Contributions to the Tupp Trigger library are welcome. Your insights and improvements help us continually evolve.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
