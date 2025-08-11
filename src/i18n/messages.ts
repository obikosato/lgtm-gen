export type Language = 'ja' | 'en'

export const messages = {
  ja: {
    // アプリタイトル
    title: 'LGTM画像つくるよ',

    // 画像アップロード
    dragDropText:
      'ここに画像をドラッグするか、クリックしてファイルを選択してください',
    dragDropActiveText: '画像をドロップしてください',

    // ランダム犬ボタン
    randomDog: 'ランダムな犬',
    loading: 'ロード中...',

    // 画像フィット
    imageFitTitle: '画像のフィット方法',
    fitCover: '切り抜いて全体表示',
    fitContain: '全体を収める',
    fitFill: '引き伸ばして全体表示',

    // アクション
    downloadImage: '画像をダウンロード',
    copyToClipboard: 'クリップボードにコピー',

    // アリア・ラベル
    ariaAppLabel: 'LGTM画像を作るアプリケーション',
    ariaImagePreview: '選択された背景画像のプレビュー',
    ariaImageFit: '画像のフィット方法',
    ariaLanguageSwitch: '言語を切り替え',
  },
  en: {
    // App title
    title: 'LGTM Generator',

    // Image upload
    dragDropText: 'Drag an image here or click to select a file',
    dragDropActiveText: 'Drop your image here',

    // Random dog button
    randomDog: 'Random Dog',
    loading: 'Loading...',

    // Image fit
    imageFitTitle: 'Image Fit Mode',
    fitCover: 'Cover (crop to fill)',
    fitContain: 'Contain (fit entirely)',
    fitFill: 'Fill (stretch to fill)',

    // Actions
    downloadImage: 'Download Image',
    copyToClipboard: 'Copy to Clipboard',

    // Aria labels
    ariaAppLabel: 'LGTM image generator application',
    ariaImagePreview: 'Preview of selected background image',
    ariaImageFit: 'Image fit mode',
    ariaLanguageSwitch: 'Switch language',
  },
} as const
