
const contactFrom = document.getElementById('contactForm');

contactFrom.addEventListener('submit', (e)=>{
   
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if(name && email && message){
        alert(`Hey ${name} your message recived.`);
    }
});

// Smooth scrolling

document.querySelectorAll('a[href^="#"').forEach(an =>{
   
    an.addEventListener('click', function(e){
        e.preventDefault();
        const targetId =  this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);

        if(targetElement){
            window.scrollTo({
             top: targetElement.offsetTop - 70,
             behavior: 'smooth'
            });
        }
    });
}); 

