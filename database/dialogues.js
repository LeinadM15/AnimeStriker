const npcDialogues = {
    "ISAGI YOICHI": [
        {
            stage: 0,
            text: "¿Crees que el talento natural es suficiente para sobrevivir en Blue Lock?",
            options: [
                { text: "No, la adaptabilidad es más importante.", friendship: 5, response: "Exacto, debemos devorar a los demás para evolucionar." },
                { text: "El talento lo es todo.", friendship: -2, response: "Si piensas así, te quedarás atrás muy rápido." },
                { text: "Con esfuerzo físico basta.", friendship: 1, response: "Ayuda, pero necesitas usar el cerebro también." },
                { text: "Depende de la suerte.", friendship: -3, response: "Aquí creamos nuestra propia suerte en el campo." }
            ]
        },
        {
            stage: 1,
            text: "He estado analizando tus movimientos desde ayer. ¿Cuál crees que es tu mayor debilidad?",
            options: [
                { text: "Mi visión de juego aún es limitada.", friendship: 5, response: "Me alegra que lo sepas, podemos trabajar en eso." },
                { text: "No tengo ninguna debilidad.", friendship: -5, response: "Ese ego ciego te costará caro." },
                { text: "Quizás mi resistencia física.", friendship: 3, response: "Eso se arregla entrenando, pero la mente es clave." },
                { text: "Me falta un arma definitiva.", friendship: 4, response: "Todos buscamos esa fórmula ganadora." }
            ]
        },
        {
            stage: 2,
            text: "Ayer noté que dudas antes de disparar. ¿A qué le tienes miedo?",
            options: [
                { text: "A fallar y decepcionar al equipo.", friendship: -2, response: "Un verdadero delantero no piensa en el equipo al tirar." },
                { text: "A no ser lo suficientemente bueno.", friendship: 1, response: "Todos dudamos, pero hay que superarlo." },
                { text: "A que me bloqueen el tiro.", friendship: 4, response: "Usa esa anticipación para engañarlos entonces." },
                { text: "No es miedo, es cálculo.", friendship: 5, response: "Interesante... si calculas bien, el gol es seguro." }
            ]
        },
        {
            stage: 3,
            text: "Si estuviéramos solos frente al portero y yo tuviera mejor ángulo, ¿me pasarías el balón?",
            options: [
                { text: "Sí, por el bien del equipo.", friendship: -3, response: "Eso no es lo que busca Blue Lock." },
                { text: "No, yo marcaría el gol.", friendship: 5, response: "Ese es el egoísmo que necesitamos." },
                { text: "Depende de quién de los dos esté más seguro.", friendship: 2, response: "Demasiado racional, a veces hay que arriesgar." },
                { text: "Te lo pasaría y luego te lo quitaría.", friendship: 1, response: "Eso... no tiene mucho sentido táctico." }
            ]
        },
        {
            stage: 4,
            text: "Ha pasado tiempo desde que llegamos. ¿Sigues creyendo que serás el número uno?",
            options: [
                { text: "Sin duda, los devoraré a todos.", friendship: 5, response: "Esa es la actitud. Nos veremos en la cima." },
                { text: "No estoy tan seguro ahora...", friendship: -4, response: "Entonces ya has perdido." },
                { text: "Si trabajo duro, sí.", friendship: 2, response: "El trabajo duro no basta, necesitas una fórmula." },
                { text: "Seré el número uno, incluso sobre ti.", friendship: 4, response: "Inténtalo, pero no te lo pondré fácil." }
            ]
        }
    ],
    "BAROU SHOEI": [
        {
            stage: 0,
            text: "¿De verdad crees que tienes derecho a estar en la misma cancha que el Rey?",
            options: [
                { text: "Yo también soy un rey.", friendship: -5, response: "Solo hay un rey, plebeyo insensato." },
                { text: "Demostraré mi valor jugando.", friendship: 4, response: "Hmph. No me estorbes entonces." },
                { text: "Te serviré en el campo.", friendship: 2, response: "Al menos conoces tu lugar." },
                { text: "Solo somos compañeros de equipo.", friendship: -3, response: "Yo no tengo compañeros, tengo súbditos." }
            ]
        },
        {
            stage: 1,
            text: "Ayer dejaste tus cosas tiradas en el vestuario. ¿Eres un cerdo o qué?",
            options: [
                { text: "Lo siento, estaba cansado.", friendship: 3, response: "No hay excusas para la mediocridad. Limpia." },
                { text: "No te metas en mis asuntos.", friendship: -4, response: "Me meto porque tu desorden ofende mi vista." },
                { text: "Las recogeré ahora mismo.", friendship: 5, response: "Hazlo rápido y no lo repitas." },
                { text: "Tú no eres mi madre.", friendship: -5, response: "Te destrozaré en el próximo entrenamiento." }
            ]
        },
        {
            stage: 2,
            text: "¿Por qué no me pasaste el balón en esa última jugada cuando te lo ordené?",
            options: [
                { text: "Vi una mejor oportunidad.", friendship: 2, response: "¡No hay mejor oportunidad que mis pies!" },
                { text: "Quería marcar yo mismo.", friendship: 4, response: "Eres un egoísta... me desagrada, pero lo respeto un poco." },
                { text: "No te escuché.", friendship: -3, response: "Lávate los oídos, inútil." },
                { text: "Porque sabía que fallarías.", friendship: -5, response: "¡¿Qué dijiste?! ¡Te mataré!" }
            ]
        },
        {
            stage: 3,
            text: "He estado entrenando mi tiro a distancia. ¿Estás listo para recoger los balones?",
            options: [
                { text: "Yo también voy a tirar.", friendship: 4, response: "Bien, veamos quién marca más. Perdedor recoge." },
                { text: "Claro, Rey.", friendship: -1, response: "No seas tan patético. Hazme frente." },
                { text: "Consíguete un sirviente.", friendship: -3, response: "Tú ERES el sirviente." },
                { text: "Solo si me enseñas tu técnica.", friendship: 5, response: "Hmph. Observa bien y aprende." }
            ]
        },
        {
            stage: 4,
            text: "Este lugar me está hartando. ¿Acaso alguien aquí puede hacerme sudar en serio?",
            options: [
                { text: "Yo te haré sudar.", friendship: 5, response: "Demuéstralo en la cancha, bufón." },
                { text: "Isagi podría hacerlo.", friendship: -2, response: "¡No me menciones a ese idiota!" },
                { text: "Nadie está a tu nivel, Rey.", friendship: -4, response: "Qué aburrimiento de respuesta." },
                { text: "Hay muchos jugadores fuertes.", friendship: 2, response: "Todos son basura comparados conmigo." }
            ]
        }
    ],
    "NAGI SEISHIRO": [
        {
            stage: 0,
            text: "Ah... qué aburrimiento. ¿De verdad tenemos que entrenar hoy?",
            options: [
                { text: "Sí, si queremos ganar.", friendship: 2, response: "Supongo que si es necesario..." },
                { text: "Podemos saltárnoslo un rato.", friendship: 5, response: "Buena idea. Vamos a jugar videojuegos." },
                { text: "¡El esfuerzo lo es todo!", friendship: -4, response: "Me cansaste solo de escucharte." },
                { text: "Reo se enojará si no vas.", friendship: 3, response: "Ah, Reo... es un poco intenso." }
            ]
        },
        {
            stage: 1,
            text: "¿Por qué te esfuerzas tanto? Solo es fútbol, ¿no?",
            options: [
                { text: "Porque quiero ser el mejor.", friendship: 3, response: "Suena agotador..." },
                { text: "Es divertido cuando te esfuerzas.", friendship: 5, response: "Hmm. Quizás lo intente, a ver si es divertido." },
                { text: "Para ganar dinero y fama.", friendship: 1, response: "Hay formas más fáciles de hacer eso." },
                { text: "Porque no tengo talento natural como tú.", friendship: -2, response: "El talento también es aburrido." }
            ]
        },
        {
            stage: 2,
            text: "Tengo hambre. ¿Vas a la cafetería?",
            options: [
                { text: "Sí, vamos juntos.", friendship: 4, response: "Llevame a cuestas." },
                { text: "No, me quedaré entrenando.", friendship: -1, response: "Eres muy intenso. Adiós." },
                { text: "Te traigo algo si quieres.", friendship: 5, response: "Eres el mejor. Quiero un batido." },
                { text: "Ve con Reo.", friendship: 0, response: "No sé dónde está." }
            ]
        },
        {
            stage: 3,
            text: "Ayer perdí en mi juego en el nivel final. ¿Sabes algún truco?",
            options: [
                { text: "Claro, tienes que hacer parry en el ataque rojo.", friendship: 5, response: "Ah, ya veo. Gracias." },
                { text: "No juego videojuegos.", friendship: -3, response: "Qué aburrido eres." },
                { text: "Deberías enfocarte en el fútbol.", friendship: -4, response: "No me digas qué hacer." },
                { text: "Intenta esquivar más.", friendship: 2, response: "Lo intentaré luego." }
            ]
        },
        {
            stage: 4,
            text: "Últimamente el fútbol se siente un poco más... interesante. ¿Es normal?",
            options: [
                { text: "Significa que estás despertando tu ego.", friendship: 5, response: "Mi ego... suena a mucho trabajo." },
                { text: "Es porque estás jugando conmigo.", friendship: 4, response: "Quizás. No eres tan aburrido." },
                { text: "Es solo una fase.", friendship: -2, response: "Tal vez, pero no se siente así." },
                { text: "Te estás volviendo adicto.", friendship: 2, response: "Eso es malo para mis videojuegos." }
            ]
        }
    ],
    "BACHIRA MEGURU": [
        {
            stage: 0,
            text: "¡Hola! ¿Tú también tienes un monstruo dentro de ti?",
            options: [
                { text: "Sí, y está hambriento.", friendship: 5, response: "¡Genial! Mis instintos no fallaron contigo." },
                { text: "¿De qué estás hablando?", friendship: -3, response: "Awww, qué aburrido." },
                { text: "Algo así, supongo.", friendship: 2, response: "Hmm, necesitas soltarte más." },
                { text: "No, solo tengo talento.", friendship: -1, response: "El talento sin locura no es divertido." }
            ]
        },
        {
            stage: 1,
            text: "Esa jugada de antes fue muy predecible. ¿Por qué no improvisas más?",
            options: [
                { text: "Soy más calculador.", friendship: 1, response: "Los cálculos no hacen que mi corazón lata rápido." },
                { text: "A veces pierdo el control si lo hago.", friendship: 4, response: "¡Esa es la idea! ¡Pierde el control!" },
                { text: "Es más seguro seguir el plan.", friendship: -4, response: "Seguro significa muerto de aburrimiento." },
                { text: "Enseñame a soltarme.", friendship: 5, response: "¡Claro! Baila con el balón conmigo." }
            ]
        },
        {
            stage: 2,
            text: "Estaba pensando... si el balón fuera tu mejor amigo, ¿qué le dirías ahora mismo?",
            options: [
                { text: "'Vamos a volar juntos'.", friendship: 5, response: "¡Sí! ¡Esa es la voz que el balón quiere escuchar!" },
                { text: "'Entra en la portería'.", friendship: 3, response: "Muy directo, pero sirve." },
                { text: "No hablo con objetos inanimados.", friendship: -5, response: "El balón está triste ahora. Y yo también." },
                { text: "'Hazme famoso'.", friendship: -1, response: "El balón prefiere que juegues por diversión." }
            ]
        },
        {
            stage: 3,
            text: "Mi monstruo me dice que confíe en ti hoy. ¿Estás listo para una locura?",
            options: [
                { text: "Siempre estoy listo.", friendship: 5, response: "¡Perfecto! Hagamos magia." },
                { text: "¿Qué tienes en mente?", friendship: 3, response: "No lo sé, ¡lo inventaremos en el camino!" },
                { text: "Mejor nos apegamos a la táctica.", friendship: -4, response: "Aguafiestas..." },
                { text: "Solo si me pasas el balón al final.", friendship: 4, response: "Si estás en el lugar correcto, lo haré." }
            ]
        },
        {
            stage: 4,
            text: "A veces me da miedo que mi monstruo desaparezca... ¿Tú crees que me abandonará?",
            options: [
                { text: "No si sigues alimentándolo con fútbol.", friendship: 5, response: "Tienes razón. ¡Tengo que jugar más y más!" },
                { text: "Es solo imaginación tuya.", friendship: -5, response: "No lo entiendes para nada..." },
                { text: "Tú eres el monstruo, Bachira.", friendship: 4, response: "¡Woah! Esa es una forma interesante de verlo." },
                { text: "Si lo hace, encontrarás otra motivación.", friendship: 2, response: "Quizás... pero prefiero que se quede." }
            ]
        }
    ],
    "CHIGIRI HYOMA": [
        {
            stage: 0,
            text: "¿Qué miras tanto? ¿Acaso nunca has visto a alguien cuidar su cuerpo?",
            options: [
                { text: "Es importante prevenir lesiones.", friendship: 5, response: "Alguien aquí usa el cerebro." },
                { text: "Solo admiraba tu cabello.", friendship: 2, response: "Hmph. Tienes buen gusto." },
                { text: "Pareces de cristal.", friendship: -5, response: "Cuidado con lo que dices, te dejaré comiendo polvo." },
                { text: "Deberías entrenar más en vez de estirar.", friendship: -4, response: "No hables de lo que no entiendes." }
            ]
        },
        {
            stage: 1,
            text: "La velocidad es mi arma. ¿Cuál dirías que es tu mayor atributo?",
            options: [
                { text: "Mi resistencia para no rendirme.", friendship: 4, response: "La tenacidad también es un arma, es cierto." },
                { text: "Mi técnica con el balón.", friendship: 3, response: "Bien, pero si eres lento, te lo quitaré." },
                { text: "No lo he descubierto aún.", friendship: 1, response: "Más vale que te des prisa, el tiempo vuela." },
                { text: "Soy mejor que tú en todo.", friendship: -3, response: "Quiero verte intentarlo en un sprint." }
            ]
        },
        {
            stage: 2,
            text: "¿Alguna vez has sentido que algo se rompe dentro de ti y lo pierdes todo?",
            options: [
                { text: "Sí, pero me levanté de nuevo.", friendship: 5, response: "Esa es la única opción que nos queda, ¿verdad?" },
                { text: "No, nunca me he lesionado gravemente.", friendship: 2, response: "Tienes suerte. No la desperdicies." },
                { text: "El miedo es para los débiles.", friendship: -4, response: "Solo dices eso porque no has sufrido." },
                { text: "Debe ser aterrador.", friendship: 4, response: "Lo fue. Pero ya no dejaré que el miedo me controle." }
            ]
        },
        {
            stage: 3,
            text: "En el próximo partido, si corro hacia el espacio, ¿crees que podrás darme un pase perfecto?",
            options: [
                { text: "Te pondré el balón justo en el pie.", friendship: 5, response: "Confiaré en ti. No me decepciones." },
                { text: "Si me sigues el ritmo, sí.", friendship: -2, response: "Yo soy el rápido aquí, no te confundas." },
                { text: "Tal vez, si no marco yo antes.", friendship: 3, response: "Egoísta. Pero me gusta tu ambición." },
                { text: "Mejor pásamela a mí.", friendship: -1, response: "Desperdiciar mi velocidad sería un crimen." }
            ]
        },
        {
            stage: 4,
            text: "He dejado de preocuparme por mi rodilla. Si se rompe, que se rompa buscando ser el mejor. ¿Qué opinas?",
            options: [
                { text: "Es una determinación increíble.", friendship: 5, response: "Correré hasta que mi cuerpo aguante. Gracias." },
                { text: "Es estúpido arruinar tu cuerpo.", friendship: -4, response: "Si no arriesgo todo, no merezco estar aquí." },
                { text: "Asegúrate de ganar antes de romperte.", friendship: 4, response: "Ese es el plan exacto." },
                { text: "Te apoyaré si te caes.", friendship: 3, response: "No planeo caer. Pero gracias." }
            ]
        }
    ],
    "KUNIGAMI RENSUKE": [
        {
            stage: 0,
            text: "El fútbol es un deporte noble. ¿Juegas de manera justa o haces trampa?",
            options: [
                { text: "Siempre juego limpio.", friendship: 5, response: "Me alegra oírlo. Seremos buenos compañeros." },
                { text: "Hago lo necesario para ganar.", friendship: -3, response: "El fin no justifica los medios cobardes." },
                { text: "El engaño es parte del juego.", friendship: -2, response: "No comparto tu visión." },
                { text: "Juego con fuerza y honor.", friendship: 4, response: "Esa es la actitud de un verdadero atleta." }
            ]
        },
        {
            stage: 1,
            text: "Mi sueño es ser un superhéroe del fútbol. ¿Te parece infantil?",
            options: [
                { text: "Un poco, sí.", friendship: -2, response: "No me importa lo que pienses, lo lograré." },
                { text: "Es un gran objetivo, da esperanza.", friendship: 5, response: "Exacto. Quiero que mi juego inspire a los demás." },
                { text: "Mientras marques goles, no importa.", friendship: 2, response: "Los goles son importantes, pero el cómo también lo es." },
                { text: "Yo seré el villano entonces.", friendship: 1, response: "Entonces tendré que derrotarte." }
            ]
        },
        {
            stage: 2,
            text: "Mi zurda es mi mayor orgullo. ¿Has estado practicando tu tiro especial?",
            options: [
                { text: "Todos los días.", friendship: 5, response: "El esfuerzo siempre rinde frutos." },
                { text: "Aún no tengo uno.", friendship: 2, response: "Deberías enfocarte en encontrar tu arma." },
                { text: "No lo necesito, soy polivalente.", friendship: -1, response: "En Blue Lock, sin un arma clara, no sobrevivirás." },
                { text: "Mi tiro es mejor que el tuyo.", friendship: -3, response: "Hablas mucho, pero veamos si puedes probarlo." }
            ]
        },
        {
            stage: 3,
            text: "Si vieras a un compañero de equipo en problemas en la cancha, ¿qué harías?",
            options: [
                { text: "Iría a apoyarlo de inmediato.", friendship: 5, response: "Como debe ser. El equipo primero." },
                { text: "Lo dejaría arreglárselas solo.", friendship: -4, response: "Eso no es de héroes." },
                { text: "Usaría la distracción para atacar.", friendship: -1, response: "Táctico, pero frío." },
                { text: "Depende de si es un buen jugador.", friendship: -2, response: "Todos los compañeros merecen apoyo." }
            ]
        },
        {
            stage: 4,
            text: "A veces dudo si ser un 'héroe' me permitirá sobrevivir en este lugar tan despiadado. ¿Debería cambiar?",
            options: [
                { text: "Mantén tus principios hasta el final.", friendship: 5, response: "Tienes razón. Si pierdo eso, me pierdo a mí mismo." },
                { text: "Sí, aquí hay que ser un monstruo.", friendship: -4, response: "Me niego a convertirme en algo que odio." },
                { text: "Adapta tu heroísmo a esta realidad.", friendship: 4, response: "Un héroe oscuro... interesante concepto." },
                { text: "Haz lo que sientas mejor.", friendship: 2, response: "No es de mucha ayuda, pero gracias." }
            ]
        }
    ],
    "REO MIKAGE": [
        {
            stage: 0,
            text: "El dinero puede comprar muchas cosas, pero no el talento puro como el de Nagi. ¿Qué crees que es más valioso?",
            options: [
                { text: "El trabajo duro.", friendship: 4, response: "Típico, pero tiene su mérito." },
                { text: "El dinero facilita todo.", friendship: -3, response: "Créeme, sé de dinero, y no sirve en la cancha." },
                { text: "El talento natural.", friendship: 2, response: "Sí... por eso encontré a Nagi." },
                { text: "La inteligencia y estrategia.", friendship: 5, response: "Exactamente. Mi cerebro es mi mayor inversión." }
            ]
        },
        {
            stage: 1,
            text: "Mi objetivo es ganar la Copa del Mundo con Nagi. ¿Cuál es tu ambición?",
            options: [
                { text: "Ser el número uno por mi cuenta.", friendship: 3, response: "Egoísta. Perfecto para este lugar." },
                { text: "Aplastarlos a ustedes dos.", friendship: 4, response: "Me gusta tu atrevimiento. Inténtalo." },
                { text: "Solo quiero jugar profesionalmente.", friendship: -2, response: "Qué meta tan mediocre." },
                { text: "Quiero ser el dueño del mundo.", friendship: 5, response: "Ja, pensamos en la misma escala." }
            ]
        },
        {
            stage: 2,
            text: "¿Has visto a Nagi? No lo encuentro por ningún lado.",
            options: [
                { text: "Estaba jugando con su teléfono.", friendship: 4, response: "Clásico de él. Gracias, iré a buscarlo." },
                { text: "Deberías dejar que sea independiente.", friendship: -4, response: "No te pedí consejos de vida." },
                { text: "Ni idea.", friendship: 1, response: "Bueno, seguiré buscando." },
                { text: "Yo te ayudaré a buscarlo.", friendship: 5, response: "Te lo agradezco, es un fastidio a veces." }
            ]
        },
        {
            stage: 3,
            text: "Si te ofreciera ser mi aliado en el próximo partido y prometiera hacerte ganar, ¿aceptarías?",
            options: [
                { text: "Sí, es una ventaja táctica.", friendship: 4, response: "Una decisión lógica y de negocios." },
                { text: "No, quiero ganar por mis propios medios.", friendship: 3, response: "Orgulloso. Me gusta." },
                { text: "¿Cuánto me pagas?", friendship: -3, response: "El dinero no te comprará talento aquí." },
                { text: "Solo si yo soy el que manda.", friendship: -2, response: "Yo soy el que mueve los hilos." }
            ]
        },
        {
            stage: 4,
            text: "Me he dado cuenta de que depender solo de Nagi tiene un límite. ¿Crees que puedo brillar por mí mismo?",
            options: [
                { text: "Tienes todas las habilidades para hacerlo.", friendship: 5, response: "Es verdad. Mi Camaleón absorberá el mundo entero." },
                { text: "Sin Nagi no eres nada.", friendship: -5, response: "Te haré tragar esas palabras." },
                { text: "Es tarde para cambiar tu estilo.", friendship: -2, response: "Nunca es tarde para una buena inversión." },
                { text: "Pruébalo en la cancha.", friendship: 4, response: "Observa bien. Te mostraré mi verdadero valor." }
            ]
        }
    ],
    "SHIDOU RYUSEI": [
        {
            stage: 0,
            text: "¡El fútbol es violencia, es procreación, es vida! ¿Tú cómo lo sientes?",
            options: [
                { text: "Es una explosión de energía.", friendship: 5, response: "¡Sí! ¡Entiendes la chispa de la vida!" },
                { text: "Es solo un juego táctico.", friendship: -5, response: "Qué respuesta más muerta. Das asco." },
                { text: "Es una forma de dominar a otros.", friendship: 4, response: "Destruirlos para brillar... me excita la idea." },
                { text: "Es trabajo en equipo.", friendship: -3, response: "Ugh, me vas a hacer vomitar." }
            ]
        },
        {
            stage: 1,
            text: "Ayer me sancionaron por patear a alguien. ¡Pero él se interpuso en mi gol! ¿No es injusto?",
            options: [
                { text: "El gol es sagrado, él tuvo la culpa.", friendship: 5, response: "¡Exacto! El universo gira en torno al gol." },
                { text: "Las reglas existen por algo.", friendship: -4, response: "Las reglas son cadenas para los débiles." },
                { text: "Debiste patear el balón, no al jugador.", friendship: -2, response: "Yo pateo lo que se cruza en mi trayectoria." },
                { text: "Mejor guarda tu violencia para el balón.", friendship: 3, response: "Hmm, eso podría generar un tiro brutal." }
            ]
        },
        {
            stage: 2,
            text: "Cuando veo un espacio libre en el área, mis células explotan. ¿A ti qué te enciende?",
            options: [
                { text: "Engañar al portero.", friendship: 4, response: "Ver la desesperación en su rostro, hermoso." },
                { text: "Ganar el partido.", friendship: 1, response: "Aburrido. El proceso es lo divertido." },
                { text: "Un pase perfecto para rematar.", friendship: 5, response: "¡Sí! La conexión antes del clímax. ¡Genial!" },
                { text: "No me emociono mucho.", friendship: -5, response: "Entonces estás muerto en vida." }
            ]
        },
        {
            stage: 3,
            text: "Quiero jugar con Rin. Sus genes son increíbles. ¿Crees que me acepte?",
            options: [
                { text: "Él te odia.", friendship: 2, response: "¡El odio es pasión! ¡Me encanta!" },
                { text: "Harían una dupla destructiva.", friendship: 5, response: "¡El apocalipsis en el campo de fútbol!" },
                { text: "Él es demasiado calculador para ti.", friendship: 3, response: "Yo seré el caos en su orden." },
                { text: "Eres demasiado salvaje para él.", friendship: -2, response: "Yo no me adapto a nadie, ellos se adaptan a mí." }
            ]
        },
        {
            stage: 4,
            text: "Siento que estoy a punto de evolucionar otra vez. ¿Estás listo para ser aplastado por mi nueva forma?",
            options: [
                { text: "Ven con todo, yo también evolucionaré.", friendship: 5, response: "¡Esa es la actitud! ¡Choquemos hasta rompernos!" },
                { text: "No te dejaré ni tocar el balón.", friendship: 4, response: "Ahhh, esa arrogancia me encanta." },
                { text: "Intentaré detenerte.", friendship: 1, response: "Intentar no es suficiente para sobrevivir." },
                { text: "Da un poco de miedo.", friendship: -3, response: "Débil. Te destrozaré en el primer minuto." }
            ]
        }
    ],
    "RIN ITOSHI": [
        {
            stage: 0,
            text: "El fútbol es un campo de batalla. Si no estás dispuesto a morir, lárgate. ¿Por qué estás aquí?",
            options: [
                { text: "Para destruirlos a todos.", friendship: 4, response: "Palabras vacías si no las respaldas." },
                { text: "Para superar a mi hermano.", friendship: 5, response: "Interesante. Entiendo ese sentimiento de asco." },
                { text: "Para divertirme.", friendship: -5, response: "Basura. Apártate de mi vista." },
                { text: "Para sobrevivir.", friendship: 2, response: "La supervivencia mínima no es suficiente." }
            ]
        },
        {
            stage: 1,
            text: "Tus movimientos son mediocres. ¿No puedes predecir al menos tres jugadas por adelantado?",
            options: [
                { text: "Estoy aprendiendo a hacerlo.", friendship: 3, response: "Date prisa o serás solo un peón." },
                { text: "Juego por instinto.", friendship: -3, response: "El instinto puro es para los animales." },
                { text: "No necesito predecir, yo domino el presente.", friendship: 4, response: "Un farol interesante. Pruébalo." },
                { text: "Es muy difícil para mí.", friendship: -4, response: "Entonces no tienes futuro aquí." }
            ]
        },
        {
            stage: 2,
            text: "Mi hermano mayor, Sae... él lo es todo y a la vez nada para mí. ¿Tienes a alguien a quien quieras aplastar con toda tu alma?",
            options: [
                { text: "Sí, a ti.", friendship: 5, response: "Una ambición estúpida, pero me gusta que lo intentes." },
                { text: "A nadie en particular.", friendship: -3, response: "Sin un objetivo de odio, no crecerás." },
                { text: "Solo quiero superarme a mí mismo.", friendship: 1, response: "Tibio." },
                { text: "Quiero destruir a Isagi.", friendship: 4, response: "Únete a la fila." }
            ]
        },
        {
            stage: 3,
            text: "Me irritas. Solo respirar cerca de mí altera mis cálculos. ¿Vas a ser útil o un estorbo?",
            options: [
                { text: "Te usaré a mi favor.", friendship: 5, response: "Atrévete a intentarlo, manipulador de pacotilla." },
                { text: "Seré la pieza perfecta.", friendship: 3, response: "Más te vale." },
                { text: "Haré lo que me digas.", friendship: -2, response: "No quiero marionetas sin voluntad." },
                { text: "No me importa lo que pienses.", friendship: 2, response: "Al menos tienes ego." }
            ]
        },
        {
            stage: 4,
            text: "Estoy a punto de entrar en estado de flujo. Si no puedes seguirme el ritmo, te dejaré atrás. ¿Entendido?",
            options: [
                { text: "Trataré de seguirte.", friendship: -1, response: "'Tratar' es fracasar." },
                { text: "Yo seré quien dicte el ritmo.", friendship: 5, response: "Hmph. Trata de robarme el protagonismo si puedes." },
                { text: "Estaremos en perfecta sintonía.", friendship: 4, response: "No te equivoques, tú orbitas alrededor de mí." },
                { text: "Me quedaré atrás para defender.", friendship: -3, response: "Cobarde. Aquí todos atacamos." }
            ]
        }
    ],
    "TOKIMITSU AOSHI": [
        {
            stage: 0,
            text: "A-Ah... h-hola... ¿C-crees que soy demasiado débil para estar aquí?",
            options: [
                { text: "Físicamente eres un monstruo, confía en ti.", friendship: 5, response: "¿E-En serio? G-Gracias... me esforzaré." },
                { text: "Sí, tu actitud es patética.", friendship: -4, response: "¡Aaaah! ¡Lo sabía! ¡Soy lo peor!" },
                { text: "No lo sé, no te he visto jugar.", friendship: 2, response: "Y-Ya veo... trataré de mostrarte." },
                { text: "Debes relajarte un poco.", friendship: 3, response: "¡Es imposible! ¡Todo me da miedo!" }
            ]
        },
        {
            stage: 1,
            text: "¡Ese jugador de allí da mucho miedo! ¿Y si me golpea durante el partido?",
            options: [
                { text: "Tú eres más fuerte que él, empújalo.", friendship: 5, response: "¿Y-Yo? B-Bueno... si uso mi cuerpo..." },
                { text: "Escóndete detrás de mí.", friendship: 2, response: "G-Gracias, eres muy amable..." },
                { text: "Deja de lloriquear.", friendship: -3, response: "¡L-Lo siento! ¡No me regañes!" },
                { text: "Usa ese miedo como energía para correr.", friendship: 4, response: "E-Eso... ¡eso puedo hacerlo!" }
            ]
        },
        {
            stage: 2,
            text: "M-Mi corazón late tan rápido que duele... ¿Crees que me dará un infarto antes de jugar?",
            options: [
                { text: "Respira hondo, estás bien.", friendship: 4, response: "I-Inhala... exhala... sigo asustado." },
                { text: "Es adrenalina, úsala en el campo.", friendship: 5, response: "¡A-Adrenalina! ¡Sí, eso debe ser!" },
                { text: "Si mueres, avísame para pedir un cambio.", friendship: -4, response: "¡Q-Qué cruel!" },
                { text: "Yo me encargaré de todo.", friendship: 2, response: "P-Pero yo también debo jugar..." }
            ]
        },
        {
            stage: 3,
            text: "¿R-Rin está enojado conmigo? ¡Me miró muy feo hace un rato!",
            options: [
                { text: "Rin mira feo a todos.", friendship: 5, response: "¡A-Ah! ¡Tienes razón! Qué alivio..." },
                { text: "Sí, seguro hiciste algo mal.", friendship: -5, response: "¡Aaaaaah! ¡Voy a disculparme de rodillas!" },
                { text: "Ignóralo, concéntrate en ti.", friendship: 3, response: "L-Lo intentaré... aunque da miedo." },
                { text: "Demuéstrale que eres útil.", friendship: 4, response: "S-Sí... usaré mi fuerza para ayudar." }
            ]
        },
        {
            stage: 4,
            text: "C-Cuando tengo miedo y corro rápido... a veces nadie puede pararme. ¿Soy un monstruo?",
            options: [
                { text: "Eres una bestia imparable, siéntete orgulloso.", friendship: 5, response: "B-Bestia imparable... no suena tan mal." },
                { text: "Eres un peligro público.", friendship: -2, response: "¡N-No! ¡No quiero lastimar a nadie!" },
                { text: "Es tu talento, acéptalo.", friendship: 4, response: "A-Aceptar mi miedo... es difícil." },
                { text: "Solo necesitas controlarlo.", friendship: 3, response: "S-Sí, me falta control... mucho control." }
            ]
        }
    ],
    "GAGAMARU GIN": [
        {
            stage: 0,
            text: "Este suelo está un poco duro... ¿Has intentado dormir colgando de las barras?",
            options: [
                { text: "No, eso es de locos.", friendship: -2, response: "Te pierdes de mucho. Es relajante." },
                { text: "Prefiero mi cama.", friendship: 1, response: "La cama es para los débiles." },
                { text: "Podría intentarlo alguna vez.", friendship: 5, response: "Te enseñaré cómo colgarte sin caerte." },
                { text: "Eres como un animal salvaje.", friendship: 4, response: "Mis instintos son mi mejor arma." }
            ]
        },
        {
            stage: 1,
            text: "Ayer me tiré de cabeza para parar un balón y raspé mi cara. ¿Te gusta mi cicatriz?",
            options: [
                { text: "Te hace ver rudo.", friendship: 5, response: "Jeje. Es una medalla de honor." },
                { text: "Deberías tener más cuidado.", friendship: -2, response: "Si tengo cuidado, no paro el gol." },
                { text: "Es un poco fea.", friendship: -3, response: "No sabes apreciar el arte del sacrificio." },
                { text: "Mientras salves el gol, da igual.", friendship: 4, response: "Ese es el espíritu." }
            ]
        },
        {
            stage: 2,
            text: "Me gusta usar mis manos, mis pies, mi cabeza... todo el cuerpo sirve. ¿Tú solo usas los pies?",
            options: [
                { text: "El fútbol se juega con los pies.", friendship: -1, response: "Qué visión tan estrecha." },
                { text: "Uso mi cuerpo entero también.", friendship: 5, response: "Bien. Así se cubre más espacio en la portería." },
                { text: "Solo me importa marcar goles.", friendship: 2, response: "Entonces yo me encargo de pararlos." },
                { text: "Depende de la situación.", friendship: 3, response: "El instinto debe guiarte en cada situación." }
            ]
        }
    ],
    "RAICHI JINGO": [
        {
            stage: 0,
            text: "¡El fútbol sexy lo es todo! ¿Tienes la resistencia para aguantar 90 minutos de pura presión sexy?",
            options: [
                { text: "Mi resistencia es infinita.", friendship: 5, response: "¡Ja! ¡Eso quiero ver en la cancha!" },
                { text: "¿Fútbol sexy? Qué ridiculez.", friendship: -5, response: "¡Te mataré a golpes, idiota!" },
                { text: "Haré lo que pueda.", friendship: -1, response: "¡Con 'lo que pueda' no ganas aquí!" },
                { text: "Correré hasta morir.", friendship: 4, response: "¡Esa es la actitud sexy que busco!" }
            ]
        },
        {
            stage: 1,
            text: "¡Ese maldito me empujó en el entrenamiento! ¡Voy a destrozarlo! ¿Vienes conmigo?",
            options: [
                { text: "Déjalo, gánale en el campo.", friendship: 4, response: "Tsk. Tienes razón, lo humillaré jugando." },
                { text: "¡Sí, vamos a darle una paliza!", friendship: 2, response: "¡Me gusta tu estilo, pero nos echarían!" },
                { text: "Estás loco.", friendship: -3, response: "¡¿A quién llamas loco, basura?!" },
                { text: "No me metas en tus problemas.", friendship: -2, response: "Cobarde sin pasión." }
            ]
        },
        {
            stage: 2,
            text: "¡Oye! ¡Dime que soy el mejor mediocentro defensivo que has visto en tu vida!",
            options: [
                { text: "Eres el mejor y el más sexy.", friendship: 5, response: "¡Jajaja! ¡Por supuesto que lo soy!" },
                { text: "He visto mejores.", friendship: -4, response: "¡Maldito, te morderé la cara!" },
                { text: "Eres bueno marcando.", friendship: 3, response: "Soy excelente, no solo bueno." },
                { text: "Si corres un poco más, tal vez.", friendship: -1, response: "¡Nadie corre más que yo!" }
            ]
        }
    ],
    "IGARASHI GURIMU": [
        {
            stage: 0,
            text: "Ahhh, no quiero heredar el templo de mi familia. ¿Tú crees que podré ser profesional y salvarme?",
            options: [
                { text: "Con tu nivel, ve rapándote la cabeza.", friendship: -5, response: "¡Qué cruel eres!" },
                { text: "Si te esfuerzas al máximo, quizás.", friendship: 4, response: "Me esforzaré, ¡lo juro por Buda!" },
                { text: "Tienes que usar tu astucia para sobrevivir.", friendship: 5, response: "¡Sí! Seré un genio de las faltas fingidas." },
                { text: "El templo suena como una vida pacífica.", friendship: -2, response: "¡No quiero pacífica, quiero fútbol!" }
            ]
        },
        {
            stage: 1,
            text: "Oye, ¿has visto esa técnica para tirarse y pedir falta? ¿Crees que el árbitro pite si lo hago?",
            options: [
                { text: "Es trampa, juega limpio.", friendship: -3, response: "La limpieza no me salvará del templo." },
                { text: "Si lo haces bien, es una ventaja enorme.", friendship: 5, response: "¡Malicia Buda, a la acción!" },
                { text: "Te van a sacar amarilla.", friendship: 1, response: "Tengo que practicar mis gritos de dolor." },
                { text: "Enséñamela, yo también quiero usarla.", friendship: 4, response: "¡Hecho! Seremos el dúo del teatro." }
            ]
        },
        {
            stage: 2,
            text: "Todos aquí son monstruos gigantes... ¿cómo se supone que un tipo normal como yo compita con ellos?",
            options: [
                { text: "Aférrate a los más fuertes.", friendship: 4, response: "Esa es mi estrategia principal." },
                { text: "Encuentra tu propia arma única.", friendship: 5, response: "Tienes razón. Mi persistencia es mi arma." },
                { text: "Ríndete.", friendship: -4, response: "¡Nunca! ¡No quiero ser monje!" },
                { text: "Entrena más duro que ellos.", friendship: 2, response: "Físicamente es imposible superarlos..." }
            ]
        }
    ],
    "NARUHAYA ASAHI": [
        {
            stage: 0,
            text: "Mi familia me necesita. Si no triunfo aquí... no sé qué haré. ¿Tú tienes familia que dependa de ti?",
            options: [
                { text: "No, juego solo por mí.", friendship: 2, response: "Qué suerte tienes... yo cargo con mucho peso." },
                { text: "Sí, entiendo la presión.", friendship: 5, response: "Entonces sabes por qué no puedo rendirme jamás." },
                { text: "La familia te hace débil en el campo.", friendship: -5, response: "No sabes de lo que hablas. Ellos son mi fuerza." },
                { text: "Usa ese sentimiento para ser más rápido.", friendship: 4, response: "Eso intento todos los días." }
            ]
        },
        {
            stage: 1,
            text: "Soy rápido, pero... no soy como Chigiri o Zantetsu. Me falta un arma letal. ¿Qué me aconsejas?",
            options: [
                { text: "Busca los puntos ciegos del rival.", friendship: 5, response: "¡Esconder mi presencia! Es una gran idea." },
                { text: "Roba las armas de otros.", friendship: 4, response: "Como hace Isagi... podría intentarlo." },
                { text: "Ya has llegado a tu límite.", friendship: -4, response: "No puedo aceptar eso. Aún no." },
                { text: "Entrena el tiro lejano.", friendship: 1, response: "No tengo la fuerza física para eso." }
            ]
        },
        {
            stage: 2,
            text: "A veces siento que soy el más débil aquí. ¿Alguna vez sientes que no eres suficiente?",
            options: [
                { text: "Todos los días.", friendship: 5, response: "Me alivia saber que no soy el único." },
                { text: "Nunca, sé que soy el mejor.", friendship: -3, response: "Ojalá tuviera esa confianza ciega." },
                { text: "Lo importante es cómo superas ese sentimiento.", friendship: 4, response: "Tienes razón. Debo seguir luchando." },
                { text: "Si eres débil, no mereces estar aquí.", friendship: -5, response: "Duele, pero es la cruda realidad de Blue Lock." }
            ]
        }
    ],
    "ZANTETSU TSURUGI": [
        {
            stage: 0,
            text: "Soy el más rápido del mundo. Mi aceleración inicial es insuperable. ¿Comprendes la física detrás de esto?",
            options: [
                { text: "Sí, usas mal las palabras grandes.", friendship: 2, response: "Mi vocabulario es extremadamente estúpido... digo, culto." },
                { text: "Es impresionante.", friendship: 4, response: "Lo sé. Soy un genio de la velocidad." },
                { text: "Chigiri es más rápido.", friendship: -5, response: "¡Él solo gana en distancias largas! ¡Mi aceleración es superior!" },
                { text: "Acelerar no sirve si no marcas gol.", friendship: 3, response: "Mi tiro con efecto asegura el gol. Soy perfecto." }
            ]
        },
        {
            stage: 1,
            text: "Me compré estas gafas para parecer más inteligente. ¿Crees que funcionó?",
            options: [
                { text: "Te ves como un verdadero intelectual.", friendship: 5, response: "Excelente. Mi coeficiente ha aumentado visiblemente." },
                { text: "Las gafas no cambian tu cerebro.", friendship: -3, response: "Eso es empíricamente falso, lo vi en internet." },
                { text: "Pareces un tonto con gafas.", friendship: -4, response: "Tu opinión es irrelevante para mi intelecto." },
                { text: "Te dan estilo.", friendship: 4, response: "Estilo e inteligencia. Combinación ganadora." }
            ]
        },
        {
            stage: 2,
            text: "Mi 'zona de confort' para marcar es exacta. ¿Tú calculas tus tiros o los haces al azar?",
            options: [
                { text: "Pura intuición.", friendship: 2, response: "La intuición es el cálculo del subconsciente." },
                { text: "Mido la distancia, el ángulo y el viento.", friendship: 5, response: "Vaya, eres un erudito como yo." },
                { text: "Solo le pego fuerte.", friendship: -2, response: "Falta de elegancia." },
                { text: "Busco mi punto fuerte, como tú.", friendship: 4, response: "Una estrategia inteligente. Te felicito." }
            ]
        }
    ]
,
    "GENERIC": [
        {
            stage: 0,
            text: "¿Qué opinas del menú de la cafetería de Blue Lock de hoy?",
            options: [
                { text: "Me encanta, pura proteína.", friendship: 4, response: "¡Sí! Necesitamos energía para sobrevivir aquí." },
                { text: "La verdad, extraño la comida de mi casa.", friendship: 2, response: "Yo también, pero no podemos decírselo a Ego." },
                { text: "Es asqueroso.", friendship: -3, response: "Oye, es comida nutritiva al menos." },
                { text: "Solo como para sobrevivir.", friendship: 0, response: "Muy enfocado, me parece bien." }
            ]
        },
        {
            stage: 1,
            text: "¿Crees que el entrenamiento con los hologramas es útil o solo un truco?",
            options: [
                { text: "Es el futuro del fútbol.", friendship: 4, response: "¡Exacto! La tecnología de Blue Lock es increíble." },
                { text: "Prefiero jugar contra humanos reales.", friendship: 3, response: "Tiene sentido, un holograma no siente miedo." },
                { text: "Es una pérdida de tiempo.", friendship: -4, response: "Si piensas así, te quedarás atrás." },
                { text: "Me da igual, yo solo marco goles.", friendship: 2, response: "Esa es la actitud de un delantero." }
            ]
        },
        {
            stage: 2,
            text: "¿Alguna vez te arrepientes de haber dejado a tu equipo de la preparatoria?",
            options: [
                { text: "Nunca. Mi objetivo es ser el número uno.", friendship: 4, response: "¡Ese es el egoísmo que pide Ego!" },
                { text: "A veces los extraño.", friendship: 2, response: "Es normal, pero el pasado quedó atrás." },
                { text: "Eran unos perdedores de todos modos.", friendship: -3, response: "Vaya, qué frío eres." },
                { text: "Llevaré nuestra bandera a la cima.", friendship: 5, response: "¡Esa es una buena forma de honrarlos!" }
            ]
        },
        {
            stage: 3,
            text: "El nivel aquí es una locura. ¿Te sientes presionado?",
            options: [
                { text: "La presión me hace más fuerte.", friendship: 5, response: "¡Increíble! Eres un verdadero monstruo." },
                { text: "Un poco, pero puedo manejarlo.", friendship: 3, response: "Yo también estoy tratando de no hundirme." },
                { text: "Para nada, soy mejor que todos aquí.", friendship: -2, response: "Cuidado con esa arrogancia..." },
                { text: "Estoy aterrorizado, la verdad.", friendship: 1, response: "Al menos eres honesto." }
            ]
        },
        {
            stage: 4,
            text: "¿Qué tipo de música escuchas antes de un partido importante?",
            options: [
                { text: "Música electrónica para activarme.", friendship: 4, response: "¡Sí! Yo también necesito ritmo rápido." },
                { text: "Música clásica para concentrarme.", friendship: 3, response: "Oh, eres del tipo estratégico." },
                { text: "No escucho música, me distrae.", friendship: 0, response: "Entiendo, prefieres el silencio." },
                { text: "Heavy metal a todo volumen.", friendship: 2, response: "¡Wow, debes salir a la cancha como una bestia!" }
            ]
        },
        {
            stage: 5,
            text: "¿Has notado lo estrictos que son con el horario de sueño aquí?",
            options: [
                { text: "El descanso es clave para un atleta.", friendship: 5, response: "Exactamente, nuestros músculos necesitan recuperarse." },
                { text: "Me cuesta dormir temprano.", friendship: 2, response: "Intenta leer algo, ayuda bastante." },
                { text: "Yo me escapo a entrenar de noche.", friendship: -2, response: "Estás loco, te van a expulsar si te atrapan." },
                { text: "Duermo como un bebé.", friendship: 3, response: "Qué envidia, yo doy muchas vueltas." }
            ]
        },
        {
            stage: 6,
            text: "Si tuvieras que elegir una posición que no sea delantero, ¿cuál sería?",
            options: [
                { text: "Mediocentro ofensivo, para armar jugadas.", friendship: 4, response: "Tiene sentido, controlarías el ritmo." },
                { text: "Defensa central, para destruir ataques.", friendship: 3, response: "Interesante, conocer la defensa ayuda a atacar." },
                { text: "¡Jamás! Soy delantero o nada.", friendship: 5, response: "¡Ese es el espíritu de Blue Lock!" },
                { text: "Portero, me gusta volar.", friendship: 1, response: "Jaja, pero perderíamos tus goles." }
            ]
        },
        {
            stage: 7,
            text: "¿Qué es más importante para un delantero: la fuerza o la velocidad?",
            options: [
                { text: "Velocidad para dejar atrás a la defensa.", friendship: 4, response: "Sí, si no te alcanzan, no te detienen." },
                { text: "Fuerza para ganar los choques.", friendship: 4, response: "Cierto, un delantero debe imponer respeto." },
                { text: "Ambas, un jugador incompleto es inútil.", friendship: -2, response: "Exiges demasiado, nadie es perfecto." },
                { text: "El cerebro. La inteligencia gana partidos.", friendship: 5, response: "¡Toda la razón! El fútbol se juega con la mente." }
            ]
        },
        {
            stage: 8,
            text: "Me duelen las piernas por el entrenamiento de ayer. ¿Tú cómo te recuperas?",
            options: [
                { text: "Baños de contraste, frío y calor.", friendship: 4, response: "Buena técnica, la probaré hoy." },
                { text: "Estiramientos profundos y yoga.", friendship: 3, response: "Deberías enseñarme algunos ejercicios." },
                { text: "Simplemente ignoro el dolor.", friendship: -3, response: "Eso es estúpido, te vas a lesionar." },
                { text: "Como mucha proteína y duermo más.", friendship: 3, response: "Lo básico siempre funciona." }
            ]
        },
        {
            stage: 9,
            text: "¿Has pensado en qué harás si te expulsan de Blue Lock?",
            options: [
                { text: "No contemplo la derrota.", friendship: 5, response: "Increíble confianza. Te admiro." },
                { text: "Supongo que buscaría otro club.", friendship: 2, response: "Pero Ego dijo que nuestra carrera acabaría..." },
                { text: "Me retiraría del fútbol.", friendship: 1, response: "Qué triste sería terminar así." },
                { text: "No me importa, solo juego por diversión.", friendship: -5, response: "¿Por diversión? No mereces estar aquí." }
            ]
        },
        {
            stage: 10,
            text: "Ego Jinpachi da un poco de miedo, ¿verdad?",
            options: [
                { text: "Es un genio loco, pero confío en él.", friendship: 4, response: "Sí, hay método en su locura." },
                { text: "Me aterra cuando nos mira fijamente.", friendship: 3, response: "Jaja, parece que te estuviera analizando el alma." },
                { text: "Es un farsante, no le tengo miedo.", friendship: -4, response: "No subestimes al hombre que controla nuestro futuro." },
                { text: "Yo soy más aterrador que él en la cancha.", friendship: 1, response: "Wow, cálmate un poco." }
            ]
        },
        {
            stage: 11,
            text: "¿Crees que la filosofía del 'egoísmo' arruina el fútbol tradicional?",
            options: [
                { text: "El fútbol necesita evolución, no tradición.", friendship: 5, response: "¡Bien dicho! Estamos creando algo nuevo." },
                { text: "Un poco, el trabajo en equipo también es vital.", friendship: 2, response: "Es cierto, pero sin un finalizador, no hay goles." },
                { text: "Sí, esto no es fútbol real.", friendship: -3, response: "Entonces, ¿qué haces aquí en Blue Lock?" },
                { text: "El único fútbol que importa es el que gana.", friendship: 4, response: "Una respuesta muy pragmática. Me gusta." }
            ]
        },
        {
            stage: 12,
            text: "¿Has hecho algún amigo real aquí, o somos todos enemigos?",
            options: [
                { text: "Somos rivales que se respetan mutuamente.", friendship: 4, response: "Esa es la mejor forma de verlo." },
                { text: "Tengo amigos fuera de la cancha.", friendship: 3, response: "Es bueno separar lo personal del juego." },
                { text: "No necesito amigos, solo quiero aplastar a todos.", friendship: -2, response: "Qué solitario debe ser tu mundo." },
                { text: "Te considero un buen compañero.", friendship: 5, response: "¡Gracias! Significa mucho en este infierno." }
            ]
        },
        {
            stage: 13,
            text: "¿Cuál es tu ritual para celebrar un gol?",
            options: [
                { text: "Grito con toda el alma hacia la cámara.", friendship: 4, response: "¡Pura pasión! Así se hace." },
                { text: "Meñique al aire, algo elegante.", friendship: 3, response: "Qué refinado, tienes estilo." },
                { text: "Solo me doy la vuelta, como si nada.", friendship: 2, response: "El tipo duro que no se impresiona con nada, eh." },
                { text: "Burlarme del portero rival.", friendship: -4, response: "Eso es falta de respeto, te ganarás tarjetas." }
            ]
        },
        {
            stage: 14,
            text: "El partido de mañana decidirá muchas cosas. ¿Estás preparado mentalmente?",
            options: [
                { text: "Nací preparado para estos momentos.", friendship: 5, response: "Esa es la energía que necesitamos." },
                { text: "Estoy repasando tácticas en mi cabeza.", friendship: 4, response: "La preparación lo es todo." },
                { text: "Tengo un nudo en el estómago.", friendship: 2, response: "No te preocupes, el miedo te mantiene alerta." },
                { text: "Será un paseo, son malísimos.", friendship: -3, response: "Subestimar al rival es el primer paso al fracaso." }
            ]
        },
        {
            stage: 15,
            text: "¿Extrañas a tu familia o solo piensas en fútbol?",
            options: [
                { text: "Uso el recuerdo de mi familia para motivarme.", friendship: 4, response: "Ese es un buen motor para seguir adelante." },
                { text: "En Blue Lock, el fútbol es mi única familia.", friendship: 3, response: "Vives 100% para este proyecto, asombroso." },
                { text: "Los extraño demasiado, a veces quiero irme.", friendship: -2, response: "No dejes que la nostalgia arruine tu oportunidad." },
                { text: "No mucho, me gusta la independencia aquí.", friendship: 2, response: "Es verdad, es como vivir en la universidad." }
            ]
        },
        {
            stage: 16,
            text: "¿Qué opinas de usar el fracaso de otros como escalón para subir?",
            options: [
                { text: "Es la dura realidad del deporte profesional.", friendship: 5, response: "Triste pero cierto, solo uno puede ganar." },
                { text: "Intento no pensar en ello y solo jugar.", friendship: 2, response: "Sí, enfocarse en uno mismo es más sano." },
                { text: "Me encanta pisotear los sueños de otros.", friendship: -4, response: "Wow... eso es demasiado sádico." },
                { text: "Prefiero ganar superando al mejor, no al peor.", friendship: 4, response: "Esa es una mentalidad de verdadero guerrero." }
            ]
        },
        {
            stage: 17,
            text: "¿Te gusta jugar con lluvia o prefieres el clima seco?",
            options: [
                { text: "La lluvia hace el balón más rápido, me encanta.", friendship: 4, response: "¡Sí! Los tiros lejanos son letales así." },
                { text: "Seco, para poder controlar el balón perfectamente.", friendship: 3, response: "La técnica brilla más sin el suelo resbaladizo." },
                { text: "Odio mojarme, me arruina el peinado.", friendship: -3, response: "¿Te importa más el peinado que el partido?" },
                { text: "Me da igual, soy letal en cualquier clima.", friendship: 5, response: "¡Esa es la actitud de un delantero de clase mundial!" }
            ]
        },
        {
            stage: 18,
            text: "¿Quién crees que es el jugador más peligroso en nuestro bloque?",
            options: [
                { text: "Isagi, su visión de campo asusta.", friendship: 4, response: "Totalmente, parece que puede predecir el futuro." },
                { text: "Barou, es un monstruo físico imparable.", friendship: 4, response: "Sí, si te choca, despídete de tus costillas." },
                { text: "Rin, está en otro nivel completamente.", friendship: 4, response: "Rin es aterrador. No tiene debilidades." },
                { text: "Yo. Yo soy el más peligroso de todos.", friendship: 5, response: "¡Jajaja! ¡Esa confianza es genial!" }
            ]
        },
        {
            stage: 19,
            text: "¿Sientes que has mejorado desde que llegaste a Blue Lock?",
            options: [
                { text: "Sí, mi cuerpo y mente son más afilados.", friendship: 5, response: "Se nota en la cancha, estás jugando increíble." },
                { text: "Aún me falta mucho por aprender.", friendship: 3, response: "Esa humildad te hará llegar lejos." },
                { text: "No, el sistema aquí es basura.", friendship: -4, response: "Si piensas así, nunca mejorarás." },
                { text: "He despertado a mi verdadero ego.", friendship: 4, response: "Ego estaría orgulloso de escuchar eso." }
            ]
        },
        {
            stage: 20,
            text: "¿Prefieres marcar un gol feo pero útil, o uno hermoso que no decide el partido?",
            options: [
                { text: "Gol útil. Aquí los puntos son vida o muerte.", friendship: 5, response: "Exacto. Un gol basura vale lo mismo en el marcador." },
                { text: "Un gol hermoso, el fútbol es un espectáculo.", friendship: 2, response: "Interesante, priorizas el arte sobre la eficiencia." },
                { text: "Ambos: Marcaré un gol hermoso para ganar el partido.", friendship: 4, response: "¡Esa es la meta máxima de un delantero!" },
                { text: "Me da igual, mientras yo sea quien chute.", friendship: 3, response: "Puro egoísmo puro." }
            ]
        },
        {
            stage: 21,
            text: "¿Te molestan los jugadores que hablan mucho durante el partido?",
            options: [
                { text: "Los ignoro y los humillo con mi juego.", friendship: 5, response: "El silencio duele más cuando viene con un gol." },
                { text: "Me molesta, a veces pierdo la concentración.", friendship: 1, response: "Tienes que endurecer tu mente contra ellos." },
                { text: "Yo soy de los que habla para desconcentrarlos.", friendship: 3, response: "Jaja, usando la guerra psicológica." },
                { text: "Los golpeo cuando el árbitro no mira.", friendship: -5, response: "¡Oye, te van a sacar roja directa!" }
            ]
        }
,
        {
            stage: 22,
            text: "¿Qué es lo más importante para sobrevivir en Blue Lock?",
            options: [
                { text: "Un ego inquebrantable.", friendship: 4, response: "Esa es la actitud de un verdadero delantero." },
                { text: "Hacer amigos.", friendship: -3, response: "Estás en el lugar equivocado, idiota." },
                { text: "Seguir las reglas.", friendship: 0, response: "Eso te mantendrá en la mediocridad." },
                { text: "Entrenar duro.", friendship: 2, response: "Es lo mínimo que se espera de ti." }
            ]
        },
        {
            stage: 23,
            text: "¿Qué comes antes de un partido crucial?",
            options: [
                { text: "Carbohidratos limpios.", friendship: 4, response: "Energía perfecta para los 90 minutos." },
                { text: "Comida rápida.", friendship: -3, response: "Tu cuerpo te va a traicionar en el campo." },
                { text: "Nada, juego con hambre.", friendship: 0, response: "Podrías desmayarte, ten cuidado." },
                { text: "Proteínas ligeras.", friendship: 2, response: "Buena elección para mantener los músculos." }
            ]
        },
        {
            stage: 24,
            text: "En un entrenamiento de pesas, ¿en qué te enfocas?",
            options: [
                { text: "Potencia explosiva.", friendship: 4, response: "Ideal para arranques rápidos." },
                { text: "Levantar más que el resto.", friendship: -3, response: "El ego en el gimnasio no marca goles." },
                { text: "Resistencia muscular.", friendship: 2, response: "Te mantendrá firme al final del partido." },
                { text: "Equilibrio y core.", friendship: 0, response: "Muy importante para no perder el balón." }
            ]
        },
        {
            stage: 25,
            text: "¿Cómo analizas los videos del rival?",
            options: [
                { text: "Busco sus debilidades defensivas.", friendship: 4, response: "La mente de un cazador de goles." },
                { text: "Me aburren los videos.", friendship: -3, response: "La ignorancia te costará el partido." },
                { text: "Miro sus mejores jugadas.", friendship: 0, response: "Para admirarlos o para detenerlos?" },
                { text: "Estudio los movimientos del portero.", friendship: 2, response: "Información vital para definir." }
            ]
        },
        {
            stage: 26,
            text: "Hay un tiro libre cerca del área. ¿Qué haces?",
            options: [
                { text: "Tomo el balón con autoridad.", friendship: 4, response: "El gol es tuyo por derecho." },
                { text: "Dejo que otro cobre.", friendship: -3, response: "Cobarde. Perdiste una oportunidad." },
                { text: "Pido jugada preparada.", friendship: 0, response: "Puede funcionar, si el equipo responde." },
                { text: "Analizo la barrera primero.", friendship: 2, response: "La inteligencia aumenta la precisión." }
            ]
        },
        {
            stage: 27,
            text: "Quedas solo frente al arco, ¿cómo defines?",
            options: [
                { text: "Destruyo la red con potencia.", friendship: 4, response: "¡Fuerza imparable!" },
                { text: "Se la paso a un compañero.", friendship: -3, response: "Eres una decepción como delantero." },
                { text: "Colocada al ángulo.", friendship: 2, response: "Elegancia y frialdad." },
                { text: "Intento picarla (vaselina).", friendship: 0, response: "Arriesgado, pero humillante si entra." }
            ]
        },
        {
            stage: 28,
            text: "¿Cómo manejas la presión de un estadio lleno?",
            options: [
                { text: "Me alimenta, juego mejor.", friendship: 4, response: "Naciste para los grandes escenarios." },
                { text: "Me tiemblan las piernas.", friendship: -3, response: "El pánico es tu peor enemigo." },
                { text: "Trato de ignorar el ruido.", friendship: 0, response: "Concéntrate solo en el balón." },
                { text: "Visualizo la victoria.", friendship: 2, response: "Buena preparación mental." }
            ]
        },
        {
            stage: 29,
            text: "¿Cuál es tu rutina en el calentamiento?",
            options: [
                { text: "Ejercicios con balón intensos.", friendship: 4, response: "Listo para la acción desde el minuto 1." },
                { text: "Solo troto un poco.", friendship: -3, response: "Te vas a lesionar por vago." },
                { text: "Estiramientos dinámicos.", friendship: 2, response: "Prevención y preparación óptima." },
                { text: "Practico tiros al arco.", friendship: 0, response: "Calibrando la mira tempranamente." }
            ]
        },
        {
            stage: 30,
            text: "¿Cuántas horas duermes antes de jugar?",
            options: [
                { text: "8 horas estrictas.", friendship: 4, response: "El descanso es entrenamiento invisible." },
                { text: "Duermo poco por los nervios.", friendship: -3, response: "La fatiga nublará tu juicio." },
                { text: "Tomo siestas cortas.", friendship: 0, response: "Mejor que nada, pero no es ideal." },
                { text: "9 horas, recuperación total.", friendship: 2, response: "Tu cuerpo te lo agradecerá." }
            ]
        },
        {
            stage: 31,
            text: "¿Qué opinas del talento natural?",
            options: [
                { text: "Sin trabajo duro, no es nada.", friendship: 4, response: "El esfuerzo devora al talento." },
                { text: "Es lo único que importa.", friendship: -3, response: "Te estancarás muy pronto." },
                { text: "Es una buena base.", friendship: 0, response: "Cierto, pero hay que pulirlo." },
                { text: "El entrenamiento lo supera.", friendship: 2, response: "La constancia es la clave del éxito." }
            ]
        },
        {
            stage: 32,
            text: "Empieza a llover torrencialmente en el partido. ¿Qué piensas?",
            options: [
                { text: "El balón rodará más rápido, me gusta.", friendship: 4, response: "Adaptación perfecta al clima." },
                { text: "Odio mojarme.", friendship: -3, response: "El clima no es excusa para los débiles." },
                { text: "Cuidado con los resbalones.", friendship: 0, response: "Precaución válida." },
                { text: "Es momento de tiros de larga distancia.", friendship: 2, response: "Inteligente, el portero tendrá problemas." }
            ]
        },
        {
            stage: 33,
            text: "¿Qué tipo de botas de fútbol prefieres?",
            options: [
                { text: "Ligeras, para mayor velocidad.", friendship: 4, response: "El peso pluma te hará volar." },
                { text: "Las más bonitas.", friendship: -3, response: "La estética no marca goles." },
                { text: "Las que ofrecen mejor toque.", friendship: 2, response: "El control es fundamental." },
                { text: "Botas clásicas y resistentes.", friendship: 0, response: "Fiel a la vieja escuela." }
            ]
        },
        {
            stage: 34,
            text: "¿Cómo mejoras tu visión de campo?",
            options: [
                { text: "Levanto la cabeza antes de recibir.", friendship: 4, response: "El escaneo previo es de élite." },
                { text: "Solo miro el balón.", friendship: -3, response: "Así te robarán el balón siempre." },
                { text: "Juego videojuegos de fútbol.", friendship: 0, response: "Curioso, pero ayuda a la perspectiva." },
                { text: "Observo el movimiento sin balón.", friendship: 2, response: "La inteligencia espacial es clave." }
            ]
        },
        {
            stage: 35,
            text: "¿Qué importancia le das al trabajo de 'core'?",
            options: [
                { text: "Es la base de todo mi equilibrio.", friendship: 4, response: "Sin core no hay potencia ni control." },
                { text: "Solo quiero abdominales marcados.", friendship: -3, response: "Vanidad sobre rendimiento, patético." },
                { text: "Lo hago si tengo tiempo.", friendship: 0, response: "Debería ser prioridad." },
                { text: "Me ayuda a ganar duelos físicos.", friendship: 2, response: "Exacto, nadie te tirará fácilmente." }
            ]
        },
        {
            stage: 36,
            text: "Recibes un pase muy fuerte. ¿Cómo lo controlas?",
            options: [
                { text: "Amortiguo el impacto con el pecho/pie.", friendship: 4, response: "Control de clase mundial." },
                { text: "Dejo que rebote.", friendship: -3, response: "Regalaste el balón al rival." },
                { text: "Uso el cuerpo para protegerlo.", friendship: 2, response: "Uso inteligente de la física." },
                { text: "Lo desvío de primera intención.", friendship: 0, response: "Un recurso útil si estás presionado." }
            ]
        },
        {
            stage: 37,
            text: "¿Qué buscas con un control orientado?",
            options: [
                { text: "Eliminar al defensa de un solo toque.", friendship: 4, response: "La eficiencia del primer toque." },
                { text: "Solo detener el balón.", friendship: -3, response: "Muy lento para el fútbol moderno." },
                { text: "Prepararme para el tiro.", friendship: 2, response: "El paso previo a la destrucción." },
                { text: "Ganar espacio libre.", friendship: 0, response: "Buena lectura de los espacios." }
            ]
        },
        {
            stage: 38,
            text: "Viene un centro alto al área. ¿Qué haces?",
            options: [
                { text: "Ataco el balón con agresividad.", friendship: 4, response: "Ese balón es tuyo." },
                { text: "Espero a ver si sobra a la defensa.", friendship: -3, response: "La indecisión pierde oportunidades." },
                { text: "Salto antes que el defensa.", friendship: 2, response: "El 'timing' es perfecto." },
                { text: "Me ubico en el segundo palo.", friendship: 0, response: "Astuto, buscando el rebote." }
            ]
        },
        {
            stage: 39,
            text: "Minuto 90, el partido está empatado. ¿Qué sientes?",
            options: [
                { text: "Es mi momento para ser el héroe.", friendship: 4, response: "El ego en su máxima expresión." },
                { text: "Solo quiero que termine.", friendship: -3, response: "No tienes corazón de campeón." },
                { text: "Presión, pero de la buena.", friendship: 2, response: "Ese cosquilleo es adrenalina pura." },
                { text: "Tengo que cuidar la defensa.", friendship: 0, response: "Pragmático, pero poco ambicioso." }
            ]
        },
        {
            stage: 40,
            text: "Es la tanda de penales. ¿Pides tirar?",
            options: [
                { text: "Pido el quinto penal, el definitivo.", friendship: 4, response: "Quieres toda la gloria." },
                { text: "Me escondo para no tirar.", friendship: -3, response: "Cobarde. Blue Lock no es para ti." },
                { text: "Tiro el primero para dar confianza.", friendship: 2, response: "Liderazgo y responsabilidad." },
                { text: "Tiro el que el entrenador decida.", friendship: 0, response: "Eres obediente." }
            ]
        },
        {
            stage: 41,
            text: "Acabas de fallar un gol cantado. ¿Cómo reaccionas?",
            options: [
                { text: "Me enfado y busco el siguiente de inmediato.", friendship: 4, response: "Esa es la mentalidad de un 'striker'." },
                { text: "Me hundo moralmente.", friendship: -3, response: "Tu debilidad mental es un lastre." },
                { text: "Analizo por qué fallé.", friendship: 2, response: "Corrección rápida, muy analítico." },
                { text: "Pido perdón a los compañeros.", friendship: 0, response: "Menos disculpas, más goles." }
            ]
        },
        {
            stage: 42,
            text: "¿Qué piensas de la filosofía de Jinpachi Ego?",
            options: [
                { text: "Es la verdad absoluta del fútbol.", friendship: 4, response: "Has despertado." },
                { text: "Es una locura cruel.", friendship: -3, response: "Entonces lárgate a casa." },
                { text: "Es extrema, pero necesaria.", friendship: 2, response: "Entiendes el propósito detrás de la locura." },
                { text: "Solo es un método más.", friendship: 0, response: "Subestimas el poder del egoísmo." }
            ]
        },
        {
            stage: 43,
            text: "¿Cómo te mantienes hidratado?",
            options: [
                { text: "Agua y electrolitos calculados.", friendship: 4, response: "Hidratación profesional." },
                { text: "Bebidas energéticas con mucha azúcar.", friendship: -3, response: "Te hundirás en la segunda mitad." },
                { text: "Bebo solo cuando tengo sed.", friendship: 0, response: "Eso ya es deshidratación, cuidado." },
                { text: "Mucha agua durante todo el día.", friendship: 2, response: "Simple pero efectivo." }
            ]
        },
        {
            stage: 44,
            text: "Termina el partido, estás agotado. ¿Estiras?",
            options: [
                { text: "Siempre, es vital para la recuperación.", friendship: 4, response: "Disciplina intacta hasta el final." },
                { text: "No, me voy directo a ducharme.", friendship: -3, response: "Tus músculos lo pagarán mañana." },
                { text: "Estiro los músculos más cargados.", friendship: 2, response: "Un enfoque inteligente." },
                { text: "Solo si el preparador físico me obliga.", friendship: 0, response: "Falta de proactividad." }
            ]
        },
        {
            stage: 45,
            text: "Frente al portero en un 1 vs 1, ¿qué miras?",
            options: [
                { text: "Sus pies, para ver hacia dónde se inclina.", friendship: 4, response: "Lectura corporal perfecta." },
                { text: "Miro al suelo.", friendship: -3, response: "El miedo te paraliza." },
                { text: "El espacio libre en la portería.", friendship: 2, response: "Calculando la trayectoria ideal." },
                { text: "Fijo mi vista en sus ojos para intimidarlo.", friendship: 0, response: "Batalla psicológica, me gusta." }
            ]
        },
        {
            stage: 46,
            text: "¿Qué papel juega la comunicación verbal en tu juego?",
            options: [
                { text: "Exijo el balón cuando estoy mejor ubicado.", friendship: 4, response: "El ego exige ser alimentado." },
                { text: "Juego callado, casi ni hablo.", friendship: -3, response: "Un fantasma en el campo no sirve." },
                { text: "Guío a mis compañeros con instrucciones.", friendship: 2, response: "Tomando el rol de líder tácito." },
                { text: "Uso más lenguaje corporal.", friendship: 0, response: "A veces una mirada basta." }
            ]
        },
        {
            stage: 47,
            text: "¿Cuándo decides usar una finta o regate?",
            options: [
                { text: "Para humillar al rival y ganar ventaja.", friendship: 4, response: "Destruir su moral es clave." },
                { text: "Todo el tiempo, aunque no sea necesario.", friendship: -3, response: "Exceso de adornos, falta de efectividad." },
                { text: "Solo cuando no tengo línea de pase.", friendship: 2, response: "Uso racional de la habilidad." },
                { text: "En el 1 contra 1 cerca del área.", friendship: 0, response: "El lugar más peligroso para desequilibrar." }
            ]
        },
        {
            stage: 48,
            text: "Al disparar de lejos, ¿qué buscas priorizar?",
            options: [
                { text: "Potencia letal que rompa las manos del portero.", friendship: 4, response: "Un misil indetenible." },
                { text: "Cerrar los ojos y pegarle fuerte.", friendship: -3, response: "Eso es de amateurs." },
                { text: "Efecto hacia afuera para engañar.", friendship: 2, response: "La física a tu favor." },
                { text: "Colocación pegada al palo.", friendship: 0, response: "Precisión por sobre la fuerza." }
            ]
        },
        {
            stage: 49,
            text: "¿Cómo dominas el efecto en el balón (Knuckleball / Curva)?",
            options: [
                { text: "Practicando hasta sangrar.", friendship: 4, response: "El precio de un arma especial." },
                { text: "No lo uso, es muy difícil.", friendship: -3, response: "Te conformas con la mediocridad." },
                { text: "Estudiando la zona de impacto del pie.", friendship: 2, response: "Biomecánica pura." },
                { text: "Depende del clima y el balón.", friendship: 0, response: "Sensibilidad pura." }
            ]
        },
        {
            stage: 50,
            text: "¿Qué nivel de agresividad es aceptable al presionar?",
            options: [
                { text: "Voy al límite, deben sentir miedo.", friendship: 4, response: "El depredador acecha a su presa." },
                { text: "Juego suave para no hacer faltas.", friendship: -3, response: "Eres demasiado blando." },
                { text: "Agresivo, pero sin ganar tarjetas tontas.", friendship: 2, response: "Furia controlada." },
                { text: "Presiono líneas de pase, no al jugador.", friendship: 0, response: "Defensa táctica." }
            ]
        },
        {
            stage: 51,
            text: "Sientes un tirón muscular ligero en el partido. ¿Qué haces?",
            options: [
                { text: "Lo ignoro y sigo jugando a muerte.", friendship: 4, response: "Peligroso, pero admiro tu pasión." },
                { text: "Me tiro al suelo y lloro.", friendship: -3, response: "Patético espectáculo." },
                { text: "Pido el cambio de inmediato.", friendship: 0, response: "Seguro, pero el equipo te necesitaba." },
                { text: "Bajo la intensidad pero me mantengo táctico.", friendship: 2, response: "Inteligencia para sobrevivir." }
            ]
        },
        {
            stage: 52,
            text: "¿Qué comes en el descanso del medio tiempo?",
            options: [
                { text: "Un gel energético y agua.", friendship: 4, response: "Combustible instantáneo." },
                { text: "Un sándwich entero.", friendship: -3, response: "Vas a vomitar en el segundo tiempo." },
                { text: "Solo me enjuago la boca.", friendship: 0, response: "Quizás te falte energía al final." },
                { text: "Un trozo de plátano.", friendship: 2, response: "Potasio clásico y efectivo." }
            ]
        },
        {
            stage: 53,
            text: "¿Tomas suplementos deportivos (proteínas, creatina)?",
            options: [
                { text: "Claro, mi cuerpo es una máquina de élite.", friendship: 4, response: "Optimización al 100%." },
                { text: "No, eso es trampa.", friendship: -3, response: "Ignorancia científica." },
                { text: "Solo lo que el nutricionista aprueba.", friendship: 2, response: "Confianza en los expertos." },
                { text: "A veces, cuando me acuerdo.", friendship: 0, response: "Falta de disciplina." }
            ]
        },
        {
            stage: 54,
            text: "¿Practicas la visualización mental antes del juego?",
            options: [
                { text: "Sí, me veo destrozando la red rival.", friendship: 4, response: "El gol nace primero en la mente." },
                { text: "No, solo improviso.", friendship: -3, response: "Dejarlo al azar es de perdedores." },
                { text: "Repaso mis jugadas y movimientos.", friendship: 2, response: "La mente prepara al cuerpo." },
                { text: "Intento relajarme y no pensar.", friendship: 0, response: "Manejo del estrés válido." }
            ]
        },
        {
            stage: 55,
            text: "El rival tiene una defensa cerrada. ¿Cómo te desmarcas?",
            options: [
                { text: "Movimientos bruscos y cambios de ritmo.", friendship: 4, response: "Rompimiento de líneas agresivo." },
                { text: "Me quedo parado esperando.", friendship: -3, response: "Un blanco fácil de marcar." },
                { text: "Arrastro marcas para abrir espacios.", friendship: 2, response: "Sacrificio táctico brillante." },
                { text: "Juego al borde del fuera de juego.", friendship: 0, response: "Viviendo en el límite del reglamento." }
            ]
        },
        {
            stage: 56,
            text: "Te toca jugar de espaldas a la portería. ¿Cuál es tu plan?",
            options: [
                { text: "Girar rápido y disparar sin avisar.", friendship: 4, response: "El instinto de un verdadero '9'." },
                { text: "Devolverla hacia atrás y esconderme.", friendship: -3, response: "No aportas nada al ataque." },
                { text: "Agantar el balón y esperar apoyos.", friendship: 2, response: "Pivote clásico, muy útil." },
                { text: "Forzar una falta del defensa.", friendship: 0, response: "Astucia competitiva." }
            ]
        },
        {
            stage: 57,
            text: "¿Cómo ejecutas una presión alta efectiva?",
            options: [
                { text: "Cazo al defensa como una fiera.", friendship: 4, response: "El error rival es tu oportunidad." },
                { text: "Corro sin sentido a todos lados.", friendship: -3, response: "Desperdicias energía a lo tonto." },
                { text: "Corto las líneas de pase hacia el medio.", friendship: 2, response: "Inteligencia defensiva." },
                { text: "Presiono solo cuando el balón va al central.", friendship: 0, response: "Presión selectiva (gatillos)." }
            ]
        },
        {
            stage: 58,
            text: "El equipo recupera el balón y hay contragolpe. ¿Qué haces?",
            options: [
                { text: "Corro como loco hacia el espacio libre.", friendship: 4, response: "La velocidad es tu mejor arma aquí." },
                { text: "Camino lento, estoy cansado.", friendship: -3, response: "Acabas de matar la jugada." },
                { text: "Acompaño la jugada buscando el pase atrás.", friendship: 2, response: "Llegando desde segunda línea." },
                { text: "Me abro por la banda para estirar la defensa.", friendship: 0, response: "Creando amplitud en ataque." }
            ]
        },
        {
            stage: 59,
            text: "Vas ganando y falta poco tiempo. ¿Qué priorizas?",
            options: [
                { text: "Buscar el siguiente gol para humillarlos.", friendship: 4, response: "El hambre nunca se sacia." },
                { text: "Patear el balón a la grada.", friendship: -3, response: "Falta de clase y nervios de cristal." },
                { text: "Mantener la posesión de forma segura.", friendship: 2, response: "Controlando el ritmo a favor." },
                { text: "Llevar el balón al banderín de córner.", friendship: 0, response: "El arte de perder tiempo." }
            ]
        },
        {
            stage: 60,
            text: "¿Qué prefieres: Posesión del 70% o Verticalidad pura?",
            options: [
                { text: "Verticalidad, quiero llegar al arco en 3 pases.", friendship: 4, response: "Fútbol directo y letal." },
                { text: "Me da igual, no entiendo de tácticas.", friendship: -3, response: "La ignorancia es imperdonable." },
                { text: "Posesión, dominar al rival fatiga su mente.", friendship: 2, response: "Control absoluto del juego." },
                { text: "Una mezcla, dependerá del rival.", friendship: 0, response: "Pragmatismo táctico." }
            ]
        },
        {
            stage: 61,
            text: "Acabas de marcar un gol increíble. ¿Cómo lo celebras?",
            options: [
                { text: "Con arrogancia, demostrando mi superioridad.", friendship: 4, response: "El ego alimentado en su esplendor." },
                { text: "No celebro, fue pura suerte.", friendship: -3, response: "Si no crees en ti, nadie lo hará." },
                { text: "Abrazo a quien me dio la asistencia.", friendship: 2, response: "Reconociendo el mérito compartido." },
                { text: "Un grito de furia al cielo.", friendship: 0, response: "Liberación de tensión pura." }
            ]
        },
        {
            stage: 62,
            text: "Un defensa te insulta para desconcentrarte. ¿Qué haces?",
            options: [
                { text: "Le marco un gol en la cara como respuesta.", friendship: 4, response: "Habla con tus botas, no con tu boca." },
                { text: "Le devuelvo el insulto y me expulsan.", friendship: -3, response: "Caíste en su trampa como un novato." },
                { text: "Me río de él, demostrando que no me afecta.", friendship: 2, response: "Frialdad psicológica." },
                { text: "Lo ignoro por completo.", friendship: 0, response: "Concentración de hierro." }
            ]
        },
        {
            stage: 63,
            text: "¿Cómo resistes el juego duro y las patadas?",
            options: [
                { text: "Me levanto rápido, no muestro debilidad.", friendship: 4, response: "Resiliencia de un monstruo." },
                { text: "Finjo que me duele más para sacar tarjeta.", friendship: -3, response: "El teatro es para actores, no delanteros." },
                { text: "Mejoro mi anticipación para que no me alcancen.", friendship: 2, response: "Inteligencia evasiva." },
                { text: "Uso mi cuerpo para absorber el golpe.", friendship: 0, response: "Física y robustez." }
            ]
        },
        {
            stage: 64,
            text: "El entrenador te pone en otra posición. ¿Cómo reaccionas?",
            options: [
                { text: "Demuestro que soy el mejor en esa posición también.", friendship: 4, response: "Ego adaptable." },
                { text: "Me niego a jugar.", friendship: -3, response: "Entonces vete a casa." },
                { text: "Intento entender qué táctica busca el DT.", friendship: 2, response: "Mentalidad abierta al aprendizaje." },
                { text: "Cumplo, pero buscando siempre atacar.", friendship: 0, response: "Llevas tu instinto adonde vayas." }
            ]
        },
        {
            stage: 65,
            text: "¿Qué piensas de tus compañeros en Blue Lock?",
            options: [
                { text: "Son peldaños para mi evolución.", friendship: 4, response: "La visión correcta de la supervivencia." },
                { text: "Son mis mejores amigos por siempre.", friendship: -3, response: "Esa debilidad te costará la carrera." },
                { text: "Son rivales que debo superar cada día.", friendship: 2, response: "Competencia sana y feroz." },
                { text: "Piezas de un tablero que puedo usar.", friendship: 0, response: "Mente maestra y calculadora." }
            ]
        },
        {
            stage: 66,
            text: "¿De dónde nace tu obsesión por ser el número 1?",
            options: [
                { text: "De mi ego indomable, no acepto ser el segundo.", friendship: 4, response: "El motor de Jinpachi Ego aprueba esto." },
                { text: "No me importa ser el número 1 realmente.", friendship: -3, response: "Eres un caso perdido." },
                { text: "Del deseo de jugar en el mejor club del mundo.", friendship: 2, response: "Ambición profesional clara." },
                { text: "De no querer volver a mi antigua vida aburrida.", friendship: 0, response: "El miedo al fracaso también impulsa." }
            ]
        },
        {
            stage: 67,
            text: "¿Qué significa el 'Trabajo en equipo' para ti?",
            options: [
                { text: "Hacer que todos jueguen para mis goles.", friendship: 4, response: "El egoísmo sistemático funciona." },
                { text: "Todos somos iguales.", friendship: -3, response: "La igualdad en el campo es una ilusión." },
                { text: "Sinergia: 1+1 = 3.", friendship: 2, response: "Reacciones químicas poderosas." },
                { text: "Es pasar el balón cuando no tengo opción.", friendship: 0, response: "Un mal necesario a veces." }
            ]
        },
        {
            stage: 68,
            text: "¿Cómo te concentras antes de salir al campo?",
            options: [
                { text: "Aislando mi mente, visualizando mi dominio.", friendship: 4, response: "Estado mental óptimo." },
                { text: "Revisando el celular.", friendship: -3, response: "Totalmente desconectado del objetivo." },
                { text: "Escuchando música motivadora a tope.", friendship: 2, response: "Ritmo y frecuencia cardiaca arriba." },
                { text: "Respiración profunda controlada.", friendship: 0, response: "Oxigenando el cerebro táctico." }
            ]
        },
        {
            stage: 69,
            text: "¿Has experimentado el estado de 'Flow' (Flujo)?",
            options: [
                { text: "Sí, cuando mi ego y el campo son uno solo.", friendship: 4, response: "La inmersión total del goleador." },
                { text: "No sé qué es eso.", friendship: -3, response: "Aún no has despertado verdaderamente." },
                { text: "Sí, cuando los desafíos coinciden con mi nivel.", friendship: 2, response: "La teoría del Flow aplicada." },
                { text: "A veces pierdo la noción del tiempo jugando.", friendship: 0, response: "Ese es el primer síntoma." }
            ]
        },
        {
            stage: 70,
            text: "¿Qué sientes sobre el miedo a fallar?",
            options: [
                { text: "Lo uso como combustible para no detenerme.", friendship: 4, response: "Transformar el miedo en poder." },
                { text: "Me aterroriza, por eso no arriesgo.", friendship: -3, response: "El miedo ya te derrotó." },
                { text: "Es natural, pero confío en mi entrenamiento.", friendship: 2, response: "Lógica sólida contra la ansiedad." },
                { text: "No siento miedo de nada, soy perfecto.", friendship: 0, response: "Arrogancia ciega, cuidado." }
            ]
        },
        {
            stage: 71,
            text: "¿Cómo superas tus límites físicos en el partido?",
            options: [
                { text: "Mi ego me empuja cuando el cuerpo se rinde.", friendship: 4, response: "El milagro del espíritu competitivo." },
                { text: "No los supero, pido el cambio.", friendship: -3, response: "Falta de compromiso extremo." },
                { text: "Administrando mi energía inteligentemente antes.", friendship: 2, response: "Eficiencia energética." },
                { text: "Adrenalina pura, ignoro el dolor.", friendship: 0, response: "Peligroso pero a veces necesario." }
            ]
        },
        {
            stage: 72,
            text: "¿Revisas tus datos biométricos y estadísticas?",
            options: [
                { text: "Solo los goles, el resto no importa.", friendship: 4, response: "El ego en su máxima pureza." },
                { text: "Nunca reviso nada.", friendship: -3, response: "La ignorancia detiene la evolución." },
                { text: "Sí, para saber dónde mejorar físicamente.", friendship: 2, response: "Análisis inteligente." },
                { text: "Reviso si corrí más que mi rival.", friendship: 0, response: "Competencia métrica." }
            ]
        },
        {
            stage: 73,
            text: "¿Qué opinas del VAR en el fútbol?",
            options: [
                { text: "Solo me importa si valida mis goles.", friendship: 4, response: "Visión centrada en uno mismo." },
                { text: "Me da miedo que me anulen todo.", friendship: -3, response: "Inseguridad constante." },
                { text: "Es una herramienta de justicia necesaria.", friendship: 2, response: "Opinión sensata y diplomática." },
                { text: "Le quita la emoción al grito de gol.", friendship: 0, response: "Un romántico del viejo fútbol." }
            ]
        },
        {
            stage: 74,
            text: "¿Qué valor le das a dar una asistencia?",
            options: [
                { text: "Si el otro marca, es porque yo lo permití.", friendship: 4, response: "Ego supremo incluso al pasar." },
                { text: "Mejor paso para no fallar yo.", friendship: -3, response: "Mediocridad disfrazada de altruismo." },
                { text: "Vale lo mismo que un gol.", friendship: 2, response: "Mentalidad de creador de juego." },
                { text: "Es el plan B si no puedo disparar.", friendship: 0, response: "Prioridades claras." }
            ]
        },
        {
            stage: 75,
            text: "Un rebote queda muerto en el área. ¿Qué haces?",
            options: [
                { text: "Me lanzo como un animal para empujarla.", friendship: 4, response: "El instinto de cazador del área." },
                { text: "Espero a ver quién la agarra.", friendship: -3, response: "Lento, te la robarán siempre." },
                { text: "Leo la trayectoria antes de que caiga.", friendship: 2, response: "Anticipación letal." },
                { text: "Remato de primera sin pensar.", friendship: 0, response: "Reflejos puros." }
            ]
        },
        {
            stage: 76,
            text: "El equipo no logra retener el balón. ¿Cuál es la solución?",
            options: [
                { text: "Que me la den a mí, yo lo resuelvo solo.", friendship: 4, response: "Confianza absoluta." },
                { text: "Llorarle al árbitro.", friendship: -3, response: "Eres una vergüenza." },
                { text: "Triangular y buscar superioridad numérica.", friendship: 2, response: "Entendimiento táctico de posesión." },
                { text: "Jugar pases largos a mi velocidad.", friendship: 0, response: "Salida directa y efectiva." }
            ]
        },
        {
            stage: 77,
            text: "¿Cómo controlas el ritmo de un partido caótico?",
            options: [
                { text: "Imponiendo mi propio ritmo a la fuerza.", friendship: 4, response: "Tú eres el centro de gravedad." },
                { text: "No puedo, me vuelvo loco también.", friendship: -3, response: "Falta de madurez futbolística." },
                { text: "Pisando el balón y calmando a todos.", friendship: 2, response: "Inteligencia emocional y técnica." },
                { text: "Aprovechando el caos para contragolpear.", friendship: 0, response: "El desorden es tu escalera." }
            ]
        },
        {
            stage: 78,
            text: "¿Cuándo decides hacer un cambio de frente largo?",
            options: [
                { text: "Cuando veo a mi rival débil aislado.", friendship: 4, response: "Buscando la destrucción del eslabón débil." },
                { text: "Para deshacerme de la pelota.", friendship: -3, response: "No sabes qué hacer con el balón." },
                { text: "Para descongestionar la zona de presión.", friendship: 2, response: "Excelente lectura de los espacios." },
                { text: "Si veo que el extremo hace la diagonal.", friendship: 0, response: "Conexión visual rápida." }
            ]
        },
        {
            stage: 79,
            text: "Recibes por la banda, ¿centras o encaras?",
            options: [
                { text: "Encaro hacia el medio para disparar yo.", friendship: 4, response: "La mentalidad que Blue Lock exige." },
                { text: "Centro sin mirar.", friendship: -3, response: "Tirar la moneda al aire no es fútbol." },
                { text: "Centro si veo una ventaja numérica clara.", friendship: 2, response: "Toma de decisiones racional." },
                { text: "Hago un amague y gano línea de fondo.", friendship: 0, response: "Desequilibrio clásico." }
            ]
        },
        {
            stage: 80,
            text: "¿Cuál es tu estrategia en los tiros de esquina ofensivos?",
            options: [
                { text: "Atacar el balón en el aire devorando marcas.", friendship: 4, response: "Imparable por arriba." },
                { text: "Quedarme fuera del área por si acaso.", friendship: -3, response: "Cero impacto ofensivo." },
                { text: "Bloquear a los defensores de mis compañeros.", friendship: 2, response: "Trabajo sucio táctico." },
                { text: "Ir al primer palo a peinar el balón.", friendship: 0, response: "Movimiento de manual." }
            ]
        },
        {
            stage: 81,
            text: "Hay un saque de banda lateral. ¿Cómo te ofreces?",
            options: [
                { text: "Pido el balón al pie para girar rápido.", friendship: 4, response: "Confianza en tu control." },
                { text: "Me escondo detrás de mi marca.", friendship: -3, response: "Pasividad total." },
                { text: "Pico al espacio vacío para llevarme al central.", friendship: 2, response: "Movimiento inteligente sin balón." },
                { text: "Se la devuelvo de primera al sacador.", friendship: 0, response: "Juego seguro y simple." }
            ]
        },
        {
            stage: 82,
            text: "¿Qué opinas del dominio del medio campo?",
            options: [
                { text: "No importa si mis contragolpes son letales.", friendship: 4, response: "Cierto, la posesión no asegura la victoria." },
                { text: "Es lo único que importa.", friendship: -3, response: "El objetivo es marcar, no dar pases infinitos." },
                { text: "Quien domina el medio, controla los tiempos.", friendship: 2, response: "Filosofía tradicional correcta." },
                { text: "Prefiero el fútbol directo.", friendship: 0, response: "Saltar líneas es válido." }
            ]
        },
        {
            stage: 83,
            text: "Tu equipo sufre una tarjeta roja. Juegan con 10. ¿Plan?",
            options: [
                { text: "Correré por dos y haré el gol de la victoria.", friendship: 4, response: "Ego multiplicado ante la adversidad." },
                { text: "Rendirse, es imposible ganar así.", friendship: -3, response: "Mentalidad de perdedor." },
                { text: "Juntarnos en defensa y buscar el milagro.", friendship: 2, response: "Supervivencia colectiva." },
                { text: "Dejar un solo hombre arriba esperando mi pase.", friendship: 0, response: "Táctica de resistencia clásica." }
            ]
        },
        {
            stage: 84,
            text: "Minuto 85, van ganando 1-0. ¿Defiendes el resultado?",
            options: [
                { text: "Nunca. Buscaré el 2-0 para liquidarlos.", friendship: 4, response: "La mejor defensa es un ataque aplastante." },
                { text: "Me pongo a llorar de los nervios.", friendship: -3, response: "Eres un peligro para el equipo." },
                { text: "Bajo a ayudar en la defensa profunda.", friendship: 2, response: "Sacrificio valioso." },
                { text: "Intento retener el balón arriba ganando faltas.", friendship: 0, response: "Gestión de los minutos finales." }
            ]
        },
        {
            stage: 85,
            text: "El rival les remonta el partido. ¿Cómo reaccionas?",
            options: [
                { text: "Me enfurezco y prometo destrozarlos en la vuelta.", friendship: 4, response: "El monstruo despierta herido." },
                { text: "Me culpo y bajo la cabeza.", friendship: -3, response: "La culpa no marca goles." },
                { text: "Animo al equipo a no bajar los brazos.", friendship: 2, response: "Espíritu de líder." },
                { text: "Analizo rápidamente dónde falló el sistema.", friendship: 0, response: "Frialdad absoluta en el caos." }
            ]
        },
        {
            stage: 86,
            text: "¿Tienes respeto por los rivales?",
            options: [
                { text: "El único respeto válido es aplastarlos sin piedad.", friendship: 4, response: "Ego puro. Respétalos destruyéndolos." },
                { text: "Sí, soy muy amable con ellos en el campo.", friendship: -3, response: "No estás en un parque de diversiones." },
                { text: "Los estudio porque el respeto nace del conocimiento.", friendship: 2, response: "Respeto analítico." },
                { text: "Los ignoro, solo importo yo.", friendship: 0, response: "Cuidado con subestimar demasiado." }
            ]
        },
        {
            stage: 87,
            text: "¿Qué haces cuando miras videos de tus ídolos?",
            options: [
                { text: "Busco robarles sus armas y hacerlas mías.", friendship: 4, response: "La evolución por devoración." },
                { text: "Solo veo sus goles bonitos.", friendship: -3, response: "Eres un espectador, no un jugador." },
                { text: "Analizo sus decisiones en fracciones de segundo.", friendship: 2, response: "Estudio de alta intensidad mental." },
                { text: "Intento imitar su estilo exacto.", friendship: 0, response: "No copies, adapta a tu propio ego." }
            ]
        },
        {
            stage: 88,
            text: "¿Cómo mantienes la creencia en ti mismo tras una mala racha?",
            options: [
                { text: "Mi ego no permite dudas, el gol llegará por mi fuerza.", friendship: 4, response: "Fe inquebrantable en tu talento." },
                { text: "Pienso en retirarme.", friendship: -3, response: "Hazlo. Blue Lock no te extrañará." },
                { text: "Trabajo el doble en los entrenamientos de definición.", friendship: 2, response: "La confianza se construye entrenando." },
                { text: "Le pido consejo al entrenador.", friendship: 0, response: "Humildad para aceptar ayuda." }
            ]
        },
        {
            stage: 89,
            text: "Te mandan al banquillo de suplentes. ¿Qué piensas?",
            options: [
                { text: "Voy a entrar y marcaré 3 goles para que aprenda el DT.", friendship: 4, response: "Frustración convertida en ambición." },
                { text: "Me da igual, cobro igual.", friendship: -3, response: "Mercenario sin pasión." },
                { text: "Observo las debilidades del rival desde fuera.", friendship: 2, response: "El banco es tu centro de inteligencia." },
                { text: "Animo a mis compañeros.", friendship: 0, response: "Buen compañero, pero falta chispa." }
            ]
        },
        {
            stage: 90,
            text: "Te mandan a calentar en la banda. ¿Cómo lo haces?",
            options: [
                { text: "Con furia, listo para destrozar el partido.", friendship: 4, response: "El tigre a punto de salir de la jaula." },
                { text: "Lento, porque hace frío.", friendship: -3, response: "Entrarás frío y te lesionarás." },
                { text: "Sigo las rutinas del preparador físico.", friendship: 2, response: "Profesionalismo puro." },
                { text: "Miro fijamente al rival que voy a humillar.", friendship: 0, response: "Intimidación psicológica desde fuera." }
            ]
        },
        {
            stage: 91,
            text: "El capitán da una orden con la que no estás de acuerdo. ¿Qué haces?",
            options: [
                { text: "Lo ignoro si veo una mejor oportunidad de gol.", friendship: 4, response: "El instinto supera a la jerarquía." },
                { text: "Lloro porque me gritó.", friendship: -3, response: "Niño inmaduro." },
                { text: "Cumplo la orden por el bien del equipo.", friendship: 2, response: "Lealtad táctica." },
                { text: "Discuto con él en pleno partido.", friendship: 0, response: "Peligroso, divide al equipo." }
            ]
        },
        {
            stage: 92,
            text: "¿Sientes el 'peso de la camiseta' al jugar partidos importantes?",
            options: [
                { text: "La camiseta pesa menos que mi ego.", friendship: 4, response: "Tú haces grande a la camiseta, no al revés." },
                { text: "Sí, me aterroriza decepcionar.", friendship: -3, response: "El estrés te va a quebrar." },
                { text: "Lo transformo en responsabilidad y orgullo.", friendship: 2, response: "Madurez deportiva." },
                { text: "Trato de pensar que es un amistoso más.", friendship: 0, response: "Mecanismo de defensa mental." }
            ]
        },
        {
            stage: 93,
            text: "La prensa y los críticos hablan mal de ti. ¿Qué haces?",
            options: [
                { text: "Los callo marcando un Hat-Trick.", friendship: 4, response: "La mejor respuesta es el rendimiento." },
                { text: "Me deprimo y leo todos los comentarios.", friendship: -3, response: "Auto-destrucción digital." },
                { text: "Apago las redes sociales y me enfoco.", friendship: 2, response: "Desconexión saludable." },
                { text: "Uso el odio como combustible.", friendship: 0, response: "Energía oscura pero efectiva." }
            ]
        },
        {
            stage: 94,
            text: "¿Qué significa tener 'hambre de gloria'?",
            options: [
                { text: "Es querer devorar a todos para ser el rey.", friendship: 4, response: "La mentalidad del devorador." },
                { text: "No sé, ganar un trofeo bonito.", friendship: -3, response: "Falta de profundidad." },
                { text: "Estar dispuesto a sacrificar tu vida normal por el fútbol.", friendship: 2, response: "El precio del éxito real." },
                { text: "Nunca conformarse con un solo gol.", friendship: 0, response: "La insatisfacción constante." }
            ]
        },
        {
            stage: 95,
            text: "¿Por qué es importante tener un 'arma única'?",
            options: [
                { text: "Porque sin ella eres uno más del montón.", friendship: 4, response: "Exacto. Destaca o muere." },
                { text: "No lo necesito, soy promedio en todo.", friendship: -3, response: "El promedio es basura aquí." },
                { text: "Para construir tácticas alrededor de ella.", friendship: 2, response: "Estrategia basada en tus fortalezas." },
                { text: "Genera miedo en los rivales antes de jugar.", friendship: 0, response: "El poder de la reputación." }
            ]
        },
        {
            stage: 96,
            text: "¿Cómo describes tu 'química' con otro jugador (como Isagi y Bachira)?",
            options: [
                { text: "Solo lo uso para que mis goles brillen más.", friendship: 4, response: "Sinergia egoísta." },
                { text: "Dependo totalmente de él.", friendship: -3, response: "Eres un parásito sin brillo propio." },
                { text: "Es una conexión casi telepática sin mirarnos.", friendship: 2, response: "Reacciones químicas de alto nivel." },
                { text: "Conocemos nuestros movimientos de memoria.", friendship: 0, response: "Fruto del entrenamiento duro." }
            ]
        },
        {
            stage: 97,
            text: "El rival cambia de formación de repente. ¿Qué haces?",
            options: [
                { text: "Mi ego romperá cualquier formación.", friendship: 4, response: "Fuerza de voluntad sobre táctica." },
                { text: "Pido a gritos que el DT arregle esto.", friendship: -3, response: "Incapacidad de adaptación." },
                { text: "Analizo los nuevos espacios que han dejado.", friendship: 2, response: "Lectura del juego en tiempo real." },
                { text: "Ajusto mi posición instintivamente.", friendship: 0, response: "Flexibilidad táctica." }
            ]
        },
        {
            stage: 98,
            text: "¿Por qué sorprender con un tiro lejano?",
            options: [
                { text: "Para destruir la esperanza del portero.", friendship: 4, response: "Un golpe psicológico letal." },
                { text: "Porque me da pereza correr más.", friendship: -3, response: "Holgazán inútil." },
                { text: "Para forzar a la defensa a salir y abrir huecos.", friendship: 2, response: "Táctica de apertura." },
                { text: "Si veo al portero adelantado, es obligatorio.", friendship: 0, response: "Castigando el error de posicionamiento." }
            ]
        },
        {
            stage: 99,
            text: "¿Qué prefieres: Precisión quirúrgica o Fuerza bruta?",
            options: [
                { text: "Precisión, para humillarlos poniéndola donde duele.", friendship: 4, response: "Elegancia egoísta." },
                { text: "Ninguna, solo quiero que entre como sea.", friendship: -3, response: "Sin estilo ni técnica." },
                { text: "Fuerza, para que teman poner el cuerpo.", friendship: 2, response: "Dominancia física pura." },
                { text: "Una mezcla perfecta de ambas.", friendship: 0, response: "El Santo Grial del delantero." }
            ]
        },
        {
            stage: 100,
            text: "¿Cómo mantienes el equilibrio corporal en un forcejeo?",
            options: [
                { text: "Bajo mi centro de gravedad y empujo con furia.", friendship: 4, response: "Un tren en movimiento." },
                { text: "Me dejo caer para fingir falta.", friendship: -3, response: "Deshonroso." },
                { text: "Uso la fuerza del rival en su contra.", friendship: 2, response: "Técnica de judo aplicada al fútbol." },
                { text: "Fortaleciendo mi core en el gimnasio.", friendship: 0, response: "La preparación es clave." }
            ]
        },
        {
            stage: 101,
            text: "¿Qué es la recuperación activa para ti?",
            options: [
                { text: "Preparar mi ego para la próxima masacre.", friendship: 4, response: "Nunca apagas tu instinto." },
                { text: "Quedarme tirado en el sofá.", friendship: -3, response: "Eso es vagancia." },
                { text: "Bicicleta ligera y piscina el día después.", friendship: 2, response: "Acelerando la eliminación de lactato." },
                { text: "Dormir todo el día siguiente.", friendship: 0, response: "El descanso pasivo también suma." }
            ]
        },
        {
            stage: 102,
            text: "¿Qué significa tener un 'ego devorador'?",
            options: [
                { text: "Absorber el talento de los derrotados para evolucionar.", friendship: 4, response: "El concepto máximo de Blue Lock." },
                { text: "Comer mucha pizza después del partido.", friendship: -3, response: "Eres un chiste de mal gusto." },
                { text: "Nunca estar satisfecho con mi propio nivel.", friendship: 2, response: "La ambición es infinita." },
                { text: "Querer jugar todos los minutos de la temporada.", friendship: 0, response: "Resistencia sobrehumana." }
            ]
        },
        {
            stage: 103,
            text: "Un compañero está brillando mucho. ¿Qué haces?",
            options: [
                { text: "Le robo el protagonismo con una jugada mejor.", friendship: 4, response: "El verdadero espíritu del delantero." },
                { text: "Lo aplaudo y me conformo.", friendship: -3, response: "Acabas de aceptar ser un personaje secundario." },
                { text: "Uso su brillo para camuflar mis movimientos.", friendship: 2, response: "Usando sombras a tu favor." },
                { text: "Comienzo a competir internamente con él.", friendship: 0, response: "La rivalidad acelera el crecimiento." }
            ]
        },
        {
            stage: 104,
            text: "¿Disfrutas humillando al defensa?",
            options: [
                { text: "Es un placer ver la desesperación en sus ojos.", friendship: 4, response: "Sadismo futbolístico." },
                { text: "Me da pena si le hago un túnel.", friendship: -3, response: "La empatía te hace débil." },
                { text: "No busco humillar, solo superar la línea.", friendship: 2, response: "Frialdad matemática." },
                { text: "Solo si él empezó a hablar basura primero.", friendship: 0, response: "Venganza justa." }
            ]
        },
        {
            stage: 105,
            text: "¿Qué es el instinto asesino frente a la portería?",
            options: [
                { text: "No pensar, solo ejecutar la destrucción de la red.", friendship: 4, response: "El monstruo actúa solo." },
                { text: "Pensar demasiado dónde ponerla.", friendship: -3, response: "Ese medio segundo de duda te arruina." },
                { text: "La capacidad de estar siempre en el lugar correcto.", friendship: 2, response: "El sentido del olfato goleador." },
                { text: "Tirar fuerte al medio por si acaso.", friendship: 0, response: "Efectivo pero sin finura." }
            ]
        },
        {
            stage: 106,
            text: "¿Cómo logras romper una formación enemiga perfecta?",
            options: [
                { text: "Con una individualidad irracional que rompa la lógica.", friendship: 4, response: "La anomalía que destruye sistemas." },
                { text: "No se puede, es mejor rendirse.", friendship: -3, response: "Vete de aquí." },
                { text: "Movimientos sin balón rápidos y precisos.", friendship: 2, response: "El caos organizado desestabiliza." },
                { text: "Provocando errores con presión altísima.", friendship: 0, response: "Forzando la falla humana." }
            ]
        },
        {
            stage: 107,
            text: "¿Qué papel juega la anticipación en tu juego?",
            options: [
                { text: "Mi ego ya vio el futuro del campo.", friendship: 4, response: "Visión predictiva absoluta." },
                { text: "Solo reacciono cuando el balón me llega.", friendship: -3, response: "Siempre llegarás tarde." },
                { text: "Leo la postura del rival milisegundos antes.", friendship: 2, response: "Información espacial procesada." },
                { text: "Intuyo los rebotes por pura experiencia.", friendship: 0, response: "Sabiduría de goleador veterano." }
            ]
        },
        {
            stage: 108,
            text: "¿Estarías dispuesto a un sacrificio temporal por ganar?",
            options: [
                { text: "Solo si al final el gol definitivo es mío.", friendship: 4, response: "El egoísmo disfrazado de sacrificio." },
                { text: "No, prefiero perder pero lucirme.", friendship: -3, response: "Eres un idiota sin remedio." },
                { text: "Sí, la victoria del equipo asegura mi supervivencia.", friendship: 2, response: "Lógica pragmática de Blue Lock." },
                { text: "Correré hasta vomitar si eso asegura ganar.", friendship: 0, response: "Voluntad inquebrantable." }
            ]
        },
        {
            stage: 109,
            text: "¿Cómo lidias con el desgaste mental de un partido largo?",
            options: [
                { text: "Mi obsesión por el gol supera el cansancio.", friendship: 4, response: "El ego no conoce la fatiga." },
                { text: "Me desconcentro y pido el cambio.", friendship: -3, response: "Débil de mente." },
                { text: "Simplifico mis decisiones para ahorrar energía mental.", friendship: 2, response: "Eficiencia neurológica táctica." },
                { text: "Me hablo a mí mismo para mantenerme enfocado.", friendship: 0, response: "Autodiálogo positivo." }
            ]
        },
        {
            stage: 110,
            text: "Un rival te supera una vez. ¿Tu orgullo herido cómo responde?",
            options: [
                { text: "Lo destruiré la próxima vez y disfrutaré su caída.", friendship: 4, response: "Venganza con estilo." },
                { text: "Lo dejo en paz, es mejor que yo.", friendship: -3, response: "Rendición inaceptable." },
                { text: "Analizo por qué me superó para que no se repita.", friendship: 2, response: "Evolución a partir de la derrota." },
                { text: "Busco revancha inmediata en la siguiente jugada.", friendship: 0, response: "Impulsividad competitiva." }
            ]
        },
        {
            stage: 111,
            text: "¿Qué significa renacer tras un fracaso absoluto?",
            options: [
                { text: "Destruir al viejo yo y crear un monstruo nuevo.", friendship: 4, response: "La verdadera esencia del Despertar." },
                { text: "Llorar un mes en mi cuarto.", friendship: -3, response: "Tiempo perdido, carrera muerta." },
                { text: "Actualizar mi fórmula de juego desde cero.", friendship: 2, response: "Reconstrucción lógica." },
                { text: "Ignorar el fracaso y seguir igual.", friendship: 0, response: "Tropezar con la misma piedra." }
            ]
        },
        {
            stage: 112,
            text: "¿Crees en la evolución constante?",
            options: [
                { text: "Un delantero que no evoluciona, muere hoy mismo.", friendship: 4, response: "El reloj corre y no perdona a nadie." },
                { text: "Ya soy lo suficientemente bueno.", friendship: -3, response: "La arrogancia del estancado." },
                { text: "Cada partido es una pieza nueva para mi rompecabezas.", friendship: 2, response: "Construyendo la perfección paso a paso." },
                { text: "Mejorar un 1% cada día.", friendship: 0, response: "Constancia y disciplina oriental." }
            ]
        },
        {
            stage: 113,
            text: "¿Sientes desesperación por destacar en Blue Lock?",
            options: [
                { text: "Es el fuego que calcina mis dudas. Destacaré o moriré.", friendship: 4, response: "Esa desesperación te hará invencible." },
                { text: "No, prefiero pasar desapercibido.", friendship: -3, response: "Estás cavando tu propia tumba aquí." },
                { text: "Uso esa presión para mantener mis sentidos alerta.", friendship: 2, response: "Estrés convertido en rendimiento." },
                { text: "A veces me abruma, pero me repongo.", friendship: 0, response: "Humanidad aceptable, pero supéralo rápido." }
            ]
        },
        {
            stage: 114,
            text: "¿Qué es el 'egoísmo racional' en el campo?",
            options: [
                { text: "Pasarla si la probabilidad del compañero es 100%, pero exigir lo mismo.", friendship: 4, response: "Cálculo frío del ego." },
                { text: "Patear siempre yo, desde cualquier lado.", friendship: -3, response: "Eso es ser estúpido, no egoísta." },
                { text: "Tomar la mejor decisión matemática para ganar.", friendship: 2, response: "Lógica pura sin emociones." },
                { text: "Aceptar que a veces el ego cede por la victoria.", friendship: 0, response: "Madurez táctica de equipo." }
            ]
        },
        {
            stage: 115,
            text: "¿Has intentado manipular a tus compañeros en la cancha?",
            options: [
                { text: "Sí, los uso como distracciones para mi entrada triunfal.", friendship: 4, response: "El titiritero del área chica." },
                { text: "No, yo soy muy bueno y honesto.", friendship: -3, response: "La inocencia no sobrevive al máximo nivel." },
                { text: "Les hago pases que los obligan a moverse donde yo quiero.", friendship: 2, response: "Liderazgo oculto y brillante." },
                { text: "Simulo estar desmarcado para abrir espacio a otro.", friendship: 0, response: "Engaño básico y efectivo." }
            ]
        },
        {
            stage: 116,
            text: "¿Qué haces con tu 'zona de confort'?",
            options: [
                { text: "La destruyo a diario. El ego exige nuevos retos.", friendship: 4, response: "El verdadero camino del delantero." },
                { text: "Me quedo en ella, es segura y calentita.", friendship: -3, response: "Morirás en el olvido." },
                { text: "La expando lentamente aprendiendo nuevas técnicas.", friendship: 2, response: "Progreso metódico y seguro." },
                { text: "Solo salgo de ella si el partido lo exige.", friendship: 0, response: "Demasiado pasivo en tu desarrollo." }
            ]
        },
        {
            stage: 117,
            text: "¿Qué se siente el 'despertar del ego'?",
            options: [
                { text: "Sentir que el mundo entero es mi escenario de caza.", friendship: 4, response: "Has probado la verdadera ambición." },
                { text: "Me dio dolor de cabeza.", friendship: -3, response: "No estás listo para esto." },
                { text: "Una claridad mental absoluta, veo el juego en cámara lenta.", friendship: 2, response: "Sincronización neuronal perfecta." },
                { text: "Una furia incontrolable pero enfocada.", friendship: 0, response: "Canalizando las emociones oscuras." }
            ]
        },
        {
            stage: 118,
            text: "Imagina que juegas la final del mundo. Minuto 90.",
            options: [
                { text: "Ese último gol tiene mi nombre grabado en oro.", friendship: 4, response: "El ego que levantará la copa." },
                { text: "Rezo para que no me pasen la pelota.", friendship: -3, response: "Cobardía en su máxima expresión." },
                { text: "Mi mente está fría, ejecuto el plan ensayado.", friendship: 2, response: "Máquina de precisión sin nervios." },
                { text: "Corro como si fuera el primer minuto del partido.", friendship: 0, response: "Corazón indomable de campeón." }
            ]
        },
        {
            stage: 119,
            text: "¿Qué harás cuando termine el proyecto Blue Lock?",
            options: [
                { text: "Ir a Europa y devorar a los mejores del mundo.", friendship: 4, response: "Esa es la visión correcta." },
                { text: "Volver a mi vida normal de secundaria.", friendship: -3, response: "Blue Lock fracasó contigo." },
                { text: "Fichar por un club grande y analizar mi progreso.", friendship: 2, response: "Un plan de carrera lógico." },
                { text: "Jugar en la selección absoluta y ganar el Mundial.", friendship: 0, response: "El objetivo final de Ego." }
            ]
        },
        {
            stage: 120,
            text: "Tu mejor amigo se queda fuera de Blue Lock. ¿Qué le dices?",
            options: [
                { text: "Yo llevaré el peso de tu fracaso hacia la cima.", friendship: 4, response: "Cargando el ego de los caídos." },
                { text: "Me rindo con él, somos inseparables.", friendship: -3, response: "Basura sentimental. Fuera." },
                { text: "Lucharé por los dos, esto es la supervivencia.", friendship: 2, response: "Amistad fría pero respetuosa." },
                { text: "El fútbol es así, alguien tiene que perder.", friendship: 0, response: "Realismo crudo y necesario." }
            ]
        },
        {
            stage: 121,
            text: "Por último... ¿Eres el mejor delantero del mundo?",
            options: [
                { text: "Aún no, pero juro por mi vida que lo seré.", friendship: 4, response: "Ese es el ego que revolucionará el fútbol." },
                { text: "No, hay muchos mejores que yo.", friendship: -3, response: "Si no lo crees, nunca lo serás." },
                { text: "Matemáticamente aún me falta desarrollo técnico.", friendship: 2, response: "Conciencia pura, el primer paso al éxito." },
                { text: "Sí, siempre lo he sido.", friendship: 0, response: "Si es verdad, demuéstralo ahora mismo." }
            ]
        }
    ]
};
