<?php
header('Content-Type: application/json');
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    echo json_encode(['success' => false, 'error' => 'Invalid JSON payload']);
    exit;
}

$type          = isset($input['type']) ? trim($input['type']) : '';
$customer_name = isset($input['customer_name']) ? trim($input['customer_name']) : '';
$items         = isset($input['items']) ? $input['items'] : [];

if (!in_array($type, ['cash', 'utang'])) {
    echo json_encode(['success' => false, 'error' => 'Invalid sale type']);
    exit;
}
if ($type === 'utang' && $customer_name === '') {
    echo json_encode(['success' => false, 'error' => 'Customer name is required for credit/utang']);
    exit;
}
if (empty($items)) {
    echo json_encode(['success' => false, 'error' => 'No items in sale']);
    exit;
}

try {
    $pdo->beginTransaction();

    // 1. Calculate total & validate stock
    $total = 0;
    foreach ($items as $item) {
        $item_id  = (int) $item['item_id'];
        $quantity = (int) $item['quantity'];
        $price    = (float) $item['price'];

        $stmt = $pdo->prepare("SELECT stock FROM items WHERE id = ?");
        $stmt->execute([$item_id]);
        $row = $stmt->fetch();

        if (!$row) {
            throw new Exception("Item ID $item_id not found");
        }
        if ($row['stock'] < $quantity) {
            throw new Exception("Not enough stock for item ID $item_id");
        }

        $total += $price * $quantity;
    }

    // 2. Insert transaction
    $stmt = $pdo->prepare("INSERT INTO transactions (type, total_amount, created_at) VALUES (?, ?, NOW())");
    $stmt->execute([$type, $total]);
    $transaction_id = $pdo->lastInsertId();

    // 3. Insert transaction items & deduct stock
    foreach ($items as $item) {
        $item_id  = (int) $item['item_id'];
        $quantity = (int) $item['quantity'];
        $price    = (float) $item['price'];

        $stmt = $pdo->prepare("INSERT INTO transaction_items (transaction_id, item_id, quantity, price) VALUES (?, ?, ?, ?)");
        $stmt->execute([$transaction_id, $item_id, $quantity, $price]);

        $stmt = $pdo->prepare("UPDATE items SET stock = stock - ? WHERE id = ?");
        $stmt->execute([$quantity, $item_id]);
    }

    // 4. Handle utang
    if ($type === 'utang') {
        $stmt = $pdo->prepare("SELECT id FROM customers WHERE name = ? LIMIT 1");
        $stmt->execute([$customer_name]);
        $customer = $stmt->fetch();

        if ($customer) {
            $customer_id = $customer['id'];
        } else {
            $stmt = $pdo->prepare("INSERT INTO customers (name, created_at) VALUES (?, NOW())");
            $stmt->execute([$customer_name]);
            $customer_id = $pdo->lastInsertId();
        }

        $stmt = $pdo->prepare("INSERT INTO utang (customer_id, transaction_id, amount, status) VALUES (?, ?, ?, 'unpaid')");
        $stmt->execute([$customer_id, $transaction_id, $total]);
    }

    $pdo->commit();
    echo json_encode(['success' => true, 'transaction_id' => $transaction_id, 'total' => $total]);

} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>