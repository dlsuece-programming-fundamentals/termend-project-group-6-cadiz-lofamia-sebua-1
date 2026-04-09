<?php
header('Content-Type: application/json');
require_once __DIR__ . '/config.php';

try {
    // We use LEFT JOIN so transactions show up even if they don't have items or utang records
    $query = "
        SELECT 
            t.id, 
            t.type, 
            t.total_amount, 
            t.created_at,
            c.name as customer_name,
            u.status as utang_status,
            GROUP_CONCAT(CONCAT(i.name, ' (x', ti.quantity, ')') SEPARATOR ', ') as item_list
        FROM transactions t 
        LEFT JOIN transaction_items ti ON t.id = ti.transaction_id
        LEFT JOIN items i ON ti.item_id = i.id
        LEFT JOIN utang u ON t.id = u.transaction_id 
        LEFT JOIN customers c ON u.customer_id = c.id 
        GROUP BY t.id
        ORDER BY t.created_at DESC
    ";
    
    $stmt = $pdo->query($query);
    $transactions = $stmt->fetchAll();

    echo json_encode(['success' => true, 'transactions' => $transactions]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}