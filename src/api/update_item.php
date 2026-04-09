<?php
header('Content-Type: application/json');
require_once __DIR__ . '/config.php';

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) { echo json_encode(['success' => false, 'error' => 'Invalid input']); exit; }

$id    = isset($input['id'])    ? (int)   $input['id']       : null;
$name  = isset($input['name'])  ? trim($input['name'])       : '';
$price = isset($input['price']) ? (float) $input['price']    : null;
$stock = isset($input['stock']) ? (int)   $input['stock']    : null;

if (!$id)               { echo json_encode(['success' => false, 'error' => 'Invalid ID']); exit; }
if ($name === '')        { echo json_encode(['success' => false, 'error' => 'Name is required']); exit; }
if ($price === null || $price < 0) { echo json_encode(['success' => false, 'error' => 'Invalid price']); exit; }
if ($stock === null || $stock < 0) { echo json_encode(['success' => false, 'error' => 'Invalid stock']); exit; }

try {
    $stmt = $pdo->prepare("UPDATE items SET name = ?, price = ?, stock = ? WHERE id = ?");
    $stmt->execute([$name, $price, $stock, $id]);
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>