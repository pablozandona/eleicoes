package com.eleicao.eleicaoapi.dto;

import java.util.HashMap;

public class Votacao {

    private String cpf;
    private long eleicaoId;
    private HashMap<Integer, Integer> votados;

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public long getEleicaoId() {
        return eleicaoId;
    }

    public void setEleicaoId(long eleicaoId) {
        this.eleicaoId = eleicaoId;
    }

    public HashMap<Integer, Integer> getVotados() {
        return votados;
    }

    public void setVotados(HashMap<Integer, Integer> votados) {
        this.votados = votados;
    }
}
