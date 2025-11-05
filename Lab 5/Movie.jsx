import React, { useState, useEffect } from "react";

const STAR = "⭐";

export default function MovieWatchList() {
    const [form, setForm] = useState({ title: "", comment: "", rating: 3 });
    const [movies, setMovies] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("movies_watchlist")) || [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("movies_watchlist", JSON.stringify(movies));
    }, [movies]);

    const opts = [0, 1, 2, 3, 4, 5];

    const handleAdd = (e) => {
        e.preventDefault();
        const title = form.title.trim();
        if (!title) return;
        setMovies((m) => [
            {
                id: Date.now().toString(),
                title,
                comment: form.comment.trim(),
                rating: Number(form.rating),
                addedAt: new Date().toISOString(),
            },
            ...m,
        ]);
        setForm({ title: "", comment: "", rating: 3 });
    };

    const renderStars = (n) =>
        n > 0 ? STAR.repeat(Math.max(0, Math.min(5, Number(n)))) : "No rating";

    const styles = {
        container: { maxWidth: 720, margin: "20px auto", padding: 16, fontFamily: "system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif", color: "#111" },
        form: { display: "flex", gap: 8, marginBottom: 12, alignItems: "center" },
        input: { flex: 1, padding: "8px 10px", borderRadius: 6, border: "1px solid #ddd" },
        select: { width: 80, padding: 8, borderRadius: 6, border: "1px solid #ddd" },
        button: { padding: "8px 12px", background: "#0b74de", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" },
        list: { listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 },
        item: { border: "1px solid #eee", padding: 12, borderRadius: 8, background: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,0.03)" },
        headerRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
        title: { fontSize: 16 },
        meta: { display: "flex", gap: 8, alignItems: "center", marginTop: 8 },
        stars: { fontSize: 18 },
        textarea: { width: "100%", minHeight: 64, marginTop: 8, padding: 8, borderRadius: 6, border: "1px solid #eee", resize: "vertical" },
        footer: { marginTop: 8, color: "#666" },
        remove: { background: "#ff4d4f", color: "#fff", border: "none", padding: "6px 8px", borderRadius: 6, cursor: "pointer" },
    };

    return (
        <main style={styles.container}>
            <h2>Movies Watch List</h2>

            <form onSubmit={handleAdd} style={styles.form}>
                <input
                    placeholder="Movie title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    style={styles.input}
                />
                <select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} style={styles.select}>
                    {opts.map((o) => (
                        <option key={o} value={o}>
                            {o}
                        </option>
                    ))}
                </select>
                <input
                    placeholder="Comment"
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    style={{ ...styles.input, maxWidth: 240 }}
                />
                <button type="submit" style={styles.button}>
                    Add
                </button>
            </form>

            <ul style={styles.list}>
                {movies.length === 0 && <li style={{ color: "#666" }}>No movies yet — add one above.</li>}
                {movies.map((m) => (
                    <li key={m.id} style={styles.item}>
                        <div style={styles.headerRow}>
                            <strong style={styles.title}>{m.title}</strong>
                            <button
                                onClick={() => setMovies((ms) => ms.filter((x) => x.id !== m.id))}
                                title="Remove movie"
                                style={styles.remove}
                            >
                                Remove
                            </button>
                        </div>

                        <p style={styles.meta}>
                            <span style={styles.stars}>{renderStars(m.rating)}</span>
                            <select
                                value={m.rating}
                                onChange={(e) =>
                                    setMovies((ms) => ms.map((it) => (it.id === m.id ? { ...it, rating: Number(e.target.value) } : it)))
                                }
                                style={{ padding: 6, borderRadius: 6 }}
                            >
                                {opts.map((o) => (
                                    <option key={o} value={o}>
                                        {o}
                                    </option>
                                ))}
                            </select>
                        </p>

                        <textarea
                            value={m.comment}
                            onChange={(e) => setMovies((ms) => ms.map((it) => (it.id === m.id ? { ...it, comment: e.target.value } : it)))}
                            placeholder="Add or edit comment..."
                            style={styles.textarea}
                        />

                        <small style={styles.footer}>Added: {new Date(m.addedAt).toLocaleString()}</small>
                    </li>
                ))}
            </ul>
        </main>
    );
}
