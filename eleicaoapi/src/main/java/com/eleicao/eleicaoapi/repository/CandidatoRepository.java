package com.eleicao.eleicaoapi.repository;

import com.eleicao.eleicaoapi.models.Candidato;
import com.eleicao.eleicaoapi.models.Cargo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface CandidatoRepository extends JpaRepository<Candidato, Long> {

    Candidato findById(long id);
    void deleteById(long id);
    List<Candidato> findByCargo(Cargo cargo);

}
