export const styleManager = {
    sectors: [
        {
            name: "General",
            properties: [
                {
                    extend: "float",
                    type: "radio",
                    default: "none",
                    options: [
                        { value: "none", className: "fa fa-times" },
                        { value: "left", className: "fa fa-align-left" },
                        { value: "right", className: "fa fa-align-right" },
                    ],
                },
                "display",
                { extend: "position", type: "select" },
                "top",
                "right",
                "left",
                "bottom",
            ],
        },
        {
            name: "Dimension",
            open: false,
            properties: [
                "width",
                {
                    id: "flex-width",
                    type: "integer",
                    name: "Width",
                    units: ["px", "%"],
                    property: "flex-basis",
                    toRequire: 1,
                },
                "height",
                "max-width",
                "min-height",
                "margin",
                "padding",
            ],
        },
        {
            name: "Typography",
            open: false,
            properties: [
                "font-family",
                "font-size",
                "font-weight",
                "letter-spacing",
                "color",
                "line-height",
                {
                    extend: "text-align",
                    options: [
                        {
                            id: "left",
                            label: "Left",
                            className: "fa fa-align-left",
                        },
                        {
                            id: "center",
                            label: "Center",
                            className: "fa fa-align-center",
                        },
                        {
                            id: "right",
                            label: "Right",
                            className: "fa fa-align-right",
                        },
                        {
                            id: "justify",
                            label: "Justify",
                            className: "fa fa-align-justify",
                        },
                    ],
                },
                {
                    property: "text-decoration",
                    type: "radio",
                    default: "none",
                    options: [
                        { id: "none", label: "None", className: "fa fa-times" },
                        {
                            id: "underline",
                            label: "underline",
                            className: "fa fa-underline",
                        },
                        {
                            id: "line-through",
                            label: "Line-through",
                            className: "fa fa-strikethrough",
                        },
                    ],
                },
                "text-shadow",
            ],
        },
        {
            name: "Decorations",
            open: false,
            properties: [
                "opacity",
                "border-radius",
                "border",
                "box-shadow",
                "background", // { id: 'background-bg', property: 'background', type: 'bg' }
            ],
        },
        {
            name: "Extra",
            open: false,
            buildProps: ["transition", "perspective", "transform"],
        },
        {
            name: "Flex",
            open: false,
            properties: [
                {
                    name: "Flex Container",
                    property: "display",
                    type: "select",
                    defaults: "block",
                    list: [
                        { value: "block", name: "Disable" },
                        { value: "flex", name: "Enable" },
                    ],
                },
                {
                    name: "Flex Parent",
                    property: "label-parent-flex",
                    type: "integer",
                },
                {
                    name: "Direction",
                    property: "flex-direction",
                    type: "radio",
                    defaults: "row",
                    list: [
                        {
                            value: "row",
                            name: "Row",
                            className: "icons-flex icon-dir-row",
                            title: "Row",
                        },
                        {
                            value: "row-reverse",
                            name: "Row reverse",
                            className: "icons-flex icon-dir-row-rev",
                            title: "Row reverse",
                        },
                        {
                            value: "column",
                            name: "Column",
                            title: "Column",
                            className: "icons-flex icon-dir-col",
                        },
                        {
                            value: "column-reverse",
                            name: "Column reverse",
                            title: "Column reverse",
                            className: "icons-flex icon-dir-col-rev",
                        },
                    ],
                },
                {
                    name: "Justify",
                    property: "justify-content",
                    type: "radio",
                    defaults: "flex-start",
                    list: [
                        {
                            value: "flex-start",
                            className: "icons-flex icon-just-start",
                            title: "Start",
                        },
                        {
                            value: "flex-end",
                            title: "End",
                            className: "icons-flex icon-just-end",
                        },
                        {
                            value: "space-between",
                            title: "Space between",
                            className: "icons-flex icon-just-sp-bet",
                        },
                        {
                            value: "space-around",
                            title: "Space around",
                            className: "icons-flex icon-just-sp-ar",
                        },
                        {
                            value: "center",
                            title: "Center",
                            className: "icons-flex icon-just-sp-cent",
                        },
                    ],
                },
                {
                    name: "Align",
                    property: "align-items",
                    type: "radio",
                    defaults: "center",
                    list: [
                        {
                            value: "flex-start",
                            title: "Start",
                            className: "icons-flex icon-al-start",
                        },
                        {
                            value: "flex-end",
                            title: "End",
                            className: "icons-flex icon-al-end",
                        },
                        {
                            value: "stretch",
                            title: "Stretch",
                            className: "icons-flex icon-al-str",
                        },
                        {
                            value: "center",
                            title: "Center",
                            className: "icons-flex icon-al-center",
                        },
                    ],
                },
                {
                    name: "Flex Children",
                    property: "label-parent-flex",
                    type: "integer",
                },
                {
                    name: "Order",
                    property: "order",
                    type: "integer",
                    defaults: 0,
                    min: 0,
                },
                {
                    name: "Flex",
                    property: "flex",
                    type: "composite",
                    properties: [
                        {
                            name: "Grow",
                            property: "flex-grow",
                            type: "integer",
                            defaults: 0,
                            min: 0,
                        },
                        {
                            name: "Shrink",
                            property: "flex-shrink",
                            type: "integer",
                            defaults: 0,
                            min: 0,
                        },
                        {
                            name: "Basis",
                            property: "flex-basis",
                            type: "integer",
                            units: ["px", "%", ""],
                            unit: "",
                            defaults: "auto",
                        },
                    ],
                },
                {
                    name: "Align",
                    property: "align-self",
                    type: "radio",
                    defaults: "auto",
                    list: [
                        {
                            value: "auto",
                            name: "Auto",
                        },
                        {
                            value: "flex-start",
                            title: "Start",
                            className: "icons-flex icon-al-start",
                        },
                        {
                            value: "flex-end",
                            title: "End",
                            className: "icons-flex icon-al-end",
                        },
                        {
                            value: "stretch",
                            title: "Stretch",
                            className: "icons-flex icon-al-str",
                        },
                        {
                            value: "center",
                            title: "Center",
                            className: "icons-flex icon-al-center",
                        },
                    ],
                },
            ],
        },
    ],
};

export const layerManager = {
    appendTo: "#layers-container",
};

export const traitManager = {
    appendTo: "#trait-container",
};

export const selectorManager = {
    appendTo: "#styles-container",
};

export const deviceManager = {
    devices: [
        {
            name: "Desktop",
            width: "",
        },
        {
            name: "Mobile",
            width: "320px",
            widthMedia: "480px",
        },
    ],
};

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
/*
예시 코드.. 엔드 포인트에 임시저장 -- 서버에 가능?
const projectID = 1;
const projectEndpoint = `http://localhost:3000/projects/${projectID}`;

storageManager: {
    type: 'remote',
    stepsBeforeSave: 3,
    options: {
      remote: {
        urlLoad: projectEndpoint,
        urlStore: projectEndpoint,
        // The `remote` storage uses the POST method when stores data but
        // the json-server API requires PATCH.
        fetchOptions: opts => (opts.method === 'POST' ?  { method: 'PATCH' } : {}),
        // As the API stores projects in this format `{id: 1, data: projectData }`,
        // we have to properly update the body before the store and extract the
        // project data from the response result.
        onStore: data => ({ id: projectID, data }),
        onLoad: result => result.data,
      }
    }
  }
*/
