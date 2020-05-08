package com.eleicao.eleicaoapi.dto;

public interface ResultadoVotacao {

    Integer getQuantidadeVotos();
    Long getCargoId();
    String getCargoNome();
    String getCandidatoNome();

}
