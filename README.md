# chat
### 概要(Description)
WebSocketベースのシンプルなチャットアプリケーションです.  
また、コマンドを入力することでアニメーションを行えます.

### アニメーション
コンゴウインコのイメージのアニメーションを行うことができます.  

### アニメーションデータ
イメージデータは次のデータを使用できますが、現在はJSONファイルでハードコーディングしています.

* JSONファイル(macaw.json)(Default)
* MongoDB
* SQL Server

### コマンド(Chat Command)
特別な意味を持つコマンド

* macaw  
スライドアニメーションを開始します.アニメーションはスライドアイコンごとに配置されます.
* pause  
スライドアニメーションを一旦停止/再開します.
* stop  
スライドアニメーションを完全停止します.

### アイコン(Icon)

* \+  
スライドアイコンを１つ生成します.
* \-  
スライドアイコンを１つ削除します.

