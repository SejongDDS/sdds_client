const traitInputAttr = { placeholder: "eg. 텍스트 입력" };

export default {
    assetManager: {
        addButton: "이미지 추가",
        inputPlh: "http://path/to/the/image.jpg",
        modalTitle: "이미지 선택",
        uploadTitle: "원하는 파일을 여기에 놓거나 업로드를 위해 클릭",
    },

    blockManager: {
        labels: {
            // 'block-id': 'Block Label',
        },
        categories: {
            // 'category-id': 'Category Label',
        },
    },
    domComponents: {
        names: {
            "": "상자",
            wrapper: "Body",
            text: "텍스트",
            comment: "코멘트",
            image: "이미지",
            video: "동영상",
            label: "라벨",
            link: "링크",
            map: "지도",
            tfoot: "Table foot",
            tbody: "Table body",
            thead: "Table head",
            table: "테이블",
            row: "테이블 행",
            cell: "테이블 열",
        },
    },
    deviceManager: {
        device: "Device",
        devices: {
            desktop: "데스크탑",
            tablet: "태블릿",
            mobileLandscape: "모바일 환경",
            mobilePortrait: "모바일 요약 화면",
        },
    },
    panels: {
        buttons: {
            titles: {
                preview: "미리보기",
                fullscreen: "전체화면",
                "sw-visibility": "컴포넌트 보기",
                "export-template": "코드 보기",
                "open-sm": "스타일 관리자 열기",
                "open-tm": "설정",
                "open-layers": "레이어 관리자 열기",
                "open-blocks": "블록 정보 열기",
            },
        },
    },
    selectorManager: {
        label: "요소 분류",
        selected: "선택된 요소",
        emptyState: "- 상태 -",
        states: {
            hover: "마우스를 올렸을 때",
            active: "클릭 시",
            "nth-of-type(2n)": "짝수/홀수",
        },
    },
    styleManager: {
        empty: "스타일 관리자를 사용하려면, 먼저 바꿀 요소를 선택해주세요",
        layer: "레이어",
        fileButton: "Images",
        sectors: {
            general: "기본설정",
            dimension: "크기 및 위치",
            layout: "레이아웃",
            typography: "글꼴",
            decorations: "꾸미기",
            extra: "부가적인 변경",
            flex: "배치 방식",
        },

        properties: {
            // float: 'Float',
        },
    },
    traitManager: {
        empty: "컴포넌트 관리자를 사용하려면, 먼저 바꿀 요소를 선택해주세요",
        label: "컴포넌트 설정",
        traits: {
            labels: {
                // id: 'Id',
                // alt: 'Alt',
                // title: 'Title',
                // href: 'Href',
            },

            attributes: {
                id: traitInputAttr,
                alt: traitInputAttr,
                title: traitInputAttr,
                href: { placeholder: "eg. https://google.com" },
            },

            options: {
                target: {
                    false: "현재 창",
                    _blank: "새 창",
                },
            },
        },
    },
};
