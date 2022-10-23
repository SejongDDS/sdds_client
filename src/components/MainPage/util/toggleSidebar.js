export const toggleSidebar = (fromEditor) => {
    const sidebar = document.getElementById("navbar");
    const mainContent = document.getElementById("main-content");
    if (fromEditor) {
        sidebar.classList.remove("d-flex");
        sidebar.classList.add("d-none");
        mainContent.classList.remove("w-85", "start-15");
    } else if (sidebar.classList.contains("d-flex")) {
        sidebar.classList.remove("d-flex");
        sidebar.classList.add("d-none");
        mainContent.classList.remove("w-85", "start-15");
    } else {
        sidebar.classList.remove("d-none");
        sidebar.classList.add("d-flex");
        mainContent.classList.add("w-85", "start-15");
    }
};
