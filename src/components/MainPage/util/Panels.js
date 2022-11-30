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
                    attributes: { title: "결과 화면 미리보기" },
                },
                {
                    id: "fullscreen",
                    className: "fa fa-arrows-alt",
                    command: "fullscreen",
                    context: "fullscreen",
                    attributes: { title: "전체화면" },
                },
                {
                    id: "export-template",
                    className: "fa fa-code",
                    command: "export-template",
                    attributes: { title: "코드로 보기" },
                },
                {
                    id: "export",
                    className: "fa fa-download",
                    command: "export",
                    attributes: { title: "코드 다운하고 도메인 만들기" },
                },
                {
                    id: "undo",
                    className: "fa fa-undo",
                    command: "undo",
                    attributes: { title: "뒤로 되돌리기" },
                },
                {
                    id: "redo",
                    className: "fa fa-repeat",
                    command: "redo",
                    attributes: { title: "앞으로 되돌리기" },
                },
                {
                    id: "domain",
                    className: "fa fa-browser",
                    command: "domain",
                    active: true,
                    attributes: { title: "도메인 설정하기" },
                },
                {
                    id: "canvas-clear",
                    className: "fa fa-trash",
                    command: "canvas-clear",
                    attributes: { title: "코드 모두 삭제하기" },
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
                    attributes: { title: "스타일 관리자 열기" },
                },
                {
                    id: "open-tm",
                    className: "fa fa-cog",
                    command: "open-tm",
                    togglable: 0,
                    attributes: { title: "컴포넌트 관리자 열기" },
                },
                {
                    id: "open-layers",
                    className: "fa fa-bars",
                    command: "open-layers",
                    togglable: 0,
                    attributes: { title: "레이어 관리자 열기" },
                },
                {
                    id: "open-blocks",
                    className: "fa fa-th-large",
                    command: "open-blocks",
                    togglable: 0,
                    attributes: { title: "블록 열기" },
                },
            ],
        },
    ],
};
