import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function SkillsChart({ skills }) {
  const data = [
    {
      name: "Technical",
      count: skills.technical_skills?.length || 0,
    },
    {
      name: "Soft Skills",
      count: skills.soft_skills?.length || 0,
    },
    {
      name: "Domain",
      count: skills.domain_skills?.length || 0,
    },
  ];

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Skills Overview</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#a8b2d8" />
          <XAxis dataKey="name" stroke="#a8b2d8" />
          <YAxis stroke="#a8b2d8" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f3460",
              border: "none",
              color: "white",
            }}
          />
          <Bar dataKey="count" fill="#e94560" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#16213e",
    borderRadius: "12px",
    marginBottom: "20px",
    color: "white",
  },
  title: {
    fontSize: "1.4rem",
    marginBottom: "20px",
    color: "#a8b2d8",
  },
};

export default SkillsChart;