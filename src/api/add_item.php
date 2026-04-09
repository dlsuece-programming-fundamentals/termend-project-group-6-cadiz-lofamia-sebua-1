<?php
header('Content-Type: application/json');
require_once __DIR__ . '/config.php';

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) { echo json_encode(['success' => false, 'error' => 'Invalid input']); exit; }

$name  = isset($input['name'])  ? trim($input['name'])       : '';
$price = isset($input['price']) ? (float) $input['price']    : null;
$stock = isset($input['stock']) ? (int)   $input['stock']    : null;

if ($name === '')        { echo json_encode(['success' => false, 'error' => 'Name is required']); exit; }
if ($price === null || $price < 0) { echo json_encode(['success' => false, 'error' => 'Invalid price']); exit; }
if ($stock === null || $stock < 0) { echo json_encode(['success' => false, 'error' => 'Invalid stock']); exit; }

try {
    $stmt = $pdo->prepare("INSERT INTO items (name, price, stock, created_at) VALUES (?, ?, ?, NOW())");
    $stmt->execute([$name, $price, $stock]);
    echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>