// Menú proporcionado por el usuario, con categoría y precio
const menuItems = [
  // Antipasti
  {id:1,category:'Antipasti',name:'Bruschetta al Pomodoro',desc:'Pan tostado con tomate fresco, ajo, albahaca y aceite de oliva virgen extra.',price:4.50,img:'https://copilot.microsoft.com/th/id/BCO.313c6832-cfe2-448f-b901-4c07c0c60525.png'},
  {id:2,category:'Antipasti',name:'Carpaccio di Manzo',desc:'Finas láminas de ternera con rúcula, parmesano y aderezo de limón.',price:9.00,img:'https://copilot.microsoft.com/th/id/BCO.35c4feb2-1c9b-4416-9c78-60e0862d1aa2.png'},
  {id:3,category:'Antipasti',name:'Caprese',desc:'Mozzarella de búfala, tomate y albahaca fresca con reducción de balsámico.',price:7.00,img:'https://copilot.microsoft.com/th/id/BCO.d315f5d7-4441-455e-a466-d3b83a0c1886.png'},
  // Primi Piatti
  {id:4,category:'Primi Piatti',name:'Spaghetti alla Carbonara',desc:'Con panceta, huevo, queso pecorino y pimienta negra.',price:8.50,img:'https://copilot.microsoft.com/th/id/BCO.a058901c-9067-4de3-a08f-25b67d1259ba.png'},
  {id:5,category:'Primi Piatti',name:'Tagliatelle al Ragù (Boloñesa)',desc:'Pasta fresca con salsa de carne cocinada lentamente.',price:9.50,img:'https://copilot.microsoft.com/th/id/BCO.d76f4d6e-04d4-49dc-9530-0635e45aaded.png'},
  {id:6,category:'Primi Piatti',name:'Risotto ai Funghi Porcini',desc:'Arroz cremoso con setas porcini y parmesano.',price:11.00,img:'https://copilot.microsoft.com/th/id/BCO.2b0c9cb4-45ac-465f-af3a-82f96fce336e.png'},
  // Secondi Piatti
  {id:7,category:'Secondi Piatti',name:'Saltimbocca alla Romana',desc:'Ternera con jamón serrano y salvia en salsa de vino blanco.',price:14.00,img:'https://copilot.microsoft.com/th/id/BCO.1b5f2d15-cf7f-4d31-ac0c-cd85b08ae340.png'},
  {id:8,category:'Secondi Piatti',name:'Pollo al Limone',desc:'Pechuga de pollo en salsa de limón y hierbas mediterráneas.',price:12.00,img:'https://copilot.microsoft.com/th/id/BCO.ae8482e7-5f4b-4536-a173-9500bac0f87c.png'},
  {id:9,category:'Secondi Piatti',name:'Melanzane alla Parmigiana',desc:'Berenjenas al horno con tomate, mozzarella y parmesano.',price:10.50,img:'https://via.placeholder.com/400x300?text=Melanzane+alla+Parmigiana'},
  // Pizze Tradizionali
  {id:10,category:'Pizze Tradizionali',name:'Margherita',desc:'Tomate, mozzarella y albahaca.',price:8.00,img:'https://via.placeholder.com/400x300?text=Pizza+Margherita'},
  {id:11,category:'Pizze Tradizionali',name:'Quattro Formaggi',desc:'Mezcla de mozzarella, gorgonzola, parmesano y fontina.',price:10.00,img:'https://via.placeholder.com/400x300?text=Quattro+Formaggi'},
  {id:12,category:'Pizze Tradizionali',name:'Prosciutto e Funghi',desc:'Jamón cocido y champiñones sobre base de tomate.',price:9.50,img:'https://via.placeholder.com/400x300?text=Prosciutto+e+Funghi'},
  // Dolci
  {id:13,category:'Dolci',name:'Tiramisù',desc:'Clásico postre italiano con café, mascarpone y cacao.',price:5.00,img:'https://via.placeholder.com/400x300?text=Tiramisu'},
  {id:14,category:'Dolci',name:'Panna Cotta',desc:'Flan de nata con coulis de frutos rojos.',price:4.50,img:'https://via.placeholder.com/400x300?text=Panna+Cotta'},
  {id:15,category:'Dolci',name:'Cannoli Siciliani',desc:'Rellenos de ricotta dulce con trozos de chocolate.',price:5.50,img:'https://via.placeholder.com/400x300?text=Cannoli+Siciliani'},
  // Bevande
  {id:16,category:'Bevande',name:'Vino Chianti (copa)',desc:'Vino tinto italiano',price:4.50,img:'https://via.placeholder.com/400x300?text=Chianti'},
  {id:17,category:'Bevande',name:'Aperol Spritz',desc:'Aperitivo clásico',price:5.00,img:'https://via.placeholder.com/400x300?text=Aperol+Spritz'},
  {id:18,category:'Bevande',name:'Espresso',desc:'Café espresso italiano',price:1.80,img:'https://via.placeholder.com/400x300?text=Espresso'},
  {id:19,category:'Bevande',name:'Agua mineral',desc:'Agua mineral',price:1.50,img:'https://via.placeholder.com/400x300?text=Agua+mineral'},
];

const cart = [];

function $(sel){return document.querySelector(sel)}
function $all(sel){return Array.from(document.querySelectorAll(sel))}

