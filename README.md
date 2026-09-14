# 5つで1週間の献立

スマートフォン向けの、1週間の夕食献立を提案するWebアプリです。

## 完成画面をプレビューする

### GitHub Pages

`main` ブランチへ反映すると、同梱のGitHub Actionsが自動でGitHub Pagesへ公開します。
リポジトリの **Settings → Pages → Build and deployment → Source** で
**GitHub Actions** を選択してください。公開後のURLはActionsの `Deploy to GitHub Pages`
ジョブ、またはリポジトリ右側の **Deployments** から開けます。

公開URLの末尾へ `?preview=1` を付けると、5,000円コースの献立まで展開した
完成状態を直接確認できます。

```text
https://<ユーザー名>.github.io/<リポジトリ名>/?preview=1
```

### パソコンで確認する

このフォルダーで次のコマンドを実行し、ブラウザで
<http://localhost:8000/?preview=1> を開いてください。

```bash
python3 -m http.server 8000
```

通常の操作開始画面は <http://localhost:8000/> で確認できます。

