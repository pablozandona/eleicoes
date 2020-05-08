package com.eleicao.eleicaoapi.dto;

import com.eleicao.eleicaoapi.utils.SituacaoEleicao;

import javax.persistence.Transient;
import java.util.List;

public class Relatorio {

    private SituacaoEleicao situacao;
    private List<ResultadoVotacao> votacao;
    private long quantidadeEleitores;

    public List<ResultadoVotacao> getVotacao() {
        return votacao;
    }

    public void setVotacao(List<ResultadoVotacao> votacao) {
        this.votacao = votacao;
    }

    public long getQuantidadeEleitores() {
        return quantidadeEleitores;
    }

    public void setQuantidadeEleitores(long quantidadeEleitores) {
        this.quantidadeEleitores = quantidadeEleitores;
    }

    public SituacaoEleicao getSituacao() {
        return situacao;
    }

    public void setSituacao(SituacaoEleicao situacao) {
        this.situacao = situacao;
    }
}
