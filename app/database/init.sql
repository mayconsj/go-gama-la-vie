CREATE TABLE `lavie_db`.`pacientes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `data_nascimento` DATE NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_email` (`email`));

CREATE TABLE `lavie_db`.`psicologos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `apresentacao` VARCHAR(255) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
   PRIMARY KEY (`id`),
   UNIQUE KEY `UK_email` (`email`));
  
  CREATE TABLE `lavie_db`.`atendimentos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data` DATE NOT NULL,
  `observacao` VARCHAR(255),
  `pacientes_id` INT NOT NULL,
  `psicologos_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_atendimentos_pacientes`
    FOREIGN KEY (`pacientes_id`)
    REFERENCES `lavie_db`.`pacientes` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_atendimentos_psicologos1`
    FOREIGN KEY (`psicologos_id`)
    REFERENCES `lavie_db`.`psicologos` (`id`)
    ON DELETE CASCADE);