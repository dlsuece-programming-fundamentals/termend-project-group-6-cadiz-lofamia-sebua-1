<?php
header('Content-Type: application/json');
require_once __DIR__ . '/config.php';

try {
    // We join transactions with utang/customers to get the name if it's an utang sale
    $query = "
        SELECT t.*, c.name as customer_name 
        FROM transactions t 
        LEFT JOIN utang u ON t.id = u.transaction_id 
        LEFT JOIN customers c ON u.customer_id = c.id 
        ORDER BY t.created_at DESC
    ";
    
    $stmt = $pdo->query($query);
    $transactions = $stmt->fetchAll();

    echo json_encode(['success' => true, 'transactions' => $transactions]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>