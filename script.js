
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
    //no caso do termo a palavraCorreta é do banco, ou gerada automáticamente
    const palavraCorreta = palavraAleatoria;
    const maxTentativas = 6; //a primeira meio q n conta
    let tentativas = 0;
    let acertos = 0;
    let completo = 0;
    var del = 0;


    let letras = [], letrasCount = [], contador = 0;
    for (var i=0; i<5; i++) letrasCount[i] = 0;

    //para cada letra da palavraCorreta...
    for (var i = 0; i < 5; i++){
        var contem = false;

        for (var j = 0; j < 5; j++){
            if(palavraCorreta[i] == letras[j]){
                contem = true;
                letrasCount[j]++;
                break;
            }
        }

        if(!contem){
            letras[contador] = palavraCorreta[i];
            letrasCount[contador]++;
            contador++;
        }
    }

    //TESTES
    // for(var k = 0; k < 5; k++) {
    //     console.log("letra: " + letras[k]);
    //     console.log("qtd: " + letrasCount[k]);
    // }

    //! ANTES DE ENVIAR
    //sempre que apertar em "apagar"
    $(".input-letra").keydown(function(event) {
        if(event.which == 8){
            //o campo está vazio AND anterior não está vazio
            if($(this).val() == "" && $(this).prev().val() !== ""){
                $(this).prev().val("");
                $(this).prev().focus();
            }
            del=1;
            return;
        }
    });
    
    //sempre que digitar
    $(".input-letra").on("keyup", function() {
        //evita que ative a função caso aperte em "apagar"
        if(del==1){
            del=0;
            return;
        }
        
        this.value = this.value.toUpperCase(); //passa cada letra que digita para maíusculo (visual)
        let inputs = document.querySelectorAll(".palpite"); //pega todos inputs do palpite
        
        //encontre o próximo input vazio (esquerda para direita)
        for (var i = 0; i < 5; i++) {
            if(inputs[i].value == ""){
                $(inputs[i]).focus();
                break;
            }
        }

        //veja se todos inputs estão preenchidos
        for (var i = 0; i < 5; i++) {
            if(inputs[i].value !== "") completo++;
        }

        //se sim, foque no botão
        if(completo == 5) $("#submit").focus();
        else completo=0;
    });

    //! DEPOIS DE ENVIAR
    //? Ao clicar no botão de enviar
    $("#submit").click(function () {
        let inputs = document.querySelectorAll(".palpite");
        var palavra = "";

        for (var i = 0; i < 5; i++) {
            //formando a palvra
            palavra += inputs[i].value;
        }
        
        const palpite = palavra.toUpperCase(); //apenas segurança, pois o CSS já o faz
        if (palpite.length !== 5) {
            alert("Por favor, digite uma palavra de 5 letras.");
            return;
        }

        //! Daqui em diante já é uma tentativa válida
        tentativas++
        
        for (let i = 0; i < 5; i++) {
            $(inputs[i]).removeClass("palpite");    //remova do formX a classe palpite
            $(inputs[i]).prop("disabled", true);    //desativa o formX
            if (palpite[i] === palavraCorreta[i]) {
                //letra correta e na posição certa
                $(inputs[i]).css("background-color", "lightgreen");
                acertos++;

                for(var j = 0; j < 5; j++){
                    if(palpite[i] == letras[j]){
                        letrasCount[j]--;
                        break;
                    }
                }
            } else if (palavraCorreta.includes(palpite[i])) {
                for(var j = 0; j < 5; j++){
                    //até achar a letra que acertou
                    if(palpite[i] == letras[j]){
                        //se ainda tiver quantidade no contador
                        if(letrasCount[j]>=0){
                            //ok
                            letrasCount[j]--;
                            $(inputs[i]).css("background-color", "lightyellow");
                            acertos++;
                            break;
                        }else{
                            //bug
                            $(inputs[i]).css("background-color", "lightcoral");
                            break;
                        }
                    }
                }

                //letra correta mas na posição errada
                
            } else {
                //letra não está na palavra
                $(inputs[i]).css("background-color", "lightcoral");
            }
        }
        
        if (palpite === palavraCorreta) {
            //Se acertar a palavra
            $("#message").text(`Parabéns! Você adivinhou a palavra com ${tentativas} tentativas!`);
            $("#message").css("color", "green");
            $("#submit").hide();
            $("#reiniciar").show();

            //tocar som da Shopee
            var audio = new Audio("./sons/ganhou.mp3");
            audio.volume = 0.1;
            audio.play();
            var audio = new Audio("./sons/acertou.mp3");
            audio.volume = 0.1;
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
            audio.volume = 0.1;
            audio.play();


            return;
        }

        //a cada tentativa, reproduzir um som positivo se acertos>=3 e negativo se não
        if(acertos >= 3){
            var audio = new Audio("./sons/acertou.mp3");
            audio.volume = 0.1;
            audio.play();
        }else {
            var audio = new Audio(`./sons/errou${tentativas}.mp3`);
            audio.volume = 0.1;
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
