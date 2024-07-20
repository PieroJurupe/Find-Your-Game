function getCurrentTimestamp() {
	return new Date();
}
function renderMessageToScreen(args) {
	let displayDate = (args.time || getCurrentTimestamp()).toLocaleString('en-IN', {
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	});
	let messagesContainer = $('.messages');
	let message = $(`
		<li class="message ${args.message_side}">
			<div class="avatar"></div>
			<div class="text_wrapper">
				<div class="text">${args.text}</div>
				<div class="timestamp">${displayDate}</div>
			</div>
		</li>
		`);
	messagesContainer.append(message);
	setTimeout(function () {
		message.addClass('appeared');
	}, 0);
	messagesContainer.animate({ scrollTop: messagesContainer.prop('scrollHeight') }, 300);
}
function showUserMessage(message, datetime) {
	renderMessageToScreen({
		text: message,
		time: datetime,
		message_side: 'right',
	});
}
function showBotMessage(message, datetime) {
	renderMessageToScreen({
		text: message,
		time: datetime,
		message_side: 'left',
	});
}
let respuesta1, respuesta2, respuesta3, respuesta4;
function showMultipleChoiceQuestion(question, options, callback) {
	showBotMessage(question);
	let optionsDiv = $('<div class="options-container"/>');
	options.forEach(function (option, index) {
		let optionButton = $(`<button class="option-button">${option}</button>`);
		optionButton.on('click', function (e) {
			showUserMessage(option);
			$('.option-button').attr('disabled', 'disabled');
			if (callback) {
				callback(option);
			}
		});
		optionsDiv.append(optionButton);
	});
	$('.messages').append(optionsDiv);
}
function showAnswersInConsole() {
	console.log("Respuesta 1: " + respuesta1);
	console.log("Respuesta 2: " + respuesta2);
	console.log("Respuesta 3: " + respuesta3);
	console.log("Respuesta 4: " + respuesta4);
	getCompletion();
}

//GPT API CONFIG  ---> SI DESEAS PUEDES AGREGAR UNA KEY DE GPT PERSONAL PARA PROBAR LAS FUNCIONALIDADES DE LA API	

const API_KEY = 'AQUI VA LA KEY';
async function getCompletion() {
	try {
		const res = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + API_KEY
			},
			body: JSON.stringify({
				model: 'gpt-3.5-turbo',
				messages: [
					{
						role: "system",
						content: "Eres un asistente inteligente que recomienda videojuegos."
					},
					{
						role: "user",
						content: `Recomiendame cuatro videojuegos ten en cuenta que al jugar busco ${respuesta1}, ademas de disfrutar los juegos mas por ${respuesta2}, en cuanto a si el juego es nuevo o viejo opino al 100% - ${respuesta3} - y en los juegos siempre me fijo en ${respuesta4} no entres en detalles de los juegos solo dame los nombres de los juegos e inicia con el siguiente texto: Los juegos que yo te recomendaria son:`
					}
				],
				max_tokens: 120,
			})
		});
		const data = await res.json();
		const modelResponse = data.choices[0].message.content;

		showBotMessage(modelResponse); 
	} catch (error) {
		console.error('Error:', error);
	}
}
$('#send_button').on('click', function (e) {
	showUserMessage($('#msg_input').val());
	$('#msg_input').val('');
	setTimeout(function () {
		showBotMessage("Hola, para ayudarte a elegir un videojuego te hare un breve test:)", getCurrentTimestamp());
		setTimeout(function () {
			showMultipleChoiceQuestion('Cuando juegas videojuegos ¿Que buscas?', ['Relajarme', 'Competir', 'Jugar con amigos', 'Algo desafiante'], function (answer) {
				respuesta1 = answer;
				setTimeout(function () {
					showMultipleChoiceQuestion('¿Los juegos los disfrutas por?', ['Su jugabilidad', 'Su historia', 'Sus graficos', 'Sus mecanicas'], function (answer) {
						respuesta2 = answer;
						setTimeout(function () {
							showMultipleChoiceQuestion('¿Que te importa mas en un juego?', ['Que sea nuevo', 'Que sea retro', 'Me da igual'], function (answer) {
								respuesta3 = answer;
								setTimeout(function () {
									showMultipleChoiceQuestion('¿Al escoger un juego por que te guias?', ['Que sea popular', 'Que tenga multiplayer', 'Que tenga buenas reseñas', 'Que sea poco conocido'], function (answer) {
										respuesta4 = answer;
										showAnswersInConsole(); 
									});
								}, 1000);
							});
						}, 1000);
					});
				}, 1000);
			});
		}, 2000); // 2000 milisegundos = 3 segundos  ---> Puedes cambiar el tiempo de espera para la respuesta del bot

	}, 300);

});

/* 
EN CASO DE NO CONTAR CON UNA API DE GPT IGUAL PUEDES USAR EL SIGUIENTE SCRIPT PARA OBTENER RECOMENDACIONES DE VIDEOJUEGOS CON UNA PEQUEÑA LISTA DE OPCIONES
SE DETALLA LA LISTA Y LAS IMAGENES QUE LOS RELACIONAN EN LA CARPETA imagenesapi EN CASO SE QUIERA REALIZAR ALGUN CAMBIO
*/

