package com.reviz.reviz_backend.lyrics;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fandom")
@CrossOrigin("http://localhost:5173")
public class FandomController {
    private final Scraping scraper;
    public FandomController(Scraping scraper) {
        this.scraper = scraper;
    }

    @GetMapping("/{slug}")
    public ResponseEntity<String> getLyrics(@PathVariable String slug) {
        try {
            String lyrics = scraper.fetchLyrics(slug);
            return ResponseEntity.ok(lyrics);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
