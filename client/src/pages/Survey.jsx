import { useEffect } from "react";

export default function Survey() {
  useEffect(() => {
    document.title = "SV Habitats Survey";
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#f8fbff", padding: "32px 16px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", boxShadow: "0 24px 80px rgba(25,29,51,.12)", borderRadius: 24, overflow: "hidden", background: "#fff" }}>
        <iframe
          title="SV Habitats Survey"
          src="/survey.html"
          style={{ width: "100%", minHeight: "100vh", border: "none" }}
        />
      </div>
    </div>
  );
}
