<? php

require_once 'config.php';
 
try {
    $stmt = $pdo->query('SELECT id, name, price, stock FROM items WHERE stock > 0 ORDER BY name ASC');
    $items = $stmt->fetchAll();
    echo json_encode(['success' => true, 'items' => $items]);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
 
