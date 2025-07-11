package com.reviz.reviz_backend.songs;

import org.springframework.stereotype.Service;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import java.io.IOException;

@Service
public class SongService {

    private static final String BASE_URL = "https://n-oubliez-pas-les-paroles.fandom.com/fr/wiki/";

    public Song getSong(String slug) {
        try {
            return scrape(slug);
        } catch (IOException e) {
            return null;
        }
    }

    private Song scrape(String slug) throws IOException {
        Document doc = Jsoup.connect(BASE_URL + slug).get();
        Song song = new Song();
        song.setSlug(slug);
        song.setArtist(extractArtist(doc));
        song.setYear(extractYear(doc));
        song.setLyrics(extractLyrics(doc));
        return song;
    }

    private String extractArtist(Document doc) {
        Element p = doc.selectFirst("p:has(u:matchesOwn(Interprète))");
        if (p != null) {
            String txt = p.text();
            int idx = txt.indexOf(':');
            if (idx >= 0) {
                return txt.substring(idx + 1).trim();
            }
        }
        return null;
    }

    private Integer extractYear(Document doc) {
        Element p = doc.selectFirst("p:has(u:matchesOwn(Année))");
        if (p != null) {
            String full = p.text();
            int idx = full.indexOf(':');
            if (idx >= 0 && idx + 1 < full.length()) {
                String txt = full.substring(idx + 1).trim();
                try {
                    return Integer.valueOf(txt);
                } catch (NumberFormatException ex) {
                    // ignore
                }
            }
        }
        return null;
    }

    private String extractLyrics(Document doc) {
        Element headline = doc.selectFirst("span#Paroles");
        if (headline != null) {
            Element h2 = headline.parent();
            StringBuilder sb = new StringBuilder();
            for (Element el = h2.nextElementSibling();
                 el != null && !el.tagName().equals("h2");
                 el = el.nextElementSibling()) {
                // On récupère le paragraphe <p> en HTML (avec ses balises)
                if ("p".equals(el.tagName())) {
                    sb.append(el.outerHtml());
                }
            }
            return sb.toString();
        }
        return null;
    }

}