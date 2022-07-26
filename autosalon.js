window.onload = function () {
    document.getElementById("redact").style.display = "none";
    function Auto(id,model, price, date, photo) {
        this.id = id;
        this.model = model;
        this.price = price;
        this.date = new Date(date);
        this.photo = photo;
        this.info = function () {
            var day = this.date.getDay();
            console.log(day);
            var chislo = this.date.getDate();
            console.log(chislo);
            var months = this.date.getMonth()+1;
            console.log(months);
            var year = this.date.getFullYear();
            console.log(year)
             var fulldate = chislo+"-"+months+"-"+year;
            return "iD: "+this.id+" Модель авто: " + this.model + " Цена авто: " + this.price + " Год выпуска: " + fulldate + " Фото: <img width = '100px' src='images/" + this.photo + "'>";

        }
        }
        var auto1 = new Auto("0","Peugeot", 30000, "2021-11-24", "auto1.jpg");
        // document.getElementById("autos").innerHTML = auto1.info();
    var garage = [auto1,
        new Auto("1","BMW",25000,"2020-11-22","auto2.jpg"),
        new Auto("2","Jaguar",27500,"2019-05-15","auto3.jpg"),
        new Auto("3","Ferrari",115000,"2018-08-17","auto4.jpg"),
        new Auto("4","Toyota",11000,"2017-08-17","auto5.jpg"),
        new Auto("5","Mercedes",120000,"2015-08-17","auto6.jpg"),
        new Auto("6","LADA",1000,"2001-08-17","auto7.jpg")
        ];
    function showAuto(num) {
        document.getElementById("auto_search").style.display = "none";
        document.getElementById("autos").style.display = "block";

        if(num == 0 || num == null || num == "")
        {
            num = garage.length;
        }
        var text = "";
        var price = 0;
        // garage.sort(function (a, b) { return b.price - a.price; });
        garage.sort( function (a, b) { return b.date.getTime() - a.date.getTime()});
        for(var i = 0; i < num; i++)
        {
            if(i%2==0)
            {
                text+= "<p style='background-color: red'>";
            }else{
                text+= "<p>";
            }
            text+= garage[i].info()+"</p>";

            price += garage[i].price;

        }
        document.getElementById("autos").innerHTML = text;
        document.getElementById("price").innerText = "Общая стоимость авто: "+price;
    }
    showAuto(4);
    document.getElementById("b1").onclick = function () {
        showAuto();
    }

    document.getElementById("accept").onclick = function () {
        // console.log(document.getElementById("search").checked);
        // console.log(document.getElementById("del").checked);
        if(document.getElementById("del").checked)
        {
            del();
        }
        if(document.getElementById("search").checked)
        {
            search_auto();
        }
        if(document.getElementById("edit").checked)
        {
            edit();
        }


}


function del() {

            var id_auto = 0;
            id_auto = parseInt(document.getElementById("id").value);
            garage.splice(id_auto,1);
            showAuto();

}
function search_auto() {
    var model = document.getElementById("id").value.toUpperCase();
    console.log(model);
    if(model != "" && model != null && model != 0)
    {
        document.getElementById("autos").style.display = "none";
        document.getElementById("auto_search").style.display = "block";
        var price = 0;
        var text = "";
        for(var i = 0; i < garage.length; i++)
        {

            if( garage[i].model.toUpperCase().indexOf(model) != -1)
            {
                text += "<p>";
                text += garage[i].info()+"</p>";
                price += garage[i].price;

            }
        }

        document.getElementById("auto_search").innerHTML = text;
        if(text == "")
        {
            document.getElementById("auto_search").innerHTML = "<h2>По вашему запросу авт не найдено!</h2>";

        }
        document.getElementById("price").innerText = "Общая стоимость авто: "+price;

    }
}
function add_auto() {
    var model = document.getElementById("name").value;
    var price = parseInt(document.getElementById("cena").value);
    var date = document.getElementById("date").value;
    if(model != null && model != "" && price != null && price != "" && date != null && date != "")
    {
        var id = garage.length;
        var auto = new Auto(id,model,price,date,"nofoto.png");
        garage.push(auto);
        showAuto();
    }else{
        document.getElementById("error1").innerText = "Неверно заполнены поля или они пусты!";
    }
}
document.getElementById("send").onclick = function () {
        add_auto();
}
function clear() {
    document.getElementById("name").value = "";
    document.getElementById("cena").value = "";
    document.getElementById("date").value = "";
}
document.getElementById("clear").onclick = function () {
        clear();
}

function edit() {
    var id_auto = parseInt(document.getElementById("id").value);
    var model = garage[id_auto].model;
    var price = garage[id_auto].price;
    var date = garage[id_auto].date;
    if(model != "" && price != "" && date != ""&& model != null && price != null && date != null)
    {
        document.getElementById("redact").style.display = "block";
        document.getElementById("e_name").value = model;
        document.getElementById("e_price").value = price;
        document.getElementById("e_date").value = date;
        document.getElementById("e_id").value = id_auto;
    }
}
function edit_auto() {
    var model = document.getElementById("e_name").value;
    var price = document.getElementById("e_price").value;
    var date = document.getElementById("e_date").value;
    var id = document.getElementById("e_id").value;
    if(model != "" && price != "" && date != ""&& model != null && price != null && date != null && id != null)
    {
        garage[id].model = model;
        garage[id].price = price;
        garage[id].fulldate = date;
        showAuto();
    }
}
document.getElementById("e_send").onclick = function () {
    edit_auto();
}
























//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}