let mousePosition = [0,0];
let interval;
localStorage.clicking = "false"

if (!localStorage.mouseClickInterval){
    localStorage.mouseClickInterval = 1;
}


function click(x,y){
    try{
        var ev = document.createEvent("MouseEvent");
        var el = document.elementFromPoint(x,y);
        ev.initMouseEvent("click", true, true, window, null, x, y, 0, 0, false, false, false, false, 0, null);
        el.dispatchEvent(ev);
    }catch{console.log}
}


if (localStorage.clicking == true){
    console.log(localStorage.clicking)
    startAutoClicker();
}

function startAutoClicker(){
    interval = setInterval(() => {
        click(...mousePosition)
        if (localStorage.clicking == false){clearInterval(interval)}
    }, localStorage.mouseClickInterval * 1000);
}

(function(){
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key == ","){
            localStorage.clicking = 'true';
            startAutoClicker()
        }
        else if (e.ctrlKey && e.key == "."){
            if (interval){
                localStorage.clicking = 'false'
                clearInterval(interval);
            }
        }
    })
    document.addEventListener('mousemove', (e) => {
        mousePosition = [e.x, e.y];
    })
})()