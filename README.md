# Socially - Social Media Platform

A modern, full-stack social media application built with Next.js 15, featuring real-time interactions, user authentication, and a responsive UI.

## 🚀 Tech Stack

### Frontend
- **[Next.js 16.0.10](https://nextjs.org/)** - React framework with App Router
- **[React 19.2.3](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 3.4.1](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library built on Radix UI
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Dark mode support

### Backend & Database
- **[Prisma 5.22.0](https://www.prisma.io/)** - Next-generation ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database (via Neon)
- **[Clerk](https://clerk.com/)** - Authentication and user management
- **Next.js Server Actions** - Server-side data mutations

### UI Components (Radix UI)
- **Alert Dialog** - Accessible modal dialogs
- **Avatar** - User profile images
- **Dialog** - Modal windows
- **Label** - Form labels
- **Scroll Area** - Custom scrollbars
- **Separator** - Visual dividers
- **Tabs** - Tabbed interfaces
- **Toast** - Notification system

### Utilities
- **[date-fns](https://date-fns.org/)** - Date formatting and manipulation
- **[react-hot-toast](https://react-hot-toast.com/)** - Toast notifications
- **[clsx](https://github.com/lukeed/clsx)** - Conditional className utility
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Merge Tailwind classes
- **[class-variance-authority](https://cva.style/)** - Component variants

## 📋 Features

- ✅ **User Authentication** - Secure authentication with Clerk
- ✅ **Post Creation** - Create posts with text and images
- ✅ **Social Interactions** - Like, comment, and delete posts
- ✅ **User Profiles** - View user profiles with posts and liked posts
- ✅ **Follow System** - Follow/unfollow other users
- ✅ **Notifications** - Real-time notifications for likes, comments, and follows
- ✅ **Dark Mode** - Toggle between light and dark themes
- ✅ **Responsive Design** - Mobile-first, fully responsive UI
- ✅ **Type Safety** - Full TypeScript coverage

## 🗄️ Database Schema

### Models
- **User** - User accounts with profile information
- **Post** - User posts with content and images
- **Comment** - Comments on posts
- **Like** - Post likes
- **Follows** - User follow relationships
- **Notification** - User notifications (LIKE, COMMENT, FOLLOW)

### Key Features
- Cascade deletes for data integrity
- Composite indexes for optimized queries
- Unique constraints to prevent duplicates
- Relational data modeling with Prisma

## 🛠️ Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL database (or Neon account)
- Clerk account for authentication

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/socially.git
cd socially
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env file with:
DATABASE_URL="your-postgresql-url"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-key"
CLERK_SECRET_KEY="your-clerk-secret"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
src/
├── actions/          # Server actions for data mutations
│   ├── notification.action.ts
│   ├── post.action.ts
│   ├── profile.action.ts
│   └── user.action.ts
├── app/              # Next.js App Router pages
│   ├── api/          # API routes
│   ├── notifications/
│   ├── profile/[username]/
│   ├── tasks/
│   ├── layout.tsx
│   └── page.tsx
├── components/       # React components
│   ├── ui/           # shadcn/ui components
│   ├── CreatePost.tsx
│   ├── DeleteAlertDialog.tsx
│   ├── Navbar.tsx
│   ├── PostCard.tsx
│   └── ...
├── lib/              # Utility functions
│   └── prisma.ts
└── prisma/
    └── schema.prisma # Database schema
```

## 🎨 UI Components

Built with **shadcn/ui** and **Radix UI** for:
- Accessibility (ARIA compliant)
- Keyboard navigation
- Focus management
- Screen reader support

## 🔒 Authentication

- Powered by **Clerk**
- Social login support
- User session management
- Protected routes and API endpoints

## 📦 Deployment

The application can be deployed on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- Any platform supporting Node.js

## 📚 Learning Outcomes

このプロジェクトを通じて習得した技術と概念を詳しく解説します。

### 1. Next.js 15+ の最新機能と破壊的変更への対応

#### App Router & Server Components の理解

Next.js 13 から導入された App Router を使用し、Server Components と Client Components の違いを実践的に学びました。

**Server Components の利点:**
- サーバーサイドでデータ取得が完了してからHTMLを返すため、初期表示が高速
- JavaScriptバンドルサイズが小さくなる（クライアントに送信されない）
- データベースへの直接アクセスが可能（セキュアな環境）

**実装例:**
```typescript
// src/app/page.tsx - Server Component（デフォルト）
export default async function Home() {
  // サーバーサイドで直接データ取得
  const posts = await getPosts();
  const dbUserId = await getDbUserId();
  
  return (
    <div>
      {/* Client Component を必要な部分だけ使用 */}
      {user ? <CreatePost /> : null}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} dbUserId={dbUserId} />
      ))}
    </div>
  );
}
```

**Client Components が必要な場面:**
- `useState`, `useEffect` などの React Hooks を使う時
- ブラウザ API（`window`, `localStorage`）を使う時
- イベントハンドラー（`onClick`, `onChange`）を使う時

```typescript
// src/components/CreatePost.tsx - Client Component
"use client"  // この行が必須！

import { useState } from "react";

export default function CreatePost() {
  const [content, setContent] = useState("");  // useState を使うため Client Component
  
  const handleSubmit = async () => {
    // クライアントサイドのイベントハンドラー
    const { createPost } = await import("@/actions/post.action");
    await createPost(content, imageUrl);
  };
  
  return <form>...</form>;
}
```

#### Server Actions による型安全なデータ変更

従来の API Routes の代わりに、Server Actions を使用してデータ変更を実装しました。

**Server Actions の利点:**
1. **型安全**: TypeScript の型が自動的に推論される
2. **シンプル**: API エンドポイントを作る必要がない
3. **Progressive Enhancement**: JavaScript が無効でも動作する

**実装例:**
```typescript
// src/actions/post.action.ts
"use server";  // Server Action であることを宣言

export async function createPost(content: string, image: string) {
  const userId = await getDbUserId();
  
  const post = await prisma.post.create({
    data: { content, image, authorId: userId }
  });
  
  // 重要: キャッシュの再検証
  revalidatePath("/", "layout");
  return { success: true, post };
}
```

**キャッシュ戦略の学び:**

最初は `revalidatePath("/")` だけを使っていましたが、これではホームページしか更新されず、プロフィールページの投稿一覧が更新されない問題が発生しました。

```typescript
// ❌ 問題のあるコード
revalidatePath("/");  // ホームページのみ再検証

// ✅ 修正後
revalidatePath("/", "layout");  // レイアウト配下の全ページを再検証
```

**`"layout"` タイプを使う理由:**
- `/` だけだとそのパスのみ再検証
- `"layout"` を指定すると、そのレイアウト配下のすべてのページ（`/`, `/profile/[username]` など）が再検証される
- 投稿作成後、ホームページとプロフィールページの両方が自動的に更新される

#### Dynamic Routes と Next.js 15 の破壊的変更

**遭遇した問題:**
プロフィールページで `params.username` にアクセスすると、以下のエラーが発生:
```
Error: Route "/profile/[username]" used `params.username`. 
`params` is a Promise and must be unwrapped with `await`
```

**原因:**
Next.js 15 から、動的ルートの `params` が **Promise** に変更されました。これは、ストリーミングレンダリングをサポートするための破壊的変更です。

**解決方法:**

```typescript
// ❌ Next.js 14 までの書き方（Next.js 15 ではエラー）
async function ProfilePage({params}: {params: {username: string}}) {
  const user = await getProfileByUsername(params.username);
  // params.username が undefined になる！
}

// ✅ Next.js 15 の正しい書き方
async function ProfilePage({params}: {params: Promise<{username: string}>}) {
  const { username } = await params;  // Promise を await で解決
  const user = await getProfileByUsername(username);
}
```

**学んだこと:**
- フレームワークのメジャーアップデートでは破壊的変更がある
- エラーメッセージをよく読むことが重要
- 公式ドキュメントで移行ガイドを確認する習慣

#### フォルダ構造による動的ルーティング

**遭遇した問題:**
`/profile/oarkaiw6211` にアクセスすると 404 エラー

**原因:**
フォルダ名が `username` だったため、`/profile/username` という固定URLにしかマッチしない

**解決方法:**
```bash
# ❌ 間違ったフォルダ構造
src/app/profile/username/page.tsx  # /profile/username にのみマッチ

# ✅ 正しいフォルダ構造
src/app/profile/[username]/page.tsx  # /profile/任意の値 にマッチ
```

**角括弧 `[]` の意味:**
- `[username]` は動的セグメント
- URL の値が `params.username` として渡される
- `/profile/john` → `params.username = "john"`
- `/profile/alice` → `params.username = "alice"`

### 2. Prisma ORM による高度なデータベース設計

#### リレーショナルモデリングの実践

6つのモデル（User, Post, Comment, Like, Follows, Notification）を設計し、それぞれの関係性を定義しました。

**多対多リレーション（Follows）の実装:**
```prisma
model User {
  id String @id @default(cuid())
  
  // 自己参照の多対多リレーション
  followers Follows[] @relation("following")  // このユーザーをフォローしている人
  following Follows[] @relation("follower")   // このユーザーがフォローしている人
}

model Follows {
  followerId  String
  followingId String
  
  follower  User @relation("follower", fields: [followerId], references: [id])
  following User @relation("following", fields: [followingId], references: [id])
  
  @@id([followerId, followingId])  // 複合主キー
}
```

**なぜ複合主キーを使うのか:**
- `@@id([followerId, followingId])` により、同じユーザーが同じユーザーを2回フォローできない
- 別途 `@@unique` 制約を書く必要がない
- データベースレベルで整合性を保証

#### カスケード削除によるデータ整合性

**問題:**
ユーザーを削除した時、そのユーザーの投稿やコメントはどうなる？

**解決策:**
```prisma
model Post {
  id       String @id
  authorId String
  
  author User @relation(fields: [authorId], references: [id], onDelete: Cascade)
  //                                                          ^^^^^^^^^^^^^^^^
  //                                                          これが重要！
}
```

**`onDelete: Cascade` の効果:**
1. ユーザーが削除される
2. そのユーザーの全投稿が自動的に削除される
3. その投稿の全コメントも自動的に削除される
4. その投稿の全いいねも自動的に削除される

**他の選択肢:**
- `onDelete: SetNull`: 外部キーを `null` にする
- `onDelete: Restrict`: 関連データがある場合は削除を拒否
- `onDelete: NoAction`: データベースのデフォルト動作

#### パフォーマンス最適化のためのインデックス

**複合インデックスの重要性:**
```prisma
model Like {
  userId String
  postId String
  
  @@unique([userId, postId])      // 重複防止
  @@index([userId, postId])       // クエリ高速化
}
```

**なぜ両方必要なのか:**

1. **`@@unique`**: ビジネスロジック上の制約
   - 同じユーザーが同じ投稿に2回いいねできない
   - データベースレベルで保証

2. **`@@index`**: パフォーマンス最適化
   - 「このユーザーがいいねした投稿一覧」を高速に取得
   - 「この投稿にいいねしたユーザー一覧」を高速に取得

**インデックスがない場合:**
```sql
-- インデックスなし: 全行スキャン（遅い）
SELECT * FROM Like WHERE userId = 'xxx' AND postId = 'yyy';
-- 100万件のデータがあると、100万件すべてをチェック

-- インデックスあり: インデックススキャン（速い）
-- B-Tree構造により、log(n) の時間で検索可能
```

#### 高度なクエリテクニック

**ネストした `include` でN+1問題を回避:**

```typescript
// ❌ N+1 問題が発生するコード
const posts = await prisma.post.findMany();
for (const post of posts) {
  const author = await prisma.user.findUnique({ where: { id: post.authorId } });
  const comments = await prisma.comment.findMany({ where: { postId: post.id } });
  // 投稿が100件あると、1 + 100 + 100 = 201回のクエリ！
}

// ✅ 1回のクエリで全データ取得
const posts = await prisma.post.findMany({
  include: {
    author: {
      select: { id: true, name: true, image: true, username: true }
    },
    comments: {
      include: {
        author: {
          select: { id: true, name: true, username: true, image: true }
        }
      },
      orderBy: { createdAt: "asc" }
    },
    likes: {
      select: { userId: true }
    },
    _count: {
      select: { likes: true, comments: true }
    }
  },
  orderBy: { createdAt: "desc" }
});
```

**`select` vs `include` の使い分け:**
- **`select`**: 必要なフィールドのみ取得（軽量）
- **`include`**: リレーションデータを含める（重いが便利）

**`_count` の活用:**
```typescript
_count: {
  select: { likes: true, comments: true }
}
// → post._count.likes で「いいね数」を取得
// → post._count.comments で「コメント数」を取得
// 実際のデータを取得せず、カウントのみ取得するため高速
```

#### トランザクション処理の実装

**なぜトランザクションが必要か:**

コメント作成と通知作成は、両方成功するか、両方失敗するかのどちらかであるべきです。

```typescript
// ❌ トランザクションなし（危険）
const comment = await prisma.comment.create({ data: {...} });
// ここでエラーが発生すると...
const notification = await prisma.notification.create({ data: {...} });
// 通知が作成されず、コメントだけが残る（データ不整合）

// ✅ トランザクションあり（安全）
await prisma.$transaction(async (tx) => {
  const comment = await tx.comment.create({ data: {...} });
  
  if (post.authorId !== userId) {
    await tx.notification.create({
      data: {
        type: "COMMENT",
        userId: post.authorId,
        creatorId: userId,
        postId,
        commentId: comment.id
      }
    });
  }
  
  return [comment];
});
// どちらかが失敗すると、両方ロールバックされる
```

**トランザクションの ACID 特性:**
- **Atomicity（原子性）**: すべて成功 or すべて失敗
- **Consistency（一貫性）**: データベースの整合性を保つ
- **Isolation（独立性）**: 他のトランザクションの影響を受けない
- **Durability（永続性）**: コミット後はデータが永続化

### 3. 認証とセキュリティの実装

#### Clerk による認証フローの理解

**Clerk の仕組み:**
1. ユーザーがログイン → Clerk がセッションを管理
2. `currentUser()` でユーザー情報を取得
3. データベースに同期（`syncUser` 関数）

**ユーザー同期の実装:**
```typescript
// src/actions/user.action.ts
export async function syncUser() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;
  
  const clerkUser = await currentUser();
  if (!clerkUser) return null;
  
  // Clerk のユーザーをデータベースに同期
  const user = await prisma.user.upsert({
    where: { clerkId },
    update: {
      email: clerkUser.emailAddresses[0].emailAddress,
      name: clerkUser.fullName,
      image: clerkUser.imageUrl,
      username: clerkUser.username || clerkUser.emailAddresses[0].emailAddress.split("@")[0]
    },
    create: {
      clerkId,
      email: clerkUser.emailAddresses[0].emailAddress,
      name: clerkUser.fullName,
      image: clerkUser.imageUrl,
      username: clerkUser.username || clerkUser.emailAddresses[0].emailAddress.split("@")[0]
    }
  });
  
  return user;
}
```

#### セキュリティ対策の実装

**1. 投稿削除時の所有者検証:**
```typescript
export async function deletePost(postId: string) {
  const userId = await getDbUserId();
  
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { authorId: true }
  });
  
  if (!post) throw new Error("Post not found");
  
  // 重要: 投稿の作成者のみが削除可能
  if (post.authorId !== userId) {
    throw new Error("Unauthorized - no delete permission");
  }
  
  await prisma.post.delete({ where: { id: postId } });
}
```

**2. SQL インジェクション対策:**

Prisma を使用することで、自動的に SQL インジェクションから保護されます。

```typescript
// ✅ Prisma（安全）
await prisma.user.findUnique({
  where: { username: userInput }
});
// Prisma が自動的にパラメータ化クエリを生成

// ❌ 生SQL（危険）
await db.query(`SELECT * FROM User WHERE username = '${userInput}'`);
// userInput = "'; DROP TABLE User; --" のような攻撃が可能
```

### 4. リアルタイム機能と通知システムの設計

#### 通知システムのアーキテクチャ

**通知の種類と発生タイミング:**

| 通知タイプ | 発生条件 | 通知先 |
|-----------|---------|--------|
| LIKE | 投稿にいいねされた | 投稿の作成者 |
| COMMENT | 投稿にコメントされた | 投稿の作成者 |
| FOLLOW | フォローされた | フォローされたユーザー |

**重要な実装ポイント:**

```typescript
// いいね時の通知作成
if (post.authorId !== userId) {  // 自分の投稿への自分のいいねでは通知しない
  await prisma.notification.create({
    data: {
      type: "LIKE",
      userId: post.authorId,    // 通知を受け取る人（投稿者）
      creatorId: userId,        // 通知を作成した人（いいねした人）
      postId
    }
  });
}
```

**なぜ自分の投稿への自分のアクションで通知しないのか:**
- ユーザーエクスペリエンスの向上
- 無駄な通知を減らす
- データベースの容量節約

#### 未読/既読管理の実装

```prisma
model Notification {
  id        String           @id @default(cuid())
  read      Boolean          @default(false)  // デフォルトは未読
  // ...
}
```

**既読にする処理:**
```typescript
export async function markNotificationAsRead(notificationId: string) {
  const userId = await getDbUserId();
  
  await prisma.notification.update({
    where: {
      id: notificationId,
      userId  // 自分の通知のみ既読にできる（セキュリティ）
    },
    data: { read: true }
  });
  
  revalidatePath("/notifications");
}
```

### 5. TypeScript による型安全な開発

#### Prisma の型推論を活用した型定義

**問題:**
Server Component で取得したデータを Client Component に渡す時、型をどう定義する？

**解決策:**
```typescript
// src/app/profile/[username]/ProfilePageClient.tsx

// Prisma の戻り値から型を自動生成
type User = Awaited<ReturnType<typeof getProfileByUsername>>;
type Posts = Awaited<ReturnType<typeof getUserPosts>>;

interface ProfilePageClientProps {
  user: NonNullable<User>;  // null を除外
  posts: Posts;
  likedPosts: Posts;
  isFollowing: boolean;
}
```

**この方法の利点:**
1. **DRY原則**: 型定義を重複して書かない
2. **自動更新**: 関数の戻り値が変わると型も自動的に更新
3. **型安全**: コンパイル時にエラーを検出

**`Awaited` と `ReturnType` の理解:**
```typescript
// getProfileByUsername の戻り値は Promise<User | null>
type Raw = ReturnType<typeof getProfileByUsername>;
// → Promise<User | null>

type Unwrapped = Awaited<ReturnType<typeof getProfileByUsername>>;
// → User | null

type Safe = NonNullable<Awaited<ReturnType<typeof getProfileByUsername>>>;
// → User（null を除外）
```

#### 型ガードによる安全なコード

```typescript
async function ProfilePage({params}: {params: Promise<{username: string}>}) {
  const { username } = await params;
  const user = await getProfileByUsername(username);
  
  if (!user) return notFound();  // 型ガード
  
  // この時点で user は NonNullable<User> 型
  // user.name にアクセスしても型エラーにならない
  const posts = await getUserPosts(user.id);
}
```

### 6. UI/UX 設計とアクセシビリティ

#### shadcn/ui と Radix UI の選定理由

**なぜ shadcn/ui を選んだのか:**

1. **コピー&ペースト方式**: npm パッケージではなく、コードをプロジェクトにコピー
   - カスタマイズが容易
   - バンドルサイズを最小化
   - 依存関係の問題が少ない

2. **Radix UI ベース**: アクセシビリティが標準で組み込まれている
   - ARIA 属性が自動的に付与
   - キーボードナビゲーション対応
   - スクリーンリーダー対応

3. **Tailwind CSS との統合**: スタイリングが直感的

**自動的に提供される機能:**
- ESC キーで閉じる
- フォーカストラップ（ダイアログ内でのみフォーカス移動）
- 背景のスクロール防止
- ARIA 属性（`role="alertdialog"`, `aria-labelledby` など）

#### レスポンシブデザインの実装

**モバイルファーストアプローチ:**
```typescript
// デフォルトはモバイル向け
<div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
  {/* モバイル: 1列、デスクトップ: 10列グリッド */}
  <div className="lg:col-span-6">
    {/* メインコンテンツ */}
  </div>
  
  <div className="hidden lg:block lg:col-span-4">
    {/* サイドバー: モバイルでは非表示 */}
  </div>
</div>
```

**Tailwind のブレークポイント:**
- デフォルト: `0px` 〜（モバイル）
- `sm:`: `640px` 〜
- `md:`: `768px` 〜
- `lg:`: `1024px` 〜（デスクトップ）
- `xl:`: `1280px` 〜
- `2xl:`: `1536px` 〜

#### ダークモード実装

**next-themes による実装:**
```typescript
// src/app/layout.tsx
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**`suppressHydrationWarning` が必要な理由:**
- サーバーサイドでは `theme` が不明
- クライアントサイドで `theme` が決定
- HTML の `class` 属性が変わるため、警告が出る
- `suppressHydrationWarning` で警告を抑制

### 7. パフォーマンス最適化の実践

#### 動的インポートによるコード分割

**問題:**
`CreatePost` コンポーネントで `createPost` 関数をインポートすると、そのファイルのすべての依存関係がバンドルに含まれる。

**解決策:**
```typescript
// ❌ 静的インポート（バンドルサイズ増加）
import { createPost } from "@/actions/post.action";

const handleSubmit = async () => {
  await createPost(content, imageUrl);
};

// ✅ 動的インポート（必要な時だけロード）
const handleSubmit = async () => {
  const { createPost } = await import("@/actions/post.action");
  await createPost(content, imageUrl);
};
```

**効果:**
- 初期バンドルサイズが小さくなる
- 投稿ボタンをクリックした時だけコードをロード
- ページの初期表示が高速化

#### データベースクエリの最適化

**1. 必要なフィールドのみ取得:**
```typescript
// ❌ すべてのフィールドを取得（遅い）
const user = await prisma.user.findUnique({
  where: { clerkId }
});

// ✅ 必要なフィールドのみ取得（速い）
const user = await prisma.user.findUnique({
  where: { clerkId },
  select: {
    id: true,
    name: true,
    username: true,
    image: true
  }
});
```

**2. `orderBy` と `include` の順序:**
```typescript
const posts = await prisma.post.findMany({
  where: { authorId: userId },
  include: { author: true, comments: true },
  orderBy: { createdAt: "desc" },  // 最後に並び替え
});
```

**データベースでの実行順序:**
1. `where` でフィルタリング
2. `include` でJOIN
3. `orderBy` でソート
4. クライアントに返す

### 8. 実際に遭遇した問題と解決プロセス

#### 問題1: プロフィールページが404エラー

**症状:**
`/profile/oarkaiw6211` にアクセスすると 404 Not Found

**デバッグプロセス:**
1. ターミナルログを確認 → `GET /profile/oarkaiw6211 404`
2. フォルダ構造を確認 → `src/app/profile/username/page.tsx`
3. Next.js のドキュメントで動的ルーティングを確認
4. フォルダ名を `[username]` に変更

**学び:**
- Next.js の規約を理解する重要性
- エラーログから問題を特定する方法

#### 問題2: params が undefined になる

**症状:**
```
Error: Route "/profile/[username]" used `params.username`. 
`params` is a Promise and must be unwrapped with `await`
```

**デバッグプロセス:**
1. エラーメッセージを読む → `params` が Promise
2. Next.js 15 のリリースノートを確認
3. 破壊的変更を発見
4. `params` の型を `Promise<{username: string}>` に変更
5. `await params` で解決

**学び:**
- エラーメッセージは重要なヒント
- フレームワークのアップデートには破壊的変更がある
- 公式ドキュメントを確認する習慣

#### 問題3: 投稿が表示されない

**症状:**
投稿を作成しても、プロフィールページの Posts タブに表示されない

**デバッグプロセス:**
1. `console.log` でデータを確認
   ```typescript
   console.log("posts:", posts);
   console.log("posts.length:", posts.length);
   ```
2. サーバーログ: `posts.length: 0`
3. データベースを Prisma Studio で確認 → 投稿は存在する
4. ユーザーIDを確認 → 投稿の `authorId` とプロフィールの `userId` が一致
5. キャッシュの問題を疑う
6. `revalidatePath` を確認 → `/` のみ再検証
7. `revalidatePath("/", "layout")` に変更 → 解決！

**学び:**
- 段階的なデバッグの重要性
- キャッシュは便利だが、適切な無効化が必要
- `revalidatePath` のスコープを理解する

#### 問題4: 投稿作成が動かない

**症状:**
投稿ボタンをクリックしても何も起こらない

**デバッグプロセス:**
1. ブラウザの Network タブを確認 → リクエストが送信されていない
2. `CreatePost.tsx` のコードを確認
3. `handleSubmit` 関数を発見:
   ```typescript
   // TODO: Implement post creation logic here
   // const result = await createPost(content, imageUrl);
   ```
4. TODO コメントを実装に置き換え → 解決！

**学び:**
- コードレビューの重要性
- TODO コメントは忘れずに実装する
- 機能が動かない時は、まずコードを確認

### 10. 開発ワークフローと生産性向上

#### 開発環境のセットアップ

**使用したツール:**
1. **Prisma Studio**: データベースの可視化
   ```bash
   npx prisma studio
   ```
   - GUI でデータを確認・編集
   - リレーションを視覚的に理解

2. **React DevTools**: コンポーネントのデバッグ
   - Props の確認
   - State の変更を追跡

3. **ブラウザ DevTools**:
   - Network タブ: API リクエストの確認
   - Console タブ: ログの確認
   - Application タブ: LocalStorage, Cookies の確認

#### Hot Reload による高速開発

**Next.js の Hot Reload:**
- ファイルを保存すると自動的にブラウザが更新
- Server Components も自動的に再レンダリング
- 開発サーバーを再起動する必要がない

**効果:**
- 変更を即座に確認できる
- 開発サイクルが高速化
- フィードバックループが短くなる

#### TypeScript による型チェック

**コンパイル時エラー検出:**
```typescript
// ❌ 型エラー（コンパイル時に検出）
const user: User = {
  id: "123",
  name: "John",
  // email が足りない！
};

// ✅ 正しい
const user: User = {
  id: "123",
  name: "John",
  email: "john@example.com"
};
```

**実行時エラーを防ぐ:**
- 型チェックにより、実行前にエラーを発見
- リファクタリングが安全に行える
- IDE の補完機能が強力になる

---

## 🎯 今後の改善予定

### 機能追加
- [ ] **画像アップロード機能**
  - Cloudinary または AWS S3 との統合
  - 画像の圧縮・リサイズ
  - プログレスバー表示

- [ ] **リアルタイムチャット機能**
  - WebSocket または Server-Sent Events
  - オンライン状態の表示
  - 既読・未読の管理

- [ ] **投稿の検索機能**
  - 全文検索（PostgreSQL の `tsvector`）
  - ハッシュタグ検索
  - ユーザー検索

- [ ] **ハッシュタグ機能**
  - `#tag` の自動検出
  - ハッシュタグページ
  - トレンドハッシュタグ

- [ ] **ユーザーブロック機能**
  - ブロックリストの管理
  - ブロックされたユーザーの投稿を非表示

- [ ] **投稿の編集機能**
  - 編集履歴の保存
  - 編集済みマークの表示

### テスト
- [ ] **E2E テスト（Playwright）**
  - ユーザーフロー全体のテスト
  - クロスブラウザテスト

- [ ] **ユニットテスト（Jest/Vitest）**
  - Server Actions のテスト
  - コンポーネントのテスト

### パフォーマンス
- [ ] **画像の最適化**
  - Next.js Image コンポーネントの活用
  - WebP フォーマット対応

- [ ] **無限スクロール**
  - Intersection Observer API
  - ページネーション

- [ ] **キャッシュ戦略の改善**
  - Redis によるセッションキャッシュ
  - CDN の活用
