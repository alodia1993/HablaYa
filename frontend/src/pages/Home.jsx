import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const { usuario } = useAuth();

    const cursos = [
        {
            emoji: '🎓',
            titulo: 'Preparación DELE / SIELE',
            subtitulo: 'Exam Preparation Course',
            descripcion: 'Prepárate para los exámenes oficiales de español con clases personalizadas.',
            descIngles: 'Prepare for official Spanish exams with personalized lessons.',
            niveles: 'A1 → C2',
            proximamente: false
        },
        {
            emoji: '📚',
            titulo: 'Super Pack de Español',
            subtitulo: 'Complete Spanish Course',
            descripcion: 'Todo lo que necesitas para aprender español desde cero hasta un nivel avanzado.',
            descIngles: 'Everything you need to learn Spanish from scratch to advanced level.',
            niveles: 'A1 → B2',
            proximamente: true
        },
        {
            emoji: '🎧',
            titulo: 'Curso de Listening',
            subtitulo: 'Listening Skills Course',
            descripcion: 'Mejora tu comprensión auditiva con materiales reales y ejercicios prácticos.',
            descIngles: 'Improve your listening comprehension with real materials and exercises.',
            niveles: 'A2 → B2',
            proximamente: true
        },
        {
            emoji: '✍️',
            titulo: 'Curso de Gramática',
            subtitulo: 'Grammar Course',
            descripcion: 'Domina la gramática española con explicaciones claras y mucha práctica.',
            descIngles: 'Master Spanish grammar with clear explanations and plenty of practice.',
            niveles: 'A1 → B1',
            proximamente: true
        },
        {
            emoji: '💬',
            titulo: 'Español Conversacional',
            subtitulo: 'Conversational Spanish',
            descripcion: 'Practica tu español hablando sobre temas del día a día con una profesora nativa.',
            descIngles: 'Practice your Spanish speaking about everyday topics with a native teacher.',
            niveles: 'A2 → C1',
            proximamente: false
        },
        {
            emoji: '👶',
            titulo: 'Español para Niños',
            subtitulo: 'Spanish for Kids',
            descripcion: 'Clases dinámicas y divertidas para niños de 4 a 12 años.',
            descIngles: 'Dynamic and fun lessons for children aged 4 to 12.',
            niveles: 'A1 → A2',
            proximamente: false
        }
    ];

    const reseñas = [
        {
            nombre: 'Adrian Erim',
            texto: 'Alodía rápidamente entendió por dónde empezar y cómo organizar sus clases para mí. Es muy profesional y se puede ver su pasión por enseñar.',
            textoIngles: 'Alodía quickly understood where to start and how to organize her lessons for me. She is very professional and her passion for teaching is clear.',
            estrellas: 5
        },
        {
            nombre: 'Szabolcs',
            texto: 'Alodia es una persona muy amable, y una profesora bien preparada, paciente y profesional. Nuestras clases están bien estructuradas.',
            textoIngles: 'Alodia is a very kind person, and a well-prepared, patient and professional teacher. Our lessons are well structured.',
            estrellas: 5
        },
        {
            nombre: 'Daniela',
            texto: 'Después de solo un mes, pude ir a España por un viaje de negocios y hablar con mi colega en español. ¡No demasiada teoría, sino práctica!',
            textoIngles: 'After just one month, I was able to go to Spain on a business trip and speak Spanish with my colleague. Not too much theory, but practice!',
            estrellas: 5
        },
        {
            nombre: 'Alumno anónimo',
            texto: 'Alodía estructura las clases muy bien y siempre es muy profesional. He visto una mejora en mi comprensión en solo dos semanas.',
            textoIngles: 'Alodía structures the lessons very well and is always very professional. I have seen an improvement in just two weeks.',
            estrellas: 5
        }
    ];

    return (
        <div style={styles.page}>

            {/* NAVBAR */}
            <nav className="home-navbar">
                <div className="home-nav-logo">🗣️ HablaYa!</div>
                <div className="home-nav-links">
                    <a href="#cursos" className="home-nav-link">Cursos</a>
                    <a href="#reseñas" className="home-nav-link">Reseñas</a>
                    <a href="#contacto" className="home-nav-link">Contacto</a>
                    {usuario ? (
                        <button onClick={() => navigate(usuario.rol === 'admin' ? '/admin' : '/dashboard')} className="home-nav-btn-register">
                            Mi panel →
                        </button>
                    ) : (
                        <>
                            <button onClick={() => navigate('/login')} className="home-nav-btn-login">Iniciar sesión</button>
                            <button onClick={() => navigate('/register')} className="home-nav-btn-register">Registrarse</button>
                        </>
                    )}
                </div>
            </nav>

            {/* HERO */}
            <section style={styles.hero}>
                <div style={styles.heroContent}>
                    <p style={styles.heroTag}>🇪🇸 Profesora nativa certificada · Native certified teacher</p>
                    <h1 style={styles.heroTitulo}>
                        Aprende español<br />con Alodía
                    </h1>
                    <p style={styles.heroSubtitulo}>
                        Consigue el B2 o C1 de español conmigo
                    </p>
                    <p style={styles.heroSubtituloEn}>
                        Get your B2 or C1 Spanish certificate with me
                    </p>
                    <div style={styles.heroStats}>
                        <div style={styles.stat}><strong>7+</strong><span>años de experiencia</span></div>
                        <div style={styles.statDivider} />
                        <div style={styles.stat}><strong>897</strong><span>clases impartidas</span></div>
                        <div style={styles.statDivider} />
                        <div style={styles.stat}><strong>⭐ 5.0</strong><span>valoración media</span></div>
                    </div>
                    <button onClick={() => navigate('/register')} style={styles.heroBoton}>
                        ¡Empieza ya! · Start now 🚀
                    </button>
                </div>
            </section>

            {/* CURSOS */}
            <section id="cursos" style={styles.seccion}>
                <div style={styles.seccionHeader}>
                    <h2 style={styles.seccionTitulo}>Mis cursos · My courses</h2>
                    <p style={styles.seccionSubtitulo}>Elige el curso que mejor se adapte a tus objetivos</p>
                    <p style={styles.seccionSubtituloEn}>Choose the course that best fits your goals</p>
                </div>
                <div style={styles.cursosGrid}>
                    {cursos.map((curso, i) => (
                        <div key={i} style={styles.cursoCard}>
                            <div style={styles.cursoEmoji}>{curso.emoji}</div>
                            {curso.proximamente && (
                                <span style={styles.proximamenteBadge}>Próximamente · Coming soon</span>
                            )}
                            <h3 style={styles.cursoTitulo}>{curso.titulo}</h3>
                            <p style={styles.cursoSubtitulo}>{curso.subtitulo}</p>
                            <p style={styles.cursoDesc}>{curso.descripcion}</p>
                            <p style={styles.cursoDescEn}>{curso.descIngles}</p>
                            <span style={styles.nivelBadge}>{curso.niveles}</span>
                            <button
                                onClick={() => !curso.proximamente && navigate('/tutorias')}
                                style={curso.proximamente ? styles.botonProximamente : styles.botonReservar}
                                disabled={curso.proximamente}
                            >
                                {curso.proximamente ? 'Próximamente' : 'Reservar clase · Book a lesson'}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* RESEÑAS */}
            <section id="reseñas" style={{ ...styles.seccion, background: '#f3f0ff' }}>
                <div style={styles.seccionHeader}>
                    <h2 style={styles.seccionTitulo}>Lo que dicen mis alumnos · What my students say</h2>
                    <p style={styles.seccionSubtitulo}>Reseñas reales de Preply · Real reviews from Preply</p>
                </div>
                <div style={styles.reseñasGrid}>
                    {reseñas.map((r, i) => (
                        <div key={i} style={styles.reseñaCard}>
                            <div style={styles.estrellas}>{'⭐'.repeat(r.estrellas)}</div>
                            <p style={styles.reseñaTexto}>"{r.texto}"</p>
                            <p style={styles.reseñaTextoEn}>"{r.textoIngles}"</p>
                            <p style={styles.reseñaNombre}>— {r.nombre}</p>
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <button
                        onClick={() => window.open('https://preply.com/es/profesor/816658', '_blank')}
                        style={styles.botonPreply}
                    >
                        Ver todas las reseñas en Preply · See all reviews on Preply
                    </button>
                </div>
            </section>

            {/* RESERVAR EN PREPLY */}
            <section style={styles.preplySection}>
                <div style={styles.preplyContent}>
                    <p style={styles.preplyTag}>🔗 También disponible en Preply · Also available on Preply</p>
                    <h2 style={styles.preplyTitulo}>¿Quieres empezar con una clase de prueba en Preply?</h2>
                    <p style={styles.preplyDesc}>Reserva tu primera clase directamente en Preply y llévate un descuento exclusivo. Sin compromiso.</p>
                    <p style={styles.preplyDescEn}>Book your first lesson directly on Preply and get an exclusive discount. No commitment.</p>
                    <button
                        onClick={() => window.open('https://preply.com/es/?pref=MjE5NzQxOQ==&id=1775724748.753501&ep=w1', '_blank')}
                        style={styles.botonPreply}
                    >
                        ¡Pulsa aquí y obtén tu descuento! · Click here for your discount!
                    </button>
                </div>
            </section>

            {/* CONTACTO */}
            <section id="contacto" style={{ ...styles.seccion, background: '#f3f0ff' }}>
                <div style={styles.seccionHeader}>
                    <h2 style={styles.seccionTitulo}>¿Tienes dudas? · Any questions?</h2>
                    <p style={styles.seccionSubtitulo}>Accede a la plataforma y reserva una tutoría conmigo</p>
                    <p style={styles.seccionSubtituloEn}>Access the platform and book a tutoring session with me</p>
                </div>
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <button onClick={() => navigate('/register')} style={styles.heroBoton}>
                        Crear cuenta gratis · Create free account
                    </button>
                </div>
            </section>

            {/* FOOTER */}
            <footer style={styles.footer}>
                <p>© 2026 HablaYa! · Alodía H. · Profesora de Español</p>
                <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', color: '#c4b5fd' }}>
                    Diseñado con ❤️ para aprender español
                </p>
            </footer>
        </div>
    );
};

const styles = {
    page: { fontFamily: 'sans-serif', color: '#1f2937', margin: 0, padding: 0 },
    hero: { background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', padding: '5rem 2rem', textAlign: 'center', color: 'white' },
    heroContent: { maxWidth: '700px', margin: '0 auto' },
    heroTag: { background: 'rgba(255,255,255,0.2)', display: 'inline-block', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.9rem', marginBottom: '1.5rem' },
    heroTitulo: { fontSize: '3rem', fontWeight: '800', margin: '0 0 1rem', lineHeight: '1.2' },
    heroSubtitulo: { fontSize: '1.3rem', margin: '0 0 0.25rem', opacity: 0.95 },
    heroSubtituloEn: { fontSize: '1rem', opacity: 0.8, marginBottom: '2rem', fontStyle: 'italic' },
    heroStats: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', marginBottom: '2.5rem', flexWrap: 'wrap' },
    stat: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' },
    statDivider: { width: '1px', height: '40px', background: 'rgba(255,255,255,0.3)' },
    heroBoton: { padding: '1rem 2.5rem', background: 'white', color: '#4f46e5', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer' },
    seccion: { padding: '4rem 2rem', background: 'white' },
    seccionHeader: { textAlign: 'center', marginBottom: '3rem' },
    seccionTitulo: { fontSize: '2rem', fontWeight: '700', color: '#4f46e5', marginBottom: '0.5rem' },
    seccionSubtitulo: { color: '#374151', margin: '0.25rem 0' },
    seccionSubtituloEn: { color: '#6b7280', fontStyle: 'italic', margin: 0 },
    cursosGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' },
    cursoCard: { background: 'white', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '2rem', boxShadow: '0 2px 15px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative' },
    cursoEmoji: { fontSize: '2.5rem' },
    proximamenteBadge: { position: 'absolute', top: '1rem', right: '1rem', background: '#fef3c7', color: '#92400e', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600' },
    cursoTitulo: { fontSize: '1.2rem', fontWeight: '700', color: '#1f2937', margin: 0 },
    cursoSubtitulo: { color: '#6b7280', fontStyle: 'italic', margin: 0, fontSize: '0.9rem' },
    cursoDesc: { color: '#374151', margin: 0, fontSize: '0.95rem' },
    cursoDescEn: { color: '#6b7280', margin: 0, fontSize: '0.85rem', fontStyle: 'italic' },
    nivelBadge: { display: 'inline-block', background: '#ede9fe', color: '#4f46e5', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', alignSelf: 'flex-start' },
    botonReservar: { marginTop: '0.5rem', padding: '0.75rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem' },
    botonProximamente: { marginTop: '0.5rem', padding: '0.75rem', background: '#e5e7eb', color: '#9ca3af', border: 'none', borderRadius: '8px', cursor: 'not-allowed', fontWeight: '600', fontSize: '0.9rem' },
    reseñasGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' },
    reseñaCard: { background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' },
    estrellas: { fontSize: '1.1rem', marginBottom: '0.75rem' },
    reseñaTexto: { color: '#374151', fontStyle: 'italic', lineHeight: '1.6', margin: '0 0 0.5rem' },
    reseñaTextoEn: { color: '#6b7280', fontStyle: 'italic', fontSize: '0.85rem', margin: '0 0 1rem' },
    reseñaNombre: { color: '#4f46e5', fontWeight: '600', margin: 0 },
    botonPreply: { padding: '0.85rem 2rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '1rem' },
    preplySection: { background: '#1e1b4b', padding: '4rem 2rem', textAlign: 'center', color: 'white' },
    preplyContent: { maxWidth: '600px', margin: '0 auto' },
    preplyTag: { background: 'rgba(255,255,255,0.15)', display: 'inline-block', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.9rem', marginBottom: '1rem' },
    preplyTitulo: { fontSize: '1.8rem', fontWeight: '700', marginBottom: '1rem' },
    preplySubtitulo: { opacity: 0.8, fontStyle: 'italic', marginBottom: '1rem' },
    preplyDesc: { marginBottom: '0.25rem' },
    preplyDescEn: { opacity: 0.8, fontStyle: 'italic', marginBottom: '2rem', fontSize: '0.9rem' },
    footer: { background: '#1e1b4b', color: 'white', textAlign: 'center', padding: '2rem' }
};

export default Home;