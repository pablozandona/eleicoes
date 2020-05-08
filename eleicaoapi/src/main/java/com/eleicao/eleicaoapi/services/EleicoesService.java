package com.eleicao.eleicaoapi.services;

import com.eleicao.eleicaoapi.dto.CargoCandidatos;
import com.eleicao.eleicaoapi.dto.EleicaoDetalhada;
import com.eleicao.eleicaoapi.models.*;
import com.eleicao.eleicaoapi.repository.CandidatoRepository;
import com.eleicao.eleicaoapi.repository.CargoRepository;
import com.eleicao.eleicaoapi.repository.FotoRepository;
import com.eleicao.eleicaoapi.repository.ProtocoloRepository;
import com.eleicao.eleicaoapi.utils.SituacaoEleicao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class EleicoesService {

    @Autowired
    public CandidatoRepository candidatoRepository;

    @Autowired
    public ProtocoloRepository protocoloRepository;

    @Autowired
    public CargoRepository cargoRepository;

    public EleicaoDetalhada comporDetalhamento(Eleicao eleicao, Eleitor eleitor) {

        EleicaoDetalhada eleicaoDetalhada = new EleicaoDetalhada();
        List<CargoCandidatos> cargos = new ArrayList<>();

        eleicaoDetalhada.setEleicao(eleicao);

        eleicao.getCargos().forEach(cargo -> {
            List<Candidato> candidatos = candidatoRepository.findByCargo(cargo);
            CargoCandidatos cargoCandidatos = new CargoCandidatos(cargo);
            cargoCandidatos.setCandidatos(candidatos);
            cargos.add(cargoCandidatos);
        });

        eleicaoDetalhada.setCargos(cargos);

        if (eleitor != null) {
            Protocolo protocolo = protocoloRepository.findByEleicaoAndEleitor(eleicao, eleitor);
            eleicaoDetalhada.setProtocolo(protocolo);
        }

        return eleicaoDetalhada;
    }

    public SituacaoEleicao getSituacao(Eleicao eleicao) {
        Calendar today = Calendar.getInstance();
        if (today.before(eleicao.getDataInicio())) {
            return SituacaoEleicao.INDISPONIVEL;
        }
        if (today.after(eleicao.getDataFim())) {
            return SituacaoEleicao.FINALIZADA;
        }
        return SituacaoEleicao.EM_ANDAMENTO;
    }

}
