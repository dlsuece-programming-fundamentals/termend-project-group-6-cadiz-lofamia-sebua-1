<?php
header('Content-Type: application/json');
require_once __DIR__ . '/config.php';

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) { echo json_encode(['success' => false, 'error' => 'Invalid input']); exit; }

$id      = isset($input['id'])     ? (int)   $input['id']     : null;
$payment = isset($input['amount']) ? (float) $input['amount'] : null;

if (!$id)                          { echo json_encode(['success' => false, 'error' => 'Invalid ID']); exit; }
if ($payment === null || $payment <= 0) { echo json_encode(['success' => false, 'error' => 'Invalid payment amount']); exit; }

try {
    // Get current utang record
    $stmt = $pdo->prepare("SELECT amount, paid_amount FROM utang WHERE id = ?");
    $stmt->execute([$id]);
    $row = $stmt->fetch();

    if (!$row) { echo json_encode(['success' => false, 'error' => 'Utang record not found']); exit; }

    $remaining = (float)$row['amount'] - (float)$row['paid_amount'];

    if ($payment > $remaining) {
        echo json_encode(['success' => false, 'error' => 'Payment exceeds remaining balance of ₱' . number_format($remaining, 2)]);
        exit;
    }

    $new_paid_total = (float)$row['paid_amount'] + $payment;
    $status = ($new_paid_total >= (float)$row['amount']) ? 'paid' : 'unpaid';

    $stmt = $pdo->prepare("UPDATE utang SET paid_amount = ?, status = ? WHERE id = ?");
    $stmt->execute([$new_paid_total, $status, $id]);

    echo json_encode([
        'success'        => true,
        'new_paid_total' => $new_paid_total,
        'status'         => $status
    ]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>