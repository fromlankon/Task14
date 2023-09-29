let tabs = document.querySelectorAll('.tabs div');
let contents = document.querySelectorAll('.content .movie');

for (let tab of tabs) {
    tab.addEventListener("click", function () {
        let activeTab = document.querySelector(".active")
        activeTab.classList.remove("active")
        this.classList.add("active")

        let index = this.getAttribute("data-index")
        for (let content of contents) {
            if (index == content.getAttribute("data-index")) {
                content.classList.add("show")
            } else {
                content.classList.remove("show")
            }
        }
    })
}