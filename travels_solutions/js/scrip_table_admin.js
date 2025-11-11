import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { getStorage, ref, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB2YHOPydtFOFn5Sr3PXNp6H-6TM0p3Urc",
    authDomain: "tramitesvisa-itzel.firebaseapp.com",
    projectId: "tramitesvisa-itzel",
    storageBucket: "tramitesvisa-itzel.appspot.com",
    messagingSenderId: "356859229057",
    appId: "1:356859229057:web:ab3b905aaacfa2d2b86e80"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

async function loadFormData() {
    try {
        const querySnapshot = await getDocs(collection(db, 'formularios'));
        const tableBody = document.getElementById('formTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';  // Limpia el contenido de la tabla
        let totalRecords = 0;

        const rows = [];

        querySnapshot.forEach(async (doc) => {
            const data = doc.data();
            const row = tableBody.insertRow();  // Inserta una nueva fila en la tabla

            // Formatear fecha de creación
            const formattedDate = formatDate(new Date(data.fecha_hora));

            row.insertCell(0).textContent = formattedDate || '';
            row.insertCell(1).textContent = data.tipo_solicitud || '';
            row.insertCell(2).textContent = data.nombre || '';
            row.insertCell(3).textContent = data.telefono || '';
            row.insertCell(4).textContent = data.correo || '';
            row.insertCell(5).textContent = data.fecha_ultimavisita_usa || '';
            row.insertCell(6).textContent = data.duracion_en_usa || '';
            row.insertCell(7).textContent = data.cantidad_dias_meses || '';
            row.insertCell(8).textContent = data.apellido_paterno || '';
            row.insertCell(9).textContent = data.apellido_materno || '';
            row.insertCell(10).textContent = data.nombres || '';
            row.insertCell(11).textContent = data.fecha_nacimiento || '';
            row.insertCell(12).textContent = data.sexo || '';
            row.insertCell(13).textContent = data.lugar_nacimiento || '';
            row.insertCell(14).textContent = data.estado_civil || '';
            row.insertCell(15).textContent = data.nombre_completo_conyuge || '';
            row.insertCell(16).textContent = data.fecha_nacimiento_conyuge || '';
            row.insertCell(17).textContent = data.lugar_nacimiento_conyuge || '';
            row.insertCell(18).textContent = data.nombre_completo_expareja || '';
            row.insertCell(19).textContent = data.fecha_union_expareja || '';
            row.insertCell(20).textContent = data.lugar_nacimiento_expareja || '';
            row.insertCell(21).textContent = data.motivo_separacion_expareja || '';
            row.insertCell(22).textContent = data.fecha_divorcio_expareja || '';
            row.insertCell(23).textContent = data.pais_termino_matrimonio || '';
            row.insertCell(24).textContent = data.nombre_completo_conyuge_union_libre || '';
            row.insertCell(25).textContent = data.fecha_nacimiento_conyuge_union_libre || '';
            row.insertCell(26).textContent = data.lugar_nacimiento_conyuge_union_libre || '';
            row.insertCell(27).textContent = data.escolaridad || '';
            row.insertCell(28).textContent = data.nombre_escuela || '';
            row.insertCell(29).textContent = data.direccion_escuela || '';
            row.insertCell(30).textContent = data.fecha_inicio_escuela || '';
            row.insertCell(31).textContent = data.fecha_final_escuela || '';
            row.insertCell(32).textContent = data.ocupacion_actual_empleo || '';
            row.insertCell(33).textContent = data.nombre_empresa_actual || '';
            row.insertCell(34).textContent = data.domicilio_empresas_actual || '';
            row.insertCell(35).textContent = data.fecha_inicio_empleo_actual || '';
            row.insertCell(36).textContent = data.telefono_empres_actual || '';
            row.insertCell(37).textContent = data.salario_ensual_empleo_actual || '';
            row.insertCell(38).textContent = data.descripcion_actividades_a_su_cargo || '';
            row.insertCell(39).textContent = data.nombre_empresa_anterior || '';
            row.insertCell(40).textContent = data.domicilio_empresas_anterior || '';
            row.insertCell(41).textContent = data.fecha_inicio_empleo_anterior || '';
            row.insertCell(42).textContent = data.fecha_fin_empleo_anterior || '';
            row.insertCell(43).textContent = data.descripcion_actividades_empleo_anterior || '';
            row.insertCell(44).textContent = data.nombre_jefe_inmediato || '';
            row.insertCell(45).textContent = data.telefono_jefe_inmediato || '';
            row.insertCell(46).textContent = data.nombre_completo_padre || '';
            row.insertCell(47).textContent = data.fecha_nacimiento_padre || '';
            row.insertCell(48).textContent = data.padre_vive_estados_unidos || '';
            row.insertCell(49).textContent = data.nombre_completo_madre || '';
            row.insertCell(50).textContent = data.fecha_nacimiento_madre || '';
            row.insertCell(51).textContent = data.madre_vive_estados_unidos || '';
            row.insertCell(52).textContent = data.facebook || '';
            row.insertCell(53).textContent = data.instagram || '';
            row.insertCell(54).textContent = data.tiene_familiares_estados_unidos || '';
            row.insertCell(55).textContent = data.nombre_completo_familiar_cercano || '';
            row.insertCell(56).textContent = data.numero_telefonico_familiar_cercano || '';
            row.insertCell(57).textContent = data.domicilio_familiar_cercano || '';
            row.insertCell(58).textContent = data.tramitaron_visa_antes || '';
            row.insertCell(59).textContent = data.redacta_procedimiento_realizado || '';
            row.insertCell(60).textContent = data.han_visitado_estados_unidos || '';
            row.insertCell(61).textContent = data.fecha_visita_estados_unidos || '';
            row.insertCell(62).textContent = data.han_viajado_extranjero_últimos_cinco_años || '';
            row.insertCell(63).textContent = data.pais || '';
            row.insertCell(64).textContent = data.domina_ingles || '';

            // Manejo de imágenes
            const imgFrontCell = row.insertCell(65);
            if (data.foto1URL) {
                try {
                    const imgFrontRef = ref(storage, data.foto1URL);
                    const imgFrontURL = await getDownloadURL(imgFrontRef);
                    const imgFrontLink = document.createElement('a');
                    imgFrontLink.href = imgFrontURL;
                    imgFrontLink.textContent = 'Ver Imagen Frente';
                    imgFrontLink.target = '_blank';
                    imgFrontCell.appendChild(imgFrontLink);
                } catch (error) {
                    imgFrontCell.textContent = 'Imagen no disponible';
                    console.error('Error al obtener la URL de la imagen frente:', error);
                }
            } else {
                imgFrontCell.textContent = 'Imagen no disponible';
            }

            const imgBackCell = row.insertCell(66);
            if (data.foto2URL) {
                try {
                    const imgBackRef = ref(storage, data.foto2URL);
                    const imgBackURL = await getDownloadURL(imgBackRef);
                    const imgBackLink = document.createElement('a');
                    imgBackLink.href = imgBackURL;
                    imgBackLink.textContent = 'Ver Imagen Reverso';
                    imgBackLink.target = '_blank';
                    imgBackCell.appendChild(imgBackLink);
                } catch (error) {
                    imgBackCell.textContent = 'Imagen no disponible';
                    console.error('Error al obtener la URL de la imagen reverso:', error);
                }
            } else {
                imgBackCell.textContent = 'Imagen no disponible';
            }

            const birthActCell = row.insertCell(67);
            if (data.foto3URL) {
                try {
                    const birthActRef = ref(storage, data.foto3URL);
                    const birthActURL = await getDownloadURL(birthActRef);
                    const birthActLink = document.createElement('a');
                    birthActLink.href = birthActURL;
                    birthActLink.textContent = 'Ver Acta de Nacimiento';
                    birthActLink.target = '_blank';
                    birthActCell.appendChild(birthActLink);
                } catch (error) {
                    birthActCell.textContent = 'Acta no disponible';
                    console.error('Error al obtener la URL del acta de nacimiento:', error);
                }
            } else {
                birthActCell.textContent = 'Acta no disponible';
            }

            const passportCell = row.insertCell(68);
            if (data.foto4URL) {
                try {
                    const passportRef = ref(storage, data.foto4URL);
                    const passportURL = await getDownloadURL(passportRef);
                    const passportLink = document.createElement('a');
                    passportLink.href = passportURL;
                    passportLink.textContent = 'Ver Pasaporte';
                    passportLink.target = '_blank';
                    passportCell.appendChild(passportLink);
                } catch (error) {
                    passportCell.textContent = 'Pasaporte no disponible';
                    console.error('Error al obtener la URL del pasaporte:', error);
                }
            } else {
                passportCell.textContent = 'Pasaporte no disponible';
            }

            const ineCell = row.insertCell(69);
            if (data.foto5URL) {
                try {
                    const ineRef = ref(storage, data.foto5URL);
                    const ineURL = await getDownloadURL(ineRef);
                    const ineLink = document.createElement('a');
                    ineLink.href = ineURL;
                    ineLink.textContent = 'Ver INE';
                    ineLink.target = '_blank';
                    ineCell.appendChild(ineLink);
                } catch (error) {
                    ineCell.textContent = 'INE no disponible';
                    console.error('Error al obtener la URL del INE:', error);
                }
            } else {
                ineCell.textContent = 'INE no disponible';
            }

            const fileCell = row.insertCell(70);
            if (data.archivoURL) {
                try {
                    const fileRef = ref(storage, data.archivoURL);
                    const fileURL = await getDownloadURL(fileRef);
                    const fileLink = document.createElement('a');
                    fileLink.href = fileURL;
                    fileLink.textContent = 'Ver Archivo';
                    fileLink.target = '_blank';
                    fileCell.appendChild(fileLink);
                } catch (error) {
                    fileCell.textContent = 'Archivo no disponible';
                    console.error('Error al obtener la URL del archivo:', error);
                }
            } else {
                fileCell.textContent = 'Archivo no disponible';
            }

            rows.push(row);
            totalRecords++;
            document.getElementById('totalRegistros').textContent = totalRecords;
        });

        // Agregar filas a la tabla
        rows.forEach(row => tableBody.appendChild(row));

        // Ordenar datos por fecha de creación (más reciente primero)
        sortTable(0, false); // Ordenar por la primera columna en orden descendente
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        alert('No se pudo cargar los datos. Verifica la consola para más detalles.');
    }
}

function formatDate(date) {
    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };

    const formatter = new Intl.DateTimeFormat('es-ES', options);
    const parts = formatter.formatToParts(date);

    const day = parts.find(part => part.type === 'day').value;
    const month = parts.find(part => part.type === 'month').value;
    const year = parts.find(part => part.type === 'year').value;
    const time = `${parts.find(part => part.type === 'hour').value}:${parts.find(part => part.type === 'minute').value}`;
    const ampm = parts.find(part => part.type === 'dayPeriod').value;

    return `${day}/${month}/${year} ${time} ${ampm}`;
}

function sortTable(columnIndex, isAscending) {
    // Obtén la tabla con el ID 'formTable'
    const table = document.getElementById('formTable');
    
    // Obtén el elemento <tbody> dentro de la tabla
    const tbody = table.getElementsByTagName('tbody')[0];
    
    // Convierte las filas del <tbody> en un array para poder ordenarlas
    const rows = Array.from(tbody.getElementsByTagName('tr'));

    // Ordena las filas del array
    rows.sort((rowA, rowB) => {
        // Obtén el contenido de la celda en la columna que se está ordenando para cada fila
        const cellA = rowA.getElementsByTagName('td')[columnIndex].textContent.trim();
        const cellB = rowB.getElementsByTagName('td')[columnIndex].textContent.trim();

        // Verifica si estamos ordenando por la primera columna (suponemos que es de fecha)
        if (columnIndex === 0) {
            // Convierte las cadenas de fecha en objetos Date para compararlas
            const dateA = new Date(cellA);
            const dateB = new Date(cellB);

            // Ordena las fechas de acuerdo con el orden ascendente o descendente
            // Para mostrar las fechas más recientes al inicio, usa `dateB - dateA`
            return isAscending ? dateB - dateA : dateA - dateB;
        } else {
            // Ordena las celdas de texto (no fechas)
            // Usa localeCompare para una comparación de texto con soporte para números
            if (isAscending) {
                return cellA.localeCompare(cellB, undefined, { numeric: true });
            } else {
                return cellB.localeCompare(cellA, undefined, { numeric: true });
            }
        }
    });

    // Limpia el <tbody> para volver a insertar las filas ordenadas
    tbody.innerHTML = '';

    // Añade las filas ordenadas de nuevo al <tbody>
    rows.forEach(row => tbody.appendChild(row));
}


// Cargar los datos al iniciar
loadFormData();
window.onload = loadFormData;