// "Minecraft",
// 	 "Call Of Duty",
// 	 "Valorant",
// 	 "League Of Legends",
// 	 "Super Mario Wonder",
// 	 "The Legend Of Zelda Breath of the wild",
// 	 "Gran Turismo",
// 	 "Pokemon: Escarlata y Purpura",
// 	 "Dragon Ball fighterZ",
// 	 "God of war: Ragnarok",
// 	 "Bloons TD6",
// 	 "Cuphead",
// 	 "Stardey Valley",
// 	 "Portal 2",
// 	 "Pizza Tower",
// 	 "Terraria"

// imagenVideojuego1
// imagenVideojuego2
// imagenVideojuego3
// imagenVideojuego4
// imagenVideojuego5
// imagenVideojuego6
// imagenVideojuego7
// imagenVideojuego8
// imagenVideojuego9
// imagenVideojuego10
// imagenVideojuego11
// imagenVideojuego12
// imagenVideojuego13
// imagenVideojuego14
// imagenVideojuego15
// imagenVideojuego16

const opciones = [
	{
		name: "Minecraft",
		imageId: "imagenVideojuego1",
		url: "imagenesapi/maincra.png"
	},
	{
		name: "Call Of Duty",
		imageId: "imagenVideojuego2",
		url: "./imagenesapi/cof.png"
	},
	{
		name: "Valorant",
		imageId: "imagenVideojuego3",
		url: "./imagenesapi/valo.png"
	},
	{
		name: "League Of Legends",
		imageId: "imagenVideojuego4",
		url: "./imagenesapi/lol.png"
	},
	{
		name: "Super Mario Wonder",
		imageId: "imagenVideojuego5",
		url: "./imagenesapi/mario.png"
	},
	{
		name: "The Legend Of Zelda Breath of the wild",
		imageId: "imagenVideojuego6",
		url: "./imagenesapi/botw.png"
	},
	{
		name: "Dragon Ball Figther Z",
		imageId: "imagenVideojuego7",
		url: "./imagenesapi/goku.png"
	},
	{
		name: "God of War: Ragnarok",
		imageId: "imagenVideojuego8",
		url: "./imagenesapi/gow.png"
	},
	{
		name: "Gran Turismo 7",
		imageId: "imagenVideojuego9",
		url: "./imagenesapi/gt7.png"
	},
	{
		name: "Bloons TD6",
		imageId: "imagenVideojuego10",
		url: "./imagenesapi/monos.png"
	},
	{
		name: "Pizza Tower",
		imageId: "imagenVideojuego11",
		url: "./imagenesapi/pizzatower.png"
	},
	{
		name: "Pokemon: Escarlata y Perla",
		imageId: "imagenVideojuego12",
		url: "./imagenesapi/pokemon.png"
	},
	{
		name: "Portal 2",
		imageId: "imagenVideojuego13",
		url: "./imagenesapi/portal2.png"
	},
	{
		name: "Stardew Valley",
		imageId: "imagenVideojuego14",
		url: "./imagenesapi/stardewvalley.png"
	},
	{
		name: "Terraria",
		imageId: "imagenVideojuego15",
		url: "./imagenesapi/terraria.png"
	},
	{
		name: "Valorant",
		imageId: "imagenVideojuego6",
		url: "./imagenesapi/valo.png"
	}
	
];

function obtenerDosRecomendaciones() {
	let indices = [];
	while (indices.length < 3) {
		let indiceAleatorio = Math.floor(Math.random() * opciones.length);
		if (!indices.includes(indiceAleatorio)) {
			indices.push(indiceAleatorio);
		}
	}
	let opcionSeleccionada1 = opciones[indices[0]];
	let opcionSeleccionada2 = opciones[indices[1]];
	let opcionSeleccionada3 = opciones[indices[2]];

	return [opcionSeleccionada1, opcionSeleccionada2,opcionSeleccionada3];
}

function showAnswersInConsole() {
	let recomendaciones = obtenerDosRecomendaciones();
	localStorage.setItem("recomendaciones", JSON.stringify(recomendaciones));
	console.log("Recomendación 1: " + recomendaciones[0]);
	console.log("Recomendación 2: " + recomendaciones[1]);
	console.log("Recomendación 3: " + recomendaciones[2]);
	setTimeout(function () {
		showBotMessage("Los videojuegos que te recomiendo son: " + recomendaciones.map(item => item.name).join(" / ") );
	}, 2000);
}


$(window).on('load', function () {
	showBotMessage('Bienvenido :D');
});
$('#msg_input').on('keypress', function (e) {
	if (e.which == 13) {  // Detecta la tecla Enter
		$('#send_button').click();  // Simula un clic en el botón de enviar
		return false;  // Previene la acción por defecto de la tecla Enter
	}
});

