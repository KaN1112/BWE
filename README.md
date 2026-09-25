# Bedrock WorldEdit 公式配布サイト

Bedrock WorldEdit (BWE) v0.3.0の一般公開・配布用静的サイトです。HTML、CSS、Vanilla JavaScriptだけで構成され、ビルドせずGitHub Pagesへ公開できます。

## ローカルで確認する

`index.html` を直接開くか、このフォルダでローカルHTTPサーバーを起動します。

```powershell
python -m http.server 8000
```

ブラウザで `http://localhost:8000/` を開いてください。

## GitHubへアップロードする

1. GitHubで空のリポジトリを作成します。
2. この `website` フォルダ内のファイルをリポジトリ直下へ配置します。
3. `index.html`、`assets`、`downloads`、`docs`、`404.html` などをcommitしてpushします。

サイト本文にはGitHubへのリンクを掲載していません。公開先としてGitHub Pagesを利用するだけの構成です。

## GitHub Pagesで公開する

1. リポジトリの **Settings** を開きます。
2. 左側の **Pages** を開きます。
3. **Build and deployment** のSourceを **Deploy from a branch** にします。
4. Branchで公開対象ブランチ（通常は `main`）と `/(root)` を選び、保存します。
5. 数分待ち、Pages画面に表示される公開URLを開きます。

すべてのCSS、JavaScript、favicon、ダウンロードファイルは相対パスで参照しているため、`https://ユーザー名.github.io/リポジトリ名/` の形式でも動作します。

## mcpackを更新する

1. 新しい `.mcpack` を `downloads/` にコピーします。
2. `index.html` 内のダウンロードリンク、バージョン、ファイルサイズを更新します。
3. `assets/js/main.js` にバージョン固定値はありません。
4. `docs/commands.md` とサイト本文の仕様を新しいアドオンに合わせます。

現在のファイルは `downloads/BedrockWorldEdit-0.3.0.mcpack` です。

## バージョン更新箇所

- `index.html`：タイトル、ダウンロードボタン、対応環境、Roadmap、FAQ
- `downloads/`：配布するmcpack
- `docs/commands.md`：コマンド仕様
- `README.md`：この説明と現在のファイル名

## GitHub URLについて

サイト内にGitHubリンクは置かない方針のため、URL設定項目はありません。将来リンクを掲載する場合だけ、`index.html` のナビゲーションまたはフッターへ追加してください。

## ディレクトリ構成

```text
website/
├─ index.html
├─ 404.html
├─ README.md
├─ LICENSE
├─ assets/
│  ├─ css/style.css
│  ├─ js/main.js
│  ├─ icons/favicon.svg
│  └─ images/.gitkeep
├─ downloads/
│  ├─ BedrockWorldEdit-0.3.0.mcpack
│  └─ README.md
└─ docs/commands.md
```

## ライセンスと表記

サイトコードはMIT Licenseです。Minecraft公式テクスチャ、Mojangのロゴ、第三者WorldEditのコード・ロゴ・アセットは使用していません。
