import React from "react";
import { Link } from "react-router-dom";
import styles from "./Analysis.module.css";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const chartData = [
  { name: "+2hr", thisYear: 12000, lastYear: 6000 },
  { name: "+6hr", thisYear: 8000, lastYear: 9000 },
  { name: "+12hr", thisYear: 15000, lastYear: 20000 },
  { name: "+24hr", thisYear: 25000, lastYear: 7000 },
  { name: "+1 Day", thisYear: 28000, lastYear: 15000 },
  { name: "+4 Day", thisYear: 22000, lastYear: 26000 },
];

const forms = [
  { id: "1", name: "form" },
  { id: "2", name: "form" },
  { id: "3", name: "form" },
  { id: "4", name: "form" },
];

export default function ProjectInsights() {
  return (
    <div className={styles.analysisPage}>
      <h1 className={styles.projectTitle}>Project Name</h1>

      <div className={styles.topSection}>
        <div className={styles.statsCol}>
          <div className={styles.statCard}>
            <p>Views</p>
            <h2>7,265</h2>
            <span className={styles.growth}>+11.01% ↗</span>
          </div>
          <div className={styles.statCard}>
            <p>Responses</p>
            <h2>3,412</h2>
            <span className={styles.growth}>+6.2% ↗</span>
          </div>
        </div>

        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3>Average Response Chart</h3>
            <div className={styles.legend}>
              <span className={styles.dotBlack} /> This year
              <span className={styles.dotBlue} /> Last year
            </div>
          </div>

          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line dataKey="thisYear" stroke="#111" strokeWidth={2} dot={false}/>
                <Line dataKey="lastYear" stroke="#7FB0FF" strokeDasharray="4 4" strokeWidth={2} dot={false}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className={styles.formsGrid}>
        {forms.map(f => (
          <Link key={f.id} to={`/dashboard/analysis/${f.id}`} className={styles.formLink}>
            <div className={styles.formCard}>
              <div className={styles.iconBox}>✏️</div>
              <p className={styles.formName}>{f.name}</p>
              <span className={styles.linkIcon}>↗</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}