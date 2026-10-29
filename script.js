// EDIT YOUR PROJECTS HERE: title, description, tags, link, and thumbnail color.
const PROJECTS = [
  {t:"Mama M’s Store",d:"A store website built as a single HTML page. Open it to browse the shop.",tags:["HTML","CSS","JavaScript"],link:"mama-ms-store.html",c:"#9ccbff"},
  {t:"Periodic Table",d:"An interactive periodic table of the elements, built as a single HTML page.",tags:["HTML", "CSS","JavaScript"],link:"periodic-table.html",c:"#ffe27a"},
  {t:"My Favorite Person",d:"An interactive website dedicated to his baby.",tags:["HTML","CSS","JavaScript"],link:"kaepalan-ni-cj.html",c:"#bfe8c8"},
];
const esc=s=>String(s).replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
document.getElementById("grid").innerHTML=PROJECTS.map(p=>`
  <article class="proj">
    <div class="thumb" style="background:${esc(p.c)}">${esc(p.t)}</div>
    <div class="body"><h3>${esc(p.t)}</h3><p>${esc(p.d)}</p>
    <div class="chips">${p.tags.map(t=>`<span>${esc(t)}</span>`).join("")}</div>
    <a class="btn" href="${esc(p.link)}">View project</a></div>
  </article>`).join("");

const views=["home","about","skills","projects"];
function route(){
  let h=(location.hash||"#home").slice(1);
  if(!views.includes(h))h="home";
  views.forEach(v=>{
    document.getElementById("v-"+v).classList.toggle("on",v===h);
  });
  document.querySelectorAll("a.tab").forEach(a=>{
    if(a.getAttribute("href")==="#"+h)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");
  });
  window.scrollTo(0,0);
}
window.addEventListener("hashchange",route);route();

const dr=document.getElementById("drawer"),sc=document.getElementById("scrim"),op=document.getElementById("open");
function toggle(o){dr.classList.toggle("on",o);sc.classList.toggle("on",o);dr.setAttribute("aria-hidden",!o);if(o)document.getElementById("close").focus();else op.focus()}
op.onclick=()=>toggle(true);
document.getElementById("close").onclick=()=>toggle(false);
sc.onclick=()=>toggle(false);
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&dr.classList.contains("on"))toggle(false)});

// Ripple on click for buttons, tabs and social links
const calm=matchMedia("(prefers-reduced-motion: reduce)");
document.addEventListener("pointerdown",e=>{
  if(calm.matches)return;
  const el=e.target.closest(".btn,.socials a,nav a.tab");
  if(!el)return;
  const r=el.getBoundingClientRect(),d=Math.max(r.width,r.height)*2;
  const s=document.createElement("span");
  s.className="ripple";
  s.style.cssText=`width:${d}px;height:${d}px;left:${e.clientX-r.left-d/2}px;top:${e.clientY-r.top-d/2}px`;
  el.appendChild(s);
  s.addEventListener("animationend",()=>s.remove());
});