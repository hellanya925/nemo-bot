<?php
function emptyDir(string $dir)
{
    $files = scandir($dir);
    for ($i = 0; $i < sizeof($files); $i++) {
        if ($files[$i] == '.' || $files[$i] == '..') {
            continue;
        }
        if (filetype($dir . '/' . $files[$i]) == 'dir') {
            emptyDir($dir . '/' . $files[$i]);
        } else if (filetype($dir . '/' . $files[$i]) == 'file') {
            unlink($dir . '/' . $files[$i]) or die('error:' . error_get_last()['message']);
        }
    }
    rmdir($dir);
}
if (isset($_GET['install'])) {
    if (is_dir('../Nemo')) {
        emptyDir('../Nemo');
    }
    mkdir('../Nemo');
    mkdir('../Nemo/scripts');
    mkdir('../Nemo/style');
    // copy Nemo.js
    $file = fopen('./NemoFiles/Nemo.js','r');
    $data = fread($file,filesize('./NemoFiles/Nemo.js'));
    fclose($file);
    $file = fopen('../Nemo/scripts/Nemo.js','w');
    fwrite($file,$data);
    fclose($file);
    // copy WordProcessor.js
    $file = fopen('./NemoFiles/WordProcessor.js','r');
    $data = fread($file,filesize('./NemoFiles/WordProcessor.js'));
    fclose($file);
    $file = fopen('../Nemo/scripts/WordProcessor.js','w');
    fwrite($file,$data);
    fclose($file);
    // copy nemo.css
    $file = fopen('./NemoFiles/nemo.css','r');
    $data = fread($file,filesize('./NemoFiles/nemo.css'));
    fclose($file);
    $file = fopen('../Nemo/style/nemo.css','w');
    fwrite($file,$data);
    fclose($file);

    $filename = $_GET['filename'];
    $botname = $_GET['botname'];
    $position = $_GET['position'];
    $force = $_GET['force'];
    $file = fopen("../$filename", 'r');
    $rawdata = fread($file, filesize("../$filename"));
    fclose($file);
    $doc = new DOMDocument();
    $doc->loadHTML($rawdata);
    $arr = ['Nemostyle', 'Nemoscript', 'wordprocessorscript', 'nemoobjscript'];
    for ($i = 0; $i < sizeof($arr); $i++) {
        $possible = $doc->getElementById($arr[$i]);
        if ($possible != null) {
            if ($force == '1') {
                $possible->parentNode->removeChild($possible);
            } else {
                echo 0;
                exit;
            }
        }
    }

    $headTag = $doc->getElementsByTagName('head')[0];
    $bodyTag = $doc->getElementsByTagName('body')[0];
    $style = $doc->createDocumentFragment();
    $style->appendXML('<link rel="stylesheet" id="Nemostyle" href="./Nemo/style/nemo.css" />');
    $headTag->appendChild($style);
    $script = $doc->createDocumentFragment();
    $script->appendXML('<script id="Nemoscript" src="Nemo/scripts/Nemo.js"></script>');
    $headTag->appendChild($script);
    $script = $doc->createDocumentFragment();
    $script->appendXML('<script id="wordprocessorscript" src="Nemo/scripts/WordProcessor.js"></script>');
    $headTag->appendChild($script);
    $script = $doc->createDocumentFragment();
    $script->appendXML('<script id="nemoobjscript">nemo = new Nemo("' . $botname . '","' . $position . '");</script>');
    $bodyTag->appendChild($script);
    $doc->saveHTMLFile("../$filename");
    $file = fopen('./NemoFiles/nemo.css','w');
    fwrite($file,'');
    fclose($file);
    echo 1;
}
