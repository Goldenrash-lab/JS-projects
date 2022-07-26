var kino = [[true,true,true,true,true,true,true,true],
            [true,true,true,true,true,true,true,true],
            [true,true,true,true,true,true,true,true],
                [true,true,true,true,true,true],
                  [true,true,true,true,true]];
var kino_etalon = [[true,true,true,true,true,true,true,true],
                  [true,true,true,true,true,true,true,true],
                  [true,true,true,true,true,true,true,true],
                        [true,true,true,true,true,true],
                            [true,true,true,true,true]];
window.onload = function () {
    init();
    document.getElementById("buy").onclick = function () {
        sale();
    }
    document.getElementById("search").onclick = function () {
        search_seat();
    }
}
function init() {
    for(var i = 0; i < kino.length;i++)
    {
        for(var j = 0; j < kino[i].length; j++)
        {
            if(kino[i][j])
            {
                document.getElementById("k"+(i+1)+"_"+(j+1)).src = "images/seat_green.png";
                document.getElementById("k"+(i+1)+"_"+(j+1)).title = "Кресло свободно";
            }else{
                document.getElementById("k"+(i+1)+"_"+(j+1)).src = "images/seat_grey.png";
                document.getElementById("k"+(i+1)+"_"+(j+1)).title = "Кресло зарезервировано";
            }
        }

    }
}
function rezerved(row,mesto) {
    if(kino_etalon[row-1][mesto-1])
    {
        if(kino[row-1][mesto-1])
        {
            document.getElementById("k"+row+"_"+mesto).src = "images/seat_grey.png";
            document.getElementById("k"+row+"_"+mesto).title = "Кресло зарезервировано!";
            kino[row-1][mesto-1] = false;
        }
        else{
            document.getElementById("k"+row+"_"+mesto).src = "images/seat_green.png";
            document.getElementById("k"+row+"_"+mesto).title = "Кресло свободно!";
            kino[row-1][mesto-1] = true;
        }
    }
}
function sale() {
    var seat = 0;
        for(var i = 0; i < kino.length; i++)
        {
            for(var j = 0; j < kino[i].length;j++)
            {
                if(!kino[i][j])
                {
                    document.getElementById("k"+(i+1)+"_"+(j+1)).src = "images/seat_red.png";
                    document.getElementById("k"+(i+1)+"_"+(j+1)).title = "Кресло продано!";
                    kino_etalon[i][j] = false;


                    if(i == 0)
                    {
                        seat += 120;
                    }
                    else if(i == 1 && j == 0)
                    {
                        seat += 80;
                    }
                    else if(i == 1 && j == (kino[i].length-1))
                    {
                        seat += 80;
                    }
                    else if(i == 2 && j == 0)
                    {
                        seat += 80;
                    }
                    else if (i == 2 && j == (kino[i].length-1))
                    {
                        seat += 80;
                    }
                    else if(i == 3 && j == 0)
                    {
                        seat += 80;
                    }
                    else if(i == 3 && j == (kino[i].length-1))
                    {
                        seat += 80;
                    }
                    else if (i == 4)
                    {
                        seat += 50;
                    }
                    else{
                        seat += 100;
                    }
                }
            }
        }
        document.getElementById("cost").innerText = "Кинотеатр заработал: "+seat+" грн";
}
function search_seat() {
 var kolvo  = 0;
 kolvo = parseInt(document.getElementById("kolvo").value);
 var ask = false;
    switch (kolvo)
    {
        case 3:
            for(var i = 0; i < kino_etalon.length; i++)
            {
                for(var j = 0; j < kino_etalon[i].length; j++)
                {
                    if(kino_etalon[i][j] && kino_etalon[i][j+1] && kino_etalon[i][j+2])
                    {
                        var msg = "Ряд №"+(i+1)+"Кресло №"+(j+1)+" и "+"Кресло №"+(j+2)+"Кресло №"+(j+3)+" свободны будете брать?";
                        ask = confirm(msg);
                        if(ask)
                        {
                            document.getElementById("k"+(i+1)+"_"+(j+1)).src = "images/seat_red.png";
                            document.getElementById("k"+(i+1)+"_"+(j+2)).src = "images/seat_red.png";
                            document.getElementById("k"+(i+1)+"_"+(j+3)).src = "images/seat_red.png";
                            document.getElementById("k"+(i+1)+"_"+(j+1)).title = "Кресло продано";
                            document.getElementById("k"+(i+1)+"_"+(j+2)).title = "Кресло продано";
                            document.getElementById("k"+(i+1)+"_"+(j+3)).title = "Кресло продано";
                            kino[i][j] = kino_etalon[i][j] = false;
                            kino[i][j+1] = kino_etalon[i][j+1] = false;
                            kino[i][j+2] = kino_etalon[i][j+2] = false;
                            break;
                        }
                    }
                }
                if(ask == true)
                {
                    break;
                }

            }
            break;
        case 2:
            for(var i = 0; i < kino_etalon.length; i++)
            {
                for(var j = 0; j < kino_etalon[i].length; j++)
                {
                    ask = optimized_search(i,j,kolvo);
                    if(ask)
                    {
                        break;
                    }
                }
                if(ask == true) {
                    break;
                }
            }
            break;

    }
    if(ask == false)
    {
        alert("По вашему запросу ничего не найдено!");
    }


}
function optimized_search(r,m,kolvo) {
    var status = false;
    var num = 0;
    for(var i = m; i <(m+kolvo); i++)
    {
        if(kino_etalon[r][i])
        {
            status = true;
            num++;
        }else{
            status = false;
            num = 0;
        }
    }
    var ask = false;
    if(status == true && num == kolvo)
    {
        var msg = "Ряд №"+(r+1)+" Кресло с "+(m+1)+" по "+(m + kolvo)+" свободны будете брать?"
        ask = confirm(msg);
        if(ask)
        {
            for(var z = m; z < (m+kolvo); z++)
            {
                document.getElementById("k"+(r+1)+"_"+(z+1)).src = "images/seat_red.png";
                document.getElementById("k"+(r+1)+"_"+(z+1)).title = "Кресло продано!";
                kino[r][z] = kino_etalon[r][z] = false;
            }
        }
    }
    return ask;
}
