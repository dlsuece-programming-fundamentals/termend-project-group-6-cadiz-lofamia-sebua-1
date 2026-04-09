<?php
header('Content-Type: application/json');
require_once __DIR__ . '/config.php';

$input = json_decode(file_get_contents('php://input'), true);
$id = (int) $input['id'];
$payment = (float) $input['amount'];

try {
    $stmt = $pdo->prepare("SELECT amount, paid_amount FROM utang WHERE id = ?");
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    $new_paid_total = $row['paid_amount'] + $payment;
    //Determines if it's fully paid or partial
    $status = ($new_paid_total >= $row['amount']) ? 'paid' : 'unpaid';

    //Updates the record
    $stmt = $pdo->prepare("UPDATE utang SET paid_amount = ?, status = ? WHERE id = ?");
    $stmt->execute([$new_paid_total, $status, $id]);

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
