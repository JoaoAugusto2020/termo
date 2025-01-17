import { palavraAleatoria } from './palavras.js';
console.log("palavra aleatória = " + palavraAleatoria);

//! MOSTRAR AS REGRAS
//? Ao carregar a página...
$(document).ready(function () {
    $("#ok").click(function () {
        $("#regras").hide();
        $(".container").show();
    })
});

//? Ao carregar a página...
$(document).ready(function () {
    //Palavra do dia
    const palavraCorreta = palavraAleatoria;

    //Funcionamento geral e visual
    const maxTentativas = 6;
    let tentativas = 0;
    let acertos = 0, completo = 0;

    //Entradas
    let inputs = document.querySelectorAll(".palpite"); //pega todos inputs do palpite

    //! ANTES DE ENVIAR
    //sempre que apertar uma letra
    $(".input-letra").keydown(function(event) {
        //sempre que apertar em "apagar"
        if(event.which == 8){
            //o campo está vazio AND anterior não está vazio
            if($(this).val() == "" && $(this).prev().val() !== ""){
                $(this).prev().val("");
                $(this).prev().focus();
            }
            return;
        }
        
        //passa cada letra que digita para maíusculo
        this.value = this.value.toUpperCase(); //apenas por segurança, pois o CSS já o faz

        //encontre o próximo input vazio (esquerda para direita)
        for (var i = 0; i < 5; i++) {
            if(inputs[i].value == ""){
                $(inputs[i]).focus();
                break;
            }
        }

        //conte quantos inputs estão preenchidos
        for (var i = 0; i < 5; i++) if(inputs[i].value !== "") completo++;
        //se todos estiverem preenchidos, foque no botão
        if(completo == 5) $("#submit").focus();
        else completo=0;
    });

    //! DEPOIS DE ENVIAR
    //? Ao clicar no botão de enviar
    $("#submit").click(function () {
        //forma a palavra
        var palavra = "";
        for (var i = 0; i < 5; i++) {
            palavra += inputs[i].value;
        }
        
        //passa a palavra para maíuscula
        const palpite = palavra;
        if (palpite.length !== 5) {
            alert("Por favor, digite uma palavra de 5 letras.");
            return;
        }

        //! Daqui em diante já é uma tentativa válida
        tentativas++;
        
        for (let i = 0; i < 5; i++) {
            $(inputs[i]).removeClass("palpite");    //remova do formX a classe palpite
            $(inputs[i]).prop("disabled", true);    //desativa o formX
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
            $(inputs[0]).focus();
        }
        
        if (palpite === palavraCorreta) {
            //Se acertar a palavra
            $("#message").text(`Parabéns! Você adivinhou a palavra com ${tentativas} tentativas!`);
            $("#message").css("color", "green");
            $("#submit").hide();
            $("#reiniciar").show();

            //tocar som da Shopee
            var audio = new Audio("./sons/ganhou.mp3");
            audio.play();
            var audio = new Audio("./sons/acertou.mp3");
            audio.play();

            return;
        } else if (tentativas >= maxTentativas) {
            //se acabar as tentativas e não tiver ganhado
            $("#message").text(`Você atingiu o número máximo de tentativas! A palavra era "${palavraCorreta}".`);
            $("#message").css("color", "red");
            $("#submit").hide();
            $("#reiniciar").show();

            //tocar som de gameorver
            var audio = new Audio("./sons/perdeu.mp3");
            audio.play();


            return;
        }

        //a cada tentativa, reproduzir um som positivo se acertos>=3 e negativo se não
        if(acertos >= 3){
            var audio = new Audio("./sons/acertou.mp3");
            audio.play();
        }else {
            var audio = new Audio(`./sons/errou${tentativas}.mp3`);
            audio.play();
        }
        acertos=0;

        //mostra quantas tentativas restam
        $("#message").text(`Tentativas restantes: ${maxTentativas - tentativas}`);

        //ativa o próximo formulário para ser o novo palpite
        var novoinputs = document.querySelectorAll(`#form${tentativas+1}>.inputs>input`);
        for (let i = 0; i < 5; i++) {
            $(novoinputs[i]).addClass("palpite");
            $(novoinputs[i]).prop("disabled", false);
        }
    });

    //! QUANDO ACABAR
    //? Ao clicar no botão de enviar
    $("#reiniciar").click(function () {
        location.reload();
    });
});