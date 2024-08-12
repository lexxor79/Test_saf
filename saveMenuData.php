<?php
$data = json_decode(file_get_contents('php://input'), true);

if (json_last_error() === JSON_ERROR_NONE) {
    $jsonFile = 'menuData.json';
    if (file_put_contents($jsonFile, json_encode($data, JSON_PRETTY_PRINT))) {
        http_response_code(200);
        echo json_encode(['message' => 'Données enregistrées avec succès']);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Erreur lors de l\'enregistrement des données']);
    }
} else {
    http_response_code(400);
    echo json_encode(['message' => 'Données JSON invalides']);
}
?>
