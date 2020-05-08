package com.eleicao.eleicaoapi.models;

import com.eleicao.eleicaoapi.utils.SituacaoEleicao;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Calendar;
import java.util.List;

@Entity
public class Eleicao implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Calendar dataInicio;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Calendar dataFim;

    @ManyToMany()
    private List<Cargo> cargos;

    @Transient
    private SituacaoEleicao situacao;

    public Calendar getDataInicio() {
        return dataInicio;
    }

    public Eleicao setDataInicio(Calendar dataInicio) {
        this.dataInicio = dataInicio;
        return this;
    }

    public Calendar getDataFim() {
        return dataFim;
    }

    public Eleicao setDataFim(Calendar dataFim) {
        this.dataFim = dataFim;
        return this;
    }

    public long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public List<Cargo> getCargos() {
        return cargos;
    }

    public void setCargos(List<Cargo> cargos) {
        this.cargos = cargos;
    }

    public SituacaoEleicao getSituacao() {
        return situacao;
    }

    public void setSituacao(SituacaoEleicao situacao) {
        this.situacao = situacao;
    }
}
