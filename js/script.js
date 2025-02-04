document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".logo").classList.add("logo-animate");
});


document.getElementById("menu-toggle").addEventListener("click", function() {
    document.getElementById("mobile-menu").classList.toggle("active");
});


document.querySelectorAll("#mobile-menu a").forEach(item => {
    item.addEventListener("click", () => {
        document.getElementById("mobile-menu").classList.remove("active");
    });
});