

CREATE TABLE IF NOT EXISTS provincia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    regione VARCHAR(100) NOT NULL,
    UNIQUE KEY unique_nome (nome)
);
