# LGTM Generator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)

LGTM画像を生成するシンプルなウェブアプリケーションです。

🌐 English README is available [here](README.md).

## 使ってみる

**[🚀 LGTM画像つくるよ](https://obikosato.github.io/lgtm-gen/)**

### 使い方

1. お好みの方法で背景画像を追加：
   - 画像ファイルをドラッグ&ドロップ
   - クリックして画像ファイルを選択
   - クリップボードから画像を貼り付け（ctrl+v / ⌘+v）
   - 「ランダムな犬」ボタンで犬の画像を使用
2. フィット方法を選択
3. 画像が生成されます
4. 画像をダウンロード、または、クリップボードにコピー

### 注意事項

- アップロードされた画像はブラウザ内で処理され、サーバーに送信されることはありません
- ランダムな犬の画像は外部APIから取得されます

## 開発

ローカルで実行や開発に貢献したい方向け：

### 前提条件

- Node.js 20.19.0+
- npm

### セットアップ

```bash
git clone https://github.com/obikosato/lgtm-gen.git
cd lgtm-gen

# 依存関係をインストール
npm install

# 開発サーバー起動
npm run dev
```

<http://localhost:5173> をブラウザで開いてください。

### ビルドコマンド

```bash
# プロダクションビルド
npm run build

# プロダクションビルドのプレビュー
npm run preview

# コード品質チェック（lint + format）
npm run check
```

### プロジェクト構造

```sh
├── src/
│   ├── components/           # Reactコンポーネント
│   ├── hooks/                # カスタムReactフック
│   ├── i18n/                 # 国際化
│   ├── lib/                  # ユーティリティ関数
│   ├── providers/            # Reactコンテキストプロバイダー
│   ├── types.ts              # TypeScript型定義
│   ├── App.tsx               # アプリケーションルート
│   └── main.tsx              # エントリーポイント
├── index.html                # HTMLエントリーポイント
├── dist/                     # ビルド出力
├── biome.json                # Biome設定
├── vite.config.ts            # Vite設定
├── tsconfig.json             # TypeScript設定
├── package.json              # 依存関係とスクリプト
└── LICENSE                   # MITライセンスファイル
```

## 使用技術

- **[React](https://reactjs.org/)** - UIライブラリ
- **[TypeScript](https://www.typescriptlang.org/)** - 型安全なJavaScript
- **[Vite](https://vitejs.dev/)** - 高速ビルドツール
- **[Chakra UI](https://chakra-ui.com/)** - モジュラーでアクセシブルなコンポーネントライブラリ
- **[Biome](https://biomejs.dev/)** - 高速リンター・フォーマッター

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルをご覧ください。

## 謝辞

- **[Dog CEO API](https://github.com/ElliottLandsborough/dog-ceo-api)** - ランダム犬画像を提供（MITライセンス）

詳細な帰属情報については、[ATTRIBUTION.md](ATTRIBUTION.md)をご覧ください。

## 免責事項

- このアプリケーションで生成・ダウンロードした画像の使用は、すべてご自身の責任で行ってください
- アップロードする画像やその他のコンテンツについても、著作権等の法的権利を確認の上ご利用ください
- 本アプリケーションの使用により生じたいかなる損害についても、開発者は責任を負いません
