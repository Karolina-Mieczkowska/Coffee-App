const productsSection = document.querySelector('.products');
const manageSection = document.querySelector('.manage');
const coffeeSelector = document.querySelectorAll('.coffee');

manageSection.style.display = 'block';
document.querySelector('body').style.overflow = 'hidden';

// const gogo = 50;

// const html = `
//     <h1>Paaay! ${gogo}</h1>
// `

// manageSection.innerHTML = html;

coffeeSelector.forEach(function(selecor) {
    selecor.addEventListener('click', function() {
        console.log('works')
    })
})