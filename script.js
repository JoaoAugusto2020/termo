$(document).ready(function () {
    $("#ok").click(function () {
        $("#regras").css("display", "none");
        $(".container").css("display", "block");
    })
});

$(document).ready(function () {
    //no caso do termo a palavraCorreta é do banco, ou gerada automáticamente
    const palavraCorreta = "TIGRE";
    //https://www.npmjs.com/package/@andsfonseca/palavras-pt-br?activeTab=readme (vale a pena tentar)
    const maxTentativas = 6; //a primeira meio q n conta
    let tentativas = 0;
    let acertos = 0, completo = 0;
    var del =0;

    
    $(".input-letra").keydown(function(event) {
        if(event.which == 8){
            if($(this).val() == "" && $(this).prev().val() !== ""){
                $(this).prev().val("");
                $(this).prev().focus();
            }
            del=1;
            return;
        }
    });

    //! ANTES DE ENVIAR
    $(".input-letra").on("keyup", function() {
        if(del==1){
            del=0;
            return;
        }
        
        let inputs = document.querySelectorAll(".palpite");
        this.value = this.value.toUpperCase();
        
        for (var i = 0; i < 5; i++) {
            if(inputs[i].value == ""){
                $(inputs[i]).focus();
                break;
            }
        }

        for (var i = 0; i < 5; i++) {
            if(inputs[i].value !== "") completo++;
        }
        if(completo == 5) $("#submit").focus();
        else completo=0;
    });

    //! DEPOIS DE ENVIAR
    $("#submit").click(function () {
        let inputs = document.querySelectorAll(".palpite");
        var palavra = "";
        for (var i = 0; i < 5; i++) {
            palavra += inputs[i].value;
        }
        
        const palpite = palavra.toUpperCase();
        if (palpite.length !== 5) {
            alert("Por favor, digite uma palavra de 5 letras.");
            return;
        }

        //! Daqui em diante já é uma tentativa válida
        tentativas++;
        
        for (let i = 0; i < 5; i++) {
            $(inputs[i]).removeClass("palpite");
            $(inputs[i]).prop("disabled", true);
            if (palpite[i] === palavraCorreta[i]) {
                //letra correta e na posição certa
                $(inputs[i]).css("background-color", "lightgreen");
                acertos++;
            } else if (palavraCorreta.includes(palpite[i])) {
                //letra correta mas na posição errada
                $(inputs[i]).css("background-color", "lightyellow");
                acertos++;
            } else {
                //letra não está na palavra
                $(inputs[i]).css("background-color", "lightcoral");
            }
        }

        if(acertos >= 3){
            var audio = new Audio("./sons/acertou.mp3");
            audio.play();
        }else {
            var audio = new Audio(`./sons/errou${tentativas}.mp3`);
            audio.play();
        }
        acertos=0;

        if (palpite === palavraCorreta) {
            $("#message").text(`Parabéns! Você adivinhou a palavra com ${tentativas} tentativas!`);
            $("#message").css("color", "green");
            $("#submit").prop("disabled", true);

            var audio = new Audio("./sons/ganhou.mp3");
            audio.play();

            return;
        } else if (tentativas >= maxTentativas) {
            $("#message").text(`Você atingiu o número máximo de tentativas! A palavra era "${palavraCorreta}".`);
            $("#message").css("color", "red");
            $("#submit").prop("disabled", true);

            var audio = new Audio("./sons/perdeu.mp3");
            audio.play();
            return;
        }

        $("#message").text(`Tentativas restantes: ${maxTentativas - tentativas}`);

        var novoinputs = document.querySelectorAll(`#form${tentativas+1}>.inputs>input`);
        for (let i = 0; i < 5; i++) {
            $(novoinputs[i]).addClass("palpite");
            $(novoinputs[i]).prop("disabled", false);
        }
    });
});