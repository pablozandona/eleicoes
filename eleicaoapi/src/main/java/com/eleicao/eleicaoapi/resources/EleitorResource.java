package com.eleicao.eleicaoapi.resources;

import com.eleicao.eleicaoapi.models.Eleitor;
import com.eleicao.eleicaoapi.repository.EleitorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/eleitores")
public class EleitorResource {

    @Autowired
    EleitorRepository eleitorRepository;

    @PostMapping("/criar")
    public Eleitor criar(@RequestBody Eleitor eleitor) {
        Eleitor eleitorSalvo = eleitorRepository.findByCpf(eleitor.getCpf());
        if (eleitorSalvo != null) {
            return eleitorSalvo;
        }
        return eleitorRepository.save(eleitor);
    }

}
