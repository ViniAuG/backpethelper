CREATE TABLE cliente (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE empresa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    cnpj VARCHAR(20) NOT NULL,
    endereco VARCHAR(255) NOT NULL
);

CREATE TABLE agendamento (
    id INT PRIMARY KEY AUTO_INCREMENT,
    data DATE NOT NULL,
    cliente_id INT NOT NULL,
    empresa_id INT NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (empresa_id) REFERENCES empresa(id)
);