const pricechery = 10.25;
const pricemeet = 15.00;
window.onload = function () {
    // alert("123");
    document.getElementById("p1").onblur = function () {
        zakaz();
    }
    document.getElementById("p2").onblur = function () {
        zakaz();
    }
    document.getElementById("zakaz").onclick = function () {
        submit();
    }
}
function zakaz() {
    var p1 = document.getElementById("p1").value;
    if(p1.toUpperCase().indexOf("ПАЧ") != -1) //Метод IndexOf() Выполняет поиск параметра в строке и возвращает индекс буквы с которой начинаеться совпадение иначе возвращает -1
    {
        p1 = parseInt(p1) * 10;//Метод ParseInt() преобразует строку к числу причем если после числа будут символы они будут отброшены и мы получим число. Получим ошибку если сначала будут идти символы и с этой ошиькой бориться фунцкция IsNaN()
    }
    else {
        p1 = parseInt(p1);
    }
    if(isNaN(p1))//Функция возвращает true если в переменной не число
    {
        p1 = 0;
    }
    var p2 = document.getElementById("p2").value;
    if(p2.toUpperCase().indexOf("ПАЧ") != -1)
    {
        p2 = parseInt(p2) * 10;
    }else{
        p2 = parseInt(p2);
    }
    if(isNaN(p2))
    {
        p2 = 0;
    }

 var cost = p1 * pricechery + p2 * pricemeet;
 document.getElementById("cost").value = cost.toFixed(2);
 // var pdv = (cost / 100) * 20;
 var pdv = cost * 0.20;
 document.getElementById("pdv").value = pdv.toFixed(2);
 var total = pdv + cost;
 document.getElementById("total").value = total.toFixed(2);
}
function submit() {
    var name = document.getElementById("name").value;
    var cost = document.getElementById("cost").value;
    if(name != "" && cost != "" && cost > 0)
    {
        document.getElementById("form").submit();
    }else{
        alert("Недостаточно данных для заказа");
    }
}