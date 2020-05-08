package com.eleicao.eleicaoapi.repository;

import com.eleicao.eleicaoapi.models.Voto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VotoRepository extends JpaRepository<Voto, Long> {

}
