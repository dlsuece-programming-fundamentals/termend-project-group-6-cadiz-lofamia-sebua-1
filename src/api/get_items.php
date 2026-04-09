<?php
header('Content-Type: application/json');
require_once __DIR__ . '/config.php';

try {
    $stmt = $pdo->query("SELECT id, name, price, stock FROM items ORDER BY name ASC");
    $items = $stmt->fetchAll();
    echo json_encode(['success' => true, 'items' => $items]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>