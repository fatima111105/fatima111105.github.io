// Menú proporcionado por el usuario, corregido y completado
const menuItems = [
  {id:1,category:'Antipasti',name:'Bruschetta al Pomodoro',desc:'Pan tostado con tomate fresco, ajo, albahaca y aceite de oliva virgen extra.',price:4.50,img:'/IMÁGENES/Bruschetta al Pomodoro.webp'},
  {id:2,category:'Antipasti',name:'Carpaccio di Manzo',desc:'Finas láminas de ternera con rúcula, parmesano y aderezo de limón.',price:9.00,img:'/IMÁGENES/Carpaccio di Manzo.webp'},
  {id:3,category:'Antipasti',name:'Caprese',desc:'Mozzarella de búfala, tomate y albahaca fresca con reducción de balsámico.',price:7.00,img:'/IMÁGENES/Caprese.webp'},
  {id:4,category:'Primi Piatti',name:'Spaghetti alla Carbonara',desc:'Con panceta, huevo, queso pecorino y pimienta negra.',price:8.50,img:'/IMÁGENES/Spaghetti alla Carbonara.webp'},
  {id:5,category:'Primi Piatti',name:'Tagliatelle al Ragù (Boloñesa)',desc:'Pasta fresca con salsa de carne cocinada lentamente.',price:9.50,img:'/IMÁGENES/Tagliatelle al Ragù (Boloñesa).webp'},
  {id:6,category:'Primi Piatti',name:'Risotto ai Funghi Porcini',desc:'Arroz cremoso con setas porcini y parmesano.',price:11.00,img:'/IMÁGENES/Risotto ai Funghi Porcini.webp'},
  {id:7,category:'Secondi Piatti',name:'Saltimbocca alla Romana',desc:'Ternera con jamón serrano y salvia en salsa de vino blanco.',price:14.00,img:'/IMÁGENES/Saltimbocca alla Romana.webp'},
  {id:8,category:'Secondi Piatti',name:'Pollo al Limone',desc:'Pechuga de pollo en salsa de limón y hierbas mediterráneas.',price:12.00,img:'/IMÁGENES/Pollo al Limone.webp'},
  {id:9,category:'Secondi Piatti',name:'Melanzane alla Parmigiana',desc:'Berenjenas al horno con tomate, mozzarella y parmesano.',price:10.50,img:'/IMÁGENES/Melanzane alla Parmigiana.webp'},
  {id:10,category:'Pizze Tradizionali',name:'Margherita',desc:'Tomate, mozzarella y albahaca',price:8.00,img:'/IMÁGENES/Margherita.webp'},
  {id:11,category:'Pizze Tradizionali',name:'Quattro Formaggi',desc:'Mezcla de mozzarella, gorgonzola, parmesano y fontina.',price:10.00,img:'/IMÁGENES/Quattro Formaggi.webp'},
  {id:12,category:'Pizze Tradizionali',name:'Prosciutto e Funghi',desc:'Jamón cocido y champiñones sobre base de tomate.',price:9.50,img:'/IMÁGENES/Prosciutto e Funghi.webp'},
  {id:13,category:'Dolci',name:'Tiramisù',desc:'Clásico postre italiano con café, mascarpone y cacao.',price:5.00,img:'/IMÁGENES/Tiramisù.webp'},
  {id:14,category:'Dolci',name:'Panna Cotta',desc:'Flan de nata con coulis de frutos rojos.',price:4.50,img:'/IMÁGENES/Panna Cotta.webp'},
  {id:15,category:'Dolci',name:'Cannoli Siciliani',desc:'Rellenos de ricotta dulce con trozos de chocolate.',price:5.50,img:'/IMÁGENES/Cannoli Siciliani.webp'},
  {id:16,category:'Bevande',name:'Vino Chianti (copa)',desc:'Vino tinto italiano',price:4.50,img:'/IMÁGENES/Vino Chianti (copa).webp'},
  {id:17,category:'Bevande',name:'Aperol Spritz',desc:'Aperitivo clásico',price:5.00,img:'/IMÁGENES/Aperol Spritz.webp'},
  {id:18,category:'Bevande',name:'Espresso',desc:'Café espresso italiano',price:1.80,img:'/IMÁGENES/Espresso.webp'},
  {id:19,category:'Bevande',name:'Agua mineral',desc:'Agua mineral',price:1.50,img:'/IMÁGENES/Agua mineral.webp'}
];

