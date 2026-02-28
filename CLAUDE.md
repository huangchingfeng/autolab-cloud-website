# Autolab 雲端
課程發表系統與課程回饋頁面。

## 技術棧
- Framework: Next.js 14 + Vite + Express
- DB: Drizzle ORM
- 整合: Google Maps, Resend 郵件服務

## 開發指令
```bash
npm run dev    # 開發伺服器
npm run build  # 建置
```

## 部署
- Platform: Vercel

## 注意事項
- 含多個子目錄，每個為獨立的課程回饋頁（如 20260131-yifeng-ai/）
- 子目錄為靜態 HTML，主專案為全棧應用
