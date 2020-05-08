package com.eleicao.eleicaoapi.models;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Voto implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    private Protocolo protocolo;

    @ManyToOne
    private Candidato candidato;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Protocolo getProtocolo() {
        return protocolo;
    }

    public void setProtocolo(Protocolo protocolo) {
        this.protocolo = protocolo;
    }

    public Candidato getCandidato() {
        return candidato;
    }

    public void setCandidato(Candidato candidato) {
        this.candidato = candidato;
    }

}
