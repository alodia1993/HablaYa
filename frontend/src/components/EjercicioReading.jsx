import { useState } from 'react';
import api from '../services/api';

const EjercicioReading = ({ ejercicio, onCompletado }) => {
    const [seleccionada, setSeleccionada] = useState(null);
    const [resultado, setResultado] = useState(null);
    const [enviando, setEnviando] = useState(false);

    const handleRespuesta = async (opcion) => {
        if (resultado) return;
        setSeleccionada(opcion);
        setEnviando(true);

        try {
            const res = await api.post(`/ejercicios/${ejercicio.id}/corregir`, { respuesta: opcion });
            const correcto = res.data.correcto;
            setResultado({ correcto, respuesta_correcta: res.data.respuesta_correcta });

            await api.post('/progreso', {
                leccion_id: ejercicio.leccion_id,
                ejercicio_id: ejercicio.id,
                puntuacion: correcto ? 100 : 0
            });

            if (onCompletado) onCompletado(correcto);
        } catch (error) {
            console.error('Error al corregir:', error);
        } finally {
            setEnviando(false);
        }
    };

    const getColorOpcion = (opcion) => {
        if (!resultado) return seleccionada === opcion ? '#e0e7ff' : 'white';
        if (opcion === resultado.respuesta_correcta) return '#d1fae5';
        if (opcion === seleccionada && !resultado.correcto) return '#fee2e2';
        return 'white';
    };

    return (
        <div style={styles.container}>
            {/* Texto de lectura */}
            <div style={styles.textoLectura}>
                <h4 style={styles.textoTitulo}>📖 Lee el siguiente texto:</h4>
                <p style={styles.texto}>{ejercicio.contenido.texto}</p>
            </div>

            {/* Pregunta */}
            <p style={styles.pregunta}>{ejercicio.contenido.pregunta}</p>

            {/* Opciones */}
            <div style={styles.opciones}>
                {ejercicio.contenido.opciones.map((opcion, i) => (
                    <button
                        key={i}
                        onClick={() => handleRespuesta(opcion)}
                        disabled={!!resultado || enviando}
                        style={{
                            ...styles.opcion,
                            background: getColorOpcion(opcion),
                            border: seleccionada === opcion ? '2px solid #4f46e5' : '2px solid #e5e7eb'
                        }}
                    >
                        {opcion}
                    </button>
                ))}
            </div>

            {resultado && (
                <div style={{
                    ...styles.feedback,
                    background: resultado.correcto ? '#d1fae5' : '#fee2e2',
                    color: resultado.correcto ? '#065f46' : '#991b1b'
                }}>
                    {resultado.correcto ? '✅ ¡Correcto!' : `❌ Incorrecto. La respuesta correcta es: ${resultado.respuesta_correcta}`}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { padding: '1rem 0' },
    textoLectura: { background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.5rem' },
    textoTitulo: { color: '#4f46e5', marginBottom: '0.75rem' },
    texto: { color: '#374151', lineHeight: '1.7', fontSize: '1rem' },
    pregunta: { fontSize: '1.1rem', fontWeight: '600', color: '#1f2937', marginBottom: '1.25rem' },
    opciones: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    opcion: { padding: '0.85rem 1.25rem', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', fontSize: '1rem' },
    feedback: { marginTop: '1.25rem', padding: '1rem', borderRadius: '8px', fontWeight: '600' }
};

export default EjercicioReading;