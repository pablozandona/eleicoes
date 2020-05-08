package com.eleicao.eleicaoapi.repository;

import com.eleicao.eleicaoapi.dto.ResultadoVotacao;
import com.eleicao.eleicaoapi.models.Eleicao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface EleicaoRepository extends JpaRepository<Eleicao, Long> {

    Eleicao findById(long id);
    void deleteById(long id);

    @Query("select a from Eleicao a where CURRENT_TIMESTAMP between a.dataInicio and a.dataFim")
    List<Eleicao> findAllByDate();

    @Query(value = "SELECT count(v.id) AS quantidadeVotos, cargo.nome AS cargoNome, cargo.id AS cargoId, c.nome AS candidatoNome " +
            " FROM Voto v" +
            " LEFT JOIN candidato c ON c.id = v.candidato_id" +
            " LEFT JOIN cargo ON cargo.id = c.cargo_id" +
            " LEFT JOIN eleicao_cargos ec ON ec.cargos_id = cargo.id" +
            " LEFT JOIN eleicao e ON e.id = ec.eleicao_id"  +
            " WHERE e.id = :eleicao" +
            " GROUP BY Cargo.id, c.id" +
            " ORDER BY quantidadeVotos DESC, cargoNome", nativeQuery = true)
    List<ResultadoVotacao> relatorio(Eleicao eleicao);

}