function renderMenu(){
  const grid = $('#menuGrid');
  grid.innerHTML = '';
  // Agrupar por categoría
  const categories = [...new Set(menuItems.map(i=>i.category))];
  categories.forEach(cat=>{
    const h = document.createElement('h3');
    h.textContent = cat;
    grid.appendChild(h);
    const catItems = menuItems.filter(m=>m.category===cat);
    const catGrid = document.createElement('div');
    catGrid.className = 'menu-grid-category';
    catGrid.style.display = 'grid';
    catGrid.style.gridTemplateColumns = 'repeat(auto-fit,minmax(220px,1fr))';
    catGrid.style.gap = '1rem';
    catItems.forEach(it=>{
      const div = document.createElement('div');
      div.className = 'menu-item';
      div.innerHTML = `
        <img src="${it.img}" alt="${it.name}">
        <h4>${it.name}</h4>
        <p>${it.desc}</p>
        <div class="meta">
          <strong>€${it.price.toFixed(2)}</strong>
          <div>
            <button class="btn" data-add="${it.id}">Añadir</button>
          </div>
        </div>
      `;
      catGrid.appendChild(div);
    });
    grid.appendChild(catGrid);
  });
}

function renderGallery(){
  const g = $('#galleryGrid');
  g.innerHTML = '';
  // mostrar varias imágenes del menú en la galería
  menuItems.forEach((it,idx)=>{
    if(idx>11) return; // limitar a 12 imágenes
    const img = document.createElement('img');
    img.src = it.img;
    img.alt = it.name;
    g.appendChild(img);
  });
}

function updateCartUI(){
  const itemsDiv = $('#cartItems');
  itemsDiv.innerHTML = '';
  let total = 0;
  cart.forEach(ci=>{
    const item = menuItems.find(m=>m.id===ci.id);
    total += item.price * ci.qty;
    const row = document.createElement('div');
    row.style.display='flex';row.style.justifyContent='space-between';row.style.marginBottom='6px';
    row.innerHTML = `<div>${item.name} x ${ci.qty}</div><div>€${(item.price*ci.qty).toFixed(2)}</div>`;
    itemsDiv.appendChild(row);
  });
  $('#cartTotal').textContent = total.toFixed(2);
}

function addToCart(id){
  const found = cart.find(c=>c.id===id);
  if(found) found.qty++;
  else cart.push({id,qty:1});
  updateCartUI();
}

function init(){
  renderMenu();
  renderGallery();

  document.body.addEventListener('click', e=>{
    const add = e.target.closest('[data-add]');
    if(add){
      const id = parseInt(add.getAttribute('data-add'));
      addToCart(id);
    }
  });

  $('#checkout').addEventListener('click', ()=>{
    if(cart.length===0){alert('El carrito está vacío. Añade algún plato.');return}
    // Simular pago: mostrar resumen y vaciar
    const lines = cart.map(ci=>{
      const it = menuItems.find(m=>m.id===ci.id);
      return `${it.name} x${ci.qty} - €${(it.price*ci.qty).toFixed(2)}`;
    });
    const total = $('#cartTotal').textContent;
    const confirmMsg = `Pedido:\n${lines.join('\n')}\n\nTotal: €${total}\n\n¿Confirmar y pagar?`;
    if(confirm(confirmMsg)){
      alert('Pago simulado realizado. Gracias por su pedido.');
      cart.length=0;updateCartUI();
    }
  });

  $('#reserveForm').addEventListener('submit', e=>{
    e.preventDefault();
    const data = {
      name: $('#r_name').value,
      phone: $('#r_phone').value,
      datetime: $('#r_datetime').value,
      people: $('#r_people').value,
      notes: $('#r_notes').value
    };
    // Mostrar resumen de reserva
    alert(`Reserva recibida para ${data.name} el ${data.datetime} para ${data.people} persona(s). Nos pondremos en contacto.`);
    e.target.reset();
  });

  $('#subscribeForm').addEventListener('submit', e=>{
    e.preventDefault();
    const email = $('#sub_email').value;
    alert(`Gracias. ${email} suscrito a promociones.`);
    e.target.reset();
  });

  // CTA buttons
  $('#ctaReserve').addEventListener('click', ()=>{location.href='#contact';});
  $('#ctaOrder').addEventListener('click', ()=>{location.href='#menu';});

  $('#downloadMenu').addEventListener('click', (ev)=>{
    ev.preventDefault();
    // Generar menú ordenado por categorías y descargar como HTML
    let html = '<!doctype html><html><head><meta charset="utf-8"><title>Menú - La Tavola</title></head><body>';
    html += '<h1>Menú - La Tavola</h1>';
    const categories = [...new Set(menuItems.map(i=>i.category))];
    categories.forEach(cat=>{
      html += `<h2>${cat}</h2><ul>`;
      menuItems.filter(i=>i.category===cat).forEach(it=>{
        html += `<li><strong>${it.name}</strong> - €${it.price.toFixed(2)}<br><small>${it.desc}</small></li>`;
      });
      html += '</ul>';
    });
    html += '</body></html>';
    const blob = new Blob([html],{type:'text/html'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');a.href=url;a.download='menu-latavola.html';document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);
  });

  // Enlace WhatsApp dinámico
  const waBtn = $('#waLink');
  waBtn.addEventListener('click', ()=>{});

}

document.addEventListener('DOMContentLoaded', init);
