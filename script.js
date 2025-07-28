document.addEventListener('DOMContentLoaded', () => {
    // Definición de la estructura de la malla curricular por semestres
    const curriculum = {
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
            'Metodología cuantitativa de la investigación', // Repetido en el ejemplo, ajustar si es error
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
            'Práctica profesional I',
            'Práctica profesional II',
            'Práctica profesional III' // Asumo que las prácticas profesionales son ramos individuales en este semestre
        ],
        'Semestre 10': [
            // Semestre 10 no tiene ramos listados en tu ejemplo, si hay ramos adicionales, agregarlos aquí.
            // Por simplicidad, si no hay ramos, este semestre podría no mostrarse, o podría agregarse un mensaje.
        ]
    };

    // Definición de requisitos para cada ramo
    const requirements = {
        'Práctica curricular II': ['Práctica curricular I', 'Curso de vida', 'Introducción a la terapia ocupacional'],
        'Habilidades y actividades terapéuticas': ['Práctica curricular I', 'Curso de vida', 'Introducción a la terapia ocupacional'],
        'Fundamentos para la terapia ocupacional': ['Práctica curricular I', 'Curso de vida', 'Introducción a la terapia ocupacional'],
        'Anatomía': ['Biología celular y genética'],
        'Inglés II': ['Inglés I'],
        'Formación básica para la vida académica II': ['Formación básica para la vida académica I'],
        'Práctica curricular III': ['Práctica curricular II', 'Habilidades y actividades terapéuticas', 'Fundamentos para la terapia ocupacional'],
        'Modelos de intervención en terapia ocupacional': ['Práctica curricular II', 'Habilidades y actividades terapéuticas', 'Fundamentos para la terapia ocupacional'],
        'Anatomía funcional y biomecánica': ['Anatomía'],
        'Práctica curricular IV': ['Práctica curricular III'],
        'Práctica curricular V': ['Práctica curricular III'],
        'Práctica curricular VI': ['Práctica curricular III'],
        'Práctica curricular VII': ['Práctica curricular III'],
        'Práctica curricular VIII': ['Práctica curricular III'],
        'Neurociencia': ['Modelos de intervención en terapia ocupacional'],
        'Inclusión social educativa': ['Modelos de intervención en terapia ocupacional'],
        'Gestión en salud comunitaria': ['Modelos de intervención en terapia ocupacional'],
        'Inclusión sociolaboral': ['Modelos de intervención en terapia ocupacional'],
        'Curso de sello institucional IV': ['Curso de sello institucional III', 'Formación básica para la vida académica II'],
        'Integrado terapia ocupacional en niños/as y adolescentes IV': ['Integrado terapia ocupacional en niños/as y adolescentes I', 'Integrado terapia ocupacional en niños/as y adolescentes II', 'Integrado terapia ocupacional en niños/as y adolescentes III'],
        'Integrado terapia ocupacional en adultos IV': ['Integrado terapia ocupacional en adultos I', 'Integrado terapia ocupacional en adultos II', 'Integrado terapia ocupacional en adultos III'],
        'Integrado terapia ocupacional en personas mayores IV': ['Integrado terapia ocupacional en personas mayores I', 'Integrado terapia ocupacional en personas mayores II', 'Integrado terapia ocupacional en personas mayores III'],
        'Interdisciplinar': ['Interdisciplinar A+S'],
        'Proyecto de investigación II': ['Proyecto de investigación I'],
        'Ortótica y nuevas tecnologías': ['Salud ocupacional y ergonomía'],
        // 'Metodología cuantitativa de la investigación' -> según tu lista, este ramo se requiere a sí mismo,
        // lo cual es un caso especial. Asumo que es un error y no tiene prerrequisitos o tiene prerrequisitos de otro nombre
        // Si es un ramo que se toma en varias fases, la implementación actual no lo maneja como "requisito de sí mismo"
        // Si 'Metodología cuantitativa de la investigación' en semestre 6 requiere 'Metodología cuantitativa de la investigación' en semestre 5,
        // entonces el nombre del ramo debería ser diferente, o el requisito debería ser más específico (ej. "Metodología Cuantitativa I" para "Metodología Cuantitativa II").
        // Por ahora, lo dejaré sin requisitos explícitos ya que el nombre es el mismo.
    };

    // Almacenamiento de ramos aprobados en Local Storage
    let approvedCourses = JSON.parse(localStorage.getItem('approvedCourses')) || [];

    const curriculumGrid = document.querySelector('.curriculum-grid');

    // Función para renderizar la malla curricular
    function renderCurriculum() {
        curriculumGrid.innerHTML = ''; // Limpiar la malla antes de renderizar
        const allCourses = Object.values(curriculum).flat(); // Obtener todos los nombres de ramos

        // Iterar sobre cada semestre para crear sus columnas
        for (const semesterName in curriculum) {
            const semesterDiv = document.createElement('div');
            semesterDiv.classList.add('semester');

            const semesterTitle = document.createElement('h2');
            semesterTitle.textContent = semesterName;
            semesterDiv.appendChild(semesterTitle);

            const courseList = document.createElement('ul');
            courseList.classList.add('course-list');

            // Iterar sobre los ramos de cada semestre
            curriculum[semesterName].forEach(courseName => {
                const courseItem = document.createElement('li');
                courseItem.classList.add('course-item');
                courseItem.dataset.course = courseName; // Guardar el nombre del ramo en un atributo de datos

                const courseSpan = document.createElement('span');
                courseSpan.textContent = courseName;
                courseItem.appendChild(courseSpan);

                // Comprobar si el ramo está aprobado
                if (approvedCourses.includes(courseName)) {
                    courseItem.classList.add('approved');
                }

                courseList.appendChild(courseItem);
            });
            semesterDiv.appendChild(courseList);
            curriculumGrid.appendChild(semesterDiv);
        }
        updateCourseStates(); // Actualizar el estado de bloqueo/desbloqueo de todos los ramos
    }

    // Función para verificar si un ramo tiene sus requisitos cumplidos
    function areRequirementsMet(courseName) {
        const required = requirements[courseName];
        if (!required) {
            return { met: true, missing: [] }; // No tiene requisitos, por lo tanto están cumplidos
        }

        const missingRequirements = required.filter(req => !approvedCourses.includes(req));
        return { met: missingRequirements.length === 0, missing: missingRequirements };
    }

    // Función para actualizar el estado visual (bloqueado/desbloqueado) de los ramos
    function updateCourseStates() {
        const allCourseElements = document.querySelectorAll('.course-item');
        allCourseElements.forEach(courseElement => {
            const courseName = courseElement.dataset.course;

            // Si el ramo ya está aprobado, no lo marcamos como bloqueado
            if (approvedCourses.includes(courseName)) {
                courseElement.classList.remove('blocked');
                courseElement.removeAttribute('data-tooltip'); // Eliminar tooltip si está aprobado
                return;
            }

            const { met, missing } = areRequirementsMet(courseName);

            if (met) {
                courseElement.classList.remove('blocked');
                courseElement.removeAttribute('data-tooltip');
            } else {
                courseElement.classList.add('blocked');
                // Crear un mensaje legible para el tooltip
                const missingMessage = `Necesitas aprobar: ${missing.join(', ')}`;
                courseElement.setAttribute('data-tooltip', missingMessage);
            }
        });
    }

    // Manejador de clic para marcar/desmarcar ramos
    curriculumGrid.addEventListener('click', (event) => {
        const courseItem = event.target.closest('.course-item');
        if (!courseItem) return; // No se hizo clic en un ramo

        const courseName = courseItem.dataset.course;

        if (approvedCourses.includes(courseName)) {
            // Si ya está aprobado, desaprobarlo (quitar de la lista de aprobados)
            approvedCourses = approvedCourses.filter(name => name !== courseName);
            courseItem.classList.remove('approved');
        } else {
            // Si no está aprobado, verificar requisitos
            const { met, missing } = areRequirementsMet(courseName);
            if (met) {
                approvedCourses.push(courseName);
                courseItem.classList.add('approved');
            } else {
                // Mostrar un mensaje al usuario
                alert(`No puedes aprobar "${courseName}" aún. Necesitas aprobar primero: ${missing.join(', ')}.`);
                return; // No hacer nada más si está bloqueado
            }
        }

        // Guardar el estado actualizado en Local Storage
        localStorage.setItem('approvedCourses', JSON.stringify(approvedCourses));
        updateCourseStates(); // Re-evaluar el estado de todos los ramos después de un cambio
    });

    // Renderizar la malla inicial al cargar la página
    renderCurriculum();
});
