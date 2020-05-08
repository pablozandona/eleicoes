package com.eleicao.eleicaoapi.repository;

import com.eleicao.eleicaoapi.models.Cargo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CargoRepository extends JpaRepository<Cargo, Long> {

    Cargo findById(long id);
    void deleteById(long id);

}
