import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zhabti 测试样卷",
  description: "调查问卷自动分析网页"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
