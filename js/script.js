console.log("✅ script.js cargado correctamente");

// ==============================================
// SISTEMA DE SUGERENCIAS DE BÚSQUEDA - SIMPLIFICADO
// ==============================================
function initSearchSuggestions() {
    console.log("🔄 Iniciando sistema de sugerencias...");
    
    const searchInput = document.getElementById('searchInput');
    const suggestionsContainer = document.getElementById('suggestionsContainer');
    
    console.log("Input encontrado:", searchInput);
    console.log("Container encontrado:", suggestionsContainer);
    
    if (!searchInput || !suggestionsContainer) {
        console.error("❌ No se encontraron elementos de búsqueda");
        return;
    }
    
    const sugerencias = [
        'Camisetas de fútbol', 
        'Zapatillas deportivas',
        'Shorts de baloncesto',
        'Guantes de portería',
        'Balones de fútbol',
        'Tacos de fútbol',
        'Camiseta Man United',
        'Camiseta Portugal'
    ];

    searchInput.addEventListener('input', function(e) {
        const value = e.target.value.trim().toLowerCase();
        console.log("📝 Usuario escribió:", value);
        
        if (value.length < 1) {
            suggestionsContainer.style.display = 'none';
            return;
        }
        
        const sugerenciasFiltradas = sugerencias.filter(sugerencia => 
            sugerencia.toLowerCase().includes(value)
        );
        
        console.log("🎯 Sugerencias encontradas:", sugerenciasFiltradas);
        
        if (sugerenciasFiltradas.length > 0) {
            // Mostrar sugerencias
            suggestionsContainer.innerHTML = '';
            suggestionsContainer.style.display = 'block';
            
            sugerenciasFiltradas.forEach(sugerencia => {
                const div = document.createElement('div');
                div.textContent = sugerencia;
                div.className = 'suggestion-item';
                
                // Efecto hover
                div.addEventListener('mouseenter', function() {
                    this.style.backgroundColor = '#f8f9fa';
                });
                
                div.addEventListener('mouseleave', function() {
                    this.style.backgroundColor = 'white';
                });
                
                // Al hacer clic
                div.addEventListener('click', function() {
                    searchInput.value = sugerencia;
                    suggestionsContainer.style.display = 'none';
                    searchInput.focus();
                });
                
                suggestionsContainer.appendChild(div);
            });
        } else {
            suggestionsContainer.style.display = 'none';
        }
    });
    
    // Ocultar sugerencias al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-container')) {
            suggestionsContainer.style.display = 'none';
        }
    });
}

// ==============================================
// VALIDACIÓN FORMULARIO DE CONTACTO
// ==============================================
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();
            
            let isValid = true;
            
            // Validar nombre
            if (nombre === '' || nombre.split(' ').length < 2) {
                showError('nombre', '⚠️ Ingresa nombre y apellido');
                isValid = false;
            } else {
                clearError('nombre');
            }
            
            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('email', '⚠️ Ingresa un email válido');
                isValid = false;
            } else {
                clearError('email');
            }
            
            // Validar mensaje
            if (mensaje.length < 10) {
                showError('mensaje', '⚠️ Mínimo 10 caracteres');
                isValid = false;
            } else {
                clearError('mensaje');
            }
            
            if (isValid) {
                alert('✅ ¡Formulario enviado correctamente!');
                this.reset();
            }
        });
    }
}

// ==============================================
// FUNCIONES AUXILIARES
// ==============================================
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.add('is-invalid');
        
        let errorElement = document.getElementById(fieldId + 'Error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.id = fieldId + 'Error';
            errorElement.className = 'invalid-feedback';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.remove('is-invalid');
        
        const errorElement = document.getElementById(fieldId + 'Error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
}

// ==============================================
// INICIALIZAR TODO CUANDO LA PÁGINA CARGUE
// ==============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 DOM completamente cargado");
    initSearchSuggestions();
    initFormValidation();
    
    // Efectos hover para cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });
    });
});