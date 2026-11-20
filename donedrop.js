(function(){
var host=document.currentScript&&document.currentScript.parentNode||document.body;
var wrap=document.createElement('div');
wrap.innerHTML='<h2 class="sr-only">Done Drop: an 8-bit pixel cat walks right, drops a surprise fruit, then sits and licks its paw.</h2>'+
'<div style="background:var(--bg-neutral);border-radius:12px;padding:8px 0 4px;"><canvas style="display:block;width:100%;height:96px;image-rendering:pixelated"></canvas></div>'+
'<div style="text-align:center;margin-top:10px"><button type="button">Drop another</button></div>';
host.appendChild(wrap);
var cv=wrap.querySelector('canvas'),btn=wrap.querySelector('button'),ctx=cv.getContext('2d');
var C={O:'#EF9F27',D:'#BA7517',K:'#2C2C2A',P:'#ED93B1',R:'#E24B4A',G:'#639922',Y:'#FAC775',V:'#7F77DD',U:'#534AB7'};
var head=["..........O...O.","..........OO.OO."];
var walkA=head.concat(["O.........OOOOOO","O.........OKOOKO",".O........OOOPOO",".OOOOOOOOOOOOOO.","..OODOODOODOOO..","..OOOOOOOOOOOO..","..OO.O....O.OO..","..O..O....O..O.."]);
var walkB=head.concat(["O.........OOOOOO","O.........OKOOKO",".O........OOOPOO",".OOOOOOOOOOOOOO.","..OODOODOODOOO..","..OOOOOOOOOOOO..","...O.O....O.O...","...O.O....O.O..."]);
var sit=head.concat(["..........OOOOOO","..........OKOOKO","..........OOOPOO",".........OOOOOO.","........OOOOOO..","........ODOODO..","........OOOOOO..","OOOOOOOOOOO.OO.."]);
var lick=head.concat(["..........OOOOOO","..........ODOODO","..........OOOOPO",".........OOOOOOO","........OOOOOOO.","........ODOODO..","........OOOOOO..","OOOOOOOOOOO..O.."]);
var fruits=[
{name:'Apple',spr:["..G..",".RRR.","RRRRR","RRRRR",".RRR."]},
{name:'Banana',spr:["....YK","...YY.","..YYY.","YYYY..",".YY..."]},
{name:'Grapes',spr:["..G..",".VVV.","VUVUV",".VUV.","..V.."]},
{name:'Strawberry',spr:["GGGGG","RYRRR","RRRYR",".RYR.","..R.."]},
{name:'Watermelon',spr:["RRKRRKR","GRRRRRG",".GRKRG.","..GGG.."]}];
var S=4,timer,last=-1;
function draw(spr,x,y){spr.forEach(function(row,j){row.split('').forEach(function(ch,i){if(ch!=='.'){ctx.fillStyle=C[ch];ctx.fillRect(Math.round(x+i*S),Math.round(y+j*S),S,S)}})})}
function run(){
clearInterval(timer);var k;do{k=Math.floor(Math.random()*fruits.length)}while(k===last);last=k;var f=fruits[k];
var r=cv.getBoundingClientRect(),dp=window.devicePixelRatio||1,W=r.width,H=r.height;
cv.width=W*dp;cv.height=H*dp;ctx.setTransform(dp,0,0,dp,0,0);ctx.imageSmoothingEnabled=false;
var ground=H-12,catY=ground-10*S,rest=ground-f.spr.length*S,mid=W*0.32,end=W*0.62;
var t=0,x=-16*S,phase='walk1',fx=null,fy=null,hold=0,lt=0;
timer=setInterval(function(){
ctx.clearRect(0,0,W,H);ctx.fillStyle='#888780';ctx.fillRect(0,ground,W,2);
var fr;
if(phase==='walk1'){x+=6;fr=t%2?walkA:walkB;if(x>=mid){phase='drop';hold=0}}
else if(phase==='drop'){fr=walkA;hold++;if(hold===3){fx=x;fy=catY+3*S}if(hold>=8)phase='walk2'}
else if(phase==='walk2'){x+=6;fr=t%2?walkA:walkB;if(x>=end)phase='sit'}
else{lt++;var c=lt%20;fr=(c>=6&&c<16&&c%2===0)?lick:sit}
if(fx!==null){if(fy<rest)fy=Math.min(rest,fy+S*2);draw(f.spr,fx,fy)}
draw(fr,x,catY);t++;
},125)}
btn.onclick=run;
if(document.readyState==='complete')run();else window.addEventListener('load',run);
})();
