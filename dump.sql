CREATE DATABASE dindin;

CREATE TABLE usuarios (
	id SERIAL PRIMARY KEY, 
	nome VARCHAR(255) NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	senha TEXT NOT NULL
);

CREATE TABLE categorias (
	id SERIAL PRIMARY KEY,
	descricao VARCHAR(50) NOT NULL
);

CREATE TABLE transacoes (
	id SERIAL PRIMARY KEY,
	descricao VARCHAR(255) NOT NULL,
	valor INT NOT NULL,
	data DATE DEFAULT NOW(),
	categoria_id INT REFERENCES categorias(id) NOT NULL,
	usuario_id INT REFERENCES usuarios(id) NOT NULL,
	tipo VARCHAR(25) NOT NULL
);

INSERT INTO categorias (descricao) VALUES 
('Alimentação'),
('Assinaturas e Serviços'),
('Casa'),
('Mercado'),
('Cuidados Pessoais'),
('Educação'),
('Família'),
('Lazer'),
('Pets'),
('Presentes'),
('Roupas'),
('Saúde'),
('Transporte'),
('Salário'),
('Vendas'),
('Outras receitas'),
('Outras despesas');