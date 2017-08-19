<?php
  // MySQLへ接続する準備。DB名や認証に必要な情報を格納
  $url = "localhost";
  $user = "user";
  $pass = "password";
  $db = "sample_db";
    
  // MySQLへ接続する
  $connect = mysql_connect($url, $user, $pass) or die("MySQLへの接続に失敗しました。");

  // 手を加えるデータベースを選択する
  $sdb = mysql_select_db($db, $connect) or die("データベースの選択に失敗しました。");
    <?php
  // MySQLへ接続する準備。DB名や認証に必要な情報を格納
  $url = "localhost";
  $user = "user";
  $pass = "password";
  $db = "sample_db";
    
  // MySQLへ接続する
  $connect = mysql_connect($url, $user, $pass) or die("MySQLへの接続に失敗しました。");

  // 手を加えるデータベースを選択する
  $sdb = mysql_select_db($db, $connect) or die("データベースの選択に失敗しました。");
?>