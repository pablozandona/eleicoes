package com.eleicao.eleicaoapi.resources;

import com.eleicao.eleicaoapi.models.Foto;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import com.eleicao.eleicaoapi.models.Candidato;
import com.eleicao.eleicaoapi.repository.CandidatoRepository;
import com.eleicao.eleicaoapi.services.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(value = "/api/candidatos")
public class CandidatoResource {

    @Autowired
    CandidatoRepository candidatoRepository;

    @Autowired
    private StorageService storageService;

    @GetMapping("")
    public List<Candidato> list() {
        return candidatoRepository.findAll(Sort.by(Sort.Direction.ASC, "nome"));
    }

    @GetMapping("/{id}")
    public Candidato get(@PathVariable(value = "id") long id) {
        return candidatoRepository.findById(id);
    }

    @PostMapping("/criar")
    public Candidato criar(@RequestBody Candidato candidato) {
        return candidatoRepository.save(candidato);
    }

    @DeleteMapping("/{id}")
    public void remover(@PathVariable(value = "id") long id) {
        candidatoRepository.deleteById(id);
    }

    @PutMapping("/editar")
    public Candidato editar(@RequestBody Candidato candidato) {
        return candidatoRepository.save(candidato);
    }

    @PostMapping("/salvarFoto")
    public String uploadFile(@RequestParam("foto") MultipartFile file) {
        Foto foto = storageService.storeFile(file);
        return foto.getId();
    }

    @GetMapping("/foto/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileId) {
        Foto foto = storageService.getFoto(fileId);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(foto.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + foto.getFileName() + "\"")
                .body(new ByteArrayResource(foto.getData()));
    }


}
