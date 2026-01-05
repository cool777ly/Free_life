# 如何更新 FL 網站的建造日誌 (Build Log)

本指南說明如何根據用戶在 `vote.html` 的投票結果，手動更新 `build_log.html`，以反映網站的「生長」過程。

## 1. 檢查投票結果

1.  打開瀏覽器，訪問 `vote.html`。
2.  查看「進行中的投票」列表。
3.  找出票數最高（排名 #1）且您決定要實作的功能（例如：深色模式、留言板等）。

## 2. 實作功能 (範例)

假設最高票是「深色模式 (Dark Mode)」。
您需要在所有 HTML 頁面中加入深色模式的支援代碼（Tailwind `dark:` 類別和切換 JS）。
*注意：目前的代碼庫已經為您預埋了深色模式的基礎架構。*

## 3. 更新 `build_log.html`

一旦功能實作完成，請按照以下步驟更新日誌：

1.  打開 `build_log.html` 文件。
2.  找到 `<!-- Build Logs Section -->` 下的 `<!-- Timeline Container -->`。
3.  在最上方（緊接在容器開始處）插入一個新的日誌區塊。

### 日誌區塊模板

請複製以下代碼並修改內容：

```html
<!-- 新日誌項目 -->
<div class="relative group">
    <!-- 日期標籤 (修改日期) -->
    <span class="absolute -left-[42px] md:-left-[60px] top-0 bg-green-500 text-white text-sm font-bold px-2 py-1 rounded shadow">2026-01-XX</span>
    <!-- 時間軸圓點 (顏色可選：green-500 為新功能，blue-500 為優化) -->
    <div class="absolute -left-[46px] top-8 w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow"></div>
    
    <!-- 日誌卡片 -->
    <div class="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
        <!-- 標籤 (可選：Day X 或 Feature) -->
        <div class="flex items-center gap-2 mb-4 text-green-700 font-semibold text-sm uppercase tracking-wide">
            <i class="fas fa-code-branch"></i> Feature Update
        </div>
        <!-- 標題 -->
        <h3 class="text-2xl font-bold mb-4 text-gray-800">功能上線：[功能名稱]</h3>
        <!-- 內文 -->
        <div class="prose max-w-none text-gray-600 leading-relaxed">
            <p class="mb-4">
                感謝社群的投票！根據大家的建議，我們優先實作了 <strong>[功能名稱]</strong>。
                [這裡可以簡短描述實作的過程、遇到的困難，或是這個功能如何運作]
            </p>
            <p>
                這正是 FL 生長的證明 —— 它是被大家的需求所驅動的。
            </p>
        </div>
    </div>
</div>
```

## 4. 提交與發布

1.  保存 `build_log.html`。
2.  如果是部署在 Vercel/GitHub Pages，請 git commit 並 push 您的更改。
3.  在首頁 `index.html` 的頁尾更新 `Last updated` 日期。

---

**小提示**：保持日誌的語氣真誠、透明。如果某個功能開發失敗了，也可以寫進日誌裡，這也是「真實建造」的一部分。
