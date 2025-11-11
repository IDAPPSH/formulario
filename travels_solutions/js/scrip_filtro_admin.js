



// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
// import { getFirestore, collection, getDocs, deleteDoc, doc, updateDoc, writeBatch } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { getFirestore, collection, getDocs, getDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB2YHOPydtFOFn5Sr3PXNp6H-6TM0p3Urc",
    authDomain: "tramitesvisa-itzel.firebaseapp.com",
    projectId: "tramitesvisa-itzel",
    storageBucket: "tramitesvisa-itzel.appspot.com",
    messagingSenderId: "356859229057",
    appId: "1:356859229057:web:ab3b905aaacfa2d2b86e80"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Cargar datos y llenar tabla y select
const loadData = async () => {
    const querySnapshot = await getDocs(collection(db, "formularios"));
    const tableBody = document.querySelector("#dataTable tbody");
    const tipoSolicitudSelect = document.getElementById('tipoSolicitudFilter');
    const tiposSolicitud = new Set();

    tableBody.innerHTML = "";
    tiposSolicitud.add(""); // Opción "Todos"

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        tiposSolicitud.add(data.tipo_solicitud);

        const row = document.createElement("tr");
        row.dataset.id = doc.id; // Añadir data-id para la fila
        row.innerHTML = `
            <td>${data.tipo_solicitud}</td>
            <td>${data.numero_telefonico}</td>
            <td>${data.correo_electronico}</td>
            <td><button onclick="showDetails('${doc.id}')">Ver Detalles</button></td>
        `;
        tableBody.appendChild(row);
    });

    tipoSolicitudSelect.innerHTML = ""; // Limpiar select
    tiposSolicitud.forEach(tipo => {
        const option = document.createElement("option");
        option.value = tipo;
        option.textContent = tipo || "Todos";
        tipoSolicitudSelect.appendChild(option);
    });

    // Actualiza el total de registros
    document.getElementById('totalRecords').textContent = `Total de Registros: ${querySnapshot.size}`;

    // Configura los filtros
    document.getElementById('numeroTelefonicoFilter').addEventListener('input', filterData);
    document.getElementById('correoElectronicoFilter').addEventListener('input', filterData);
    tipoSolicitudSelect.addEventListener('change', filterData);

    // Filtra los datos después de cargar
    filterData();
};

