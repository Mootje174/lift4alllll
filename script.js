
const navItems=[['Home','index.html'],['Over ons','over-ons.html'],['Diensten','diensten.html'],['Producten','prijzen.html'],['FAQ','faq.html'],['Blog','blog.html']];
function header(){
 const path=location.pathname.split('/').pop()||'index.html';
 document.getElementById('header').innerHTML=`<header><nav class="nav">
 <a href="index.html"><img class="logo" src="assets/logo.png" alt="LIFT4ALL logo"></a>
 <div class="navlinks">${navItems.map(([n,h])=>`<a class="${path===h?'active':''}" href="${h}">${n}</a>`).join('')}</div>
 <div class="nav-actions"><div class="search"><input id="siteSearch" placeholder="Zoeken"><button class="icon-btn" onclick="doSearch()">⌕</button></div><a class="btn primary nav-quote" href="./quote.html">Offerte aanvragen</a><a class="icon-btn" href="winkelmand.html" title="Winkelmand">🛒 <span id="cartCount">0</span></a><a class="icon-btn" href="account.html">Account</a><button class="icon-btn hamb" onclick="document.querySelector('.navlinks').classList.toggle('open')">☰</button></div>
 </nav></header>`;
}
function footer(){document.getElementById('footer').innerHTML=`<footer><div class="footer-inner"><div><img src="assets/logo.png" alt="LIFT4ALL"><p>Liften voor mensen, gebouwen en bedrijven. Verkoop, onderhoud en service.</p></div><div><h4>Navigatie</h4>${navItems.map(x=>`<a href="${x[1]}">${x[0]}</a>`).join('')}<a href="contact.html">Contact</a></div><div><h4>Service</h4><a href="./quote.html">Offerte aanvragen</a><a href="diensten.html#onderhoud">Onderhoud</a><a href="diensten.html">Reparatie</a><a href="diensten.html">Service per maand</a><a href="diensten.html#noodhulp">Noodhulpdiensten</a><a href="diensten.html#installatie">Installatie</a></div><div><h4>Contact</h4><p>Telefoon: nog invullen</p><p>E-mail: nog invullen</p><p>Adres: nog invullen</p><a href="https://wa.me/" target="_blank">WhatsApp ↗</a></div></div><div class="copyright">© ${new Date().getFullYear()} LIFT4ALL. Alle rechten voorbehouden.</div></footer>`}
function cart(){return JSON.parse(localStorage.getItem('lift4all_cart')||'[]')}
function saveCart(c){localStorage.setItem('lift4all_cart',JSON.stringify(c));updateCartCount()}
function updateCartCount(){let n=cart().reduce((a,x)=>a+x.qty,0);let e=document.getElementById('cartCount');if(e)e.textContent=n}
function addToCart(name,price){let c=cart(),x=c.find(i=>i.name===name);if(x)x.qty++;else c.push({name,price:Number(price),qty:1});saveCart(c);alert(name+' is toegevoegd aan uw winkelmand.')}
function renderCart(){let el=document.getElementById('cart');if(!el)return;let c=cart();if(!c.length){el.innerHTML='<div class="cart-empty"><h2>Uw winkelmand is leeg.</h2><p>Bekijk onze producten en voeg een lift toe.</p><a class="btn primary" href="prijzen.html">Bekijk producten</a></div>';return}el.innerHTML='<div class="cart-box">'+c.map((x,i)=>`<div class="cart-row"><div><b>${x.name}</b><div class="stock">Aantal: ${x.qty}</div></div><div><button class="btn ghost" onclick="removeCart(${i})">Verwijderen</button></div></div>`).join('')+'<div class="cart-total"><span>Prijs</span><span>Op aanvraag</span></div><p class="note">Liftprijzen worden op basis van de situatie bepaald. Gebruik de offertepagina voor een concrete aanvraag.</p><a class="btn primary" href="./quote.html">Offerte aanvragen</a></div>'}
function removeCart(i){let c=cart();c.splice(i,1);saveCart(c);renderCart()}
function doSearch(){let q=(document.getElementById('siteSearch')?.value||'').trim();if(q)location.href='prijzen.html?search='+encodeURIComponent(q)}
document.addEventListener('DOMContentLoaded',()=>{header();footer();updateCartCount();renderCart();
 document.querySelectorAll('.add-cart').forEach(b=>b.addEventListener('click',()=>addToCart(b.dataset.name,b.dataset.price)));
 document.querySelectorAll('form[data-form]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();let s=f.querySelector('.form-success');let type=f.dataset.form;if(type==='account'){localStorage.setItem('lift4all_user',f.email.value);s.textContent='Accountdemo aangemaakt. Voor productie is een beveiligde server nodig.'}else if(type==='login'){s.textContent='Inlogdemo geslaagd (lokaal).'}else{s.textContent='Bedankt. Uw formulier is klaar om aan een echte e-mail/backend gekoppeld te worden.'}f.reset()}));
});
