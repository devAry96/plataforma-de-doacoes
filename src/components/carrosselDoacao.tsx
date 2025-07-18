// src/components/carrosselDoacao.tsx

"use client";
import React, { useState } from "react";
import { Paper, Typography, IconButton, Box } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const slides = [
  {
    img: "/ilustracao-de-doacao-de-roupas_23-2148849867.avif",
    title: "Apoio a Projetos Inovadores",
    desc: "A fundação apoia projetos inovadores que criam impacto positivo nas comunidades locais.",
  },
  {
    img: "/istockphoto-1436319269-612x612.jpg",
    title: "O Poder da Colaboração",
    desc: "Juntos, podemos fazer mais! Cada contribuição faz a diferença na construção de um futuro melhor.",
  },
  {
    img: "/conceito-de-doacao-de-roupas-para-ilustracao-plana.avif",
    title: "Investindo no Futuro",
    desc: "Doações que ajudam a financiar iniciativas que buscam um impacto sustentável a longo prazo.",
  },
  {
    img: "/conceito-de-doacao-de-roupas-de-design-plano_23-2148812828.avif",
    title: "Empoderamento Comunitário",
    desc: "Apoie iniciativas que promovem o crescimento e a educação dentro das comunidades.",
  },
];

export default function CarrosselDoacao() {
  const [index, setIndex] = useState(0);

  const handlePrev = () => setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const handleNext = () => setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 1, sm: 2 },
        borderRadius: 2,
        maxWidth: 440,
        mx: 'auto',
        width: '100%',
      }}
    >
      <Box sx={{ position: "relative", minHeight: 260 }}>
        {/* Slide */}
        <Box>
          <img
            src={slides[index].img}
            alt={slides[index].title}
            style={{
              width: "100%",
              borderRadius: 8,
              objectFit: "cover",
              minHeight: 180,
              maxHeight: 220,
            }}
          />
          <Typography variant="subtitle1" sx={{ mt: 1, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
            {slides[index].title}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem" },
              color: "text.secondary",
            }}
          >
            {slides[index].desc}
          </Typography>
        </Box>
        {/* Navegação */}
        <IconButton
          aria-label="slide anterior"
          onClick={handlePrev}
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            bgcolor: "background.paper",
            boxShadow: 1,
            "&:hover": { bgcolor: "grey.200" },
            p: 0.5,
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <IconButton
          aria-label="próximo slide"
          onClick={handleNext}
          sx={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            bgcolor: "background.paper",
            boxShadow: 1,
            "&:hover": { bgcolor: "grey.200" },
            p: 0.5,
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
        {/* Indicadores */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 1,
            gap: 1,
          }}
        >
          {slides.map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: i === index ? "primary.main" : "grey.400",
                transition: "background 0.3s",
                cursor: "pointer",
              }}
              onClick={() => setIndex(i)}
            />
          ))}
        </Box>
      </Box>
    </Paper>
  );
}