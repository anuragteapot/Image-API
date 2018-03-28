<?php
 
   $img = $_POST['img'];
   $name = $_POST['name'];
   
   if (strpos($img, 'data:image/png;base64') === 0) {
      $img = str_replace('data:image/png;base64,', '', $img);
      $img = str_replace(' ', '+', $img);
      $data = base64_decode($img);
      $file = '../uploads/'.$name.'.png';
      
      if (file_put_contents($file, $data)) {
         echo 'http://'.$_SERVER['HTTP_HOST'].'/uploads/'.$name.'.png';
      } else {
         echo 'Error';
      }   
   }
 
?>