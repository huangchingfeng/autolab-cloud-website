import { useState, useEffect } from "react";

export default function NameCard() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showQR, setShowQR] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("namecard-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "dark" || (!saved && prefersDark)) {
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("namecard-theme", newTheme);
  };

  const copyLineId = async () => {
    try {
      await navigator.clipboard.writeText("@389uwgji");
      setToast("已複製 LINE ID！");
      setTimeout(() => setToast(""), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = "@389uwgji";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setToast("已複製 LINE ID！");
      setTimeout(() => setToast(""), 2000);
    }
  };

  const colors = theme === "dark" ? {
    bgPrimary: "#0f172a",
    bgCard: "#1e293b",
    bgCardHover: "#334155",
    textPrimary: "#f1f5f9",
    textSecondary: "#94a3b8",
    textMuted: "#64748b",
    borderColor: "#334155",
    accentColor: "#60a5fa",
  } : {
    bgPrimary: "#f8fafc",
    bgCard: "#ffffff",
    bgCardHover: "#f1f5f9",
    textPrimary: "#1e293b",
    textSecondary: "#64748b",
    textMuted: "#94a3b8",
    borderColor: "#e2e8f0",
    accentColor: "#3b82f6",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap');
        
        .namecard-page * { margin: 0; padding: 0; box-sizing: border-box; }
        .namecard-page { font-family: 'Noto Sans TC', sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; transition: all 0.3s ease; }
        .namecard-page .theme-toggle { position: fixed; top: 20px; right: 20px; border-radius: 50%; width: 48px; height: 48px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); transition: all 0.3s ease; z-index: 100; }
        .namecard-page .theme-toggle:hover { transform: scale(1.1); }
        .namecard-page .card { border-radius: 24px; max-width: 420px; width: 100%; overflow: hidden; transition: all 0.3s ease; animation: fadeInUp 0.6s ease; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .namecard-page .card:hover { transform: translateY(-4px); }
        .namecard-page .card-header { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 32px 24px; text-align: center; position: relative; overflow: hidden; }
        .namecard-page .card-header::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%); animation: shimmer 15s infinite linear; }
        @keyframes shimmer { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .namecard-page .avatar { width: 120px; height: 120px; border-radius: 50%; border: 4px solid rgba(255,255,255,0.9); margin-bottom: 16px; object-fit: cover; position: relative; z-index: 1; transition: transform 0.3s ease; }
        .namecard-page .avatar:hover { transform: scale(1.05); }
        .namecard-page .name { color: white; font-size: 28px; font-weight: 700; margin-bottom: 4px; position: relative; z-index: 1; }
        .namecard-page .title { color: rgba(255,255,255,0.9); font-size: 16px; font-weight: 500; position: relative; z-index: 1; }
        .namecard-page .tagline { color: rgba(255,255,255,0.8); font-size: 13px; margin-top: 8px; position: relative; z-index: 1; }
        .namecard-page .stats { display: flex; justify-content: center; gap: 32px; margin-top: 20px; position: relative; z-index: 1; }
        .namecard-page .stat { text-align: center; color: white; }
        .namecard-page .stat-number { font-size: 24px; font-weight: 700; }
        .namecard-page .stat-label { font-size: 12px; opacity: 0.9; }
        .namecard-page .card-body { padding: 24px; }
        .namecard-page .quick-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px; }
        .namecard-page .action-btn { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 14px 16px; border-radius: 12px; font-size: 14px; font-weight: 500; text-decoration: none; transition: all 0.3s ease; border: none; cursor: pointer; }
        .namecard-page .action-btn.primary { background: linear-gradient(135deg, #06c755 0%, #00b341 100%); color: white; }
        .namecard-page .action-btn.secondary { border: 1px solid; }
        .namecard-page .action-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .namecard-page .section-title { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; }
        .namecard-page .links-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
        .namecard-page .link-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; text-decoration: none; transition: all 0.3s ease; border: 1px solid transparent; }
        .namecard-page .link-item:hover { transform: translateX(4px); }
        .namecard-page .link-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
        .namecard-page .link-content { flex: 1; min-width: 0; }
        .namecard-page .link-title { font-size: 14px; font-weight: 500; }
        .namecard-page .link-desc { font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .namecard-page .link-arrow { transition: transform 0.3s ease; }
        .namecard-page .link-item:hover .link-arrow { transform: translateX(4px); }
        .namecard-page .community-btns { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .namecard-page .community-btn { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; border-radius: 12px; text-decoration: none; font-size: 13px; font-weight: 500; transition: all 0.3s ease; color: white; }
        .namecard-page .community-btn.line { background: linear-gradient(135deg, #06c755 0%, #00b341 100%); }
        .namecard-page .community-btn.whatsapp { background: linear-gradient(135deg, #25d366 0%, #128c7e 100%); }
        .namecard-page .community-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .namecard-page .card-footer { padding: 16px 24px; border-top: 1px solid; text-align: center; }
        .namecard-page .motto { font-size: 13px; font-style: italic; }
        .namecard-page .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .namecard-page .modal { border-radius: 20px; padding: 32px; max-width: 320px; width: 100%; text-align: center; animation: scaleIn 0.3s ease; }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .namecard-page .modal-title { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
        .namecard-page .modal-desc { font-size: 14px; margin-bottom: 20px; }
        .namecard-page .qr-code { background: white; padding: 16px; border-radius: 12px; margin-bottom: 16px; display: inline-block; }
        .namecard-page .qr-code img { width: 180px; height: 180px; }
        .namecard-page .line-id { display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 8px; font-family: monospace; font-size: 14px; cursor: pointer; transition: all 0.3s ease; margin-bottom: 16px; }
        .namecard-page .line-id:hover { background: #3b82f6 !important; color: white !important; }
        .namecard-page .modal-close { border-radius: 10px; padding: 10px 24px; font-size: 14px; cursor: pointer; transition: all 0.3s ease; border: 1px solid; }
        .namecard-page .toast { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); padding: 12px 24px; border-radius: 10px; font-size: 14px; z-index: 1001; animation: slideUp 0.3s ease; }
        @keyframes slideUp { from { transform: translateX(-50%) translateY(100px); } to { transform: translateX(-50%) translateY(0); } }
        @media (max-width: 480px) { .namecard-page .card { border-radius: 20px; } .namecard-page .card-header { padding: 24px 20px; } .namecard-page .avatar { width: 100px; height: 100px; } .namecard-page .name { font-size: 24px; } .namecard-page .stats { gap: 24px; } .namecard-page .stat-number { font-size: 20px; } .namecard-page .card-body { padding: 20px; } .namecard-page .quick-actions { grid-template-columns: 1fr; } }
      `}</style>

      <div className="namecard-page" style={{ background: colors.bgPrimary, color: colors.textPrimary }}>
        {/* Theme Toggle */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          style={{ background: colors.bgCard, border: `1px solid ${colors.borderColor}` }}
          aria-label="切換深色/淺色模式"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        {/* Main Card */}
        <div className="card" style={{ background: colors.bgCard, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}>
          {/* Header */}
          <div className="card-header">
            <img src="/teacher-photo.jpg" alt="阿峰老師" className="avatar" />
            <h1 className="name">阿峰老師</h1>
            <p className="title">AI 實戰培訓專家</p>
            <p className="tagline">黃敬峰 Jingfeng Huang</p>

            <div className="stats">
              <div className="stat">
                <div className="stat-number">400+</div>
                <div className="stat-label">企業合作</div>
              </div>
              <div className="stat">
                <div className="stat-number">10,000+</div>
                <div className="stat-label">培訓學員</div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="card-body">
            {/* Quick Actions */}
            <div className="quick-actions">
              <button className="action-btn primary" onClick={() => setShowQR(true)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                </svg>
                加入 LINE
              </button>
              <a href="https://www.youtube.com/channel/UCVVZz6m4T4k6-PZxFSlCkRQ" target="_blank" rel="noopener noreferrer" className="action-btn secondary" style={{ background: colors.bgCardHover, color: colors.textPrimary, borderColor: colors.borderColor }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                YouTube
              </a>
            </div>

            {/* Links */}
            <p className="section-title" style={{ color: colors.textMuted }}>探索更多</p>
            <div className="links-list">
              <a href="https://www.autolab.cloud/" target="_blank" rel="noopener noreferrer" className="link-item" style={{ background: colors.bgCardHover, color: colors.textPrimary }}>
                <div className="link-icon" style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}>🌐</div>
                <div className="link-content">
                  <div className="link-title">阿峰老師官網</div>
                  <div className="link-desc" style={{ color: colors.textSecondary }}>autolab.cloud</div>
                </div>
                <span className="link-arrow" style={{ color: colors.textMuted }}>→</span>
              </a>
              <a href="https://www.autolab.cloud/blog" target="_blank" rel="noopener noreferrer" className="link-item" style={{ background: colors.bgCardHover, color: colors.textPrimary }}>
                <div className="link-icon" style={{ background: "linear-gradient(135deg, #f59e0b, #ef4444)" }}>📝</div>
                <div className="link-content">
                  <div className="link-title">部落格文章</div>
                  <div className="link-desc" style={{ color: colors.textSecondary }}>AI 趨勢、教學、心得分享</div>
                </div>
                <span className="link-arrow" style={{ color: colors.textMuted }}>→</span>
              </a>
              <a href="https://www.autolab.cloud/events" target="_blank" rel="noopener noreferrer" className="link-item" style={{ background: colors.bgCardHover, color: colors.textPrimary }}>
                <div className="link-icon" style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>📅</div>
                <div className="link-content">
                  <div className="link-title">課程活動</div>
                  <div className="link-desc" style={{ color: colors.textSecondary }}>最新開課資訊</div>
                </div>
                <span className="link-arrow" style={{ color: colors.textMuted }}>→</span>
              </a>
              <a href="https://www.autolab.cloud/topics" target="_blank" rel="noopener noreferrer" className="link-item" style={{ background: colors.bgCardHover, color: colors.textPrimary }}>
                <div className="link-icon" style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}>🛠️</div>
                <div className="link-content">
                  <div className="link-title">好用工具</div>
                  <div className="link-desc" style={{ color: colors.textSecondary }}>阿峰老師製作的 AI 工具</div>
                </div>
                <span className="link-arrow" style={{ color: colors.textMuted }}>→</span>
              </a>
            </div>

            {/* Community */}
            <p className="section-title" style={{ color: colors.textMuted }}>加入學員社群</p>
            <div className="community-btns">
              <a href="https://reurl.cc/GGlLNx" target="_blank" rel="noopener noreferrer" className="community-btn line">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                </svg>
                LINE 社群（中文）
              </a>
              <a href="https://chat.whatsapp.com/BemCCL9DsW1GyH4OkO20Rt" target="_blank" rel="noopener noreferrer" className="community-btn whatsapp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp（英文）
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="card-footer" style={{ borderColor: colors.borderColor }}>
            <p className="motto" style={{ color: colors.textSecondary }}>
              「<strong style={{ color: colors.accentColor }}>你是機長，AI是機組人員</strong>」
            </p>
          </div>
        </div>

        {/* QR Modal */}
        {showQR && (
          <div className="modal-overlay" onClick={() => setShowQR(false)}>
            <div className="modal" style={{ background: colors.bgCard, color: colors.textPrimary }} onClick={e => e.stopPropagation()}>
              <h3 className="modal-title">加入阿峰老師 LINE</h3>
              <p className="modal-desc" style={{ color: colors.textSecondary }}>掃描 QR Code 或點擊複製 ID</p>
              <div className="qr-code">
                <img src="https://qr-official.line.me/gs/M_389uwgji_BW.png" alt="LINE QR Code" />
              </div>
              <div className="line-id" onClick={copyLineId} style={{ background: colors.bgCardHover, color: colors.textPrimary }}>
                📋 @389uwgji
              </div>
              <button className="modal-close" onClick={() => setShowQR(false)} style={{ background: colors.bgCardHover, color: colors.textPrimary, borderColor: colors.borderColor }}>
                關閉
              </button>
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div className="toast" style={{ background: colors.textPrimary, color: colors.bgCard }}>
            {toast}
          </div>
        )}
      </div>
    </>
  );
}