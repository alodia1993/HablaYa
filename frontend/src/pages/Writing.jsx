import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Writing() {
  const navigate = useNavigate();
  const [redacciones, setRedacciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [nivel, setNivel] = useState("A1");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selected, setSelected] = useState(null);

  const fetchRedacciones = async () => {
    try {
      const res = await api.get("/redacciones/mias");
      setRedacciones(res.data);
    } catch {
      setError("No se pudieron cargar las redacciones.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRedacciones();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo.trim() || !contenido.trim()) {
      setError("Por favor rellena el título y el contenido.");
      return;
    }
    setSending(true);
    setError("");
    setSuccess("");
    try {
      await api.post("/redacciones", { titulo, contenido, nivel });
      setSuccess("¡Redacción enviada! La profesora la revisará pronto.");
      setTitulo("");
      setContenido("");
      setNivel("A1");
      fetchRedacciones();
    } catch {
      setError("Error al enviar la redacción. Inténtalo de nuevo.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto", padding: "0 1rem" }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "1rem", cursor: "pointer" }}>
        ← Volver
      </button>

      <h1>✍️ Writing</h1>
      <p style={{ color: "#666" }}>Practica tu escritura en español</p>

      {/* Formulario nueva redacción */}
      <div style={{ background: "#f9f9f9", padding: "1.5rem", borderRadius: 8, marginBottom: "2rem" }}>
        <h2>Nueva Redacción</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label>Título</label><br />
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Escribe el título..."
              style={{ width: "100%", padding: "0.5rem", marginTop: 4 }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>Nivel</label><br />
            <select
              value={nivel}
              onChange={(e) => setNivel(e.target.value)}
              style={{ padding: "0.5rem", marginTop: 4 }}
            >
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="C1">C1</option>
            </select>
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>Redacción</label><br />
            <textarea
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              placeholder="Escribe tu redacción aquí..."
              rows={6}
              style={{ width: "100%", padding: "0.5rem", marginTop: 4 }}
            />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <button type="submit" disabled={sending} style={{ padding: "0.5rem 1.5rem", cursor: "pointer" }}>
            {sending ? "Enviando..." : "Enviar redacción"}
          </button>
        </form>
      </div>

      {/* Listado de redacciones anteriores */}
      <h2>Mis Redacciones</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : redacciones.length === 0 ? (
        <p style={{ color: "#888" }}>Aún no has enviado ninguna redacción.</p>
      ) : (
        redacciones.map((r) => (
          <div
            key={r.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: "1rem",
              marginBottom: "1rem",
              cursor: "pointer",
              background: selected?.id === r.id ? "#f0f7ff" : "white",
            }}
            onClick={() => setSelected(selected?.id === r.id ? null : r)}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong>{r.titulo}</strong>
              <span style={{
                padding: "0.2rem 0.8rem",
                borderRadius: 20,
                fontSize: 12,
                background: r.estado === "corregida" ? "#d1fae5" : "#fef3c7",
                color: r.estado === "corregida" ? "#065f46" : "#92400e",
              }}>
                {r.estado === "corregida" ? "Corregida ✓" : "Pendiente"}
              </span>
            </div>
            <p style={{ color: "#666", fontSize: 13, margin: "0.3rem 0 0" }}>
              Nivel: {r.nivel} · {new Date(r.created_at).toLocaleDateString("es-ES")}
            </p>

            {/* Detalle al hacer click */}
            {selected?.id === r.id && (
              <div style={{ marginTop: "1rem", borderTop: "1px solid #eee", paddingTop: "1rem" }}>
                <p><strong>Tu redacción:</strong></p>
                <p style={{ whiteSpace: "pre-wrap", background: "#f9f9f9", padding: "0.8rem", borderRadius: 6 }}>
                  {r.contenido}
                </p>
                {r.estado === "corregida" && r.correccion && (
                  <div style={{ marginTop: "1rem", background: "#ecfdf5", padding: "0.8rem", borderRadius: 6 }}>
                    <p><strong>✅ Corrección de la profesora:</strong></p>
                    <p style={{ whiteSpace: "pre-wrap" }}>{r.correccion}</p>
                    {r.puntuacion && (
                      <p><strong>Puntuación:</strong> {r.puntuacion}/10</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}