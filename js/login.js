'use strict'

const loginContainer = document.getElementById('login-container')

const moveOverlay = () => loginContainer.classList.toggle('move')

document.getElementById('open-register').addEventListener('click', moveOverlay)
document.getElementById('open-login').addEventListener('click', moveOverlay)

document.getElementById('open-register-mobile').addEventListener('click', moveOverlay)
document.getElementById('open-login-mobile').addEventListener('click', moveOverlay)

var x = document.getElementById("search");
var teto = document.getElementById("teto");
var matue = document.getElementById("matue");
var xama = document.getElementById("xama");
var drake = document.getElementById("drake");
var anitta = document.getElementById("anita");
var pericles = document.getElementById("pericles");
var belo = document.getElementById("belo");
var adele = document.getElementById("adele");
var erro = document.getElementById("erro")

function change() {

}

function check() {

    if (x.value == 'teto') {

        return teto.style.display = "block";

    } else if (x.value == 'matue') {

        matue.style.display = "block";
    } else if (x.value == 'xama') {

        xama.style.display = "block";
    } else if (x.value == 'adele') {

        adele.style.display = "block";
    } else if (x.value == 'pericles') {

        pericles.style.display = "block";
    } else if (x.value == 'belo') {

        belo.style.display = "block";
    } else if (x.value == 'drake') {

        drake.style.display = "block";
    } else if (x.value == 'anitta') {

        anitta.style.display = "block";
    } else {

        erro.style.display = "block";
    }
}