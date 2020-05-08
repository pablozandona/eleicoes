package com.eleicao.eleicaoapi.repository;

import com.eleicao.eleicaoapi.models.Eleicao;
import com.eleicao.eleicaoapi.models.Eleitor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EleitorRepository extends JpaRepository<Eleitor, Long> {

    Eleitor findById(long id);
    void deleteById(long id);
    Eleitor findByCpf(String cpf);

}
