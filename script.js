const articles = [
{id:"network",cat:"Networking",title:"How to Troubleshoot a Network Connection: A Complete Beginner's Guide",desc:"Learn a logical, step-by-step process for diagnosing network problems.",icon:"⌁",url:"blog/network-troubleshooting.html"},
{id:"windows",cat:"Windows",title:"10 Windows Troubleshooting Checks You Can Try First",desc:"A practical checklist for common Windows problems.",icon:"▣",url:"blog/windows-troubleshooting.html"},
{id:"linux",cat:"Linux",title:"15 Linux Commands Every Beginner Should Know",desc:"A practical introduction to files, processes, storage, networking and logs.",icon:"⌘",url:"blog/linux-commands.html"},
{id:"dns",cat:"Networking",title:"What Is DNS and Why Does It Matter?",desc:"Understand DNS and troubleshoot name-resolution problems.",icon:"⌁",url:"blog/dns-guide.html"},
{id:"ai",cat:"AI & Technology",title:"How AI Can Help With Technical Documentation",desc:"Use AI for outlines, checklists and clearer technical writing.",icon:"✦",url:"blog/ai-technical-documentation.html"},
{id:"wifi",cat:"IT Support",title:"Wi-Fi Connected but No Internet: A Simple Troubleshooting Flow",desc:"A logical workflow for Wi-Fi connectivity problems.",icon:"⚙",url:"blog/wifi-no-internet.html"},
{id:"tools",cat:"Software & Tools",title:"Essential Tools for a Beginner IT Support Technician",desc:"Build a practical toolkit for support and troubleshooting.",icon:"▤",url:"blog/software-tools.html"},
{id:"ip",cat:"Networking",title:"How to Find Your IP Address on Windows",desc:"Find IPv4, IPv6, gateway and DNS information.",icon:"⌁",url:"blog/ip-address-windows.html"},
{id:"disk",cat:"Windows",title:"How to Check Free Disk Space on Windows",desc:"Identify storage problems before they cause failures.",icon:"▣",url:"blog/disk-space-windows.html"}
];
const grid=document.getElementById("articleGrid"),search=document.getElementById("searchInput"),filter=document.getElementById("categoryFilter"),noResults=document.getElementById("noResults");
function render(){const q=(search.value||"").toLowerCase().trim(),c=filter.value;const list=articles.filter(a=>(c==="All"||a.cat===c)&&(!q||`${a.title} ${a.desc} ${a.cat}`.toLowerCase().includes(q)));grid.innerHTML=list.map(a=>`<article class="article"><div class="article-visual">${a.icon}</div><div class="article-body"><span class="tag">${a.cat}</span><h3>${a.title}</h3><p>${a.desc}</p><a class="read-btn" href="${a.url}">Read full guide →</a></div></article>`).join("");noResults.hidden=list.length>0}
render();search.addEventListener("input",render);filter.addEventListener("change",render);
document.querySelectorAll(".category").forEach(el=>el.addEventListener("click",()=>{filter.value=el.dataset.category;render()}));
const menuBtn=document.querySelector(".menu-btn"),nav=document.querySelector(".nav");menuBtn.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuBtn.setAttribute("aria-expanded",open)});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
document.getElementById("newsletterForm").addEventListener("submit",e=>{e.preventDefault();e.target.reset();showToast("Thanks! Connect this form to your email service before launch.")});
function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),3500)}
document.getElementById("year").textContent=new Date().getFullYear();
