## これはNEXT.js + Vercel Postgresで作った、cheats sheet参照アプリ

   日々の作業で、コピペするコマンドやコーディング例、ハマりポイントなどを技術スタック別に記述していく。

   主目的は、生産性を高めるためにコピペする参考をすぐに探す事で、ナレッジの蓄積は二の次。

   現状は vercel にデプロイしてある : https://cheats-rosy.vercel.app/

   最終的には、ユーザー別でナレッジやチートを登録し、それを複数ユーザーが共有し、他人の良いところを学ぶ（パクる）土台にできれば・・・・

   次は、表示をマークダウンに対応したいな。

   https://qiita.com/kaho_eng/items/0bc1c10d2e824be9c2b2

   が参考になるか？

## セットアップ

### 環境変数の設定

プロジェクトルートに `.env.local` ファイルを作成し、以下の環境変数を設定してください：

```
POSTGRES_URL="postgresql://user:password@host:port/database?sslmode=require"
```

Vercel Postgresを使用している場合、Vercelダッシュボードの「Storage」→「Postgres」→「.env.local」から接続文字列を取得できます。