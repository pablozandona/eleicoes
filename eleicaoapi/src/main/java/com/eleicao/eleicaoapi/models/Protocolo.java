package com.eleicao.eleicaoapi.models;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Protocolo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private String numero;

    @ManyToOne
    private Eleicao eleicao;

    @ManyToOne
    private Eleitor eleitor;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Eleicao getEleicao() {
        return eleicao;
    }

    public void setEleicao(Eleicao eleicao) {
        this.eleicao = eleicao;
    }

    public Eleitor getEleitor() {
        return eleitor;
    }

    public void setEleitor(Eleitor eleitor) {
        this.eleitor = eleitor;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }
}
