export const panels = {
    defaults: [
        {
            id: "commands",
            buttons: [{}],
        },
        {
            id: "options",
            buttons: [
                {
                    active: true,
                    id: "sw-visibility",
                    className: "fa fa-square-o",
                    command: "sw-visibility",
                    context: "sw-visibility",
                    attributes: { title: "컴포넌트 보기" },
                },
                {
                    id: "preview",
                    className: "fa fa-eye",
                    command: "preview",
                    context: "preview",
                    attributes: { title: "Preview" },
                },
                {
                    id: "fullscreen",
                    className: "fa fa-arrows-alt",
                    command: "fullscreen",
                    context: "fullscreen",
                    attributes: { title: "Fullscreen" },
                },
                {
                    id: "export-template",
                    className: "fa fa-code",
                    command: "export-template",
                    attributes: { title: "View code" },
                },
                {
                    id: "pages",
                    className: "fa fa-pager",
                    command: "pages",
                }, //코드 수정 적용
                {
                    id: "export",
                    className: "fa fa-download",
                    command: "export",
                },
                {
                    id: "undo",
                    className: "fa fa-undo",
                    command: "undo",
                },
                {
                    id: "redo",
                    className: "fa fa-repeat",
                    command: "redo",
                },
                {
                    id: "domain",
                    className: "fa fa-browser",
                    command: "domain",
                },
            ],
        },
        {
            id: "views",
            buttons: [
                {
                    id: "open-sm",
                    className: "fa fa-paint-brush",
                    command: "open-sm",
                    active: true,
                    togglable: 0,
                    attributes: { title: "Open Style Manager" },
                },
                {
                    id: "open-tm",
                    className: "fa fa-cog",
                    command: "open-tm",
                    togglable: 0,
                    attributes: { title: "Settings" },
                },
                {
                    id: "open-layers",
                    className: "fa fa-bars",
                    command: "open-layers",
                    togglable: 0,
                    attributes: { title: "Open Layer Manager" },
                },
                {
                    id: "open-blocks",
                    className: "fa fa-th-large",
                    command: "open-blocks",
                    togglable: 0,
                    attributes: { title: "Open Blocks" },
                },
            ],
        },
    ],
};
