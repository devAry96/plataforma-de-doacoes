// components/Topbar.tsx
"use client"

import { Box, Typography, Link, Stack } from "@mui/material"

export const Topbar = () => {
  return (
    <Box position="static" sx={{ bgcolor: "#311b92", color: "#fff", px: 2, py: 0.5 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography variant="body2">
          🚚 Frete grátis para pedidos acima de R$100!
        </Typography>

        <Stack direction="row" spacing={2}>
          <Link href="/ajuda" underline="hover" color="inherit">
            Ajuda
          </Link>
          <Link href="/contato" underline="hover" color="inherit">
            Contato
          </Link>
          <Link href="/login" underline="hover" color="inherit">
            Login
          </Link>
        </Stack>
      </Stack>
    </Box>
  )
}
