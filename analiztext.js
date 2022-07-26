window.onload = function () {
    document.getElementById("send").onclick = function () {
        analiz();
    }
}
function analiz() {
    var text = document.getElementById("text").value;
    var total_words = 0;
    var total_sentences = 0;
    var total_syllables = 0;
    var index = 0;
    var result = 0;
    total_words = count_words(text);
    total_sentences = count_sentences(text);
     total_syllables = count_syllables(text);
     index = 206.875-1.015*(total_words/total_sentences)-84.6*(total_syllables/total_words);
     if(index == 100)
     {
         result = "<Очень легко читается. Средняя длина предложения составляет 12 или менее слов. Нет слов из более чем 2 слогов.";
     }else if(index < 100 && index >= 65 )
     {
         result = "Простой английский язык. Средняя длина предложения составляет от 15 до 20 слов. В среднем слова имеют 2 слога.";
     }else if (index < 65 && index >= 30)
     {
         result = "Немного трудно читать. Предложения содержат до 25 слов. Обычно, двусложные слова.";
     }
     else if (index < 30 && index >= 0)
     {
         result = "Очень трудно читать. В среднем предложение имеет 37 слов. Слово имеет в среднем более 2 слогов.";
     }else{
         result = 0;
     }
     // switch (index)
     // {
     //     case (index == 100):
     //         result = index+"Очень легко читается. Средняя длина предложения составляет 12 или менее слов. Нет слов из более чем 2 слогов.";
     //         break;
     //     case (index >= 65):
     //         result = index+"Простой английский язык. Средняя длина предложения составляет от 15 до 20 слов. В среднем слова имеют 2 слога.";
     //         break;
     //     case (index >= 30):
     //         result = index+"Немного трудно читать. Предложения содержат до 25 слов. Обычно, двусложные слова.";
     //         break;
     //     case (index >= 0):
     //         result = index+"Очень трудно читать. В среднем предложение имеет 37 слов. Слово имеет в среднем более 2 слогов.";
     //         break;
     //     default: result = 0;
     //     break;
     // }
    document.getElementById("result").innerHTML = "Текст содержит<br> Количество слов:"+total_words+"<br>Количество предложений:"+total_sentences+"<br>Количество слогов:"+total_syllables+"<br> Имеет индекс удобочитаемости:"+index+"<br> В результате можно сказать что текст: "+result;
}
/////////////////////////////
function count_words(text) {
    var count = 0;
    count = text.split(" ").length;


    return count;
}
function count_sentences(text) {
    var count = 0;
    var count_words = text.split(" ");
    // console.log(count_words);

    for(var i = 0; i < count_words.length; i++) {
        if (count_words[i].indexOf("?") != -1 || count_words[i].indexOf("!") != -1 || count_words[i].indexOf(".") != -1) {
            count++;
        }
    }

    return count;
}
function count_syllables(text) {
    /*
    Ивристический алгоритм
    0.Поделить текст на слова
    1.Если слово состоит из трех и менее символов то считаем 1 слог
    2.Считаем гласные буквы в слове где каждая гласная буква - 1 слог К гласным относяться A, E, I, O, U
    2.1 Если две гласные букыв идут подряд то считаеться 1 слог НАпример: look - 1 слог
    2.2 Если слово заканчиваеться на букву E - то не считаеться слог например where - 1 слог
    2.3 Если слово заканачиваеться на букву Y то считаеться 1 слог Например proxy - 2 слога
    believe - 2 слога
     */
    var count = 0;
    var count_words = text.split(" ");
    for(var i = 0; i < count_words.length; i++)
    {
       // console.log(count_words[i].length);
        if(count_words[i].length <= 3)
        {
            count++;
        // }else if(count_words[i].toUpperCase().indexOf("OO") != -1 ||
        //     count_words[i].toUpperCase().indexOf("AA") != -1 ||
        //     count_words[i].toUpperCase().indexOf("EE") != -1 ||
        //     count_words[i].toUpperCase().indexOf("OU") != -1 ||
        //     count_words[i].toUpperCase().indexOf("EA") != -1 ||
        //     count_words[i].toUpperCase().indexOf("OA") != -1 ||
        //     count_words[i].toUpperCase().indexOf("EI") != -1 ||
        //     count_words[i].toUpperCase().indexOf("IE") != -1 ||
        //     count_words[i].toUpperCase().indexOf("II") != -1 ||
        //     count_words[i].toUpperCase().indexOf("UU") != -1 )
        // {
        //     count++;
        } else{
            //    2.Считаем гласные буквы в слове где каждая гласная буква - 1 слог К гласным относяться A, E, I, O, U
            var word = count_words[i].toUpperCase().split("");
            // console.log(word)
            var status = false;
            for(var j = 0; j < word.length; j++)
            {
                if(word[j] == "A" || word[j] == "E" || word[j] == "I" || word[j] == "O" || word[j] == "U") {
                    if(!status)
                    {
                        count++;
                        status = true;
                    }

                }else{
                    status = false;
                }

            }
            status = false;
             // console.log("test"+word);
            if(word[word.length-1] == "E")
            {
                count--;
            }
            if(word[word.length-1] == "Y")
            {
                count++;
            }
            // var count_words_double = count_words[i].toUpperCase();
            // if(count_words_double == "AA" || count_words_double == "EE" || count_words_double == "II" || count_words_double == "OO" || count_words_double == "UU")
            // {
            //     count++;
            // }

        }
    }


    return count;
}