const cart = [];

function $(sel){return document.querySelector(sel)}
function $all(sel){return Array.from(document.querySelectorAll(sel))}

function renderMenu(filter='all'){
  const grid = $('#menuGrid');
  grid.innerHTML = '';
  const categories = [...new Set(menuItems.map(i=>i.category))];
  categories.forEach(cat=>{
    const catItems = menuItems.filter(m=>m.category===cat);
    if(filter!=='all' && filter!==cat) return;
    const h = document.createElement('h3');
    h.textContent = cat;
    grid.appendChild(h);
    const catGrid = document.createElement('div');
    catGrid.className = 'menu-grid-category';
    catGrid.style.display = 'grid';
    catGrid.style.gridTemplateColumns = 'repeat(auto-fit,minmax(320px,1fr))';
    catGrid.style.gap = '1rem';
    catItems.forEach(it=>{
      const div = document.createElement('div');
      div.className = 'menu-item';
      div.innerHTML = `
        <img src="${it.img}" alt="${it.name}">
        <div>
          <h4>${it.name}</h4>
          <p>${it.desc}</p>
        </div>
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
  menuItems.forEach((it,idx)=>{
    if(idx>11) return;
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

function checkout(){
  if(cart.length===0){alert('El carrito está vacío. Añade algún plato.');return}
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
}

function downloadMenuPDF(){
  try{
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 14;
    // Header with warm restaurant colors
    doc.setFillColor(139,94,60); // brown accent
    doc.rect(0,0,pageWidth,32,'F');
    doc.setTextColor(255,255,255);
    doc.setFontSize(22);
    doc.setFont(undefined,'bold');
    doc.text('La Tavola', margin, 18);
    doc.setFontSize(10);
    doc.setFont(undefined,'normal');
    doc.text('Auténtica cocina italiana — tradición y sabor', margin, 25);

    // Intro line on top-right
    doc.setFontSize(9);
    doc.text('Calle Falsa 123 · Horario: 12:00–23:00', pageWidth - margin, 18, {align:'right'});

    // Prepare content area
    let x = margin;
    let y = 38;
    const colGap = 8;
    const colWidth = (pageWidth - margin*2 - colGap) / 2; // two columns
    const lineHeight = 6;
    const categories = [...new Set(menuItems.map(i=>i.category))];

    // Small palette
    const titleColor = [139,94,60]; // brown
    const accentColor = [140,20,20]; // deep red for section accents

    categories.forEach((cat,ci)=>{
      // Section header
      // If not enough space for header + one line, move to next column/page
      if(y + 12 > pageHeight - margin){
        // move to next column or new page
        if(x + colWidth + colGap + colWidth <= pageWidth - margin/2){
          x = x + colWidth + colGap; y = margin + 6; // move right
        } else {
          doc.addPage(); x = margin; y = margin + 6;
          // redraw small header on new page
          doc.setFillColor(139,94,60);
          doc.rect(0,0,pageWidth,12,'F');
          doc.setTextColor(255,255,255);
          doc.setFontSize(12);doc.text('La Tavola', margin, 8);
          doc.setTextColor(0);
        }
      }

      // Draw category title with small accent bar
      doc.setFillColor(...accentColor);
      doc.rect(x - 2, y - 4, 6, 8, 'F');
      doc.setFontSize(12);
      doc.setTextColor(...titleColor);
      doc.setFont(undefined,'bold');
      doc.text(cat, x + 6, y);
      y += 6;
      doc.setFont(undefined,'normal');
      doc.setFontSize(10);
      doc.setTextColor(0);

      const items = menuItems.filter(i=>i.category===cat);
      items.forEach(it=>{
        // If item would overflow page, move column/page
        if(y + 18 > pageHeight - margin){
          if(x === margin){ x = margin + colWidth + colGap; y = margin + 6; }
          else { doc.addPage(); x = margin; y = margin + 6; }
        }

        // Name and price on the same line
        doc.setFont(undefined,'bold');
        doc.setFontSize(11);
        // name wrap if long
        const maxNameWidth = colWidth - 28;
        const nameLines = doc.splitTextToSize(it.name, maxNameWidth);
        doc.text(nameLines, x, y);
        // price aligned to right of column
        doc.setFont(undefined,'normal');
        const priceText = `€${it.price.toFixed(2)}`;
        doc.text(priceText, x + colWidth - 2, y, { align: 'right' });
        y += (nameLines.length * lineHeight / 2) + 2;

        // Description
        const descLines = doc.splitTextToSize(it.desc, colWidth - 4);
        doc.setFontSize(9);
        doc.setTextColor(80);
        doc.text(descLines, x, y);
        y += descLines.length * (lineHeight * 0.9) + 6;

        // small separator
        //doc.setDrawColor(220); doc.line(x, y-2, x + colWidth, y-2);
      });

      // small gap after category
      y += 4;

      // if current column is filled beyond threshold, move to next column
      if(y > pageHeight - margin - 40){
        if(x === margin){ x = margin + colWidth + colGap; y = margin + 6; }
        else { doc.addPage(); x = margin; y = margin + 6; }
      }
    });

    // Footer small note
    const lastPage = doc.getNumberOfPages();
    doc.setPage(lastPage);
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text('Menú sujeto a cambios según temporada. Para pedidos y reservas: +34 123 456 789', margin, pageHeight - 8);

    doc.save('menu-latavola.pdf');
  }catch(e){
    alert('No se pudo generar PDF.');
    console.error(e);
  }
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

  $('#checkout').addEventListener('click', checkout);

  $('#reserveForm').addEventListener('submit', e=>{
    e.preventDefault();
    const data = {
      name: $('#r_name').value,
      phone: $('#r_phone').value,
      datetime: $('#r_datetime').value,
      people: $('#r_people').value,
      notes: $('#r_notes').value,
      cart: cart.slice()
    };
    // Mostrar confirmación visual y resumen
    let msg = `Reserva recibida para ${data.name} el ${data.datetime} para ${data.people} persona(s).`;
    if(data.cart.length){
      msg += '\n\nPlatos incluidos en la reserva:';
      data.cart.forEach(ci=>{const it=menuItems.find(m=>m.id===ci.id);msg+=`\n- ${it.name} x${ci.qty}`});
    }
    alert(msg + '\n\nNos pondremos en contacto.');
    e.target.reset();
    // opcional: limpiar carrito si se desea
    // cart.length=0;updateCartUI();
  });

  $('#subscribeForm').addEventListener('submit', e=>{
    e.preventDefault();
    const email = $('#sub_email').value;
    // validación simple
    if(!/.+@.+\..+/.test(email)){alert('Introduce un email válido');return}
    alert(`Gracias. ${email} suscrito a promociones.`);
    e.target.reset();
  });

  // CTA buttons
  $('#ctaReserve').addEventListener('click', ()=>{location.href='#contact';});
  $('#ctaOrder').addEventListener('click', ()=>{location.href='#menu';});
  $('#downloadMenu').addEventListener('click', (ev)=>{ev.preventDefault();downloadMenuPDF();});

  // Filter buttons
  $all('.menu-controls [data-filter]').forEach(b=>{
    b.addEventListener('click', ()=>{
      const f = b.getAttribute('data-filter');
      renderMenu(f);
    });
  });

  // Nav toggle
  const navToggle = $('#navToggle');
  navToggle.addEventListener('click', ()=>{
    const links = $('#navLinks');
    links.style.display = links.style.display==='flex' ? 'none' : 'flex';
    links.style.flexDirection='column';
  });

}


document.addEventListener('DOMContentLoaded', init);