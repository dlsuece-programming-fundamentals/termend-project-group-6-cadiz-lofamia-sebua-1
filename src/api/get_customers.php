<?php
header('Content-Type: application/json');
require_once __DIR__ . '/config.php';

try {
    // Get all customers
    $customers = $pdo->query("SELECT id, name FROM customers ORDER BY name ASC")->fetchAll();

    // For each customer, get their utang records including paid_amount
    $stmt = $pdo->prepare("
        SELECT u.id, u.amount, u.paid_amount, u.status, t.created_at
        FROM utang u
        JOIN transactions t ON t.id = u.transaction_id
        WHERE u.customer_id = ?
        ORDER BY t.created_at DESC
    ");

    foreach ($customers as &$c) {
        $stmt->execute([$c['id']]);
        $c['utangs'] = $stmt->fetchAll();
    }

    echo json_encode(['success' => true, 'customers' => $customers]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>