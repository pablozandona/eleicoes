package com.eleicao.eleicaoapi.resources;

import com.eleicao.eleicaoapi.dto.EleicaoDetalhada;
import com.eleicao.eleicaoapi.dto.Relatorio;
import com.eleicao.eleicaoapi.dto.ResultadoVotacao;
import com.eleicao.eleicaoapi.dto.Votacao;
import com.eleicao.eleicaoapi.models.*;
import com.eleicao.eleicaoapi.repository.*;
import com.eleicao.eleicaoapi.services.EleicoesService;
import com.eleicao.eleicaoapi.utils.SituacaoEleicao;
import com.eleicao.eleicaoapi.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Transient;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "/eleicoes")
public class EleicaoResource {

    @Autowired
    EleicaoRepository eleicaoRepository;
    @Autowired
    EleitorRepository eleitorRepository;
    @Autowired
    VotoRepository votoRepository;
    @Autowired
    CandidatoRepository candidatoRepository;
    @Autowired
    ProtocoloRepository protocoloRepository;
    @Autowired
    EleicoesService eleicoesService;

    @GetMapping("")
    public List<Eleicao> list() {
        List<Eleicao> eleicoes = eleicaoRepository.findAll(Sort.by(Sort.Direction.DESC, "dataInicio"));
        eleicoes.forEach(eleicao -> {
            SituacaoEleicao situacao = eleicoesService.getSituacao(eleicao);
            eleicao.setSituacao(situacao);
        });
        return eleicoes;
    }

    @GetMapping("/disponiveis/{cpf}")
    public List<EleicaoDetalhada> disponiveisAoEleitor(@PathVariable(value = "cpf") String cpf) {

        Eleitor eleitor = eleitorRepository.findByCpf(cpf);

        List<EleicaoDetalhada> eleicoesDetalhadas = new ArrayList<>();
        List<Eleicao> eleicoes = eleicaoRepository.findAllByDate();

        eleicoes.forEach(eleicao -> {
            EleicaoDetalhada eleicaoDetalhada = eleicoesService.comporDetalhamento(eleicao, eleitor);
            eleicoesDetalhadas.add(eleicaoDetalhada);
        });

        return eleicoesDetalhadas;

    }

    @GetMapping("/{id}/relatorio")
    public Relatorio disponiveisAoEleitor(@PathVariable(value = "id") long id) {

        Eleicao eleicao = eleicaoRepository.findById(id);
        SituacaoEleicao situacao = eleicoesService.getSituacao(eleicao);
        Relatorio relatorio = new Relatorio();
        long quantidadeEleitores = protocoloRepository.countAllByEleicao(eleicao);

        if (situacao.equals(SituacaoEleicao.FINALIZADA)) {
            List<ResultadoVotacao> resultadoVotacao = eleicaoRepository.relatorio(eleicao);
            relatorio.setVotacao(resultadoVotacao);
        }

        relatorio.setQuantidadeEleitores(quantidadeEleitores);
        relatorio.setSituacao(situacao);

        return relatorio;
    }

    @GetMapping("/{id}")
    public Eleicao get(@PathVariable(value = "id") long id) {
        return eleicaoRepository.findById(id);
    }

    @PostMapping("/criar")
    public Eleicao criar(@RequestBody Eleicao eleicao) {
        return eleicaoRepository.save(eleicao);
    }

    @DeleteMapping("/{id}")
    public void remover(@PathVariable(value = "id") long id) {
        eleicaoRepository.deleteById(id);
    }

    @PutMapping("/editar")
    public Eleicao editar(@RequestBody Eleicao eleicao) {
        return eleicaoRepository.save(eleicao);
    }

    @PostMapping("/votar")
    public String votar(@RequestBody Votacao votacao) {

        Eleitor eleitor = eleitorRepository.findByCpf(votacao.getCpf());
        Eleicao eleicao = eleicaoRepository.findById(votacao.getEleicaoId());

        Protocolo protocolo = new Protocolo();
        protocolo.setEleitor(eleitor);
        protocolo.setEleicao(eleicao);
        protocolo.setNumero(Utils.gerarNumeroProtocolo());
        protocoloRepository.save(protocolo);

        votacao.getVotados().forEach((cargoId, candidatoId) -> {
            Candidato candidato = candidatoRepository.findById(candidatoId);
            Voto voto = new Voto();
            voto.setCandidato(candidato);
            voto.setProtocolo(protocolo);
            votoRepository.save(voto);
        });

        return protocolo.getNumero();
    }

}
