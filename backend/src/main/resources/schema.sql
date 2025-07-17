

CREATE TABLE IF NOT EXISTS provincia (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  regione VARCHAR(100) NOT NULL,
  CONSTRAINT unique_nome UNIQUE (nome)
);

CREATE TABLE IF NOT EXISTS specie(
     id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    scientific_name VARCHAR(255) NOT NULL,
    rarita INTEGER NOT NULL,
    image_url VARCHAR(255),
    periodo VARCHAR(100),
    descrizione TEXT
)