const filterData = () => {
    const tipoSolicitudFilter = document.getElementById('tipoSolicitudFilter').value.toLowerCase();
    const numeroTelefonicoFilter = document.getElementById('numeroTelefonicoFilter').value.toLowerCase();
    const correoElectronicoFilter = document.getElementById('correoElectronicoFilter').value.toLowerCase();
    const tableRows = document.querySelectorAll('#dataTable tbody tr');

    let filteredCount = 0;

    tableRows.forEach(row => {
        const cells = row.getElementsByTagName('td');
        const tipoSolicitud = cells[0].textContent.toLowerCase();
        const numeroTelefonico = cells[1].textContent.toLowerCase();
        const correoElectronico = cells[2].textContent.toLowerCase();
        const match = (tipoSolicitudFilter === "" || tipoSolicitud.includes(tipoSolicitudFilter)) &&
            numeroTelefonico.includes(numeroTelefonicoFilter) &&
            correoElectronico.includes(correoElectronicoFilter);
        row.style.display = match ? '' : 'none';
        if (match) {
            filteredCount++;
        }
    });

    // Actualiza el número de registros filtrados
    document.getElementById('filteredRecords').textContent = `Registros Filtrados: ${filteredCount}`;
};
window.showDetails = async (id) => {
    const docRef = doc(db, "formularios", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        const form = document.getElementById('detailsForm');
        form.innerHTML = `




            <label>Fecha Creación:</label><input type="date" value="${data.fecha_hora}" disabled><br>
            <label>Tipo de Solicitud:</label><input type="text" value="${data.tipo_solicitud}" disabled><br>

            <label>Nombre:</label><input type="text" value="${data.nombre}" disabled><br>
            <label>Teléfono:</label><input type="text" value="${data.telefono}" disabled><br>
            <label>Correo:</label><input type="email" value="${data.correo}" disabled><br>

            <label>Fecha Última Visita a USA:</label><input type="date" value="${data.fecha_ultimavisita_usa}" disabled><br>
            <label>Duración en USA:</label><input type="text" value="${data.duracion_en_usa}" disabled><br>
            <label>Cantidad de Días/Meses:</label><input type="number" value="${data.cantidad_dias_meses}" disabled><br>
            <label>Imagen Frente:</label><input type="text" value="${data.imagen_frente}" disabled><br>
            <label>Imagen Reverso:</label><input type="text" value="${data.imagen_reverso}" disabled><br>

            <label>Acta de Nacimiento:</label><input type="text" value="${data.acta_nacimiento}" disabled><br>
            <label>Pasaporte:</label><input type="text" value="${data.pasaporte}" disabled><br>
            <label>INE:</label><input type="text" value="${data.ine}" disabled><br>
            <label>Archivo:</label><input type="text" value="${data.archivo}" disabled><br>


            
            <label>Apellido Paterno:</label><input type="text" value="${data.apellido_paterno}" disabled><br>
            <label>Apellido Materno:</label><input type="text" value="${data.apellido_materno}" disabled><br>
            <label>Nombres:</label><input type="text" value="${data.nombres}" disabled><br>
            <label>Fecha Nacimiento:</label><input type="date" value="${data.fecha_nacimiento}" disabled><br>
            <label>Sexo:</label><input type="text" value="${data.sexo}" disabled><br>
            <label>Lugar Nacimiento:</label><input type="textarea" value="${data.lugar_nacimiento}" disabled><br>

            <label>Estado Civil:</label><input type="text" value="${data.estado_civil}" disabled><br>

            <label>Nombre Cónyuge:</label><input type="text" value="${data.nombre_completo_conyuge}" disabled><br>
            <label>Fecha Nacimiento Cónyuge:</label><input type="date" value="${data.fecha_nacimiento_conyuge}" disabled><br>
            <label>Lugar Nacimiento Cónyuge:</label><input type="textarea" value="${data.lugar_nacimiento_conyuge}" disabled><br>
            
            <label>Nombre Completo de la Expareja:</label><input type="text" value="${data.nombre_completo_expareja}" disabled><br>
            <label>Fecha de la Unión Matrimonial con la Expareja:</label><input type="date" value="${data.fecha_union_expareja}" disabled><br>
            <label>Lugar de Nacimiento de la Expareja:</label><input type="textarea" value="${data.lugar_nacimiento_expareja}" disabled><br>
            <label>Motivo de la Separación:</label><input type="textarea" value="${data.motivo_separacion_expareja}" disabled><br>
            <label>Fecha de Disolución del Matrimonio:</label><input type="date" value="${data.fecha_divorcio_expareja}" disabled><br>
            <label>País de Disolución del Matrimonio:</label><input type="text" value="${data.pais_termino_matrimonio}" disabled><br>
            
            <label>Nombre Completo del Cónyuge Union Libre:</label><input type="text" value="${data.nombre_completo_conyuge_union_libre}" disabled><br>
            <label>Fecha de Nacimiento del Cónyuge Union Libre:</label><input type="date" value="${data.fecha_nacimiento_conyuge_union_libre}" disabled><br>
            <label>Lugar de Nacimiento del Cónyuge Union Libre:</label><input type="textarea" value="${data.lugar_nacimiento_conyuge_union_libre}" disabled><br>

            <label>Escolaridad:</label><input type="text" value="${data.escolaridad}" disabled><br>
            <label>Nombre Escuela:</label><input type="text" value="${data.nombre_escuela}" disabled><br>
            <label>Dirección Escuela:</label><input type="textarea" value="${data.direccion_escuela}" disabled><br>
            <label>Fecha Inicio Escuela:</label><input type="date" value="${data.fecha_inicio_escuela}" disabled><br>
            <label>Fecha Final Escuela:</label><input type="date" value="${data.fecha_final_escuela}" disabled><br>

            <label>Ocupación Actual:</label><input type="text" value="${data.ocupacion_actual_empleo}" disabled><br>
            <label>Nombre Empresa Actual:</label><input type="text" value="${data.nombre_empresa_actual}" disabled><br>
            <label>Domicilio Empresa Actual:</label><input type="textarea" value="${data.domicilio_empresas_actual}" disabled><br>
            <label>Fecha Inicio Empleo Actual:</label><input type="date" value="${data.fecha_inicio_empleo_actual}" disabled><br>
            <label>Teléfono Empresa Actual:</label><input type="text" value="${data.telefono_empres_actual}" disabled><br>
            <label>Salario Mensual:</label><input type="number" value="${data.salario_ensual_empleo_actual}" disabled><br>
            <label>Descripción de Actividades a su Cargo:</label><input type="textarea" value="${data.descripcion_actividades_a_su_cargo}" disabled><br>

            <label>Nombre Empresa Anterior:</label><input type="text" value="${data.nombre_empresa_anterior}" disabled><br>
            <label>Domicilio Empresa Anterior:</label><input type="textarea" value="${data.domicilio_empresas_anterior}" disabled><br>
            <label>Fecha Inicio Empleo Anterior:</label><input type="date" value="${data.fecha_inicio_empleo_anterior}" disabled><br>
            <label>Fecha Fin Empleo Anterior:</label><input type="date" value="${data.fecha_fin_empleo_anterior}" disabled><br>
            <label>Descripción de Actividades a su Cargo Empleo Anterior:</label><input type="textarea" value="${data.descripcion_actividades_empleo_anterior}" disabled><br>
            <label>Nombre Jefe Inmediato:</label><input type="text" value="${data.nombre_jefe_inmediato}" disabled><br>
            <label>Teléfono de Contacto:</label><input type="text" value="${data.telefono_jefe_inmediato}" disabled><br>

            <label>Nombre Completo Padre:</label><input type="text" value="${data.nombre_completo_padre}" disabled><br>
            <label>Fecha Nacimiento Padre:</label><input type="date" value="${data.fecha_nacimiento_padre}" disabled><br>
            <label>Padre Vive en USA:</label><input type="text" value="${data.padre_vive_estados_unidos}" disabled><br>
            <label>Nombre Completo Madre:</label><input type="text" value="${data.nombre_completo_madre}" disabled><br>
            <label>Fecha Nacimiento Madre:</label><input type="date" value="${data.fecha_nacimiento_madre}" disabled><br>
            <label>Madre Vive en USA:</label><input type="text" value="${data.madre_vive_estados_unidos}" disabled><br>

            <label>Facebook:</label><input type="text" value="${data.facebook}" disabled><br>
            <label>Instagram:</label><input type="text" value="${data.instagram}" disabled><br>

            <label>Familiares en USA:</label><input type="text" value="${data.tiene_familiares_estados_unidos}" disabled><br>
            <label>Nombre Familiar Cercano:</label><input type="text" value="${data.nombre_completo_familiar_cercano}" disabled><br>
            <label>Teléfono Familiar Cercano:</label><input type="text" value="${data.numero_telefonico_familiar_cercano}" disabled><br>
            <label>Domicilio Familiar Cercano:</label><input type="textarea" value="${data.domicilio_familiar_cercano}" disabled><br>

            <label>Visa Anterior:</label><input type="text" value="${data.tramitaron_visa_antes}" disabled><br>
            <label>Descripción Procedimiento:</label><input type="textarea" value="${data.redacta_procedimiento_realizado}" disabled><br>

            <label>Visitas a USA:</label><input type="text" value="${data.han_visitado_estados_unidos}" disabled><br>
            <label>Fecha Visita a USA:</label><input type="date" value="${data.fecha_visita_estados_unidos}" disabled><br>

            <label>Viajes al Extranjero Últimos 5 Años:</label><input type="text" value="${data.han_viajado_extranjero_últimos_cinco_años}" disabled><br>
            <label>País:</label><input type="text" value="${data.pais}" disabled><br>

            <label>Domina Inglés:</label><input type="text" value="${data.domina_ingles}" disabled><br>

            
            
        `;



        document.getElementById('details').style.display = 'block';
        document.querySelector('.table-section').style.display = 'none';
        document.querySelector('.filter-section').style.display = 'none';

        document.getElementById('backButton').onclick = () => {
            document.getElementById('details').style.display = 'none';
            document.querySelector('.table-section').style.display = 'block';
            document.querySelector('.filter-section').style.display = 'block';
        };

        document.getElementById('deleteButton').onclick = async () => {
            if (confirm("¿Estás seguro de que quieres eliminar este registro?")) {
                await deleteDoc(docRef);
                alert("Registro eliminado exitosamente");
                loadData();
                document.getElementById('details').style.display = 'none';
                document.querySelector('.table-section').style.display = 'block';
                document.querySelector('.filter-section').style.display = 'block';
            }
        };

        document.getElementById('downloadButton').onclick = () => {
            const formData = new FormData(form);
            const dataObj = {};
            formData.forEach((value, key) => {
                dataObj[key] = value;
            });
            const blob = new Blob([JSON.stringify(dataObj, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${data.nombres}_${data.apellido_paterno}.json`;
            a.click();
        };
    } else {
        console.log("No se encontró el documento");
    }
};


document.addEventListener('DOMContentLoaded', () => {
    const filterButton = document.querySelector('.btn-filter');
    const modal = document.getElementById('filterModal');
    const closeModal = document.querySelector('.close');

    filterButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const filterButton = document.querySelector('.btn-filter');
    const filterSection = document.querySelector('.filter-section');

    filterButton.addEventListener('click', () => {
        // Alterna la visibilidad de la sección de filtro
        if (filterSection.style.display === 'none' || filterSection.style.display === '') {
            filterSection.style.display = 'block';
        } else {
            filterSection.style.display = 'none';
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const inicioBtn = document.querySelector(".sidebar a[href='#']");
    const dataTableBody = document.querySelector("#dataTable tbody");

    inicioBtn.addEventListener("click", function (event) {
        event.preventDefault();
        // Aquí llamas a una función que te devuelva todos los registros, 
        // por ejemplo, podrías simular la obtención de datos con un array:
        const registros = [
            { tipo: "Solicitud 1", telefono: "123456789", correo: "correo1@example.com" },
            { tipo: "Solicitud 2", telefono: "987654321", correo: "correo2@example.com" },
            // Añade más registros según lo necesites...
        ];

        // Limpia el contenido anterior de la tabla
        dataTableBody.innerHTML = '';

        // Inserta los registros en la tabla
        registros.forEach(registro => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${registro.tipo}</td>
                <td>${registro.telefono}</td>
                <td>${registro.correo}</td>
                <td><button class="accion-button">Ver</button></td>
            `;
            dataTableBody.appendChild(row);
        });

        // Actualiza el total de registros
        document.getElementById("totalRecords").textContent = `Total de Registros: ${registros.length}`;
    });
});


