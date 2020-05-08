package com.eleicao.eleicaoapi.dto;

import com.eleicao.eleicaoapi.models.Candidato;
import com.eleicao.eleicaoapi.models.Cargo;

import java.util.List;

public class CargoCandidatos {

    private long id;
    private String nome;
    private List<Candidato> candidatos;

    public CargoCandidatos (Cargo c) {
        this.id = c.getId();
        this.nome = c.getNome();
    }

    public List<Candidato> getCandidatos() {
        return candidatos;
    }

    public void setCandidatos(List<Candidato> candidatos) {
        this.candidatos = candidatos;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}
