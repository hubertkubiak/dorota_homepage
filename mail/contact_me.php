<?php
// Contact form handler – responds with HTTP status codes so the front end
// can tell success (200) from validation (422) and delivery (500) errors.

const RECIPIENT = 'hubkub@wp.pl';          // where messages are delivered
const SENDER    = 'noreply@yourdomain.com'; // "From" address – use a domain you own

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    exit;
}

$field = static fn(string $key): string => trim(strip_tags($_POST[$key] ?? ''));

$name    = $field('name');
$email   = $field('email');
$phone   = $field('phone');
$message = $field('message');

if ($name === '' || $phone === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo 'Proszę uzupełnić wszystkie pola!';
    exit;
}

// Prevent header injection through the name field
$name = str_replace(["\r", "\n"], ' ', $name);

$subject = '=?UTF-8?B?' . base64_encode("Wiadomość od: $name") . '?=';
$body = "Otrzymałaś/eś nową wiadomość ze swojej strony internetowej.\n\n"
      . "Imię: $name\n"
      . "Email: $email\n"
      . "Telefon: $phone\n\n"
      . "Wiadomość:\n$message\n";
$headers = implode("\r\n", [
    'From: ' . SENDER,
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
]);

if (!mail(RECIPIENT, $subject, $body, $headers)) {
    http_response_code(500);
    exit;
}

http_response_code(200);
echo 'OK';
