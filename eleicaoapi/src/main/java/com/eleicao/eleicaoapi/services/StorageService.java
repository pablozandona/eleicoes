package com.eleicao.eleicaoapi.services;

import com.eleicao.eleicaoapi.models.Foto;
import com.eleicao.eleicaoapi.repository.FotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.concurrent.ExecutionException;
import java.util.stream.Stream;

@Service
public class StorageService {

    @Autowired
    public FotoRepository fotoRepository;

    public Foto storeFile(MultipartFile file) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Check if the file's name contains invalid characters
            if(fileName.contains("..")) {
                throw new RuntimeException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            Foto foto = new Foto(fileName, file.getContentType(), file.getBytes());

            return fotoRepository.save(foto);

        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public Foto getFoto(String fileId) {
        return fotoRepository.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found with id " + fileId));
    }

}
