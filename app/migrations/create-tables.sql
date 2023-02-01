CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    mail VARCHAR(70) NOT NULL,
    code VARCHAR(255)
);

CREATE TABLE companies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    cnpj VARCHAR(20) NOT NULL,
    address VARCHAR(120) NOT NULL
);

CREATE TABLE bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    `date` DATETIME NOT NULL,
    customer_id INT NOT NULL,
    company_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (company_id) REFERENCES companies(id)
);