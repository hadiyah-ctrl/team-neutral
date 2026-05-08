// MapView.jsx (OpenStreetMap embed)
export default function MapView() {
  const latitude = 24.8607;
  const longitude = 67.0011;
  const delta = 0.03;
  const bbox = [
    longitude - delta,
    latitude - delta,
    longitude + delta,
    latitude + delta,
  ].join(",");

  return (
    <div style={styles.wrapper}>
      <iframe
        title="Nearby exchange location map"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude},${longitude}`}
        style={styles.frame}
        loading="lazy"
      />
    </div>
  );
}

const styles = {
  wrapper: {
    height: 380,
    width: "100%",
    borderRadius: 14,
    overflow: "hidden",
    border: "1px solid #e5e7eb",
    background: "#f9fafb",
  },
  frame: {
    width: "100%",
    height: "100%",
    border: 0,
  },
};
