package com.eleicao.eleicaoapi.models;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Eleitor implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String cpf;

    public long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public Eleitor setNome(String nome) {
        this.nome = nome;
        return this;
    }

    public String getCpf() {
        return cpf;
    }

    public Eleitor setCpf(String cpf) {
        this.cpf = cpf;
        return this;
    }

}
