package com.eleicao.eleicaoapi.utils;

import java.security.SecureRandom;
import java.util.Date;
import java.util.Random;

public class Utils {

    private static final Random generator = new Random();
    static final String SOURCE = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz";
    static SecureRandom secureRnd = new SecureRandom();

    public static String gerarNumeroProtocolo() {
        StringBuilder sb = new StringBuilder(19);

        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 4; j++) {
                sb.append(SOURCE.charAt(secureRnd.nextInt(SOURCE.length())));
            }
            if (i < 3) sb.append('-');
        }

        return sb.toString().toUpperCase();
    }

}
