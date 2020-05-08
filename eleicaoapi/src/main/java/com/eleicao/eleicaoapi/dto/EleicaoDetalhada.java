package com.eleicao.eleicaoapi.dto;

import com.eleicao.eleicaoapi.models.Cargo;
import com.eleicao.eleicaoapi.models.Eleicao;
import com.eleicao.eleicaoapi.models.Protocolo;

import java.util.List;

public class EleicaoDetalhada {

    private Eleicao eleicao;
    private Protocolo protocolo;
    private List<CargoCandidatos> cargos;

    public Eleicao getEleicao() {
        return eleicao;
    }

    public void setEleicao(Eleicao eleicao) {
        this.eleicao = eleicao;
    }

    public List<CargoCandidatos> getCargos() {
        return cargos;
    }

    public void setCargos(List<CargoCandidatos> cargos) {
        this.cargos = cargos;
    }

    public Protocolo getProtocolo() {
        return protocolo;
    }

    public void setProtocolo(Protocolo protocolo) {
        this.protocolo = protocolo;
    }

}
