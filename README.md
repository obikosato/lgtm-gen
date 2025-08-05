# LGTM画像ジェネレーター

ブラウザ上でLGTM画像を生成するシンプルなWebアプリケーションです。

## 使い方

1. **画像をアップロード** - ドラッグ&ドロップまたはクリックして背景画像を選択
1. **表示方法を選択** - ラジオボタンで画像のフィット方法を調整
1. **自動生成を確認** - 設定変更時に即座にLGTM画像が自動生成される
1. **保存・コピー** - 「画像をダウンロード」でファイル保存、または「クリップボードにコピー」で直接コピー

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

- **GIFアニメーション対応**: 動画やGIFを背景に設定可能に
- **文字カスタマイズ**: フォントサイズ・色・フォントファミリーの選択
- **背景色設定**: 背景透過の場合の背景色カスタマイズ
- **CLIツール**: コマンドラインからの画像生成機能

## ライセンス

UNLICENSED
