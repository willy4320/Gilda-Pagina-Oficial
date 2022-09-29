var cards = document.getElementById('cards')
const templateCard = document.getElementById('template-card').content
var fragment = document.createDocumentFragment()
const data = "C:\Users\welli\Documents\VSCode\Gilda Pagina Oficial\BackEnd\src\public\baseDatosRopa.json"
//llamar localStorage
document.addEventListener('DOMContentLoaded', e => { 
    fetchData() 
});

// Traer productos
const fetchData = async () => {
    const res = await fetch(data);
    const data = await res.json()
    console.log('fullProducto:', data)
    pintarCards(data)
}

// Pintar productos
const pintarCards = data => {
    data.forEach(item => {

        
        if(item.stock == 0){
            
        
            templateCard.querySelector('p').textContent = "ID producto: "+item.id
            templateCard.querySelector('img').setAttribute("src", item.imagen)
            templateCard.querySelector('span').textContent = "Talla "+item.talla
            templateCard.querySelector('h5').textContent = item.titulo
            templateCard.querySelector('h4').textContent = item.precio
            templateCard.querySelector('h3').textContent = item.stock
    
            
            const clone = templateCard.cloneNode(true)
            fragment.appendChild(clone)
        }
        
    })
    cards.appendChild(fragment)  
}