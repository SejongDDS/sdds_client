export const storageManager = {
    type: "local", // Storage type. Available: local | remote
    autosave: true, // Store data automatically
    autoload: true, // Autoload stored data on init
    stepsBeforeSave: 1, // If autosave is enabled, indicates how many changes are necessary before the store method is triggered
    // ...
    // Default storage options
    options: {
        local: {
            /* ... */
        },
        remote: {
            /* ... */
        },
    },
};
