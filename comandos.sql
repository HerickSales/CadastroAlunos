CREATE TABLE ALUNO (
    CODIGO INTEGER NOT NULL,
    NOME VARCHAR(50) NOT NULL,
    CR NUMERIC(10, 3) NOT NULL
);


CREATE SEQUENCE SEQ_ID_ALUNO;


SET TERM ^ ;

CREATE TRIGGER T_ALUNO_GEN_ID_BI
 ACTIVE
 BEFORE INSERT
 POSITION 1
  ON ALUNO
AS
begin
    IF(NEW.CODIGO IS NULL) THEN 
    NEW.CODIGO = GEN_ID(SEQ_ID_ALUNO, 1);
END^

SET TERM ; ^
