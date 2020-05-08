package com.eleicao.eleicaoapi.repository;

import com.eleicao.eleicaoapi.dto.Relatorio;
import com.eleicao.eleicaoapi.dto.ResultadoVotacao;
import com.eleicao.eleicaoapi.dto.Votacao;
import com.eleicao.eleicaoapi.models.Candidato;
import com.eleicao.eleicaoapi.models.Eleicao;
import com.eleicao.eleicaoapi.models.Eleitor;
import com.eleicao.eleicaoapi.models.Protocolo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProtocoloRepository extends JpaRepository<Protocolo, Long> {

    Protocolo findByEleicaoAndEleitor(Eleicao eleicao, Eleitor eleitor);
    long countAllByEleicao(Eleicao eleicao);

}
