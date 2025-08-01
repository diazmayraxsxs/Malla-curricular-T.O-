document.addEventListener('DOMContentLoaded', () => {
    // Definición de los datos de la malla curricular
    const malla = {
        'Semestre 1': [
            'Práctica curricular I',
            'Curso de vida',
            'Introducción a la terapia ocupacional',
            'Biología celular y genética',
            'Inglés I',
            'Formación básica para la vida académica I'
        ],
        'Semestre 2': [
            'Práctica curricular II',
            'Habilidades y actividades terapéuticas',
            'Fundamentos para la terapia ocupacional',
            'Anatomía',
            'Inglés II',
            'Formación básica para la vida académica II'
        ],
        'Semestre 3': [
            'Práctica curricular III',
            'Modelos de intervención en terapia ocupacional',
            'Anatomía funcional y biomecánica',
            'Salud pública y gestión',
            'Fisiología',
            'Curso de sello institucional III'
        ],
        'Semestre 4': [
            'Práctica curricular IV',
            'Neurociencia',
            'Inclusión social educativa',
            'Gestión en salud comunitaria',
            'Inclusión sociolaboral',
            'Curso de sello institucional IV'
        ],
        'Semestre 5': [
            'Práctica curricular V',
            'Integrado terapia ocupacional en niños/as y adolescentes I',
            'Integrado terapia ocupacional en adultos I',
            'Integrado terapia ocupacional en personas mayores I',
            'Metodología cuantitativa de la investigación',
            'Interdisciplinar A+S'
        ],
        'Semestre 6': [
            'Práctica curricular VI',
            'Integrado terapia ocupacional en niños/as y adolescentes II',
            'Integrado terapia ocupacional en adultos II',
            'Integrado terapia ocupacional en personas mayores II',
            'Metodología cualitativa de la investigación', // Corregido: En tu lista original dice cuantitativa, pero la lista de requisitos apunta a que debe ser cualitativa.
            'Interdisciplinar'
        ],
        'Semestre 7': [
            'Práctica curricular VII',
            'Integrado terapia ocupacional en niños/as y adolescentes III',
            'Integrado terapia ocupacional en adultos III',
            'Integrado terapia ocupacional en personas mayores III',
            'Proyecto de investigación I',
            'Salud ocupacional y ergonomía'
        ],
        'Semestre 8': [
            'Práctica curricular VIII',
            'Integrado terapia ocupacional en niños/as y adolescentes IV',
            'Integrado terapia ocupacional en adultos IV',
            'Integrado terapia ocupacional en personas mayores IV',
            'Proyecto de investigación II',
            'Ortótica y nuevas tecnologías'
        ],
        'Semestre 9': [
            'Práctica profesional I'
        ],
        'Semestre 10': [
            'Práctica profesional II',
            'Práctica profesional III'
        ]
    };

    // Mapeo de requisitos
    const requisitos = {
        'Fisiología': ['Biología celular y genética'],
        'Anatomía funcional y biomecánica': ['Anatomía'],
        'Modelos de intervención en terapia ocupacional': ['Fundamentos para la terapia ocupacional'],
        'Práctica curricular III': ['Práctica curricular II'],
        'Neurociencia': ['Fisiología'],
        'Gestión en salud comunitaria': ['Salud pública y gestión'],
        'Inclusión social educativa': ['Modelos de intervención en terapia ocupacional'],
        'Inclusión sociolaboral': ['Habilidades y actividades terapéuticas'],
        'Práctica curricular IV': ['Práctica curricular III'],
        'Integrado terapia ocupacional en niños/as y adolescentes I': ['Inclusión social educativa'],
        'Integrado terapia ocupacional en adultos I': ['Inclusión sociolaboral'],
        'Integrado terapia ocupacional en personas mayores I': ['Neurociencia'],
        'Interdisciplinar A+S': ['Gestión en salud comunitaria'],
        'Práctica curricular V': [], // Se maneja de forma especial
        'Integrado terapia ocupacional en niños/as y adolescentes II': ['Integrado terapia ocupacional en niños/as y adolescentes I'],
        'Integrado terapia ocupacional en adultos II': ['Anatomía funcional y biomecánica'],
        'Integrado terapia ocupacional en personas mayores II': ['Integrado terapia ocupacional en personas mayores I'],
        'Metodología cualitativa de la investigación': ['Metodología cuantitativa de la investigación'],
        'Práctica curricular VI': ['Práctica curricular V'],
        'Integrado terapia ocupacional en niños/as y adolescentes III': ['Integrado terapia ocupacional en niños/as y adolescentes II'],
        'Integrado terapia ocupacional en adultos III': ['Integrado terapia ocupacional en adultos II'],
        'Integrado terapia ocupacional en personas mayores III': ['Integrado terapia ocupacional en personas mayores II'],
        'Salud ocupacional y ergonomía': ['Integrado terapia ocupacional en adultos II'],
        'Proyecto de investigación I': ['Metodología cualitativa de la investigación'],
        'Práctica curricular VII': ['Práctica curricular VI'],
        'Integrado terapia ocupacional en niños/as y adolescentes IV': ['Integrado terapia ocupacional en niños/as y adolescentes III'],
        'Integrado terapia ocupacional en adultos IV': ['Integrado terapia ocupacional en adultos I'],
        'Integrado terapia ocupacional en personas mayores IV': ['Integrado terapia ocupacional en personas mayores III'],
        'Ortótica y nuevas tecnologías': ['Salud ocupacional y ergonomía'],
        'Proyecto de investigación II': ['Proyecto de investigación I'],
        'Práctica curricular VIII': ['Práctica curricular VII'],
        'Práctica profesional I': [], // Se manejan de forma especial
        'Práctica profesional II': [], // Se manejan de forma especial
        'Práctica profesional III': [] // Se manejan de forma especial
    };

    // Inicializar el estado de los ramos aprobados
    let aprobados = new Set(JSON.parse(localStorage.getItem('ramosAprobados')) || []);

    const container = document.querySelector('.container');

    // Función para renderizar la malla
    function renderMalla() {
        container.innerHTML = '';
        const todosLosRamos = Object.values(malla).flat();

        for (const semestre in malla) {
            const semestreDiv = document.createElement('div');
            semestreDiv.className = 'semestre';
            semestreDiv.innerHTML = `<h2>${semestre}</h2><ul class="ramos-list"></ul>`;
            const ramosList = semestreDiv.querySelector('.ramos-list');

            malla[semestre].forEach(ramoNombre => {
                const ramoLi = document.createElement('li');
                ramoLi.textContent = ramoNombre;
                ramoLi.className = 'ramo';
                ramoLi.dataset.ramo = ramoNombre;

                // Marcar como aprobado si ya lo está
                if (aprobados.has(ramoNombre)) {
                    ramoLi.classList.add('aprobado');
                } else if (verificarRamoBloqueado(ramoNombre)) {
                    ramoLi.classList.add('bloqueado');
                }

                ramoLi.addEventListener('click', (event) => {
                    marcarRamo(event.target);
                });

                ramosList.appendChild(ramoLi);
            });
            container.appendChild(semestreDiv);
        }
    }

    // Función para verificar si un ramo está bloqueado
    function verificarRamoBloqueado(ramoNombre) {
        const reqs = requisitos[ramoNombre];
        if (!reqs) {
            return false;
        }

        // Casos especiales para 'Práctica Curricular V'
        if (ramoNombre === 'Práctica curricular V') {
            return !todosLosRamosHastaSemestre(4).every(ramo => aprobados.has(ramo));
        }
        
        // Casos especiales para las prácticas profesionales
        if (ramoNombre.startsWith('Práctica profesional')) {
            return !todosLosRamosHastaSemestre(8).every(ramo => aprobados.has(ramo));
        }

        return !reqs.every(req => aprobados.has(req));
    }

    // Función para marcar un ramo
    function marcarRamo(ramoElement) {
        const ramoNombre = ramoElement.dataset.ramo;
        if (ramoElement.classList.contains('bloqueado')) {
            const reqsFaltantes = requisitos[ramoNombre].filter(req => !aprobados.has(req));
            if (ramoNombre === 'Práctica curricular V') {
                const ramosFaltantes = todosLosRamosHastaSemestre(4).filter(ramo => !aprobados.has(ramo));
                alert(`No puedes aprobar ${ramoNombre}. Debes aprobar todos los ramos hasta el semestre IV. Faltan: \n- ${ramosFaltantes.join('\n- ')}`);
            } else if (ramoNombre.startsWith('Práctica profesional')) {
                const ramosFaltantes = todosLosRamosHastaSemestre(8).filter(ramo => !aprobados.has(ramo));
                alert(`No puedes aprobar ${ramoNombre}. Debes aprobar todos los ramos hasta el semestre VIII. Faltan: \n- ${ramosFaltantes.join('\n- ')}`);
            } else {
                alert(`No puedes aprobar ${ramoNombre}. Primero debes aprobar los siguientes ramos: \n- ${reqsFaltantes.join('\n- ')}`);
            }
        } else {
            aprobados.add(ramoNombre);
            localStorage.setItem('ramosAprobados', JSON.stringify([...aprobados]));
            renderMalla();
        }
    }
    
    // Función auxiliar para obtener todos los ramos hasta un semestre dado
    function todosLosRamosHastaSemestre(numeroSemestre) {
        let ramosHastaSemestre = [];
        for (let i = 1; i <= numeroSemestre; i++) {
            ramosHastaSemestre = ramosHastaSemestre.concat(malla[`Semestre ${i}`]);
        }
        return ramosHastaSemestre;
    }

    // Renderizar la malla por primera vez
    renderMalla();
});
