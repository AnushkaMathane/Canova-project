import React from "react";
import styles from "./Analysis.module.css";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { donutData, barData } from "./analysisDownloadData";

const COLORS = ["#111", "#7FB0FF", "#8DE2B1", "#B5C0D0"];

export default function FormInsights() {
  const handleDownload = () => {
    const report = { donutData, barData, generatedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "analysis-report.json"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.analysisPage}>
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <span className={styles.back}>←</span>
          <h2>Title</h2>
        </div>
        <button className={styles.primaryBtn}>Save</button>
      </div>

      <p className={styles.pageLabel}>Page 01</p>

      <div className={styles.questionCard}>
        <h3>01 Question</h3>
        <div className={styles.donutWrap}>
          <PieChart width={200} height={200}>
            <Pie data={donutData} dataKey="value" innerRadius={60} outerRadius={90}>
              {donutData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
          </PieChart>

          <ul className={styles.legendList}>
            {donutData.map((d, i) => (
              <li key={i}>
                <span className={styles.dot} style={{ background: COLORS[i] }} />
                <span>{d.label}</span>
                <span>{d.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.questionCard}>
        <h3>01 Question</h3>
        <div style={{ width: "100%", height: 260 }}>
          <ResponsiveContainer>
            <BarChart data={barData}>
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[10,10,0,0]}>
                {barData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.downloadWrap}>
        <button className={styles.downloadBtn} onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  );
}