window.onload = function () {
   start();
}
function start() {
    var botarray = ["камень","ножницы","бумага"];
    var pc = botarray[getRand(0,2)];
    // alert(pc);
    var player =  prompt("Введите ответ:");
    player = player.toLowerCase();
    if(player == "ножницы" || player == "бумага" || player == "камень")
    {
        if(pc == player)
        {
            document.getElementById("s2").innerText = player;
            document.getElementById("s1").innerText = pc;
            document.getElementById("s3").innerText = "Ничья";
        }else{
            if(pc == "камень" && player == "ножницы" || pc == "ножницы" && player == "бумага" || pc == "бумага" && player == "камень")
            {
                document.getElementById("s2").innerText = player;
                document.getElementById("s1").innerText = pc;
                document.getElementById("s3").innerText = "Компьютер выиграл!";
            }else{
                document.getElementById("s2").innerText = player;
                document.getElementById("s1").innerText = pc;
                document.getElementById("s3").innerText = "Вы выиграли!";
            }
        }
    }else{
        document.getElementById("s3").innerText ="Такого ответа не существует! Попробуйте такие варианты: 'Камень' 'Ножницы' 'Бумага' ";

    }


}
function getRand(min,max) {
    return Math.floor(Math.random()*max)+min;
}