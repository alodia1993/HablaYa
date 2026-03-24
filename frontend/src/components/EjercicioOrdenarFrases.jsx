import { useState } from 'react';
import api from '../services/api';

const EjercicioOrdenarFrases = ({ ejercicio, onCompletado }) => {
    const palabras = ejercicio.contenido.palabras || [];
    const [disponibles, setDisponibles] = useState([...palabras]);
    const [seleccionadas, setSeleccionadas] = useState([]);
    const [resultado, setResultado] = useState(null);
    const [enviando, setEnviando] = useState(false);

    const agregarPalabra = (palabra, index) => {
        if (resultado) return;
        setSeleccionadas([...seleccionadas, palabra]);
        setDisponibles(disponibles.filter((_, i) => i !== index));
    };

    const quitarPalabra = (palabra, index) => {
        if (resultado) return;
        setDisponibles([...disponibles, palabra]);
        setSeleccionadas(seleccionadas.filter((_, i) => i !== index));
    };

    const handleComprobar = async () => {
        if (seleccionadas.length === 0) return;
        setEnviando(true);

        try {
            const res = await api.post(`/ejercicios/${ejercicio.id}/corregir`, { respuesta: seleccionadas });
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

    return (
        <div style={styles.container}>
            <p style={styles.instruccion}>Ordena las palabras para formar la frase correcta:</p>

            {/* Zona de respuesta */}
            <div style={styles.zonaRespuesta}>
                {seleccionadas.length === 0
                    ? <span style={styles.placeholder}>Haz clic en las palabras para añadirlas aquí</span>
                    : seleccionadas.map((palabra, i) => (
                        <button key={i} onClick={() => quitarPalabra(palabra, i)} style={styles.palabraSeleccionada}>
                            {palabra} ✕
                        </button>
                    ))
                }
            </div>

            {/* Palabras disponibles */}
            <div style={styles.palabrasDisponibles}>
                {disponibles.map((palabra, i) => (
                    <button key={i} onClick={() => agregarPalabra(palabra, i)} style={styles.palabraDisponible} disabled={!!resultado}>
                        {palabra}
                    </button>
                ))}
            </div>

            {!resultado && (
                <button onClick={handleComprobar} disabled={seleccionadas.length === 0 || enviando} style={styles.botonComprobar}>
                    {enviando ? 'Comprobando...' : 'Comprobar'}
                </button>
            )}

            {resultado && (
                <div style={{
                    ...styles.feedback,
                    background: resultado.correcto ? '#d1fae5' : '#fee2e2',
                    color: resultado.correcto ? '#065f46' : '#991b1b'
                }}>
                    {resultado.correcto
                        ? '✅ ¡Correcto!'
                        : `❌ Incorrecto. La respuesta correcta es: ${resultado.respuesta_correcta?.join(' ')}`
                    }
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { padding: '1rem 0' },
    instruccion: { fontSize: '1rem', color: '#374151', marginBottom: '1rem' },
    zonaRespuesta: { minHeight: '60px', background: '#f3f4f6', borderRadius: '8px', padding: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem', border: '2px dashed #d1d5db', alignItems: 'center' },
    placeholder: { color: '#9ca3af', fontSize: '0.9rem' },
    palabraSeleccionada: { padding: '0.4rem 0.85rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.95rem' },
    palabrasDisponibles: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' },
    palabraDisponible: { padding: '0.4rem 0.85rem', background: 'white', border: '2px solid #4f46e5', color: '#4f46e5', borderRadius: '6px', cursor: 'pointer', fontSize: '0.95rem' },
    botonComprobar: { padding: '0.75rem 2rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '1rem' },
    feedback: { marginTop: '1rem', padding: '1rem', borderRadius: '8px', fontWeight: '600' }
};

export default EjercicioOrdenarFrases;