// JavaScript (para mostrar la fecha y hora actual):
function updateDateTime() {
    const now = new Date();
    const formattedDateTime = now.toLocaleString(); // Ajusta el formato según tus preferencias
    document.getElementById('datetime').textContent = formattedDateTime;
}

// Actualiza la fecha y hora cada segundo
setInterval(updateDateTime, 1000);
updateDateTime(); // Inicializa inmediatamente


// Inicializa la carga de datos
document.addEventListener("DOMContentLoaded", loadData);




document.getElementById('backButton').addEventListener('click', () => {
    document.getElementById('details').style.display = 'none';
});

document.getElementById('deleteButton').addEventListener('click', async () => {
    const id = document.querySelector('#dataTable tbody tr.selected').dataset.id; // Asume que la fila seleccionada tiene un atributo data-id
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
        try {
            await deleteDoc(doc(db, "formularios", id));
            alert('Registro eliminado.');
            loadData(); // Recarga los datos
        } catch (e) {
            console.error('Error eliminando el documento: ', e);
            alert('Error al eliminar el registro.');
        }
    }
});

document.getElementById('downloadButton').addEventListener('click', () => {
    const id = document.querySelector('#dataTable tbody tr.selected').dataset.id; // Asume que la fila seleccionada tiene un atributo data-id
    // Implementar lógica para generar y descargar archivo
});

loadData();











