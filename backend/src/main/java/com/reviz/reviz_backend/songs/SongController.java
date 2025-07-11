package com.reviz.reviz_backend.songs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/songs")
public class SongController {

    @Autowired
    private SongService service;

    @GetMapping("/{slug}/year")
    public ResponseEntity<Integer> getYear(@PathVariable String slug) {
        Song song = service.getSong(slug);
        if (song == null || song.getYear() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(song.getYear());
    }

    @GetMapping("/{slug}/artist")
    public ResponseEntity<String> getArtist(@PathVariable String slug) {
        Song song = service.getSong(slug);
        if (song == null || song.getArtist() == null || song.getArtist().isBlank()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Artiste introuvable");
        }
        return ResponseEntity.ok(song.getArtist());
    }

    @GetMapping(
            path = "/{slug}/lyrics",
            produces = "text/html; charset=UTF-8"
    )
    public ResponseEntity<String> getLyrics(@PathVariable String slug) {
        Song song = service.getSong(slug);
        if (song == null || song.getLyrics() == null || song.getLyrics().isBlank()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Paroles introuvables");
        }

        // On embarque la police Montserrat et on applique le style
        String html = """
          <!DOCTYPE html>
          <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <title>Paroles de %s</title>
            <!-- Montserrat depuis Google Fonts -->
            <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
            <style>
              body {
                font-family: 'Montserrat', sans-serif;
                margin: 2rem;
                line-height: 1.5;
              }
              p {
                margin-bottom: 1rem;
              }
            </style>
          </head>
          <body>
            %s
          </body>
          </html>
          """.formatted(
                song.getSlug(),      // titre optionnel
                song.getLyrics()     // tes <p>…</p> générés par extractLyrics
        );

        return ResponseEntity
                .ok()
                .header(HttpHeaders.CONTENT_TYPE, "text/html; charset=UTF-8")
                .body(html);
    }

}