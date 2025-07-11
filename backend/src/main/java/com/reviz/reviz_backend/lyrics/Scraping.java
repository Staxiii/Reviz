package com.reviz.reviz_backend.lyrics;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class Scraping {
    private static final String BASE_URL = "https://n-oubliez-pas-les-paroles.fandom.com/fr";
    /**
     * Récupère les paroles d'une page chanson Fandom.
     */
    public String fetchLyrics(String songSlug) throws Exception {
        // Construire l'URL de la page (ex : "/wiki/Titre_de_la_chanson")
        String url = BASE_URL + "/wiki/" + songSlug;
        Document doc = Jsoup.connect(url)
                .userAgent("Mozilla/5.0")      // important pour contourner certains blocks
                .timeout(10_000)
                .get();

        // Sélecteur CSS : selon la structure de la page Fandom,
        // les paroles sont souvent dans <div class="lyricbox"> ou <div class="mw-parser-output">
        Elements lyricBox = doc.select("div.lyricbox, div.mw-parser-output > p");
        if (lyricBox.isEmpty()) {
            throw new IllegalArgumentException("Paroles non trouvées pour : " + songSlug);
        }

        // Concaténer tous les paragraphes
        return lyricBox.eachText().stream()
                .collect(Collectors.joining("\n\n"));
    }
}
