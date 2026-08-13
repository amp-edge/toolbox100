
function byId(id){return document.getElementById(id)}
function out(x){byId('result').textContent=x}
function num(id){return parseFloat(byId(id).value)||0}
function toolInit(slug){
 const f=byId('toolForm'); if(!f)return;
 f.addEventListener('submit',e=>{e.preventDefault(); try{toolRun(slug)}catch(err){out('Please check your inputs.')}});
}
function toolRun(s){
 switch(s){
 case 'calculator': out(String(Function('"use strict";return ('+byId('expr').value+')')()));break;
 case 'percentage-calculator': out(num('a')+'% of '+num('b')+' = '+(num('a')*num('b')/100));break;
 case 'discount-calculator': {let p=num('a'),d=num('b');out('Discount: '+(p*d/100).toFixed(2)+'\nFinal price: '+(p*(1-d/100)).toFixed(2));break}
 case 'fraction-calculator': {let a=num('a'),b=num('b'),c=num('c'),d=num('d');out(`Result: ${(a*d+c*b)}/${b*d} = ${((a/b)+(c/d)).toFixed(6)}`);break}
 case 'ratio-calculator': out('Equivalent value = '+(num('a')/num('b')*num('c')).toFixed(4));break;
 case 'average-calculator': out('Average = '+byId('text').value.split(',').map(Number).filter(Number.isFinite).reduce((a,b)=>a+b,0)/byId('text').value.split(',').map(Number).filter(Number.isFinite).length);break;
 case 'profit-loss-calculator': {let c=num('a'),s=num('b'),x=s-c;out((x>=0?'Profit: ':'Loss: ')+Math.abs(x).toFixed(2)+'\nPercentage: '+(Math.abs(x)/c*100).toFixed(2)+'%');break}
 case 'markup-calculator': out('Selling price = '+(num('a')*(1+num('b')/100)).toFixed(2));break;
 case 'break-even-calculator': out('Break-even units = '+(num('a')/(num('b')-num('c'))).toFixed(2));break;
 case 'loan-emi-calculator': {let P=num('a'),r=num('b')/1200,n=num('c')*12;let emi=r?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n;out('Monthly EMI = '+emi.toFixed(2)+'\nTotal payment = '+(emi*n).toFixed(2));break}
 case 'compound-interest-calculator': {let P=num('a'),r=num('b')/100,n=num('c');out('Final amount = '+(P*Math.pow(1+r,n)).toFixed(2));break}
 case 'simple-interest-calculator': out('Simple interest = '+(num('a')*num('b')*num('c')/100).toFixed(2));break;
 case 'investment-return-calculator': {let x=num('a'),y=num('b');out('Return = '+(y-x).toFixed(2)+'\nROI = '+((y-x)/x*100).toFixed(2)+'%');break}
 case 'savings-calculator': {let p=num('a'),m=num('b'),n=num('c');out('Total saved = '+(p+m*n).toFixed(2));break}
 case 'tip-calculator': {let bill=num('a'),tip=num('b'),people=num('c')||1;out('Tip: '+(bill*tip/100).toFixed(2)+'\nPer person: '+(bill*(1+tip/100)/people).toFixed(2));break}
 case 'salary-calculator': out('Estimated monthly gross = '+(num('a')/12).toFixed(2));break;
 case 'bmi-calculator': {let w=num('a'),h=num('b')/100;let bmi=w/(h*h);out('BMI = '+bmi.toFixed(1)+'\n'+(bmi<18.5?'Underweight':bmi<25?'Normal range':bmi<30?'Overweight':'Obesity'));break}
 case 'bmr-calculator': {let w=num('a'),h=num('b'),age=num('c');out('BMR (Mifflin-St Jeor, male) = '+(10*w+6.25*h-5*age+5).toFixed(0)+' kcal/day');break}
 case 'calorie-calculator': out('Estimated maintenance calories = '+(num('a')*num('b')).toFixed(0)+' kcal/day');break;
 case 'ideal-weight-calculator': out('Approx. ideal weight (BMI 22) = '+(22*Math.pow(num('a')/100,2)).toFixed(1)+' kg');break;
 case 'body-fat-calculator': out('BMI-based rough estimate: '+(1.2*num('a')+0.23*num('b')-10.8*num('c')-5.4).toFixed(1)+'%');break;
 case 'macro-calculator': {let cal=num('a');out('Protein: '+(cal*.30/4).toFixed(0)+' g\nCarbs: '+(cal*.40/4).toFixed(0)+' g\nFat: '+(cal*.30/9).toFixed(0)+' g');break}
 case 'water-intake-calculator': out('Suggested water = '+(num('a')*35/1000).toFixed(2)+' L/day');break;
 case 'pace-calculator': {let km=num('a'),mins=num('b');out('Pace = '+(mins/km).toFixed(2)+' min/km');break}
 case 'running-calories-calculator': out('Very rough estimate = '+(num('a')*num('b')).toFixed(0)+' kcal');break;
 case 'age-calculator': {let d=new Date(byId('date').value),n=new Date(),age=n.getFullYear()-d.getFullYear();if(n<new Date(n.getFullYear(),d.getMonth(),d.getDate()))age--;out('Age = '+age+' years');break}
 case 'date-difference-calculator': {let a=new Date(byId('date1').value),b=new Date(byId('date2').value);out(Math.abs(Math.round((b-a)/86400000))+' days');break}
 case 'days-until-date': {let d=new Date(byId('date').value),n=new Date();out(Math.ceil((d-n)/86400000)+' days');break}
 case 'week-number-calculator': {let d=new Date(byId('date').value);d.setHours(0,0,0,0);d.setDate(d.getDate()+4-(d.getDay()||7));let y=new Date(d.getFullYear(),0,1);out('ISO week '+Math.ceil((((d-y)/86400000)+1)/7));break}
 case 'countdown-timer': startCountdown();break;
 case 'word-counter': {let x=byId('text').value;out('Words: '+(x.trim()?x.trim().split(/\\s+/).length:0)+'\\nCharacters: '+x.length);break}
 case 'character-counter': out('Characters: '+byId('text').value.length);break;
 case 'sentence-counter': out('Sentences: '+(byId('text').value.match(/[.!?]+(?=\\s|$)/g)||[]).length);break;
 case 'paragraph-counter': out('Paragraphs: '+byId('text').value.split(/\\n\\s*\\n/).filter(x=>x.trim()).length);break;
 case 'reading-time-calculator': {let n=byId('text').value.trim().split(/\\s+/).filter(Boolean).length;out('Words: '+n+'\\nReading time: '+Math.max(1,Math.ceil(n/200))+' min');break}
 case 'text-case-converter': out(byId('text').value.toLowerCase());break;
 case 'remove-duplicate-lines': out([...new Set(byId('text').value.split('\\n'))].join('\\n'));break;
 case 'text-sorter': out(byId('text').value.split('\\n').sort((a,b)=>a.localeCompare(b)).join('\\n'));break;
 case 'text-repeater': out(byId('text').value.repeat(Math.min(100,num('a')||1)));break;
 case 'lorem-ipsum': out(('Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(num('a')||3)).trim());break;
 case 'password-generator': {let chars='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%';let n=num('a')||16,s='';for(let i=0;i<n;i++)s+=chars[Math.floor(Math.random()*chars.length)];out(s);break}
 case 'password-strength-checker': {let p=byId('text').value,score=(p.length>=12)+(/[A-Z]/.test(p))+(/[a-z]/.test(p))+(/\d/.test(p))+(/[^A-Za-z0-9]/.test(p));out('Strength: '+(score>=5?'Very strong':score>=4?'Strong':score>=3?'Medium':'Weak'));break}
 case 'random-number': out(String(Math.floor(Math.random()*(num('b')-num('a')+1))+num('a')));break;
 case 'random-picker': {let a=byId('text').value.split(',').map(x=>x.trim()).filter(Boolean);out(a[Math.floor(Math.random()*a.length)]||'Add items separated by commas.');break}
 case 'dice-roller': out('🎲 '+(Math.floor(Math.random()*6)+1));break;
 case 'coin-flip': out(Math.random()<.5?'Heads':'Tails');break;
 case 'uuid-generator': out(crypto.randomUUID());break;
 case 'pin-generator': {let n=num('a')||4,s='';for(let i=0;i<n;i++)s+=Math.floor(Math.random()*10);out(s);break}
 case 'slug-generator': out(byId('text').value.toLowerCase().trim().replace(/[^a-z0-9\\s-]/g,'').replace(/\\s+/g,'-').replace(/-+/g,'-'));break;
 case 'json-formatter': out(JSON.stringify(JSON.parse(byId('text').value),null,2));break;
 case 'json-validator': {JSON.parse(byId('text').value);out('Valid JSON ✓');break}
 case 'base64': {let x=byId('text').value;try{out(atob(x))}catch{out(btoa(x))}break}
 case 'url-encoder': out(encodeURIComponent(byId('text').value));break;
 case 'html-entities': out(byId('text').value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])));break;
 case 'regex-tester': {let r=new RegExp(byId('text').value,byId('flags')?.value||'g');out((byId('sample').value.match(r)||[]).join('\\n')||'No matches');break}
 case 'color-converter': {let h=byId('text').value.replace('#','');let r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16);out(`RGB(${r}, ${g}, ${b})`);break}
 default: out('This tool page is ready. Add your inputs and use the calculation logic in assets/tools.js.');
 }
}
function startCountdown(){let end=Date.now()+((num('a')||60)*1000);let timer=setInterval(()=>{let left=Math.max(0,end-Date.now());out(Math.ceil(left/1000)+' seconds');if(!left)clearInterval(timer)},250)}
