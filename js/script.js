document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  
  if(contactForm){
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      try {
        const res = await fetch("/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message })
        });
        const data = await res.json();
        alert(data.message);
        contactForm.reset();
      } catch (err) {
        alert("Erro ao enviar mensagem!");
        console.error(err);
      }
    });
  }
});
