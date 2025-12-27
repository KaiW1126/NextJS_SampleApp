# Socially - ソーシャルメディアプラットフォーム

Next.js 15 で構築された、リアルタイムインタラクション、ユーザー認証、レスポンシブUIを備えたモダンなフルスタックソーシャルメディアアプリケーション。

## 📑 目次

- [技術スタック](#-技術スタック)
- [機能](#-機能)
- [データベーススキーマ](#️-データベーススキーマ)
- [セットアップ](#️-セットアップ)
- [プロジェクト構成](#-プロジェクト構成)
- [学習成果](#-学習成果)
  - [Next.js 15+ の機能](#1-nextjs-15-の新機能と破壊的変更)
  - [Prisma ORM とデータベース設計](#2-prisma-orm-とデータベース設計)
  - [認証とセキュリティ](#3-認証とセキュリティ)
  - [リアルタイム通知](#4-リアルタイム通知システム)
  - [TypeScript 型安全性](#5-typescript-による型安全性)
  - [shadcn/ui による UI/UX](#6-shadcnui-による-uiux-設計)
  - [パフォーマンス最適化](#7-パフォーマンス最適化)
  - [問題解決の実践](#8-実際の問題解決プロセス)
- [今後の改善予定](#-今後の改善予定)

## 🚀 技術スタック

### フロントエンド
- **Next.js 16.0.10** - App Router を使用した React フレームワーク
- **React 19.2.3** - UI ライブラリ
- **TypeScript 5** - 型安全な JavaScript
- **Tailwind CSS 3.4.1** - ユーティリティファーストの CSS フレームワーク
- **shadcn/ui** - Radix UI ベースの再利用可能なコンポーネントライブラリ
- **Lucide React** - アイコンライブラリ
- **next-themes** - ダークモード対応

### バックエンド & データベース
- **Prisma 5.22.0** - 次世代 ORM
- **PostgreSQL** - リレーショナルデータベース（Neon 経由）
- **Clerk** - 認証とユーザー管理
- **Next.js Server Actions** - サーバーサイドデータ変更

### 主要ライブラリ
- **date-fns** - 日付フォーマット
- **react-hot-toast** - トースト通知
- **Radix UI** - アクセシブルな UI プリミティブ（Dialog, Tabs, Alert Dialog など）

## 📋 機能

- ✅ ユーザー認証（Clerk）
- ✅ 投稿作成（テキスト & 画像）
- ✅ ソーシャルインタラクション（いいね、コメント、削除）
- ✅ ユーザープロフィール（投稿といいねした投稿）
- ✅ フォローシステム
- ✅ リアルタイム通知（LIKE, COMMENT, FOLLOW）
- ✅ ダークモード
- ✅ レスポンシブデザイン
- ✅ 完全な TypeScript カバレッジ

## 🗄️ データベーススキーマ

### モデル
- **User** - プロフィール情報、認証
- **Post** - コンテンツと画像を含むユーザー投稿
- **Comment** - 投稿へのコメント
- **Like** - 投稿へのいいね
- **Follows** - ユーザーフォロー関係（自己参照多対多）
- **Notification** - タイプ付き通知（LIKE, COMMENT, FOLLOW）

### 主要機能
- カスケード削除によるデータ整合性
- クエリ最適化のための複合インデックス
- 重複防止のためのユニーク制約
- Prisma によるリレーショナルモデリング

## 🛠️ セットアップ

### 必要要件
- Node.js 20+
- PostgreSQL データベース（または Neon アカウント）
- Clerk アカウント

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/socially.git
cd socially

# 依存関係をインストール
npm install

# 環境変数を設定
# .env ファイルを作成:
# DATABASE_URL="your-postgresql-url"
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-key"
# CLERK_SECRET_KEY="your-clerk-secret"

# データベースをセットアップ
npx prisma generate
npx prisma db push

# 開発サーバーを起動
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開く

## 📁 プロジェクト構成

```
src/
├── actions/          # サーバーアクション
│   ├── post.action.ts
│   ├── profile.action.ts
│   ├── user.action.ts
│   └── notification.action.ts
├── app/              # Next.js App Router
│   ├── profile/[username]/
│   ├── notifications/
│   └── page.tsx
├── components/       # React コンポーネント
│   ├── ui/           # shadcn/ui コンポーネント
│   ├── PostCard.tsx
│   └── CreatePost.tsx
├── lib/
│   └── prisma.ts
└── prisma/
    └── schema.prisma
```

## 📚 学習成果

### 1. Next.js 15+ の新機能と破壊的変更

#### Server Components vs Client Components
- **Server Components**: デフォルト、サーバーでデータ取得、バンドルサイズ削減
- **Client Components**: Hooks、ブラウザ API、イベントハンドラーには `"use client"` が必要

#### Server Actions
```typescript
"use server";

export async function createPost(content: string, image: string) {
  const userId = await getDbUserId();
  const post = await prisma.post.create({ data: { content, image, authorId: userId } });
  
  // 重要な学び: "layout" タイプで広範囲のキャッシュ無効化
  revalidatePath("/", "layout");  // レイアウト配下の全ページを再検証
  return { success: true, post };
}
```

**キャッシュ戦略の学び:**
- `revalidatePath("/")` → ホームページのみ
- `revalidatePath("/", "layout")` → 全ページ（ホーム、プロフィールなど）

#### 動的ルート - Next.js 15 の破壊的変更

**問題:** `params` が Promise になった

```typescript
// ❌ Next.js 14
async function ProfilePage({params}: {params: {username: string}}) {
  const user = await getUser(params.username); // エラー！
}

// ✅ Next.js 15
async function ProfilePage({params}: {params: Promise<{username: string}>}) {
  const { username } = await params;  // await が必須
  const user = await getUser(username);
}
```

**フォルダ構造:**
- `profile/username/` → `/profile/username` のみにマッチ
- `profile/[username]/` → `/profile/任意の値` にマッチ ✅

### 2. Prisma ORM とデータベース設計

#### カスケード削除
```prisma
model Post {
  author User @relation(fields: [authorId], references: [id], onDelete: Cascade)
}
```
ユーザー削除 → 全投稿削除 → 全コメント削除 → 全いいね削除

#### 複合インデックスとユニーク制約
```prisma
model Like {
  userId String
  postId String
  
  @@unique([userId, postId])  // 重複いいね防止
  @@index([userId, postId])   // 高速クエリ
}
```

#### N+1 問題の解決
```typescript
// ❌ N+1 問題（1 + 100 + 100 = 201 クエリ）
const posts = await prisma.post.findMany();
for (const post of posts) {
  const author = await prisma.user.findUnique({ where: { id: post.authorId } });
  const comments = await prisma.comment.findMany({ where: { postId: post.id } });
}

// ✅ 1回のクエリ
const posts = await prisma.post.findMany({
  include: {
    author: { select: { id: true, name: true, image: true } },
    comments: { include: { author: true } },
    _count: { select: { likes: true, comments: true } }
  }
});
```

#### データ整合性のためのトランザクション
```typescript
await prisma.$transaction(async (tx) => {
  const comment = await tx.comment.create({ data: {...} });
  
  if (post.authorId !== userId) {
    await tx.notification.create({ data: {...} });
  }
});
// 両方成功するか、両方失敗する（ACID）
```

### 3. 認証とセキュリティ

#### Clerk 統合
```typescript
export async function syncUser() {
  const { userId: clerkId } = await auth();
  const clerkUser = await currentUser();
  
  // Upsert: 存在すれば更新、なければ作成
  const user = await prisma.user.upsert({
    where: { clerkId },
    update: { email, name, image, username },
    create: { clerkId, email, name, image, username }
  });
}
```

#### 認可
```typescript
export async function deletePost(postId: string) {
  const userId = await getDbUserId();
  const post = await prisma.post.findUnique({ where: { id: postId } });
  
  // 作成者のみ削除可能
  if (post.authorId !== userId) {
    throw new Error("Unauthorized");
  }
  
  await prisma.post.delete({ where: { id: postId } });
}
```

#### SQL インジェクション対策
Prisma が自動的にパラメータ化クエリを使用 → SQL インジェクションから保護

### 4. リアルタイム通知システム

#### 通知システム設計

| タイプ | トリガー | 受信者 |
|------|---------|--------|
| LIKE | 投稿にいいね | 投稿作成者 |
| COMMENT | 投稿にコメント | 投稿作成者 |
| FOLLOW | フォローされた | フォローされたユーザー |

**重要な実装:**
```typescript
// 自分自身には通知しない
if (post.authorId !== userId) {
  await prisma.notification.create({
    data: {
      type: "LIKE",
      userId: post.authorId,    // 受信者
      creatorId: userId,        // アクター
      postId
    }
  });
}
```

### 5. TypeScript による型安全性

#### Prisma からの型推論
```typescript
// 関数の戻り値から自動的に型を生成
type User = Awaited<ReturnType<typeof getProfileByUsername>>;
type Posts = Awaited<ReturnType<typeof getUserPosts>>;

interface ProfilePageClientProps {
  user: NonNullable<User>;  // null を除外
  posts: Posts;
  likedPosts: Posts;
  isFollowing: boolean;
}
```

**利点:**
- DRY 原則（型定義の重複なし）
- 関数変更時に自動更新
- コンパイル時エラー検出

### 6. shadcn/ui による UI/UX 設計

#### shadcn/ui を選んだ理由
1. **コピー & ペースト** - npm パッケージではなく、完全な制御が可能
2. **Radix UI ベース** - アクセシビリティが組み込み済み（ARIA、キーボードナビ、スクリーンリーダー）
3. **Tailwind 統合** - 簡単なスタイリング

**自動提供される機能:**
- ESC キーでダイアログを閉じる
- フォーカストラップ
- スクロールロック
- ARIA 属性

#### レスポンシブデザイン
```typescript
<div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
  <div className="lg:col-span-6">
    {/* メインコンテンツ */}
  </div>
  <div className="hidden lg:block lg:col-span-4">
    {/* サイドバー: モバイルでは非表示 */}
  </div>
</div>
```

#### ダークモード
```typescript
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>
```

### 7. パフォーマンス最適化

#### 動的インポート
```typescript
// ✅ 必要な時だけロード
const handleSubmit = async () => {
  const { createPost } = await import("@/actions/post.action");
  await createPost(content, imageUrl);
};
```

#### データベース最適化
- `select` で必要なフィールドのみ取得
- 複合インデックスで高速クエリ
- `_count` でデータを取得せずに集計

### 8. 実際の問題解決プロセス

#### 問題1: プロフィールページが 404
**原因:** フォルダ名が `username` で `[username]` ではない
**解決:** `[username]` にリネームして動的ルーティングに対応

#### 問題2: `params` が undefined
**原因:** Next.js 15 の破壊的変更 - `params` が Promise に
**解決:** 型を `Promise<{username: string}>` に変更し `await params`

#### 問題3: プロフィールに投稿が表示されない
**原因:** `revalidatePath("/")` がホームページのみ無効化
**解決:** `revalidatePath("/", "layout")` で全ページを無効化

#### 問題4: 投稿作成が動作しない
**原因:** TODO コメントが未実装
**解決:** 実際の `createPost` 呼び出しを実装

**デバッグ手法:**
- 各ステップで console.log
- サーバーログとクライアントログを確認
- Prisma Studio でデータベースを検証
- Network タブで API 呼び出しを確認

## 🎯 今後の改善予定

### 機能追加
- [ ] 画像アップロード（Cloudinary/S3）
- [ ] リアルタイムチャット（WebSocket）
- [ ] 検索機能
- [ ] ハッシュタグ
- [ ] ユーザーブロック
- [ ] 投稿編集

### テスト
- [ ] E2E テスト（Playwright）
- [ ] ユニットテスト（Jest/Vitest）

### パフォーマンス
- [ ] 画像最適化（Next.js Image）
- [ ] 無限スクロール
- [ ] Redis キャッシング
- [ ] CDN 統合

---

**Next.js 15、Prisma、TypeScript で ❤️ を込めて構築**
