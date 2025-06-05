# 🎯 Study Monorepo

モノレポ開発パターンの学習と実践を目的とした研究用リポジトリです。  
複数のパッケージとアプリケーションを統合管理し、効率的な開発フローを構築しています。

## 🏗️ プロジェクト構成

```
study-monorepo/
├── apps/
│   └── web/                  # マルチエントリWebアプリケーション
│       └── src/routes/       # 動的ルート検出対応
├── packages/
│   ├── auth/                 # 共通認証ライブラリ
│   ├── react/                # React + TypeScript + Vite
│   └── vue/                  # Vue 3 + TypeScript + Vite
├── scripts/
│   ├── build.sh             # 依存関係順序ビルド
│   └── dev.sh               # 開発環境セットアップ
└── package.json             # pnpm workspaces設定
```

## ⚡ 技術スタック

- **Package Manager:** pnpm workspaces
- **Build Tool:** Vite
- **Language:** TypeScript
- **Frameworks:** React 19, Vue 3
- **Authentication:** localStorage ベース簡易認証
- **Routing:** ファイルベース動的ルート生成

## 🚀 クイックスタート

### 1. 依存関係のインストール
```bash
pnpm install
```

### 2. 開発環境の起動
```bash
pnpm dev
```

### 3. 本番ビルド
```bash
pnpm build
```

### 4. プレビュー
```bash
pnpm preview
```

## 📱 アプリケーション構成

### メインアプリケーション
- **[http://localhost:5173/](http://localhost:5173/)** - ランディングページ（Plain HTML）
- **[http://localhost:5173/about/](http://localhost:5173/about/)** - プロジェクト概要（Plain HTML）
- **[http://localhost:5173/signin/](http://localhost:5173/signin/)** - 認証ページ（Plain HTML + Auth Library）

### フレームワークアプリ（認証必須）
- **[http://localhost:5173/vue/](http://localhost:5173/vue/)** - Vue 3アプリケーション
- **[http://localhost:5173/react/](http://localhost:5173/react/)** - Reactアプリケーション

## 🔐 認証システム

### ダミー認証
- **テスト用認証:** 任意のメールアドレス + 6文字以上のパスワード
- **セッション管理:** localStorage（30分間）
- **認証ガード:** Vue/Reactページは自動リダイレクト

### 使用例
```javascript
import { auth } from '@study-monorepo/auth';

// サインイン
await auth.signIn('test@example.com', 'password123');

// 認証状態確認
if (auth.isAuthenticated()) {
  const user = auth.getCurrentUser();
  console.log(user.name, user.email);
}

// サインアウト
auth.signOut();
```

## 🛠️ 開発コマンド

### 全体操作
```bash
pnpm dev          # 開発環境起動（パッケージビルド→dev server）
pnpm build        # 本番ビルド（依存関係順序）
pnpm preview      # ビルド結果のプレビュー
pnpm clean        # 全dist・キャッシュクリア
```

### 個別パッケージ操作
```bash
pnpm --filter @study-monorepo/auth build
pnpm --filter @study-monorepo/vue build
pnpm --filter @study-monorepo/react build
pnpm --filter @study-monorepo/web build
```

## 📦 パッケージ詳細

### `packages/auth` - 共通認証ライブラリ
- セッション管理（localStorage）
- 認証状態チェック
- セッション期限管理・延長

### `packages/vue` - Vue 3アプリケーション
- Vue 3 + TypeScript
- `mountVueApp()` エクスポート関数
- Viteビルド（ランタイム内包）

### `packages/react` - Reactアプリケーション
- React 19 + TypeScript
- `mountReactApp()` エクスポート関数
- Viteビルド（ランタイム内包）

### `apps/web` - マルチエントリWebアプリ
- 動的ルート検出（`src/routes/*.html`）
- 自動ビルド対象追加
- フレームワーク・Plain HTML共存

## 🎯 学習ポイント

- **モノレポ管理** - pnpm workspacesによる効率的なパッケージ管理
- **ビルド最適化** - Viteによる高速ビルドとHMR
- **型安全性** - TypeScriptによる開発体験向上
- **マルチフレームワーク** - React/Vueの共存とビルド最適化
- **共通ライブラリ** - 認証機能のパッケージ間連携
- **動的ルーティング** - ファイルベースの自動ページ生成
- **技術選択の柔軟性** - Plain HTMLとフレームワークの使い分け

## 🌐 デプロイメント

### 出力構造（GitHub Pages対応）
```
dist/
├── index.html              # ランディングページ
├── about/index.html        # アバウトページ
├── signin/index.html       # 認証ページ
├── vue/index.html          # Vueアプリ
├── react/index.html        # Reactアプリ
└── assets/                 # 最適化済みアセット
```

### GitHub Pagesデプロイ
1. `pnpm build` でビルド
2. `apps/web/dist/` をデプロイ
3. クリーンURLでアクセス可能（`.html`拡張子不要）

## 📄 アーキテクチャの特徴

### フレームワーク共存
- **フレームワークページ** - 複雑なインタラクションが必要な場合
- **Plain HTML** - シンプルな情報表示やランディングページ
- **共通ライブラリ** - 認証など横断的機能の共有

### ビルド戦略
- **依存関係順序** - auth → framework packages → web app
- **インクリメンタル** - 変更されたパッケージのみビルド可能
- **最適化** - 各パッケージは独立してランタイムを内包

## 🤝 Contributing

1. パッケージ追加時は `packages/` または `apps/` 以下に配置
2. 新しいHTMLページは `apps/web/src/routes/` に追加（自動検出）
3. 共通機能は `packages/` でライブラリ化
4. ビルドスクリプトは依存関係を考慮して順序調整

---

**Study Monorepo** - Modern monorepo development patterns with Vite + pnpm workspaces 🚀