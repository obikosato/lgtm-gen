# LGTM画像ジェネレーター

ブラウザ上でLGTM画像を生成するサンプルアプリケーションです。

## 機能

- **背景画像アップロード**: お好みの画像を背景に設定
- **固定LGTM文字**: 白色文字に黒枠で視認性抜群
- **自動生成**: 画像アップロード後、即座にLGTM画像を生成
- **レスポンシブデザイン**: スマートフォン、タブレット、デスクトップ対応
- **ワンクリックダウンロード**: PNG形式で簡単保存
- **Canvas APIによる高速描画**

## 使用技術

- **React 19**: 最新UIライブラリ
- **TypeScript 5.9**: 静的型付け言語
- **Chakra UI v3**: モダンUIコンポーネントライブラリ
- **Vite 7**: 高速開発・ビルドツール
- **Biome 2.1**: 次世代静的解析・フォーマッター
- **Canvas API**: 画像描画処理

## セットアップ

```sh
# 依存関係をインストール
npm install

# 開発サーバー起動（localhost:3000）
npm run dev

# プロダクション用ビルド
npm run build

# プレビューサーバー起動
npm run preview

# コード品質チェック（lint + format）
npm run check
```

## 使い方

### シンプルな3ステップ

1. **画像を選択** - 「画像を選択」ボタンで背景画像をアップロード
1. **自動生成** - アップロード完了と同時にLGTM画像が自動生成
1. **ダウンロード** - 「画像をダウンロード」でPNG形式で保存

## ファイル構成

```sh
├── src/
│   ├── components/
│   │   ├── LGTMGenerator.tsx     # メイン画像生成コンポーネント
│   │   └── ui/
│   │       └── provider.tsx      # Chakra UI プロバイダー
│   ├── lib/
│   │   └── lgtm-generator.ts     # 画像生成ロジック（純粋関数）
│   ├── types.ts                  # TypeScript型定義
│   ├── App.tsx                   # アプリケーションルート
│   └── main.tsx                  # エントリーポイント
├── public/
│   └── index.html               # HTMLテンプレート
├── dist/                        # ビルド出力ディレクトリ
├── biome.json                   # Biome設定
├── vite.config.ts              # Vite設定
├── tsconfig.json               # TypeScript設定
└── package.json                # 依存関係管理
```

## 今後の改善案

- **ドラッグ&ドロップ**: より直感的な画像アップロード
- **文字色選択**: 白か黒か選べるオプション追加
- **Looks Good To Me**: を入れる（LGTMだけだとわからない）
- **画像サイズ調整**: カバー、フィットなどのオプション追加
- **職人モード**: 文字サイズ・文字色・フォントなど変更機能

## ライセンス

UNLICENSED
