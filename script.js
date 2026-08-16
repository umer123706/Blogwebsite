const articles = [
 {id:"windows",cat:"Windows",title:"10 Windows Troubleshooting Checks You Can Try First",desc:"A practical checklist for common Windows problems before escalating to advanced support.",icon:"▣",content:"<h2>10 Windows Troubleshooting Checks You Can Try First</h2><p>Start with the basics: restart the affected application, check available disk space, confirm Windows is up to date, review network status, reconnect peripherals, and reproduce the issue after a clean restart.</p><ol><li>Restart the affected app.</li><li>Check cables and external devices.</li><li>Confirm network connectivity.</li><li>Check storage space.</li><li>Review recent changes or updates.</li></ol><p>Document what you checked and the exact error message before escalating.</p>"},
 {id:"linux",cat:"Linux",title:"15 Linux Commands Every Beginner Should Know",desc:"A simple introduction to navigation, files, processes, networking and system checks.",icon:"⌘",content:"<h2>15 Linux Commands Every Beginner Should Know</h2><p>Linux troubleshooting becomes easier when you know a small set of reliable commands. Start with <code>pwd</code>, <code>ls</code>, <code>cd</code>, <code>cp</code>, <code>mv</code>, <code>rm</code>, <code>cat</code>, <code>grep</code>, <code>df</code>, <code>free</code>, <code>top</code>, <code>ip</code>, <code>ping</code>, <code>journalctl</code> and <code>systemctl</code>.</p><p>Always verify a command before running destructive operations as root.</p>"},
 {id:"dns",cat:"Networking",title:"What Is DNS and Why Does It Matter?",desc:"Understand DNS in simple terms and learn basic checks when websites won't load.",icon:"⌁",content:"<h2>What Is DNS and Why Does It Matter?</h2><p>DNS translates human-friendly domain names into IP addresses. When DNS fails, your internet connection may appear to work while websites fail to resolve.</p><p>Start by checking whether you can reach an IP address, then test name resolution. On Windows you can use <code>nslookup</code>; on Linux, <code>dig</code> or <code>nslookup</code> can help.</p>"},
 {id:"ai",cat:"AI & Technology",title:"How AI Can Help With Technical Documentation",desc:"Use AI as an assistant for outlines, formatting, checklists and clearer technical writing.",icon:"✦",content:"<h2>How AI Can Help With Technical Documentation</h2><p>AI can speed up documentation by turning rough notes into structured outlines, converting procedures into checklists, and suggesting clearer wording.</p><p>Always verify technical facts, commands, security recommendations and internal procedures before publishing.</p>"},
 {id:"wifi",cat:"IT Support",title:"Wi-Fi Connected but No Internet: A Simple Troubleshooting Flow",desc:"Work through adapter, IP, DNS, router and device checks in a logical order.",icon:"⚙",content:"<h2>Wi-Fi Connected but No Internet</h2><p>First determine whether the problem affects one device or the whole network. Then check the Wi-Fi adapter, IP configuration, gateway and DNS. Restarting the router can help, but document the symptoms first if the connection is business-critical.</p>"},
 {id:"tools",cat:"Software & Tools",title:"Essential Tools for a Beginner IT Support Technician",desc:"A practical toolkit covering remote support, monitoring, documentation and troubleshooting.",icon:"▤",content:"<h2>Essential Tools for Beginner IT Support</h2><p>A useful toolkit can include a terminal, browser developer tools, network diagnostic utilities, documentation software, password-safe workflows, monitoring dashboards and a reliable note-taking system.</p><p>Choose tools based on your environment and security requirements rather than collecting software you do not need.</p>"},
 {id:"ip",cat:"Networking",title:"How to Find Your IP Address on Windows",desc:"Learn the quickest ways to find IPv4, IPv6, gateway and adapter information.",icon:"⌁",content:"<h2>How to Find Your IP Address on Windows</h2><p>Open Command Prompt and run <code>ipconfig</code>. Look for the active adapter and its IPv4 address, default gateway and DNS information. For more detail, use <code>ipconfig /all</code>.</p>"},
 {id:"disk",cat:"Windows",title:"How to Check Free Disk Space on Windows",desc:"Simple ways to identify storage problems before they cause application failures.",icon:"▣",content:"<h2>How to Check Free Disk Space on Windows</h2><p>Open File Explorer and check the drive's free space. You can also use Settings → System → Storage to see which categories consume space. Keep adequate free space for Windows updates and application operations.</p>"}
];

const grid=document.getElementById("articleGrid");
const search=document.getElementById("searchInput");
const filter=document.getElementById("categoryFilter");
const noResults=document.getElementById("noResults");
function render(){
 const q=(search.value||"").toLowerCase().trim(), c=filter.value;
 const list=articles.filter(a=>(c==="All"||a.cat===c)&&(!q||`${a.title} ${a.desc} ${a.cat}`.toLowerCase().includes(q)));
 grid.innerHTML=list.map(a=>`<article class="article"><div class="article-visual">${a.icon}</div><div class="article-body"><span class="tag">${a.cat}</span><h3>${a.title}</h3><p>${a.desc}</p><button class="read-btn" data-article="${a.id}">Read guide →</button></div></article>`).join("");
 noResults.hidden=list.length>0;
}
render();
search.addEventListener("input",render); filter.addEventListener("change",render);
document.querySelectorAll(".category").forEach(el=>el.addEventListener("click",()=>{filter.value=el.dataset.category;render()}));

const modal=document.getElementById("articleModal"), modalContent=document.getElementById("modalContent");
document.addEventListener("click",e=>{
 const btn=e.target.closest("[data-article]");
 if(!btn)return;
 const a=articles.find(x=>x.id===btn.dataset.article);
 if(a){modalContent.innerHTML=a.content;modal.classList.add("show");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
});
document.querySelector(".modal-close").addEventListener("click",closeModal);
modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
function closeModal(){modal.classList.remove("show");modal.setAttribute("aria-hidden","true");document.body.style.overflow=""}

const menuBtn=document.querySelector(".menu-btn"), nav=document.querySelector(".nav");
menuBtn.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuBtn.setAttribute("aria-expanded",open)});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

document.getElementById("newsletterForm").addEventListener("submit",e=>{e.preventDefault();e.target.reset();showToast("Thanks! Connect this form to your email service before launch.")});
function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),3500)}
document.getElementById("year").textContent=new Date().getFullYear();
