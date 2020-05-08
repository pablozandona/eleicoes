package com.eleicao.eleicaoapi.resources;

import com.eleicao.eleicaoapi.models.Cargo;
import com.eleicao.eleicaoapi.repository.CargoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/cargos")
public class CargoResource {

    @Autowired
    CargoRepository cargoRepository;

    @GetMapping("")
    public List<Cargo> list() {
        return cargoRepository.findAll(Sort.by(Sort.Direction.ASC, "nome"));
    }

    @GetMapping("/{id}")
    public Cargo get(@PathVariable(value = "id") long id) {
        return cargoRepository.findById(id);
    }

    @PostMapping("/criar")
    public Cargo criar(@RequestBody Cargo cargo) {
        return cargoRepository.save(cargo);
    }

    @DeleteMapping("/{id}")
    public void remover(@PathVariable(value = "id") long id) {
        cargoRepository.deleteById(id);
    }

    @PutMapping("/editar")
    public Cargo editar(@RequestBody Cargo cargo) {
        return cargoRepository.save(cargo);
    }

}
