<!DOCTYPE html>
<html>	
<head>
	<title>digiOmega</title>
	
    <!-- Standard Favicon -->
    <link rel="icon" type="image/x-icon" href="images//favicon.ico" />

</head>
    

<?php
error_reporting(0);

// Create map with request parameters
$params = array ('secret' => '6Ld4i2UUAAAAAJx4DDBDxtHeQCfunoiDehUBKCdB', 'response'=>$_POST['g-recaptcha-response']);
 
// Build Http query using params
$query = http_build_query ($params);
 
// Create Http context details
$contextData = array ( 
                'method' => 'POST',
                'header' => "Connection: close\r\n".
                            "Content-Length: ".strlen($query)."\r\n",
                'content'=> $query,
                'Content-Type'=> 'application/x-www-form-urlencoded' 

                 );
 
// Create context resource for our request
$context = stream_context_create (array ( 'http' => $contextData ));
 
// Read page rendered as result of your POST request
$result =  file_get_contents (
                  'https://www.google.com/recaptcha/api/siteverify',  // page url
                  false,
                  $context);
 
// Server response is now stored in $result variable so you can process it

$dres=json_decode($result);
$anum=(array)$dres;

$to=$_POST['company-email'];
$cmpname=$_POST['company-name'];
$cmpadd=$_POST['company-address'];
$requirement=$_POST['requirement'];
if (empty($to) or empty($cmpname) or empty($cmpadd) or empty($requirement)  )
{
	?>
	<h3 style="text-align: center;color: black;">Please provide complete details in contact form</h3>
<?php
}
elseif($anum['success'])  {


require_once('PHPmailer/PHPMailerAutoload.php');

$mail=new PHPMailer();
$mail->isSMTP();
$mail->SMTPAuth='true';
$mail->SMTPSecure='ssl';
$mail->Host="smtp.gmail.com";
$mail->Port='465';
$mail->isHTML();
$mail->Username="digiomega5@gmail.com";
$mail->Password='qwertypoiu';
$mail->SetFrom('query@digiomega.info');
$mail->FromName='digiOmega Solutions';
$mail->AddReplyTo("query@digiomega.info", "Replies");
$mail->AddEmbeddedImage('images/logo.png', 'logoimg', 'logo.png'); // attach file logo.jpg, and later link to it using identfier logoimg

$mail->Subject="Thanks for your interest in digiOmega Digital Solutions";
$mail->Body="<img src=\"cid:logoimg\" /> <br><br><br> Welcome " .$cmpname. " to digiOmega digital marketing agency. <br> <br>We will reach out to you and help you create great digital experience for your customers at " .$cmpadd. ". <br><br>Your Requirement:".$requirement.".";
$mail->AddAddress($to);
$mail->AddAddress('priyanka@digiomega.info');
$mail->AddAddress('njaiswal@digiomega.info');



$mail->Send();
?>
<h3 style="text-align: center;color: black;">Thanks for reaching out to us. We will contact at <?php echo $_POST['company-email']; ?></h3>
<?php
}else
{

?>
	<h3 style="text-align: center;color: black;">Please select captcha to prove human touch</h3>
<?php
	}


require('index.html');

 ?>
 </html>
